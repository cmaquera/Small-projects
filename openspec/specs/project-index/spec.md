# Especificación de project-index

## Purpose

Proporciona una página principal en la raíz del repositorio que lista cada mini proyecto en su propia carpeta, enlaza a cada proyecto y ofrece una breve descripción para que los visitantes puedan descubrir y abrir cualquier proyecto fácilmente.

## Requirements

### Requirement: Página principal en la raíz del repositorio
El sistema SHALL (DEBE) proporcionar un archivo `index.html` en la raíz del repositorio que sirva como página principal de todos los mini proyectos.

#### Scenario: Abrir la raíz del repositorio
- **WHEN** un usuario abre la raíz del repositorio en un navegador
- **THEN** se muestra la página principal listando todos los mini proyectos

### Requirement: Listar proyectos a partir de la estructura de carpetas
La página principal SHALL (DEBE) listar cada carpeta de proyecto en la raíz del repositorio, excluyendo carpetas que no sean de proyectos como `.opencode` y `openspec`.

#### Scenario: Enumerar las carpetas de proyectos
- **WHEN** la página principal se renderiza
- **THEN** cada carpeta de proyecto de nivel superior se incluye en el listado y se excluyen las carpetas que no son de proyectos

### Requirement: Enlace a cada proyecto
Cada proyecto listado SHALL (DEBE) enlazar a su carpeta para que el usuario pueda abrir el proyecto directamente.

#### Scenario: Abrir un proyecto con un index.html
- **WHEN** el usuario hace clic en un proyecto que tiene un `index.html` en su carpeta
- **THEN** el navegador navega hasta el `index.html` de esa carpeta

#### Scenario: Abrir un proyecto sin index.html
- **WHEN** el usuario hace clic en un proyecto cuya carpeta no tiene `index.html`
- **THEN** el navegador navega hasta el listado de la carpeta o un punto de entrada equivalente

### Requirement: Descripción del proyecto
La página principal SHALL (DEBE) mostrar cada proyecto con una breve descripción legible para informar al visitante de lo que hace el proyecto.

#### Scenario: Ver las descripciones
- **WHEN** la página principal renderiza la lista de proyectos
- **THEN** cada proyecto muestra un nombre y una breve descripción

### Requirement: Página autocontenida
La página principal SHALL (DEBE) funcionar sin paso de compilación ni procesamiento en el servidor, usando solo HTML, CSS y JavaScript estáticos.

#### Scenario: Abrir directamente desde el sistema de archivos
- **WHEN** el usuario abre la página principal directamente desde el disco sin un servidor web
- **THEN** la página se renderiza y lista todos los proyectos correctamente

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