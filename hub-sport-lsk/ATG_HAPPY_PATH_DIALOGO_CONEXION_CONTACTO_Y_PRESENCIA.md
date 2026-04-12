# ATG Happy Path
## Dialogo de conexion + persistencia de contacto + presencia en vivo (Hub Sport LSK)

## 1) Proposito funcional

Operar el flujo de conexion de usuario para:
- autenticar via Google (OAuth 2.0 ya configurado),
- persistir correo de contacto en tabla dedicada,
- mantener analitica/presencia separada,
- mostrar en UI un boton con visitas conectadas en ese momento.

Resultado esperado:
- el correo sirve para contacto operativo/comunicacion,
- la presencia sigue siendo una capa de actividad en vivo,
- no se mezclan responsabilidades entre contacto y analitica.

---

## 2) Punto de entrada

- boton `Acceso con Google` en hero/dialogo de conexion
- consentimiento visible en formulario (solo lectura, marcado)
- boton/pill de presencia: `Visitas conectadas: N`

---

## 3) Ubicacion tecnica exacta

- `hub-sport-lsk/index.html`
  - dialogo de conexion
  - leyenda corta de consentimiento + link a aviso de privacidad
  - nodo visual del indicador/boton de visitas conectadas
- `hub-sport-lsk/app.js`
  - callback de login Google
  - envio de datos a endpoint de contacto
  - cliente de presencia (`join`, `heartbeat`, `count`, `leave`)
- `hub-sport-lsk/config.js`
  - `googleClientId`
  - `presence.endpointByEnv`, `presence.roomId`, intervalos
  - bandera de contacto (si aplica)
- `hub-sport-lsk/presence/wrangler.toml.example`
  - referencia de Worker + D1 + entornos
- `hub-sport-lsk/presence/schema.sql`
  - base de analitica `presence_visits`

---

## 4) Modelo de datos recomendado (separacion obligatoria)

### 4.1 Tabla de contacto (nueva, dedicada)

Nombre sugerido: `contact_subscriptions`

Campos minimos:
- `id` INTEGER PK AUTOINCREMENT
- `email` TEXT NOT NULL
- `email_hash` TEXT NOT NULL
- `source_app` TEXT NOT NULL (`hub-sport-lsk`)
- `consent_contact` INTEGER NOT NULL DEFAULT 1
- `consent_version` TEXT NOT NULL
- `consent_text` TEXT NOT NULL
- `google_sub` TEXT
- `display_name` TEXT
- `created_at` TEXT NOT NULL
- `updated_at` TEXT NOT NULL

Indices:
- `UNIQUE(email, source_app)`
- `INDEX(email_hash)`
- `INDEX(created_at)`

### 4.2 Tabla de presencia (ya existente)

Nombre actual: `presence_visits`

Uso:
- solo eventos de actividad (`join/heartbeat/leave/count`)
- no almacenar correo plano aqui

---

## 5) Contrato API minimo sugerido

### Contacto

- `POST /contact/upsert`
  - entrada:
    - `email` (derivado de Google login)
    - `displayName`
    - `googleSub`
    - `consentContact=true`
    - `consentVersion`
    - `consentText`
    - `sourceApp="hub-sport-lsk"`
  - salida:
    - `ok`
    - `contactId`
    - `created|updated`

### Presencia

- `POST /presence/join`
- `POST /presence/heartbeat`
- `POST /presence/leave`
- `GET /presence/count?roomId=...`

---

## 6) Flujo Happy Path (operativo real)

1. Usuario abre `Hub Sport LSK`.
2. Ve consentimiento corto con link a aviso de privacidad.
3. Abre dialogo y autentica con Google.
4. Frontend recibe `email`, `name`, `sub` desde el token validado.
5. Frontend llama `POST /contact/upsert` para persistir/actualizar contacto.
6. Frontend inicia presencia:
   - `join` una vez,
   - `heartbeat` periodico,
   - `count` para refrescar UI.
7. UI muestra boton/pill: `Visitas conectadas: N`.
8. Al cerrar/pestaña inactiva, intentar `leave` (best effort).
9. El sistema mantiene contacto y presencia separados.

---

## 7) Boton de presencia (visitas conectadas)

Texto recomendado:
- `Visitas conectadas: N`

Reglas UI:
- visible en hero o resumen rapido
- actualizar cada `countRefreshMs`
- si falla API: `Visitas conectadas: --` (degradacion elegante)
- no bloquear otras funciones del hub

---

## 8) Dependencias directas

- Google OAuth Web Client configurado en origenes autorizados
- endpoint backend con validacion de token
- D1 para tabla de contacto
- Durable Object para presencia en vivo
- `roomId` estable por entorno (`hub-sport-lsk-global` sugerido)

---

## 9) Validacion rapida

1. Login Google exitoso en dialogo.
2. Ejecutar query de contacto:
   - debe existir/actualizar fila en `contact_subscriptions`.
3. Abrir 2-3 pestañas en mismo `roomId`.
4. Verificar UI: `Visitas conectadas` sube y baja.
5. Query presencia:
   - aparecen `join/heartbeat/leave` en `presence_visits`.

---

## 10) Riesgos / no tocar

- no guardar correo plano dentro de `presence_visits`
- no mezclar analitica de presencia con consentimiento de contacto
- no usar secreto OAuth en frontend
- no remover link a aviso de privacidad en consentimiento
- no desplegar sin separar `staging/prod`

---

## 11) SQL base sugerido para contacto (D1)

```sql
CREATE TABLE IF NOT EXISTS contact_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  email_hash TEXT NOT NULL,
  source_app TEXT NOT NULL,
  consent_contact INTEGER NOT NULL DEFAULT 1,
  consent_version TEXT NOT NULL,
  consent_text TEXT NOT NULL,
  google_sub TEXT,
  display_name TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_contact_email_source
  ON contact_subscriptions(email, source_app);

CREATE INDEX IF NOT EXISTS ix_contact_email_hash
  ON contact_subscriptions(email_hash);

CREATE INDEX IF NOT EXISTS ix_contact_created_at
  ON contact_subscriptions(created_at);
```

---

## 12) Mensaje tecnico para otro chat (copiar/pegar)

Implementar en `hub-sport-lsk` el flujo acoplado de conexion/contacto/presencia con separacion de responsabilidades: 1) en login Google, persistir correo en tabla dedicada `contact_subscriptions` via `POST /contact/upsert` (con `consent_contact`, `consent_version`, `consent_text`, `source_app`), 2) mantener `presence_visits` solo para eventos `join/heartbeat/leave/count`, y 3) exponer en UI un boton/pill `Visitas conectadas: N` alimentado por `GET /presence/count`, con degradacion a `--` si falla backend.
