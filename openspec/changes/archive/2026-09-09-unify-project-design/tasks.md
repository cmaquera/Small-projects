## 1. Hoja de estilos compartida

- [x] 1.1 Crear `shared.css` en la raíz del repositorio con la base «verde CMaquera» corregida (fondo `#0D0D0D`, acentos `#16F24D`, tipografía monoespaciada con `fonts.googleapis.com` arreglado, `h1` centrado, `.btn`, `.contenedor`/`.contenido`) y el marco (`.site-header`, `.back-link`, `.site-footer`), y verificar que al abrir una página de prueba enlazada a `../shared.css` se renderiza el fondo, el color y la tipografía esperados

## 2. Migrar los proyectos que ya usan la plantilla verde

- [x] 2.1 Migrar Box2D-esferas: enlazar `../shared.css`, añadir cabecera con título y «volver al índice» y pie de autor, y eliminar su `css/style.css` local; verificar que la página mantiene el aspecto verde, el enlace vuelve al índice y el experimento sigue funcionando
- [x] 2.2 Migrar Ford-fulkerson: enlazar `../shared.css`, añadir el marco común, conservar sus reglas específicas (formularios, lienzo, botón de actualizar) en un `<style>` local y eliminar su `css/style.css`; verificar que los formularios, el lienzo y el botón siguen operativos
- [x] 2.3 Migrar Motion-detection-browser: enlazar `../shared.css` y añadir el marco común a su `index.html` (página vacía/sin script); verificar que muestra la base verde con cabecera y pie

## 3. Migrar los proyectos sin plantilla

- [x] 3.1 Migrar Formularios-PHP-Ajax: enlazar `../shared.css`, añadir el marco común y conservar su `estilo.css` local; verificar que las tarjetas de formularios siguen visibles y funcionales sobre la base compartida
- [x] 3.2 Migrar Graphs-particles: enlazar `../shared.css` y añadir el marco común; verificar que la cabecera y el pie son legibles por encima del lienzo fijo de pantalla completa y que la animación sigue correcta
- [x] 3.3 Migrar Mose-detection-browser: enlazar `../shared.css` y añadir el marco común; verificar que el lienzo de detección sigue funcionando con el título correcto
- [x] 3.4 Migrar Particulas-JS: enlazar `../shared.css` y añadir el marco común; verificar que la cabecera y el pie son legibles por encima del lienzo fijo y que la emisión de partículas sigue operativa
- [x] 3.5 Migrar Platformer-game-phaser: enlazar `../shared.css` y añadir el marco común; verificar que el juego de Phaser sigue renderizándose y jugable con el marco visible
- [x] 3.6 Migrar Touch-detection-browser: enlazar `../shared.css` y añadir el marco común; verificar que el lienzo táctil sigue funcionando con cabecera y pie visibles

## 4. Verificación final

- [x] 4.1 Abrir los 9 proyectos desde el índice y verificar en cada uno: base visual unificada (fondo, color y tipografía verdes), cabecera con título y enlace que vuelve a `../index.html`, pie de autor «CMaquera», y que no queda ninguna copia local de la plantilla base duplicada en las carpetas de los proyectos migrados