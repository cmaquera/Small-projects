## Contexto

Ver proposal.md - Por qué. La página principal es un único `index.html` autocontenido en la raíz del repositorio con el CSS y el JS dentro del propio archivo (creado por el cambio archivado `js-mini-projects-index`). No tiene paso de compilación. Los estilos actuales usan colores claros fijos en todas partes (fondo de la página, texto, fondo de las tarjetas, bordes).

## Objetivos / No objetivos

**Objetivos:**
- Tema oscuro aplicado a las mismas superficies que el tema claro (fondo, texto, tarjetas, bordes)
- Un interruptor claro y accesible en el encabezado
- La elección del tema sobrevive a recargas y visitas futuras
- Mantener la página autocontenida — sin librerías externas ni paso de compilación

**No objetivos:**
- Modos oscuros por proyecto (solo la página de índice lleva el interruptor)
- Seguir automáticamente el `prefers-color-scheme` del sistema operativo — el valor por defecto es claro y solo un cambio explícito lo modifica
- Animaciones llamativas o sistemas de temas complejos

## Decisiones

**Variables CSS para los colores** — Cambiar los colores claros fijos por variables `--*` en `:root`, y definir un bloque de anulación oscuro (p. ej. `[data-theme="dark"]`) que las vuelve a declarar. Motivo: todos los cambios de tema viven en un solo lugar y las tarjetas, el cuerpo y el texto se actualizan juntos sin editar regla por regla. Alternativa (una clase en el cuerpo como `.dark` con anulaciones `body.dark .card`) funciona, pero reparte los valores oscuros entre muchos selectores — menos mantenible para una página pequeña.

**`data-theme` en `<html>` + `localStorage` para guardar la elección** — El interruptor define `document.documentElement.dataset.theme = "dark"|"light"` y guarda el tema elegido bajo la clave `theme` en `localStorage`. Al cargar, la página lee el valor guardado; si no existe, usa claro. Motivo: `localStorage` es síncrono y fiable para una página estática única, y el selector `[data-theme="dark"]` mantiene legible el CSS. Alternativa (sessionStorage) no persistiría entre visitas — contradice la especificación.

**Control en el encabezado** — Un botón pequeño en el encabezado (junto al `h1`/descripción) que muestra el tema actual (p. ej. "Oscuro" cuando se está en modo claro). Motivo: la ubicación en el encabezado coincide con la especificación («control visible en el encabezado») y es el lugar convencional.

**Sin parpadeo del tema claro** — El script que restaura el tema corre inmediatamente al inicio del bloque `<script>`, antes de que se rendericen las tarjetas de proyectos, para que un usuario de modo oscuro no vea un parpadeo claro. Mínimo; no hace falta un script dedicado al inicio del `<head>` porque la página es diminuta.

## Riesgos / Compromisos

- **`localStorage` no disponible (file:// en algunos navegadores / modos de privacidad estrictos)** → vuelve al tema claro en cada visita; aceptable y degrada con elegancia.
- **Contraste de la sombra de las tarjetas al pasar el ratón en modo oscuro** → el tema oscuro usa una sombra más fuerte; verificado visualmente en la implementación.
- **`style` en línea actual vs. variables** → todos los colores están en un único bloque `<style>`, así que convertirlos a variables es de bajo riesgo y está contenido.

## Plan de migración

Edición de un solo archivo `index.html`: definir las variables de color, añadir las anulaciones oscuras, añadir el interruptor del encabezado y añadir la lógica de carga/interruptor. Reversión: revertir el único archivo con git.

## Preguntas abiertas

Ninguna.