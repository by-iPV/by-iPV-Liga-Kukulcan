# RUNBOOK PCL HUB SPORT

Manual operativo ATG Happy Path para `Presence Contact Layer (PCL)` en `Hub Sport` por evento.

## 1. Propósito

`PCL` resuelve presencia informativa en vivo:
- cuántas visitas activas están dentro del hub
- bitácora técnica mínima de `join / heartbeat / leave`

No resuelve por sí solo:
- autenticación
- chat
- mensajería
- lógica de inscripción

Arquitectura recomendada:
- `GitHub Pages`: frontend
- `Cloudflare Workers + Durable Objects + D1`: backend de presencia

## 2. Componentes

### Frontend
- `index.html`
- `app.js`
- `config.js`

### Backend
- `presence/worker.js`
- `presence/schema.sql`
- `presence/wrangler.toml.example`

## 3. Configuración

### 3.1 Variables frontend
Archivo:
- `config.js`

Bloque:
- `presence`

Campos críticos:
- `enabled`
- `env`
- `roomId`
- `heartbeatMs`
- `countRefreshMs`
- `staleTtlMs`
- `endpointByEnv.local`
- `endpointByEnv.staging`
- `endpointByEnv.prod`

### 3.2 Variables backend
Archivo:
- `presence/wrangler.toml`

Bindings críticos:
- `PRESENCE_ROOM`
- `PRESENCE_DB`

## 4. Implementación

### 4.1 Local
Objetivo:
- validar flujo completo frontend + worker + D1 local

Pasos:
1. Abrir terminal en repo frontend:
   - `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk`
2. Servir frontend:
   - `python -m http.server 5500`
3. Abrir terminal en:
   - `...\\hub-sport-lsk\\presence`
4. Copiar `wrangler.toml.example` como `wrangler.toml`
5. Ejecutar:
   - `wrangler dev`
6. Abrir:
   - `http://127.0.0.1:5500`
7. Verificar lateral:
   - `EN LINEA`
   - número mayor a `0`
   - estado `en vivo`

### 4.2 Staging
Objetivo:
- probar worker real sin tocar producción

Pasos:
1. Crear DB staging
2. Completar `env.staging` en `wrangler.toml`
3. Aplicar esquema remoto staging
4. Deploy staging
5. Configurar `presence.endpointByEnv.staging`
6. Forzar `presence.env = "staging"` o usar hostname staging

### 4.3 Producción
Objetivo:
- operación real desde GitHub Pages

Pasos:
1. Crear D1 prod
2. Completar `[[d1_databases]]` en `wrangler.toml`
3. Aplicar `schema.sql`
4. Deploy:
   - `wrangler deploy`
5. Verificar:
   - `/health`
   - `/presence/count?roomId=hub-sport-global`
6. En `config.js`, asegurar:
   - `presence.env = "auto"` o `prod`
   - `endpointByEnv.prod = "https://TU-WORKER.workers.dev"`
7. Push a GitHub Pages

## 5. Monitoreo

### Señales UI
- `EN LINEA`
- número activo
- `en vivo`
- `PCL off`
- `PCL error`
- `sin señal`

### Señales API
- `GET /health`
- `GET /presence/count`

### Señales de base
Consulta:
```sql
SELECT id, room_id, event_type, active_count, created_at
FROM presence_visits
ORDER BY id DESC
LIMIT 20;
```

## 6. Rutas críticas

### Frontend
- `resolvePresenceConfig()`
- `presenceJoinAndStart()`
- `presencePost()`
- `refreshPresenceCount()`
- `presenceLeaveBestEffort()`

### Backend
- `GET /health`
- `POST /presence/join`
- `POST /presence/heartbeat`
- `POST /presence/leave`
- `GET /presence/count`

## 7. Troubleshooting

### Caso: `PCL off`
Revisar:
- `presence.enabled`
- `endpointBase`
- `env`

### Caso: `PCL error`
Revisar:
- worker no desplegado
- endpoint incorrecto
- `env` mal resuelto
- CORS

### Caso: `sin señal`
Revisar:
- `/count`
- conectividad hacia `workers.dev`
- caída temporal del worker

### Caso: GitHub Pages muestra `PCLerror`
Revisar:
1. `config.js`
2. `presence.env`
3. `endpointByEnv.prod`
4. deploy real de Cloudflare

### Caso: D1 sin filas
Revisar:
- binding `PRESENCE_DB`
- que el esquema se haya aplicado en remoto
- que el frontend haga realmente `join/heartbeat`

## 8. Checklist de producción

### Previo
- [ ] `worker.js` presente en `presence/`
- [ ] `wrangler.toml` generado desde ejemplo
- [ ] IDs reales de D1 cargados
- [ ] esquema D1 aplicado
- [ ] `/health` responde `ok: true`

### Frontend
- [ ] `presence.env` correcto
- [ ] `endpointByEnv.prod` correcto
- [ ] GitHub Pages actualizado

### Validación
- [ ] abrir una pestaña
- [ ] confirmar `EN LINEA = 1`
- [ ] abrir segunda pestaña
- [ ] confirmar incremento
- [ ] cerrar pestaña
- [ ] confirmar corrección por `leave` o TTL

## 9. Actividades no cerradas todavía

1. Automatizar `staging` con endpoint real
2. Consolidar `wrangler.toml` real fuera del ejemplo
3. Integrar consulta operativa/analítica para `PRE / INS / CAT` si después se desea unificar reportes
4. Decidir si `contact_subscriptions` vive en esta misma base D1 o en un servicio aparte

## 10. ATG Happy Path para pendientes

### Pendiente 1. Staging real
1. Crear DB staging
2. Sustituir IDs en `env.staging`
3. Deploy staging
4. Configurar URL staging en frontend
5. Validar dos pestañas y consulta D1

### Pendiente 2. `wrangler.toml` operativo en repo
1. Copiar `wrangler.toml.example` como `wrangler.toml`
2. Sustituir IDs
3. No subir secretos sensibles si luego se agregan

### Pendiente 3. Contact Layer completa
1. Crear tabla `contact_subscriptions`
2. Diseñar endpoint `upsert`
3. Definir consentimiento y gobernanza
4. Probar flujo con Google GIS

### Pendiente 4. Métricas de negocio
1. Definir contrato de datos
2. Separar presencia de negocio
3. Unificar reportes laterales si se desea
