## Why

En `Touch-detection-browser`, el panel inferior que muestra los datos de cada dedo (X, Y y porcentajes) se dibuja más bajo de lo que su altura permite: la línea de datos queda fuera del recuadro oscuro con borde verde, solapándose visualmente con la cuadrícula y los círculos del lienzo. Con varios dedos activos el desbordamiento crece, porque la altura del panel no depende del número real de filas de datos.

## What Changes

- **Panel de datos contenido**: el recuadro oscuro del panel se dimensiona para cubrir la fila de título "Toques: N" y todas las filas de datos de dedos activos, de modo que ninguna fila quede fuera del borde
- **Altura calculada a partir del contenido**: la altura del panel se deriva del número de dedos activos y de la posición de la última fila, en lugar de un valor fijo corto
- **Sin regresión en el resto del lienzo**: se conservan la cuadrícula, los ejes centrales, los crosshairs por dedo y el dibujo de los puntos; solo cambia el cálculo del recuadro del panel de datos

## Capabilities

### New Capabilities
- `touch-detection`: Comportamiento y presentación del proyecto Touch Detection Browser: detección multi-táctil con mouse y dedos, visualización de coordenadas y porcentajes por dedo en un panel legible, y contenido del panel siempre contenido dentro de su recuadro

### Modified Capabilities
Ninguna

## Impact

- Archivos afectados:
  - `Touch-detection-browser/js/app.js`: ajuste del cálculo de `altoPanel` (y, si hace falta, de la posición de inicio `py0`) en `pintar()` para que el recuadro abarque título + filas de datos
- Sin paso de compilación; la página se abre con `file://` y usa `../shared.css` y `js/app.js` relativos
- Fuera de alcance: rediseñar la estética del lienzo, cambiar el sistema de color, ni modificar otros proyectos del archivo