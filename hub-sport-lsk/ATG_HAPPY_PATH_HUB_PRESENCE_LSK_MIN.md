# Documento Tecnico Minimo
## Hub Sport LSK Ultra Light - Presencia informativa discreta

**Trazabilidad oficial**
- Release: `REL-HUB-01`
- Actividad: `A16`
- Etiqueta nueva: `[REL-HUB-01][A16][NEW] Contador de participantes conectados`
- Etiqueta aprobada: `[REL-HUB-01][A16.0.1][NEW] Contador de participantes conectados`
- Etiqueta liberada: `[REL-HUB-01][A16] Contador de participantes conectados`

---

## 1) Proposito funcional minimo

Agregar un contador informativo discreto del tipo:

- `Participantes conectados: N`

para mostrar **visitas activas en la pagina** dentro de `Hub Sport LSK Ultra Light`.

Este contador:
- **si aporta** una señal de actividad viva del hub
- **no representa** equipos autenticados
- **no representa** pagos, inscripciones ni presencia nominal de personas concretas

Interpretacion correcta:
- `Participantes conectados` = `visitas activas en la pagina`

---

## 2) Donde suma mejor dentro de esta version

En `Hub Sport LSK Ultra Light` el contador encaja bien en estas superficies:

### A. Hero superior
Uso recomendado:
- como microindicador de actividad en la cabecera principal

Ventaja:
- visible desde la primera carga
- refuerza la sensacion de movimiento real del hub

### B. Resumen rapido
Uso recomendado:
- como una cuarta tarjeta o KPI pequeño junto a:
  - `Pre-inscritos`
  - `Inscritos`
  - `Categorias activas`

Ventaja:
- mantiene coherencia con los indicadores ya presentes
- no compite visualmente con las tarjetas de equipos

### C. Pill discreta de estado
Uso recomendado:
- como una pill secundaria en `hero` o `Seccion A`

Ventaja:
- maxima discrecion
- adecuada si se quiere una capa muy ligera de presencia

---

## 3) Que si haria esta funcionalidad

- contar sesiones activas en la pagina
- reflejar un numero cercano a tiempo real
- actualizarse sin recargar
- degradarse con elegancia si el servicio falla

No haria:
- chat
- lista de usuarios
- nombres de equipos conectados
- autenticacion social
- mensajeria entre participantes

---

## 4) Donde conviene implementarlo en esta variante encapsulada

El documento general de presencia minima fue redactado para la app base, pero en esta variante la implementacion correcta debe vivir en:

- `hub-sport-lsk/index.html`
- `hub-sport-lsk/app.js`
- `hub-sport-lsk/config.js` o configuracion local inline equivalente

### Ajuste de arquitectura para esta version

En `Hub Sport LSK Ultra Light`:
- el nodo visual del contador debe estar dentro del layout encapsulado de esta variante
- la logica cliente de presencia debe vivir en `hub-sport-lsk/app.js`
- la configuracion de endpoint, `roomId`, intervalos y degradacion debe pertenecer a esta variante, no a la app operativa principal

Esto evita:
- contaminar `Matchmaking` productivo
- mezclar presencia de una SPA operativa con presencia de un hub promocional
- acoplar la prueba de presencia a una base funcional distinta

---

## 5) Arquitectura minima recomendada para Hub Sport LSK

### Frontend encapsulado
- `hub-sport-lsk/index.html`
  - contenedor visual del contador
- `hub-sport-lsk/app.js`
  - `join`
  - `heartbeat`
  - `count`
  - `leave` best effort
- `hub-sport-lsk/config.js` o bloque local equivalente
  - `endpointBase`
  - `roomId`
  - `heartbeatMs`
  - `staleTtlMs`
  - `countRefreshMs`

### Backend minimo sugerido
- Cloudflare Worker
- Durable Object

### Endpoints esperados
- `POST /presence/join`
- `POST /presence/heartbeat`
- `POST /presence/leave`
- `GET /presence/count?roomId=...`

---

## 6) Room recomendado para esta version

La recomendacion minima para este proyecto es usar un `roomId` propio del hub, por ejemplo:

- `hub-sport-lsk-global`

Versiones posteriores podrian usar:
- `hub-sport-lsk-evento-x`
- `hub-sport-lsk-categoria-prepa-fem`

Pero para el MVP conviene una sola sala global.

---

## 7) Degradacion elegante obligatoria

Si el endpoint de presencia falla:
- mostrar `Participantes conectados: --`
- no romper el resto del hub
- no bloquear rotaciones de categorias ni logos
- registrar warning no intrusivo en consola
- reintentar con backoff simple

---

## 8) Criterio de producto

En esta variante el contador debe presentarse como:

- una señal de actividad del hub
- no como presencia autenticada
- no como validacion de equipo inscrito

Texto recomendado:
- `Participantes conectados`

Texto alterno si se requiere mas claridad:
- `Visitas activas`

---

## 9) Recomendacion de implementacion

Para esta etapa conviene:

1. **documentar** la adaptacion especifica al hub encapsulado
2. **no implementarlo aun** en este chat
3. continuar primero con:
   - pulido visual
   - afinacion del matching `Pre-inscrito -> Inscrito`
   - preparacion del salto a GitHub

Despues, la presencia minima puede entrar como una iteracion controlada:

- `[REL-HUB-01][A16.0.1][NEW] Contador de participantes conectados`

---

## 10) Resultado esperado cuando se implemente

- la UI muestra un indicador discreto de actividad viva
- el hub sigue siendo ligero
- no se introduce complejidad social innecesaria
- la funcionalidad permanece encapsulada y desacoplada de Matchmaking productivo
