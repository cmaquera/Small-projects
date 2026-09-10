## Context

See proposal.md - Why. Estado actual relevante:
- El juego es una sola página `Platformer-game-phaser/index.html` con Phaser v2.6.2 (script local `phaser.min.js`), renderer `Phaser.CANVAS`, mundo fijo de 500x210 px, física ARCADE.
- `create()` construye el nivel desde una matriz de caracteres (`x`=pared, `o`=moneda, `!`=enemigo), con `game.physics.arcade.enable()` explícito por sprite y `gravity.y = 700`.
- El HUD actual son tres `game.add.text` crudos (marcador, ayuda, estado) sin fondo; los controles táctiles son botones HTML `<button class="btn btn1">`.
- Ya existe lógica de salto con buffer (200 ms) y coyote (120 ms), pero el jugador reporta que el salto no responde de forma fiable. La causa más probable es el orden de `update()`: la comprobación de suelo usa `onFloor()/blocked/touching` que Phaser 2 resetea en `preUpdate` antes de `state.update()`, por lo que leer el suelo antes de ejecutar las colisiones del mismo frame da valores de hace un frame y el salto se pierde con frecuencia.
- Las páginas se abren con `file://`; todo debe funcionar con rutas relativas y sin servidor.

## Goals / Non-Goals

**Goals:**
- Salto fiable y determinista: suelo calculado tras las colisiones del frame actual, con buffer de pulsación (200 ms) y coyote time (120 ms)
- Movimiento horizontal continuo mientras se mantiene el control
- HUD legible (marcador de monedas, ayuda, victoria) sobre fondos semi-transparentes coherentes con `shared.css`
- Lienzo responsivo que escala al ancho disponible sin recortar el nivel
- Controles de teclado y táctiles operativos, con objetivos de toque amplios en móvil
- Mantener Phaser v2.6.2 y el renderer Canvas (necesario para que los sprites locales carguen desde `file://`)

**Non-Goals:**
- Migrar a Phaser 3 ni cambiar el motor
- Rediseñar el nivel, los sprites o la dificultad
- Añadir sonido, partículas o físicas nuevas
- Modificar `shared.css` ni otros proyectos del archivo

## Decisions

**Suelo calculado después de las colisiones del frame** — Reordenar `update()` para ejecutar `game.physics.arcade.collide(player, walls)` ANTES de leer el estado de suelo, y derivar `enSuelo` de `player.body.onFloor() || player.body.blocked.down || player.body.touching.down`. Alternativa considerada: comprobar el suelo antes (como ahora) → descartada, da valores del frame anterior y provoca saltos perdidos. El orden colisión→lectura es el patrón canónico de ARCADE.

**Buffer de pulsación con marca de tiempo** — Guardar `game.time.now` en cuanto se detecta el flanco del control de salto y ejecutar el salto si `ahora - pulso <= 200 ms` y hay suelo (o coyote). Alternativa considerada: saltar solo cuando la tecla está pulsada en ese instante → descartada, pierde pulsaciones justo antes de aterrizar.

**Coyote time** — Registrar `ultimaTierra = game.time.now` cuando `enSuelo` es verdadero; permitir salto si `ahora - ultimaTierra <= 120 ms`. Se aplica solo la primera vez en el aire (un flag evita doble salto en la misma ventana).

**Doble salto desactivado** — Tras usar un salto en coyote, no volver a saltar hasta volver a pisar el suelo. El flag se resetea al volver a `enSuelo`.

**Input unificado** — Un único objeto `controles` alimentado por: teclado (Phaser `createCursorKeys()` + SPACEBAR + R) y botones HTML táctiles (`◀`, `▶`, `⤒`, `Reiniciar`) con eventos `touchstart/touchend` + `mousedown/mouseup` y `preventDefault()`. El salto se marca como "pulsado" en el flanco de cualquiera de las dos fuentes. `touch-action: manipulation` en los botones evita el zoom/doble-tap.

**Lienzo responsivo vía CSS, mundo fijo en lógica** — El juego conserva resolución interna fija (se mantiene 500x210 o se ajusta a un ratio cómodo) y el contenedor escala con `max-width: 100%` + `height: auto`, conservando la relación de aspecto y mostrando el nivel completo. Alternativa considerada: `ScaleManager.SHOW_ALL` de Phaser → descartada, mezcla el escalado CSS con el canvas y añade complejidad sin ganancia; el escalado CSS es suficiente para pantallas de escritorio y móvil.

**HUD con fondo semi-transparente** — Sustituir los textos crudos por `game.add.text` sobre un rectángulo `game.add.graphics` oscuro (`rgba(0,0,0,0.55)`) con borde/accento verde `#16F24D`, en esquina superior izquierda del lienzo. La ayuda y el estado de victoria se muestran igualmente sobre fondos para garantizar legibilidad sobre cualquier fondo del nivel.

**Controles táctiles ampliados** — Los botones `◀`/`▶`/`⤒`/`Reiniciar` pasan a `min-width: 64px; min-height: 56px; font-size: 24px` vía el `<style>` local del proyecto (sin tocar `shared.css`), con `user-select: none` para evitar selección de texto al tocar rápido.

**Paleta y marco** — Se reutiliza el marco existente (`site-header`, `back-link`, `site-footer`) y los acentos de `shared.css`; no se modifica la hoja compartida.

## Risks / Trade-offs

- [El suelo calculado tras colisiones puede ser menos responsivo si Phaser no separa en un frame] → Usar además `touching.down` (se establece en la separación del frame actual) y el buffer de 200 ms, que cubre el retardo de un frame
- [Salto en coyote permite saltos "desde el aire" que parecen raros] → La ventana es corta (120 ms) y se desactiva el doble salto; se limita a un único uso por despegue
- [Escalado CSS del canvas puede verse pixelado al ampliar] → Aceptable: el mundo es pequeño (500x210) y se escala hacia abajo en móvil, donde no se amplía
- [Regresión en el funcionamiento de controles táctiles] → Verificación manual en móvil y escritorio tras cada cambio de `update()`/input; reversión por archivo con git

## Migration Plan

1. Ajustar `update()`: reordenar colisiones antes de leer suelo; añadir buffer con marca de tiempo y coyote con flag anti-doble salto
2. Rehacer el HUD con fondos semi-transparentes y paneles verdes
3. Ampliar botones táctiles y asegurar `preventDefault`/`touch-action`
4. Aplicar escalado responsivo al contenedor del canvas
5. Verificar en escritorio (teclado) y móvil (táctil): salto fiable, movimiento, monedas, enemigos, victoria y reinicio
Reversión: `git revert` de los commits del cambio o restauración de `Platformer-game-phaser/index.html`.

## Open Questions

Ninguna.