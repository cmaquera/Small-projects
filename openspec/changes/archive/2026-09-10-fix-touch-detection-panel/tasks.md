## 1. Panel de datos contenido

- [x] 1.1 Sustituir en `Touch-detection-browser/js/app.js` la fórmula de `altoPanel` (`20 + 16 * Math.max(activos, 1) + 8`) por `12 + 26 + 8 + 16 * activos + 10`, y verificar con `node --check` que la sintaxis es válida y que con 1 dedo el borde inferior del recuadro queda por debajo de la primera fila de datos (baseline `py0 + 48`)
- [x] 1.2 Verificar que `py0` sigue anclado al fondo con `Math.max(H - altoPanel - 16, 150)` y que al crecer `altoPanel` con varios dedos el panel no invade la leyenda superior ni se sale por la parte inferior de la ventana

## 2. Verificación de contenido por número de dedos

- [x] 2.1 Abrir `Touch-detection-browser/index.html` con el ratón (escritorio) y verificar que con 0 dedos el panel muestra "Toques: 0" sin filas y sin desbordamiento, y que con el ratón pulsado la única fila de datos queda dentro del recuadro
- [x] 2.2 Verificar en un dispositivo táctil (o con emulación multi-touch) que con 2 o más dedos activos todas las filas de datos quedan dentro del recuadro y cada fila conserva el color de su dedo
- [x] 2.3 Verificar que el resto del lienzo (cuadrícula, ejes centrales, crosshairs por dedo, puntos y leyenda "Toca la pantalla...") se dibuja igual que antes del cambio