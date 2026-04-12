# Hub Sport LSK Ultra Light

## Alcance Tecnico MVP

Este MVP encapsulado resuelve una version promocional y visual del ecosistema deportivo, separada de la app operativa de Matchmaking.

Objetivo principal:
- mostrar equipos y logos por categoria con estados `Pre-inscrito` e `Inscrito`
- personalizar la `Seccion A` segun el correo origen del enlace o perfil de prueba
- mantener una experiencia visual premium con baja transaccionalidad

Incluye:
- hero superior con patrocinadores, resumen rapido y logos de inscritos
- resumen rapido reubicado al menu lateral izquierdo (modo compacto)
- indicador `En linea` (PCL) en menu lateral izquierdo
- switch lateral `Ver pre-inscritos` / `Ver demo`
- slider de opacidad reubicado al menu lateral izquierdo (temporal)
- `Seccion A` con categorias priorizadas por correo origen
- `Seccion B` con el resto de categorias en modo promocional
- conciliacion basica entre `Equipos_Inscritos` y `Teams`
- soporte para multiples categorias, ramas y logos por registro fuente

No incluye en este MVP:
- registro de equipos
- cobro o pagos
- generacion de partidos
- podiums
- standings
- edicion por usuario final

## Modelo Minimo De Datos

### Fuente pre-inscritos
- `email`
- `branches[]`
- `categories[]`
- `logos[]`
- `teamName`
- `contactName`
- `phone`
- `status = pre-inscrito`

### Fuente inscritos
- `id`
- `name`
- `branch`
- `category`
- `ownerEmail`
- `status = inscrito`

### Modelo derivado de visualizacion
- `id`
- `sourceEmail`
- `teamName`
- `categoryDisplay`
- `branch`
- `logoUrl`
- `status`
- `statusVariant`
- `source`

## Pantallas Y Componentes

### Pantalla unica MVP
- banda superior:
  - patrocinadores
  - hero
  - equipos inscritos
  - resumen rapido
- banda central:
  - selector de perfil origen para pruebas
  - estado del correo origen
- `Seccion A`
  - categoria activa
  - cards rotativas con prioridad del correo autenticado o de origen
- `Seccion B`
  - resto de categorias
  - cards por categoria con orden promocional

### Componentes principales
- `source profile selector`
- `status pill`
- `logo card`
- `ribbon o chip de estado`
- `category rail`
- `summary stat card`

## Reglas Clave Del MVP

- si el correo origen tiene categorias asociadas, `Seccion A` solo rota entre esas categorias
- si no tiene categorias asociadas, `Seccion A` rota todas las categorias del catalogo
- `Inscrito directo` se muestra visualmente como `Inscrito`
- un equipo puede existir en `Teams` sin pasar por `Equipos_Inscritos` y debe mostrarse como `Inscrito` (directo)
- los correos entre pre-inscrito e inscrito no tienen por que coincidir; la conciliacion visual prioriza nombre de equipo + categoria
- los logos multiples de un mismo registro se expanden como entradas visuales distintas
- la categoria visible manda sobre el nombre del archivo o logo

## Fuente De Datos (inscritos / pre-inscritos)

Estado actual:
- `useDemoData: false` en `hub-sport-lsk/config.js`
- la app intenta consumir fuente real desde `appsScriptUrl?action=bootstrap`

Pestañas esperadas en Google Sheet:
- `Equipos_Inscritos` (pre-inscritos)
- `Teams` (inscritos)

Campos mapeados (normalizacion tolerante por alias):
- pre-inscritos:
  - `Dirección de correo electrónico`
  - `Rama (si aplica)` / `Rama`
  - `Categoría(s)`
  - `Logo(s)`
  - `Nombres(s)`
  - `A. Paterno`
  - `A. Materno`
  - `Teléfono de contacto`
  - `Nombre(s) de equipo`
- inscritos:
  - `id`
  - `name`
  - `branch`
  - `category`
  - `ownerEmail`

Fallback:
- si `bootstrap` falla o llega vacio, se usa dataset demo embebido como respaldo para no romper UI.

