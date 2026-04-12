# Hub Sport LSK Ultra Light - Lecciones Aprendidas Replicadas (Presencia)

## Trazabilidad
- Release: `REL-HUB-01`
- Actividad: `A16`
- Iteracion: `A16.0.2`
- Etiqueta recomendada: `[REL-HUB-01][A16.0.2][NEW] Tracking de visitas con D1`

## 1) Lecciones replicadas en configuraciones
1. Separacion de entorno para presencia:
   - `local`
   - `staging`
   - `prod`
2. `roomId` explicito por proyecto:
   - `hub-sport-lsk-global`
3. Contrato de tiempos consistente:
   - `heartbeatMs = 15000`
   - `countRefreshMs = 10000`
   - `staleTtlMs = 35000`
4. Persistencia opcional de tracking:
   - activable por bandera (`tracking.enabled`)
5. Privacidad por diseno:
   - `mode = hash-only`
   - no correo plano en DB
   - consentimiento requerido (`requireConsent = true`)
6. Evitar contaminacion de producción:
   - separar DB `staging/prod`
   - usar `preview_database_id` en configuración de entorno de pruebas

## 2) Dónde se aplicó
- `hub-sport-lsk/config.js`
  - bloque `presence` con endpoints por entorno y tracking seguro
- `hub-sport-lsk/app.js`
  - normalización de config de presencia (`resolvePresenceConfig`)
  - anuncio de config activa para pruebas (`announcePresenceConfig`)
- `hub-sport-lsk/presence/wrangler.toml.example`
  - plantilla para Worker + DO + D1 con entorno `staging`
- `hub-sport-lsk/presence/schema.sql`
  - tabla `presence_visits` para bitácora técnica

## 3) Criterio operativo
- Esta replicación **no acopla** todavía el contador en el layout final de LSK.
- Deja lista la base de configuración para implementación controlada en el siguiente paso de integración.

## 4) Validación rápida
1. Abrir consola en LSK y confirmar log `[HubPresenceConfig]`.
2. Confirmar `presence.env` y `endpointBase` correctos.
3. Confirmar que tracking está en `hash-only`.
