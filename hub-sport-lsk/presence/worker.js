// [REL-HSK-01][A16][NEW] Worker operativo de Presence Contact Layer para Hub Sport.
// Mantiene conteo en vivo por sala mediante Durable Object y bitácora técnica en D1.
export class PresenceRoom {
  constructor(state) {
    this.state = state;
    this.sessions = new Map();
    this.initialized = false;
  }

  async fetch(request) {
    if (!this.initialized) await this.loadSessions();
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return this.withCors(new Response(null, { status: 204 }));
    if (request.method === "GET" && url.pathname.endsWith("/count")) return this.withCors(this.countResponse());
    if (request.method !== "POST") return this.withCors(this.json({ ok: false, error: "Method not allowed" }, 405));

    let payload = {};
    try {
      payload = await request.json();
    } catch (_) {
      return this.withCors(this.json({ ok: false, error: "Invalid JSON body" }, 400));
    }

    const sessionId = String(payload.sessionId || "").trim();
    if (!sessionId) return this.withCors(this.json({ ok: false, error: "sessionId required" }, 400));

    const now = Number(payload.now) || Date.now();
    const isLeave = url.pathname.endsWith("/leave");

    if (isLeave) this.sessions.delete(sessionId);
    else this.sessions.set(sessionId, now);

    await this.cleanupAndPersist(now);
    return this.withCors(this.countResponse());
  }

  async loadSessions() {
    const rows = (await this.state.storage.get("sessions")) || {};
    this.sessions = new Map(Object.entries(rows));
    this.initialized = true;
    await this.cleanupAndPersist(Date.now());
  }

  async cleanupAndPersist(now) {
    const ttlMs = 35_000;
    for (const [sessionId, lastSeen] of this.sessions.entries()) {
      if (now - Number(lastSeen || 0) > ttlMs) this.sessions.delete(sessionId);
    }
    await this.state.storage.put("sessions", Object.fromEntries(this.sessions));
  }

  countResponse() {
    return this.json({
      ok: true,
      activeCount: this.sessions.size,
      serverTime: Date.now()
    });
  }