Modo demo curado:
- al activar `Ver demo`, la app arma dataset curado y aleatorio de categorias usando logos disponibles
- las etiquetas `Pre-inscrito` / `Inscrito` se generan de manera controlada
- la banda `Equipos inscritos` (arriba derecha) se alimenta de los mismos elementos con estado `Inscrito`, por lo que mantiene coincidencia visual con A/B

## Ruta Local

- `hub-sport-lsk/index.html`

## Documentos Tecnicos Relacionados

- `hub-sport-lsk/HANDOFF_HUB_SPORT_LSK_ULTRALIGHT.md`
  - entrega/recepcion tecnica integral de esta variante encapsulada
  - resume alcance actual, deuda tecnica, aprendizajes, porcentaje de avance y prioridades
- `hub-sport-lsk/PROMPT_REANUDACION_HUB_SPORT_LSK_ULTRALIGHT.md`
  - prompt listo para pegar en un chat nuevo y reanudar trabajo con el contexto correcto
- `hub-sport-lsk/QA_REFLOW_CHECKLIST_V0_1.md`
  - checklist de validacion visual para cerrar deuda de reflow antes del corte `v0.1`
- `hub-sport-lsk/ATG_HAPPY_PATH_HUB_PRESENCE_LSK_MIN.md`
  - adaptacion minima de `REL-HUB-01 / A16` para esta version encapsulada
  - define donde si conviene mostrar `Participantes conectados: N`
  - aclara que en este hub significa `visitas activas en la pagina`

## Validacion De Colaboracion

En esta variante encapsulada si podemos avanzar aqui con el alcance del inciso `b`.

Queda explicitamente documentado que:
- el contador `Participantes conectados: N` se interpreta como `visitas activas en pagina`
- no representa autenticacion
- no representa equipos conectados autenticados
- su implementacion corresponde a:
  - `hub-sport-lsk/index.html`
  - `hub-sport-lsk/app.js`
  - configuracion local o inline de esta variante
- debe mantenerse desacoplado de `Matchmaking` base

Tambien queda explicito que el `SESSION_LOG` de esta worktree se encuentra en:
- `.worktrees/hub-sport-lsk-ultralight/SESSION_LOG.md`

No vive dentro de:
- `hub-sport-lsk/`

## Prioridad Actual

La prioridad actual de esta worktree sigue siendo:
- pulido visual
- afinacion del matching `Pre-inscrito -> Inscrito`
- preparacion del salto a GitHub

### Estado estimado

- avance global aproximado del MVP encapsulado:
  - `72%`
- novedad estructural mas importante ya diseñada:
  - `Presence Contact Layer (PCL)`
  - capa reusable para presencia, contacto y trazabilidad separada del negocio operativo

La presencia minima queda lista como iteracion controlada:
- `REL-HUB-01 / A16`

y se activa cuando corresponda dentro del plan de integracion.
- `../SESSION_LOG.md`
  - bitacora operativa de esta worktree encapsulada
  - **nota de ruta**: en este contexto el `SESSION_LOG.md` no vive dentro de `hub-sport-lsk/`, vive un nivel arriba:
    - `.worktrees/hub-sport-lsk-ultralight/SESSION_LOG.md`
- `hub-sport-lsk/PRESENCE_CONFIG_LESSONS_REPLICATED.md`
  - replicacion de lecciones aprendidas de `hub-presence-demo` en configuraciones de LSK
  - incluye criterios `local/staging/prod`, privacidad y tracking `hash-only`
- `hub-sport-lsk/ATG_HAPPY_PATH_DIALOGO_CONEXION_CONTACTO_Y_PRESENCIA.md`
  - guia ATG de integracion para dialogo de conexion, persistencia de correo en tabla dedicada y boton de visitas conectadas
  - separa contacto operativo (correo) de analitica de presencia (`join/heartbeat/leave/count`)
- `hub-sport-lsk/presence/wrangler.toml.example`
  - plantilla de Worker + Durable Object + D1 separada por entornos
- `hub-sport-lsk/presence/schema.sql`
  - tabla minima de tracking `presence_visits`
- `../tools/presence-contact-layer/ATG_HAPPY_PATH_PRESENCE_CONTACT_LAYER.md`
  - capa reusable para otros proyectos/chats con parametros de entrada/salida
  - define almacenamiento por proceso: presencia, contacto y trazabilidad transaccional
