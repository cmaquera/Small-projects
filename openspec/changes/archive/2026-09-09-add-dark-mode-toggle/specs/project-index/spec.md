## ADDED Requirements

### Requirement: Tema oscuro
La página SHALL (DEBE) ofrecer un tema de color oscuro al que el usuario pueda cambiar, y SHALL (DEBE) seguir siendo totalmente legible con los colores de modo oscuro aplicados al fondo de la página, al texto, a las tarjetas y a los bordes.

#### Scenario: Cambiar al modo oscuro
- **WHEN** el usuario activa el interruptor de tema
- **THEN** la página principal se muestra con el tema de color oscuro

#### Scenario: Volver al modo claro
- **WHEN** el usuario activa el interruptor de tema estando activo el modo oscuro
- **THEN** la página principal regresa al tema de color claro

### Requirement: Control de cambio de tema
La página SHALL (DEBE) mostrar un control visible en el encabezado para cambiar entre los temas claro y oscuro.

#### Scenario: El control es visible
- **WHEN** la página principal se renderiza
- **THEN** se muestra un control de cambio de tema en el encabezado

### Requirement: Persistencia del tema
La página SHALL (DEBE) recordar el tema seleccionado por el usuario para que las visitas posteriores abran con el mismo tema.

#### Scenario: El tema persiste entre visitas
- **WHEN** el usuario selecciona el modo oscuro y luego vuelve a abrir la página principal
- **THEN** la página principal abre en modo oscuro sin que el usuario tenga que seleccionarlo de nuevo

#### Scenario: Tema por defecto
- **WHEN** el usuario no ha seleccionado previamente un tema
- **THEN** la página principal abre con el tema claro por defecto