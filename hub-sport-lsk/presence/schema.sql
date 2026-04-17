-- [REL-HUB-01][A16.0.2][NEW] Esquema de tracking técnico para presencia en Hub Sport por evento.
CREATE TABLE IF NOT EXISTS presence_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  email_hash TEXT,
  event_name TEXT,
  event_active INTEGER NOT NULL DEFAULT 1 CHECK (event_active IN (0, 1)),
  event_type TEXT NOT NULL CHECK (event_type IN ('join', 'heartbeat', 'leave')),
  active_count INTEGER,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_presence_visits_event_created
  ON presence_visits (event_name, created_at DESC);
  
CREATE INDEX IF NOT EXISTS idx_presence_visits_room_created
  ON presence_visits (room_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_presence_visits_email_hash
  ON presence_visits (email_hash, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS idx_presence_visits_room_session
  ON presence_visits (room_id, session_id);

CREATE TABLE IF NOT EXISTS events_catalog (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_alias TEXT NOT NULL UNIQUE,
  event_name TEXT NOT NULL,
  event_active INTEGER NOT NULL DEFAULT 1 CHECK (event_active IN (0, 1)),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_catalog_active_alias
  ON events_catalog (event_active, event_alias);
