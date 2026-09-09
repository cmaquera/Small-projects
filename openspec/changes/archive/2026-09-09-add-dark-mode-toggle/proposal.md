## Por qué

La página principal (`index.html` en la raíz del repositorio) es el punto de entrada al archivo y puede consultarse por la noche o en pantallas de alto contraste. Actualmente solo tiene una paleta de colores clara, sin forma de cambiar a un tema oscuro. Un interruptor de modo oscuro hace que la página sea más cómoda en condiciones de poca luz.

## Qué cambia

- Agregar un control de cambio de tema en el encabezado de la página principal
- Agregar una paleta de colores oscura que cubra el fondo de la página, el texto, las tarjetas y los bordes
- Guardar la elección del tema para que la próxima visita abra en el mismo modo

## Capacidades

### Capacidades nuevas

Ninguna

### Capacidades modificadas

- `project-index`: Añade soporte de modo oscuro a la página principal — un control de cambio de tema, una paleta de colores oscura y la persistencia del tema elegido

## Impacto

- Archivo editado: `index.html` de la raíz (página principal) — tema CSS, interruptor del encabezado y lógica del interruptor
- No cambia ninguna carpeta de mini proyecto ni sus archivos
- Sin paso de compilación; la página sigue siendo HTML/CSS/JS estático autocontenido