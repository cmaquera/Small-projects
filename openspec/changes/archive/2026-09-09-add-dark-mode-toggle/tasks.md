## 1. CSS del tema

- [x] 1.1 Reemplazar los colores claros fijos del `<style>` de la página principal por variables CSS en `:root`, y verificar que la página se ve idéntica en modo claro
- [x] 1.2 Añadir un bloque de anulación `[data-theme="dark"]` con valores oscuros para el fondo del cuerpo, el texto, el fondo de las tarjetas, los bordes y la sombra al pasar el ratón, y verificar que el tema oscuro cubre esas superficies sin paso de compilación

## 2. Interruptor y persistencia

- [x] 2.1 Añadir un botón visible de cambio de tema en el encabezado que alterne entre claro y oscuro, y verificar que al hacer clic cambia los colores de la página en ambos sentidos
- [x] 2.2 Guardar el tema elegido en `localStorage`, restaurarlo al cargar la página (claro por defecto cuando no hay valor, restaurando antes de que se rendericen las tarjetas de proyectos para evitar un parpadeo claro), y verificar que el tema sobrevive a una recarga