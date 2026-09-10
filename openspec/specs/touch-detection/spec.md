# touch-detection Specification

## Purpose

Define el comportamiento y la presentación del proyecto Touch Detection Browser: detección multi-táctil con dedos y ratón, visualización de coordenadas y porcentajes por dedo en un panel legible, y la garantía de que el contenido del panel siempre queda contenido dentro de su recuadro.

## Requirements

### Requirement: Panel de datos contenido
El panel que muestra los datos de los dedos activos (identificador, coordenadas X/Y y porcentajes) SHALL dibujarse con una altura que abarque la fila de título "Toques: N" y todas las filas de datos de los dedos activos, de modo que ninguna fila quede fuera del recuadro oscuro con borde.

#### Scenario: Un dedo activo
- **WHEN** hay un único dedo (o el ratón) activo en el lienzo
- **THEN** la fila de datos de ese dedo queda completamente dentro del recuadro del panel

#### Scenario: Varios dedos activos
- **WHEN** hay varios dedos activos simultáneamente
- **THEN** la fila de datos de cada dedo queda completamente dentro del recuadro del panel, sin desbordarse por su borde inferior

#### Scenario: Sin dedos activos
- **WHEN** no hay ningún dedo activo
- **THEN** el panel muestra el título "Toques: 0" sin filas de datos y sin desbordamiento

### Requirement: Datos por dedo legibles
El panel SHALL mostrar, por cada dedo activo, su identificador, sus coordenadas X/Y en píxeles y su posición en porcentaje del ancho y alto del lienzo, con texto legible sobre el fondo oscuro.

#### Scenario: Lectura de coordenadas
- **WHEN** un dedo está activo
- **THEN** el panel muestra su identificador, X, Y y los porcentajes horizontal/vertical

#### Scenario: Múltiples dedos diferenciados
- **WHEN** hay varios dedos activos
- **THEN** cada fila del panel usa el color asociado a su dedo y se distingue del resto

### Requirement: Detección multi-táctil y con ratón
El lienzo SHALL detectar y mostrar la posición de todos los dedos activos simultáneamente y del ratón cuando no hay toques táctiles.

#### Scenario: Toques táctiles
- **WHEN** el usuario toca el lienzo con uno o varios dedos
- **THEN** se muestran la posición y los datos de cada dedo activo

#### Scenario: Uso del ratón
- **WHEN** el usuario arrastra el ratón sobre el lienzo
- **THEN** se muestra la posición y los datos como si fuera un único dedo

### Requirement: Coherencia visual con el archivo
El lienzo y el panel SHALL seguir la presentación del sistema de diseño compartido del repositorio (fondo oscuro, acentos verdes, tipografía monoespaciada) y conservar la cabecera con enlace de vuelta al índice y el pie de autor.

#### Scenario: Aspecto coherente
- **WHEN** el usuario abre la página de Touch Detection
- **THEN** el lienzo usa el fondo oscuro y los acentos verdes de `shared.css` y se mantienen la cabecera y el pie del archivo