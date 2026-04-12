-- [REL-HUB-01][A16.0.2][NEW] Esquema de tracking técnico para presencia en Hub Sport LSK.
CREATE TABLE IF NOT EXISTS presence_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  email_hash TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('join', 'heartbeat', 'leave')),
  active_count INTEGER,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_presence_visits_room_created
  ON presence_visits (room_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_presence_visits_email_hash
  ON presence_visits (email_hash, created_at DESC);
