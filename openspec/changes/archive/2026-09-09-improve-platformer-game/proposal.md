## Why

El mini juego `Platformer-game-phaser` presenta un lienzo fijo de 500x210 px con controles poco claros, un HUD de texto crudo dentro del lienzo y una jugabilidad que no se siente pulida. Además, el jugador no salta de forma fiable: la detección de salto depende de un estado de suelo frágil y no siempre responde al pulsar el control, lo que hace el juego frustrante tanto en escritorio como en móvil.

## What Changes

- **Salto fiable**: el jugador salta siempre que se pulsa el botón de salto estando en el suelo o dentro de una ventana corta tras abandonarlo (coyote time), con buffer de pulsación para que el salto no se pierda si se pulsa justo antes de aterrizar
- **Interfaz más clara y atractiva**: HUD con marcador, monedas y estado de partida presentado de forma legible y consistente con `shared.css` (fondo oscuro, acentos verdes, tipografía monoespaciada)
- **Controles mejorados**: botones táctiles y de teclado con etiquetas claras, tamaño adecuado para móvil y sin solapamientos
- **Lienzo responsivo**: el área de juego se escala al ancho disponible sin cortar el nivel, manteniendo la relación de aspecto
- **Presentación visual del juego**: marco y paneles del juego alineados con el sistema de diseño compartido del repositorio (cabecera, pie, botones verdes)
- **Estado de partida claro**: indicación visible de victoria (recoger todas las monedas) y de muerte/reinicio, sin mensajes confusos

## Capabilities

### New Capabilities
- `platformer-game`: Comportamiento y presentación del mini juego Platformer con Phaser: salto fiable del jugador (coyote time y buffer de pulsación), movimiento horizontal, recogida de monedas, enemigos patrullando, estado de victoria/reinicio y una interfaz legible y responsiva alineada con `shared.css`

### Modified Capabilities
Ninguna

## Impact

- Archivos afectados:
  - `Platformer-game-phaser/index.html`: reescritura de la interfaz, el HUD, los controles y la lógica de salto (Phaser v2.6.2, Canvas renderer)
  - `Platformer-game-phaser/phaser.min.js`: sin cambios (se mantiene Phaser v2.6.2)
  - `Platformer-game-phaser/assets/*.png`: sin cambios (sprites actuales: player, wall, coin, enemy)
- Sin paso de compilación; la página se abre directamente con `file://` y usa rutas relativas (`../shared.css`, `assets/`)
- Fuera de alcance: cambiar el motor (no migrar a Phaser 3), rediseñar el nivel, ni modificar otros proyectos del archivo