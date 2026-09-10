# platformer-game Specification

## Purpose

Define el comportamiento y la presentación del mini juego Platformer con Phaser: control del jugador con salto fiable, movimiento horizontal, recogida de monedas, enemigos patrullando y una interfaz legible y responsiva alineada con el sistema de diseño compartido del repositorio.

## Requirements

### Requirement: Salto fiable del jugador
El jugador SHALL saltar cada vez que se pulsa el control de salto mientras está en el suelo o dentro de una ventana de coyote time al abandonarlo, y la pulsación SHALL quedar en buffer hasta 200 ms para no perderse si ocurre justo antes de aterrizar.

#### Scenario: Saltar desde el suelo
- **WHEN** el jugador está sobre el suelo y pulsa el control de salto (tecla ↑, ESPACIO o botón de salto)
- **THEN** el jugador despega del suelo con un impulso vertical

#### Scenario: Saltar justo antes de aterrizar
- **WHEN** el jugador pulsa el control de salto hasta 200 ms antes de tocar el suelo
- **THEN** el salto se ejecuta en cuanto el jugador aterriza

#### Scenario: Salto tras abandonar el borde
- **WHEN** el jugador pisa el suelo y se lanza al vacío
- **THEN** puede saltar durante una ventana de coyote time de 120 ms tras abandonar el suelo

#### Scenario: Sin doble salto
- **WHEN** el jugador ya está en el aire fuera de la ventana de coyote time y pulsa el control de salto
- **THEN** no se ejecuta un nuevo salto

### Requirement: Movimiento horizontal del jugador
El jugador SHALL moverse a izquierda y derecha por el nivel mientras se mantiene pulsado el control correspondiente (teclas ←/→ o botones táctiles), y SHALL detenerse al soltarlo.

#### Scenario: Moverse a la izquierda
- **WHEN** el jugador mantiene pulsado el control de izquierda (tecla ← o botón ◀)
- **THEN** el jugador se desplaza hacia la izquierda

#### Scenario: Moverse a la derecha
- **WHEN** el jugador mantiene pulsado el control de derecha (tecla → o botón ▶)
- **THEN** el jugador se desplaza hacia la derecha

#### Scenario: Detenerse al soltar
- **WHEN** el jugador suelta el control de movimiento horizontal
- **THEN** el jugador deja de desplazarse horizontalmente

### Requirement: Colisiones con el nivel
El jugador SHALL chocar con las paredes del nivel (no atravesarlas) y SHALL reiniciar la partida al caer fuera del mundo o al tocar a un enemigo.

#### Scenario: Paredes sólidas
- **WHEN** el jugador se desplaza hacia una pared del nivel
- **THEN** el jugador no la atraviesa y queda bloqueado por ella

#### Scenario: Caer fuera del mundo
- **WHEN** el jugador cae más allá del límite inferior del mundo
- **THEN** la partida se reinicia desde el inicio

#### Scenario: Tocar a un enemigo
- **WHEN** el jugador colisiona con un enemigo
- **THEN** la partida se reinicia desde el inicio

### Requirement: Recogida de monedas y victoria
El jugador SHALL recoger las monedas al superponerse con ellas, y al recogerlas todas SHALL mostrarse un estado de victoria que permita reiniciar.

#### Scenario: Recoger una moneda
- **WHEN** el jugador se superpone con una moneda
- **THEN** la moneda desaparece y el contador de monedas recogidas aumenta

#### Scenario: Victoria al recoger todas
- **WHEN** el jugador recoge todas las monedas del nivel
- **THEN** se muestra un mensaje de victoria y la partida puede reiniciarse con el botón de reinicio o la tecla R

### Requirement: Controles visibles y funcionales
La página SHALL ofrecer controles de teclado (←/→ moverse, ↑/ESPACIO saltar, R reiniciar) y controles táctiles en pantalla (botones ◀, ▶, salto y reiniciar) etiquetados y operativos, de tamaño adecuado para uso en móvil.

#### Scenario: Controles de teclado
- **WHEN** el usuario pulsa las teclas ←, →, ↑, ESPACIO o R
- **THEN** el juego responde con el movimiento, salto o reinicio correspondiente

#### Scenario: Controles táctiles
- **WHEN** el usuario toca los botones táctiles ◀, ▶, salto o reiniciar
- **THEN** el juego responde igual que con el teclado sin desplazar ni hacer zoom en la página

### Requirement: Interfaz legible y responsiva
El juego SHALL presentar un HUD legible (marcador de monedas, ayuda y estado de partida) sobre un lienzo que se escala al ancho disponible sin recortar el nivel, manteniendo la relación de aspecto, y con una presentación visual coherente con `shared.css` (fondo oscuro, acentos verdes, tipografía monoespaciada).

#### Scenario: Escalado del lienzo
- **WHEN** la página se muestra en un ancho de ventana distinto (escritorio o móvil)
- **THEN** el lienzo de juego se escala proporcionalmente y el nivel completo sigue visible

#### Scenario: HUD legible
- **WHEN** se juega la partida
- **THEN** el marcador de monedas, la ayuda y el estado de victoria se muestran legibles sobre el fondo del juego

#### Scenario: Coherencia visual con el archivo
- **WHEN** el usuario abre la página del juego
- **THEN** el aspecto (fondo oscuro, acentos verdes, tipografía monoespaciada) es coherente con la hoja compartida `shared.css` y conserva la cabecera con enlace de vuelta al índice y el pie de autor