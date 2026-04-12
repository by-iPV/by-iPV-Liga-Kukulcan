# QA Reflow Checklist v0.1

Objetivo:
- confirmar estabilidad visual sostenida en `hub-sport-lsk` sin saltos de layout perceptibles.

## Preparacion

1. Abrir `hub-sport-lsk/index.html` en navegador desktop.
2. Asegurar zoom en `90%`, `100%` y `110%`.
3. Mantener una sesion de prueba de al menos `10 minutos`.
4. Probar con y sin login Google activo.

## Escenarios obligatorios

1. Carga inicial:
- validar que `hero`, `resumen rapido`, `patrocinadores` e `inscritos` no cambian alto abruptamente.

2. Rotacion viva:
- observar `Seccion A` y `Seccion B` durante 5 minutos.
- criterio: no brincos verticales de tarjetas ni cambio de altura del contenedor.

3. Cambio de perfil origen:
- alternar entre `Catalogo general` y correos del selector.
- criterio: el layout se mantiene estable.

4. Sidebar:
- colapsar/expandir 10 veces.
- criterio: sin solapamientos, sin saltos de scroll.

5. Resize de ventana:
- desktop ancho -> mediano -> movil -> desktop.
- criterio: no desborde horizontal, sin parpadeo de bloques.

6. Pestaña en segundo plano:
- ocultar pestaña 1 minuto y volver.
- criterio: la rotacion se reanuda sin salto agresivo.

## Evidencia minima

- 3 capturas:
  - estado inicial
  - rotacion activa tras 5 min
  - retorno de pestaña en segundo plano
- nota corta de resultados por escenario (`OK` / `Pendiente`).

## Criterio de aprobado

- todos los escenarios en `OK`
- sin reflow severo reportado visualmente
- sin error de JS en consola relacionado con render/rotacion
