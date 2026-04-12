# Handoff Tecnico — Hub Sport LSK Ultra Light

## 1. Resumen ejecutivo

`Hub Sport LSK Ultra Light` es una variante encapsulada, promocional y reusable del ecosistema Matchmaking. Su objetivo no es operar la liga completa, sino presentar visualmente equipos, categorias, logos y estados de captacion (`Pre-inscrito` / `Inscrito`) sobre una experiencia premium, desacoplada de la app operativa principal.

El proyecto ya cuenta con una base funcional visible, una capa de datos minima consolidada para demos y una direccion tecnica clara para la siguiente fase: estabilizacion visual, afinacion del matching `Pre-inscrito -> Inscrito`, integracion controlada de presencia y preparacion de la base `v0.1` para GitHub.

## 2. Estado actual del proyecto

### 2.1 Alcance funcional ya implementado

- variante encapsulada en:
  - `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\`
- hero superior con lenguaje visual alineado a Matchmaking
- banda superior con:
  - patrocinadores
  - hero principal
  - equipos inscritos
  - resumen rapido
- barra lateral izquierda base para futuras opciones de menu
- carga de fondos visuales con preferencia por imagen concreta:
  - `Remate_Formulario_Balon_LSK.png`
- slider de opacidad visual con persistencia local
- selector de perfil origen para pruebas funcionales
- lectura de correo origen desde querystring / perfil local de prueba
- `Seccion A` priorizada por correo/categorias origen
- `Seccion B` promocional con rotacion del resto del catalogo
- mapeo de categorias deportivas hacia taxonomia LSK
- uso de logos reales identificados en categorias conciliadas
- etiquetado visual de estado:
  - `Pre-inscrito`
  - `Inscrito`
- conciliacion basica entre registros fuente de pre-inscripcion e inscripcion
- integracion de conexion Google tipo GIS en la variante encapsulada
- indicador visual de sesion conectada con icono `G`
- tooltip contextual con correo conectado y accion de cierre de sesion

### 2.2 Funcionalidades nuevas y estrategicas

#### Presence Contact Layer (PCL)

Se diseño y trazó una capa reusable de presencia y contacto para reutilizarse en otros chats/proyectos:

- `c:\2026\ipv-matchmaking\tools\presence-contact-layer\pcl-client.js`
- `c:\2026\ipv-matchmaking\tools\presence-contact-layer\ATG_HAPPY_PATH_PRESENCE_CONTACT_LAYER.md`
- `c:\2026\ipv-matchmaking\tools\presence-contact-layer\schema.sql`
- `c:\2026\ipv-matchmaking\tools\presence-contact-layer\README.md`

Su proposito es separar formalmente:

- presencia/analitica de visitas activas
- contacto/correo/consentimiento
- trazabilidad transaccional por proceso de negocio

Esto es relevante porque evita mezclar, desde el origen, cuatro planos distintos:

- autenticacion
- presencia en pagina
- contacto operativo
- procesos de negocio como pre-registro, registro o partidos

La siguiente iteracion sugerida para LSK es:

- `[REL-HUB-01][A16.0.1][NEW]`

y su semantica UX ya quedo definida:

- `Participantes conectados = visitas activas en pagina`
- no significa equipos autenticados
- no significa estatus `Pre-inscrito` / `Inscrito`

## 3. Arquitectura y archivos clave

### 3.1 Worktree activa

- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight`

### 3.2 Aplicacion encapsulada

- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\index.html`
- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\app.js`
- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\config.js`
- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\styles.css`

### 3.3 Bitacora de esta worktree

- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\SESSION_LOG.md`

### 3.4 Documentacion tecnica ya disponible

- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\README.md`
- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\ATG_HAPPY_PATH_HUB_PRESENCE_LSK_MIN.md`
- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\ATG_HAPPY_PATH_DIALOGO_CONEXION_CONTACTO_Y_PRESENCIA.md`
- `c:\2026\ipv-matchmaking\.worktrees\hub-sport-lsk-ultralight\hub-sport-lsk\PRESENCE_CONFIG_LESSONS_REPLICATED.md`
- `c:\2026\ipv-matchmaking\tools\presence-contact-layer\ATG_HAPPY_PATH_PRESENCE_CONTACT_LAYER.md`

## 4. Deuda tecnica pendiente

### 4.1 Visual / UX

- opacidad y traslucidez:
  - el slider ya existe y persiste valor
  - falta calibrar con precision el efecto de glass para acercarlo al hero de Matchmaking original
  - hay indicios de que no solo interviene `opacity`; tambien influyen blur, overlays, brillo/contraste de la imagen y balance del fondo
- compactacion visual:
  - se avanzo hacia una banda superior mas parecida a Matchmaking
  - aun requiere afinacion fina en alturas relativas entre `hero`, `resumen rapido`, `patrocinadores` e `inscritos`
- tooltips y microinteracciones:
  - el tooltip de correo conectado ya existe
  - fue ajustado para convivir con un boton `Salir`
  - requiere validacion fina de hover/transicion para asegurar uso comodo

### 4.2 Estabilidad visual

- redimensionamiento recurrente / reflow:
  - el usuario reporto que algunas tarjetas o bloques cambian de dimension tras cierto tiempo o por activacion de procesos
  - ya se aplicaron mitigaciones CSS:
    - `scrollbar-gutter: stable`
    - min-heights
    - alturas fijas en cards
    - control de overflow
  - sigue siendo deuda tecnica abierta hasta validacion QA sostenida

### 4.3 Google GIS

