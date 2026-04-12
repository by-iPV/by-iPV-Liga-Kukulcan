Continuamos el desarrollo en:

`c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight`

Proyecto objetivo:

`hub-sport-lsk-ultralight`

Antes de editar cualquier archivo, consume y resume estos documentos en este orden:

1. `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\HANDOFF_HUB_SPORT_LSK_ULTRALIGHT.md`
2. `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\SESSION_LOG.md`
3. `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\README.md`
4. `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\ATG_HAPPY_PATH_DIALOGO_CONEXION_CONTACTO_Y_PRESENCIA.md`
5. `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\PRESENCE_CONFIG_LESSONS_REPLICATED.md`
6. `c:\2026\ipv-matchmaking\tools\presence-contact-layer\README.md`
7. `c:\2026\ipv-matchmaking\tools\presence-contact-layer\ATG_HAPPY_PATH_PRESENCE_CONTACT_LAYER.md`

Contexto obligatorio a conservar:

- esta es una variante encapsulada y promocional, separada de Matchmaking base
- no tocar la app productiva principal salvo instruccion explicita
- trabajar solo dentro de:
  - `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight`
- la semantica UX acordada es:
  - `Participantes conectados = visitas activas en pagina`
  - no significa equipos autenticados
  - no significa estados `Pre-inscrito` / `Inscrito`
- la iteracion de presencia sugerida es:
  - `[REL-HUB-01][A16.0.1][NEW]`
- el activo tecnico nuevo y estrategico es:
  - `Presence Contact Layer (PCL)`

Objetivo de esta nueva sesion:

- retomar `hub-sport-lsk-ultralight` sin perder contexto
- continuar con cambios pequenos, estables y documentados
- priorizar primero estabilizacion visual y tecnica, luego nuevas capacidades

Prioridades recomendadas:

1. validar deuda tecnica abierta:
   - opacidad / traslucidez del hero y glass
   - redimensionamiento/reflow recurrente
   - happy path real de Google GIS
2. cerrar microinteraccion del tooltip + boton salir junto a la `G`
3. decidir e implementar integracion discreta de `PCL`
4. preparar la base `v0.1` para GitHub

Reglas de trabajo:

- documentar avances en:
  - `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\SESSION_LOG.md`
- mantener cambios encapsulados
- no hacer refactors innecesarios fuera del alcance inmediato
- si detectas un conflicto real o una deuda tecnica que impida avanzar, documentala antes de expandir alcance
- si implementas codigo nuevo, conserva trazabilidad de release/actividad cuando aplique

Primer entregable esperado en la nueva sesion:

- un resumen corto del estado actual
- una lista breve de deuda tecnica abierta validada contra codigo
- la propuesta del siguiente paso concreto a ejecutar

Despues de resumir el estado, continua directamente con la prioridad tecnica acordada por el usuario.
