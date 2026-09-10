## 1. Salto fiable

- [x] 1.1 Reordenar `update()` para ejecutar `game.physics.arcade.collide(this.player, this.walls)` y la de los enemigos ANTES de leer el estado de suelo, y verificar en navegador que el jugador cae y se detiene sobre el suelo
- [x] 1.2 Definir `enSuelo` como `onFloor() || blocked.down || touching.down` y registrar `ultimaTierra = game.time.now` cuando es verdadero, verificando con una lectura temporal en consola que el valor es `true` con el jugador quieto en el suelo
- [x] 1.3 Añadir buffer de pulsación: marcar `saltoPendiente` en el flanco de subida del control de salto (teclado o botón) y ejecutar el salto si `game.time.now - pendienteDesde <= 200`, verificando que una pulsación justo antes de aterrizar produce el salto al tocar el suelo
- [x] 1.4 Añadir coyote time: permitir saltar si `game.time.now - ultimaTierra <= 120` y desactivar el doble salto con un flag que solo se resetea al volver a pisar el suelo, verificando en el borde de una plataforma que se puede saltar al caer y no se puede saltar en pleno aire tras el límite
- [x] 1.5 Ajustar impulso de salto y gravedad para una altura cómoda en el mundo de 500x210 (p. ej. `velocity.y = -300`, `gravity.y = 700`) y verificar que el salto alcanza al menos dos filas de tiles y vuelve a caer

## 2. Movimiento y colisiones

- [x] 2.1 Conservar el movimiento horizontal continuo (`velocity.x = ±160` mientras se mantiene el control, detenerse al soltar) y verificar en teclado y botones táctiles que responde y se detiene
- [x] 2.2 Verificar colisiones: las paredes bloquean al jugador, caer fuera del mundo reinicia la partida y tocar un enemigo reinicia desde el inicio

## 3. Interfaz y HUD

- [x] 3.1 Sustituir el HUD crudo por paneles legibles: `game.add.text` sobre `game.add.graphics` oscuro (`rgba(0,0,0,0.55)`) con borde/accento `#16F24D`, mostrando marcador de monedas, ayuda de controles y estado de victoria, y verificar que son legibles sobre cualquier parte del nivel
- [x] 3.2 Presentar el estado de victoria ("¡GANASTE!") con indicación de reinicio (botón o tecla R) y verificar que recoger todas las monedas lo muestra y permite reiniciar
- [x] 3.3 Ampliar los botones táctiles (`min-width: 64px`, `min-height: 56px`, `font-size: 24px`, `user-select: none`, `touch-action: manipulation`) y verificar en móvil que responden sin desplazar ni hacer zoom la página
- [x] 3.4 Aplicar escalado responsivo al contenedor del canvas (CSS `max-width: 100%` + `height: auto`) y verificar que el nivel completo es visible en anchos de escritorio y móvil manteniendo la relación de aspecto

## 4. Verificación final

- [ ] 4.1 Abrir `Platformer-game-phaser/index.html` en escritorio (teclado) y en móvil (táctil) y verificar: salto fiable desde suelo, borde y con buffer; movimiento continuo; monedas contables; enemigos patrullando; victoria al recoger todas; reinicio al morir o caer; HUD legible; lienzo responsivo sin recortar el nivel; y marco coherente con `shared.css` (cabecera con vuelta al índice, pie de autor)