  json(data, status) {
    return new Response(JSON.stringify(data), {
      status: status || 200,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }

  withCors(response) {
    const headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");
    headers.set("access-control-allow-methods", "GET,POST,OPTIONS");
    headers.set("access-control-allow-headers", "content-type");
    return new Response(response.body, { status: response.status, headers });
  }
}

async function sha256Hex(value) {
  const data = new TextEncoder().encode(String(value || "").trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hashBuffer);
  return Array.from(bytes).map(function (b) {
    return b.toString(16).padStart(2, "0");
  }).join("");
}

async function logPresenceEvent(env, payload) {
  if (!env || !env.PRESENCE_DB) return;
  const roomId = String(payload.roomId || "global").trim() || "global";
  const sessionId = String(payload.sessionId || "").trim();
  const eventType = String(payload.eventType || "").trim();
  const eventName = String(payload.eventName || "").trim();
  const eventActive = Number(payload.eventActive == null ? 1 : payload.eventActive) ? 1 : 0;
  const nowIso = new Date(Number(payload.now) || Date.now()).toISOString();
  if (!sessionId || !eventType) return;

  const rawEmail = String(payload.email || "").trim();
  const emailHash = rawEmail ? await sha256Hex(rawEmail) : null;

  try {
    await env.PRESENCE_DB.prepare(
      "INSERT INTO presence_visits (room_id, session_id, email_hash, event_name, event_active, event_type, active_count, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) "
      + "ON CONFLICT(room_id, session_id) DO UPDATE SET "
      + "email_hash=excluded.email_hash, "
      + "event_name=excluded.event_name, "
      + "event_active=excluded.event_active, "
      + "event_type=excluded.event_type, "
      + "active_count=excluded.active_count, "
      + "created_at=excluded.created_at"
    ).bind(
      roomId,
      sessionId,
      emailHash,
      eventName || null,
      eventActive,
      eventType,
      payload.activeCount == null ? null : Number(payload.activeCount),
      nowIso
    ).run();
  } catch (error) {
    throw error;
  }
}

function withCorsJson(payload, status) {
  return new Response(JSON.stringify(payload), {
    status: status || 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*"
    }
  });
}

async function getEventMeta(env, eventAlias) {
  const alias = String(eventAlias || "").trim().toLowerCase();
  if (!alias) return { event_alias: "", event_name: "", event_active: 1 };
  if (!env || !env.PRESENCE_DB) {
    return { event_alias: alias, event_name: alias.toUpperCase(), event_active: 1 };
  }
  try {
    const row = await env.PRESENCE_DB
      .prepare("SELECT event_alias, event_name, event_active FROM events_catalog WHERE lower(event_alias)=? LIMIT 1")
      .bind(alias)
      .first();
    if (row) {
      return {
        event_alias: String(row.event_alias || alias).trim().toLowerCase(),
        event_name: String(row.event_name || alias.toUpperCase()).trim(),
        event_active: Number(row.event_active == null ? 1 : row.event_active) ? 1 : 0
      };
    }
  } catch (err) {
    console.warn("events catalog lookup skipped", String(err && err.message || err));
  }
  return { event_alias: alias, event_name: alias.toUpperCase(), event_active: 1 };
}

async function listEvents(env) {
  if (!env || !env.PRESENCE_DB) return [];
  try {
    const result = await env.PRESENCE_DB
      .prepare("SELECT event_alias, event_name, event_active FROM events_catalog ORDER BY event_name ASC")
      .all();
    return Array.isArray(result && result.results) ? result.results : [];
  } catch (err) {
    console.warn("events catalog list skipped", String(err && err.message || err));
    return [];
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "access-control-allow-headers": "content-type"
        }
      });
    }

    if (url.pathname === "/health") return withCorsJson({ ok: true, service: "hub-sport-lsk-presence" });
    if (url.pathname === "/events" && request.method === "GET") {
      const events = await listEvents(env);
      return withCorsJson({ ok: true, events: events });
    }

    if (!url.pathname.startsWith("/presence/")) {
      return withCorsJson({ ok: false, error: "Not found" }, 404);
    }

    const isPresenceEvent =
      request.method === "POST" &&
      (url.pathname.endsWith("/join") || url.pathname.endsWith("/heartbeat") || url.pathname.endsWith("/leave"));

    let body = {};
    if (isPresenceEvent) {
      try {
        body = await request.json();
      } catch (_) {
        body = {};
      }
    }
    const requestEventAlias = String(url.searchParams.get("event") || body.eventAlias || "ipv").trim().toLowerCase();
    const eventMeta = await getEventMeta(env, requestEventAlias);
    if (isPresenceEvent && Number(eventMeta.event_active) === 0) {
      return withCorsJson({
        ok: false,
        blocked: true,
        reason: "event_inactive",
        event_alias: eventMeta.event_alias,
        event_name: eventMeta.event_name,
        event_active: 0
      }, 403);
    }

    const roomId = String(url.searchParams.get("roomId") || body.roomId || "global").trim() || "global";
    const id = env.PRESENCE_ROOM.idFromName(roomId);
    const stub = env.PRESENCE_ROOM.get(id);

    let requestForRoom = request;
    if (isPresenceEvent) {
      requestForRoom = new Request(request.url, {
        method: "POST",
        headers: request.headers,
        body: JSON.stringify(body)
      });
    }

    const response = await stub.fetch(requestForRoom);

    if (isPresenceEvent && env.PRESENCE_DB) {
      let activeCount = null;
      try {
        const parsed = await response.clone().json();
        activeCount = Number(parsed.activeCount);
        if (!Number.isFinite(activeCount)) activeCount = null;
      } catch (_) {
        activeCount = null;
      }

      try {
        await logPresenceEvent(env, {
          roomId: roomId,
          sessionId: String(body.sessionId || "").trim(),
          email: String(body.email || "").trim(),
          eventName: String(body.eventName || eventMeta.event_name || "").trim(),
          eventActive: Number(eventMeta.event_active) ? 1 : 0,
          eventType: url.pathname.endsWith("/join")
            ? "join"
            : (url.pathname.endsWith("/leave") ? "leave" : "heartbeat"),
          activeCount: activeCount,
          now: Number(body.now) || Date.now()
        });
      } catch (err) {
        console.warn("presence log skipped", String(err && err.message || err));
      }
    }

    return response;
  }
};
