# Presence Module

Backend operativo de `PCL` para `Hub Sport` por evento.

## Contenido
- `worker.js`
  - endpoints `join / heartbeat / leave / count`
  - `Durable Object` por `roomId`
  - bitácora mínima en `D1`
- `schema.sql`
  - tabla `presence_visits`
- `wrangler.toml.example`
  - plantilla de despliegue `local / staging / prod`

## Estado del módulo
- cliente frontend: integrado en `index.html`, `app.js`, `config.js`
- backend Cloudflare: listo para desplegar desde esta carpeta
- D1: requiere IDs reales antes de deploy

## Happy Path rápido
1. Copia `wrangler.toml.example` como `wrangler.toml`
2. Sustituye los `database_id`
3. Crea/aplica el esquema D1
4. Ejecuta:
   - local: `wrangler dev`
   - prod: `wrangler deploy`

## Manual completo
Usa:
- `RUNBOOK_PCL_HUB_SPORT_LSK.md`