- la conexion Google ya esta integrada en modo encapsulado
- se observó al menos una vez un error transitorio de Google despues del selector de cuenta
- se detecto antes una posible duplicidad de `prompt()` / render GIS y se simplifico el flujo
- pendiente:
  - revalidar happy path completo
  - confirmar si el error fue transitorio de proveedor o si aun existe un edge case local

### 4.4 Datos / Matching

- la conciliacion `Pre-inscrito -> Inscrito` ya existe a nivel MVP
- falta robustecer:
  - reglas de matching por correo
  - equipo directo inscrito sin preinscripcion
  - multiples categorias por mismo correo
  - multiples logos por mismo registro

### 4.5 Presencia / PCL

- el PCL ya esta diseñado y documentado
- aun no esta integrado visualmente dentro de Hub Sport LSK
- falta:
  - contenedor discreto de presencia
  - cliente activo en `hub-sport-lsk/app.js`
  - configuracion local de endpoint/room
  - validacion graceful degradation

### 4.6 Release engineering

- la base `v0.1` de GitHub aun no esta cortada
- antes del corte conviene cerrar:
  - estabilizacion visual minima
  - reflow recurrente
  - happy path Google
  - decision de integrar o no presencia antes de release base

## 5. Lecciones aprendidas

### 5.1 Producto

- una variante promocional no debe heredar automaticamente toda la complejidad de la app operativa
- reducir transaccionalidad acelera diseño, pruebas y narrativa comercial
- mostrar solo `Pre-inscrito` / `Inscrito` simplifica mucho el mensaje para marketing

### 5.2 Datos

- un mismo correo puede representar multiples categorias
- un equipo puede llegar a `Inscrito` sin pasar por una preinscripcion previa
- los correos de pre-inscripcion e inscripcion pueden diferir (representante/entrenador/administrador distinto)
- la conciliacion visual no debe depender de igualdad estricta de correo entre pestañas
- un registro fuente puede contener multiples logos
- conviene que la categoria visible mande sobre el nombre del archivo de imagen

### 5.3 Frontend

- cuando hay rotaciones automaticas o carouseles, pequeños cambios de contenido pueden disparar reflows molestos
- estabilizar alturas, gutters y clamps desde temprano ahorra mucho retrabajo visual
- para replicar una “traslucidez bonita” no basta mover una sola opacidad; hay que considerar:
  - blur
  - overlay
  - color base
  - contraste del fondo
  - brillo de la imagen usada

### 5.4 Integracion

- Google GIS funciona mejor si el flujo se mantiene unico y claro
- mezclar varios disparadores de prompt/render puede generar fallos ambiguos
- separar presencia, contacto y transaccion de negocio desde la arquitectura evita deuda estructural

## 6. Mejores practicas recomendadas

- mantener `Hub Sport LSK Ultra Light` desacoplado de Matchmaking base
- documentar primero el comportamiento esperado y luego implementar
- usar ATG Happy Path para cualquier integracion sensible
- conservar trazabilidad por release/actividad:
  - `REL-HUB-01 / A16`
  - `[REL-HUB-01][A16.0.1][NEW]`
- introducir cambios pequenos y verificables
- validar UI con la misma imagen de fondo objetivo antes de concluir ajustes finos
- no mezclar en una sola capa:
  - presencia
  - contacto
  - consentimiento
  - negocio
- preferir configuracion local/inline en la variante encapsulada antes que reutilizar configuracion de la app principal

## 7. Estimacion de avance

Estimacion ejecutiva, no contractual:

- base MVP visual/promocional: `75%`
- estructura de datos minima y mapeo de categorias: `78%`
- conciliacion inicial `Pre-inscrito -> Inscrito`: `65%`
- pulido visual fino respecto a Matchmaking: `58%`
- Google GIS en la variante encapsulada: `80%`
- Presence Contact Layer (PCL) reusable: `88%`
- integracion de PCL dentro de LSK: `35%`
- preparacion para GitHub `v0.1`: `45%`

Estimacion global del proyecto `hub-sport-lsk-ultralight` al corte de este handoff:

- `72%`

## 8. Proxima secuencia recomendada

### Prioridad 1

- validar y cerrar redimensionamiento/reflow recurrente
- afinar opacidad/traslucidez con base en la imagen real `Remate_Formulario_Balon_LSK.png`
- terminar ajuste visual de tooltip + boton salir

### Prioridad 2

- revalidar flujo Google completo de inicio/cierre de sesion
- documentar si el error observado vuelve a reproducirse

### Prioridad 3

- integrar `Presence Contact Layer (PCL)` en modo discreto:
  - pill o contador chico
  - semanticamente “visitas activas”
  - sin acoplarlo a autenticacion ni al estado de equipos

### Prioridad 4

- preparar base `v0.1` para GitHub

## 9. Criterio de continuidad

Para continuar correctamente en otro chat:

- leer primero esta entrega
- leer `SESSION_LOG.md`
- leer `hub-sport-lsk/README.md`
- no tocar Matchmaking base salvo instruccion explicita
- trabajar solo dentro de esta worktree encapsulada
- seguir iteraciones pequenas, documentadas y estables

## 10. Entrega/recepcion

Este handoff esta pensado para relevo entre ingenieros senior y deja:

- estado actual
- alcance real implementado
- deuda tecnica abierta
- racional tecnico
- prioridades
- artefactos nuevos de referencia
- ruta clara de continuidad

Enfatizar al nuevo chat que la novedad estructural mas importante no es solo la UI actual, sino la aparicion de una capa reusable formal:

- `Presence Contact Layer (PCL)`

porque habilita una evolucion mas profesional del ecosistema hacia presencia, contacto y trazabilidad sin contaminar la app productiva.
