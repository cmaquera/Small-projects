## Contexto

Ver proposal.md - Por qué. Estado actual relevante:
- 3 proyectos (Box2D-esferas, Ford-fulkerson, Motion-detection-browser) comparten una copia idéntica de `css/style.css` con la plantilla verde «CMaquera», duplicada y con errores: `@import url('https://font.googleapis.com/...')` (falta la «s»), un selector `*` huérfano y `box-sizing` mal aplicado.
- Los otros 6 proyectos del índice no usan esa plantilla (páginas por defecto, lienzos con estilos propios).
- Las páginas se abren directamente con `file://` (sin servidor), por lo que los enlaces deben ser rutas relativas.
- `index.html` de la raíz es autocontenido (estilos en línea) y NO entra en la homologación; mantiene su diseño moderno con interruptor claro/oscuro.

## Objetivos / No objetivos

**Objetivos:**
- Una única fuente del diseño común (hoja de estilos en la raíz) para los 9 proyectos del índice
- Base visual unificada «verde CMaquera»: fondo `#0D0D0D`, acentos `#16F24D`, tipografía monoespaciada
- Marco común por proyecto: cabecera con título y enlace «volver al índice», pie de autor
- Corregir los errores heredados de la plantilla (URL de la fuente, selectores rotos)
- Que funcione abriendo cada página desde el disco, igual que ahora

**No objetivos:**
- Tocar el `index.html` de la raíz (conserva su propio estilo y el modo oscuro)
- Homologar las páginas secundarias internas (p. ej. `one.html`/`many.html` de Motion-detection-browser)
- Homologar los proyectos que ya no están en el índice (Database-game, Multiplayer-shoot-game, Streaming-Socket.io)
- Crear un sistema de temas claro/oscuro para los proyectos (la plantilla es fija)
- Refactorizar la lógica (JS/funcionalidad) de cada proyecto

## Decisiones

**Hoja compartida en la raíz (`shared.css`)** — Una única hoja en `C:\Users\cmaqu\workspace\Small-projects\shared.css`; cada página la enlaza con `<link rel="stylesheet" href="../shared.css">`. Motivo: una sola fuente de verdad, en vez de 3 copias duplicadas que ya se desincronizaron (una tenía extras de Ford-fulkerson). Alternativa considerada: mantener una copia por carpeta — rechazada, duplica el problema actual. La ruta relativa `../` funciona igual en `file://` y con un servidor.

**`shared.css` = plantilla verde corregida + marco** — Contiene la base de la plantilla (fondo, color, tipografía vía `fonts.googleapis.com` corregido con fallback `monospace`, `h1` centrado, botones `.btn`, `.contenedor`/`.contenido`) más los estilos del marco nuevo (`.site-header`, `.back-link`, `.site-footer`). Se eliminan los errores conocidos: URL de la fuente, selector `*` huérfano y `box-sizing` mal formado.

**Marcado estándar por página** — Cada proyecto adopta la misma estructura:
```html
<link rel="stylesheet" href="../shared.css">
...
<header class="site-header">
  <a class="back-link" href="../index.html">← Volver al índice</a>
  <h1>Nombre del proyecto</h1>
</header>
...contenido original...
<footer class="site-footer">Creado por <a href="https://github.com/cmaquera">CMaquera</a></footer>
```
El enlace de vuelta apunta a `../index.html`. El pie existente `.footer` de los 3 proyectos verdes se sustituye por `.site-footer` definido en la hoja compartida.

**Estilos funcionales por proyecto, por encima de la hoja compartida** — La hoja compartida es la base; cada proyecto conserva lo que necesita funcionar:
- Ford-fulkerson: reglas específicas (formularios `#formulario0-2`, `#micanvas`, `#actualizar`) se mantienen en un bloque `<style>` local del propio `index.html` (y se borra su `css/style.css`).
- Formularios-PHP-Ajax: conserva su `estilo.css` local (tarjetas y botones propios); el cuerpo hereda la base compartida.
- Canvas de pantalla completa (Graphs-particles, Particulas-JS, Touch): el lienzo sigue `position: fixed` cubriendo la ventana; la cabecera y el pie se colocan por encima con `z-index` y un fondo semitransparente para seguir siendo legibles.
- Platformer (Phaser) y Mose, Streaming no aplica (fuera de índice): solo añaden la base y el marco.

## Riesgos / Compromisos

- [Lienzo fijo tapa cabecera/pie] → `.site-header` y `.site-footer` con `position: relative; z-index: 10;` y fondo semitransparente; verificación visual por proyecto.
- [Eliminar `css/style.css` local rompe la página si el enlace a `../shared.css` falla] → por proyecto: añadir enlace y marco primero, verificar, y luego borrar la copia local; reversión por archivo con git.
- [Carga de la fuente Google sin conexión] → la plantilla ya dependía de ella; se mantiene con fallback `monospace`, sin regresión.
- [Formularios-PHP-Ajax con estilos propios (tarjetas centradas absolutas)] → se conserva `estilo.css` intacto; solo cambia la base del cuerpo.

## Plan de migración

1. Crear `shared.css` en la raíz con la base corregida y el marco.
2. Migrar los 3 proyectos verdes: enlazar `../shared.css`, mover sus reglas específicas a un `<style>` local, añadir marco, borrar `css/style.css` local.
3. Migrar los 6 restantes: enlazar `../shared.css` y añadir el marco, conservando estilos funcionales.
4. Verificar cada uno de los 9 (diseño unificado, enlace de vuelta al índice, controles operativos).
Reversión: `git revert` de los cambios del cambio o restauración de los archivos individuales.

## Preguntas abiertas

Ninguna.