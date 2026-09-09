## Por qué

Cada mini proyecto tiene un aspecto totalmente distinto: solo 3 comparten la plantilla verde "CMaquera" (copiada y duplicada en cada carpeta, con errores tipográficos incluidos), 2 usan lienzos oscuros con estilos propios y el resto son páginas por defecto sin estilos ni navegación. Al entrar desde el índice, cada proyecto se siente como un archivo distinto y no hay forma consistente de volver al índice. Homologar el diseño de los 9 proyectos listados da cohesión al archivo y mejora la navegación.

## Qué cambia

- Crear una hoja de estilos compartida en la raíz del repositorio con la plantilla verde "CMaquera" (fondo `#0D0D0D`, acentos `#16F24D`, tipografía monoespaciada), corrigiendo sus errores
- Aplicarla a todos los proyectos listados en el índice: Box2D-esferas, Ford-fulkerson, Formularios-PHP-Ajax, Graphs-particles, Mose-detection-browser, Motion-detection-browser, Particulas-JS, Platformer-game-phaser y Touch-detection-browser
- Añadir un marco común a cada página: cabecera con el título del proyecto y un enlace «volver al índice», y el pie «Creado por CMaquera»
- Sustituir las 3 copias locales de `css/style.css` por la hoja compartida, conservando los estilos funcionales propios de cada proyecto

## Capacidades

### Capacidades nuevas

- `project-design-system`: Sistema de diseño compartido para las páginas de los mini proyectos: hoja de estilos única, cabecera con título y enlace de vuelta al índice, y pie de autor

### Capacidades modificadas

Ninguna

## Impacto

- Archivos afectados:
  - Nuevo: `shared.css` en la raíz del repositorio (única fuente del diseño común)
  - Los 9 `index.html` de los proyectos listados en el índice (cabecera, enlace al CSS compartido, pie)
  - Eliminadas: las 3 copias locales de `css/style.css` (Box2D-esferas, Ford-fulkerson, Motion-detection-browser) absorbidas por `shared.css`; se conservan los estilos específicos tipo formularios/lienzo donde existan
- Fuera de alcance: `index.html` de la raíz (mantiene su diseño moderno con modo oscuro), las páginas secundarias internas (p. ej. `one.html`/`many.html` de Motion-detection) y los proyectos que no están en el índice (Database-game, Multiplayer-shoot-game, Streaming-Socket.io)
- Sin paso de compilación; todo sigue siendo HTML/CSS estático y relativo a `file://`