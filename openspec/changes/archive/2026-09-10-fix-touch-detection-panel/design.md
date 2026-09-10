## Context

See proposal.md - Why. Estado actual relevante en `Touch-detection-browser/js/app.js` (`pintar()`):
- El panel se dibuja en la esquina inferior izquierda con `x = 16`, `anchoPanel = Math.min(360, W - 32)`.
- Altura actual: `altoPanel = 20 + 16 * Math.max(activos, 1) + 8` → 44 px con 1 dedo, 60 px con 2, etc.
- Contenido: título "Toques: N" con baseline en `py0 + 26` (fuente 18 px), y las filas de datos comienzan en baseline `py0 + 48` (fuente 13 px), incrementando 16 px por fila.
- Con 1 dedo el borde inferior del recuadro está en `py0 + 44`, pero la primera fila tiene su baseline en `py0 + 48` → queda fuera del recuadro. Con más dedos el desbordamiento se acumula.
- `py0 = Math.max(H - altoPanel - 16, 150)`: ancla el panel al fondo de la ventana, con un mínimo de 150 px para no tapar la leyenda superior.

## Goals / Non-Goals

**Goals:**
- Que el recuadro del panel contenga siempre título + todas las filas de dedos activos
- Altura calculada a partir del contenido real (número de dedos activos), no de una constante corta
- Que el panel siga anclado al fondo y no invada la leyenda superior ni los controles del marco
- Sin cambiar la estética ni el resto del dibujo del lienzo

**Non-Goals:**
- Rediseñar el lienzo, la paleta o la tipografía
- Cambiar la detección multi-táctil ni el mapeo de coordenadas
- Modificar `shared.css` ni otros proyectos

## Decisions

**Altura derivada del contenido** — Reemplazar la fórmula fija por una que cuente filas reales:
```
altoPanel = 12 (margen superior) + 26 (título) + 8 (separación) + 16 * activos (filas) + 10 (margen inferior)
```
Alternativa considerada: `altoPanel = (48 + 16 * (activos - 1)) - 8` → casi idéntica; se descarta por ser menos legible. La fórmula elegida hace explícitas las tres zonas (título, filas, márgenes) y se mantiene estable con 0, 1 o varios dedos. Con `activos = 0` produce `12 + 26 + 8 + 0 + 10 = 56`, recuadro que solo contiene el título "Toques: 0".

**Baselines coherentes con la altura** — Se mantienen los baselines actuales (`py0 + 26` título, `py0 + 48` primera fila, +16 por fila) para no tocar el dibujo del texto; solo cambia el alto del recuadro. Verificación: la última fila (baseline `py0 + 48 + 16 * (activos - 1)`) debe quedar por encima del borde inferior (`py0 + altoPanel - 2` de trazo). Con la fórmula: para `activos` filas, `48 + 16*(activos-1) <= 56 + 16*activos - 10` → `32 <= 46`, siempre cierto.

**Anclaje inferior preservado** — Se conserva `py0 = Math.max(H - altoPanel - 16, 150)`. Como `altoPanel` ahora crece con los dedos, el panel sube lo necesario para no desbordar el borde inferior de la ventana; el mínimo de 150 px evita que tape la leyenda "Toca la pantalla..." en ventanas bajas. Alternativa considerada: panel anclado en la parte superior bajo la cabecera → descartada, alejaría el panel del área de uso y complicaría el cálculo de `py0`.

## Risks / Trade-offs

- [Panel más alto que la ventana con muchos dedos] → En pantallas de móvil con 5-6 dedos el panel puede quedar alto pero `py0` se mantiene ≥ 150 y el borde superior nunca sobrepasa la ventana (el desbordamiento, si ocurriera, sería contenido); se valida con la verificación visual de la tarea
- [Cambiar la altura altera ligeramente la posición del panel al añadir/quitar dedos] → Comportamiento esperado: el recuadro se adapta al contenido; no es una regresión
- [Regresión en el dibujo del texto] → Los baselines no cambian; solo cambia `altoPanel`. Reversión por archivo con git

## Migration Plan

1. Sustituir el cálculo de `altoPanel` por la fórmula derivada del contenido
2. Abrir la página y verificar con 0, 1 y varios dedos que el panel contiene título y filas dentro del recuadro
3. Verificar en escritorio (ratón) y móvil (dedos) que el resto del lienzo (cuadrícula, crosshairs, puntos) no cambia
Reversión: `git revert` o restauración de `Touch-detection-browser/js/app.js`.

## Open Questions

Ninguna.