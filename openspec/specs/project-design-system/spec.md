# project-design-system Specification

## Purpose

Sistema de diseño compartido para las páginas de los mini proyectos: una única hoja de estilos en la raíz del repositorio, una cabecera común con título y enlace de vuelta al índice, y el pie de autor, para que todos los proyectos del archivo se vean y se naveguen de forma consistente.

## Requirements

### Requirement: Hoja de estilos compartida
El archivo SHALL (DEBE) proporcionar una única hoja de estilos en la raíz del repositorio que defina la base visual común de todas las páginas de los proyectos (fondo oscuro, acentos verdes y tipografía monoespaciada), y cada página de proyecto listada en el índice SHALL (DEBE) cargar esa hoja compartida en lugar de copias locales de la plantilla.

#### Scenario: Abrir cualquier proyecto
- **WHEN** el usuario abre cualquier página de proyecto listada en el índice
- **THEN** la página muestra la base visual común (fondo oscuro, acentos verdes, tipografía monoespaciada) proveniente de la hoja compartida de la raíz

#### Scenario: Sin copias duplicadas de la plantilla
- **WHEN** el usuario revisa las carpetas de los proyectos listados
- **THEN** no existen copias locales duplicadas de la plantilla base en ninguna carpeta de proyecto

### Requirement: Cabecera común con título y vuelta al índice
Cada página de proyecto listada en el índice SHALL (DEBE) mostrar una cabecera con el título del proyecto y un enlace visible que lleve de vuelta a la página principal del repositorio.

#### Scenario: Ver la cabecera del proyecto
- **WHEN** el usuario abre cualquier página de proyecto listada en el índice
- **THEN** se muestra una cabecera con el título del proyecto y un enlace «volver al índice»

#### Scenario: Volver al índice
- **WHEN** el usuario pulsa el enlace de vuelta al índice de la cabecera
- **THEN** el navegador navega a la página principal del repositorio

### Requirement: Pie de autor
Cada página de proyecto listada en el índice SHALL (DEBE) mostrar un pie con la atribución de autor «CMaquera».

#### Scenario: Ver el pie de autor
- **WHEN** el usuario abre cualquier página de proyecto listada en el índice
- **THEN** se muestra el pie con la atribución de autor

### Requirement: Funcionamiento preservado
La adopción de la hoja compartida y la cabecera común SHALL (DEBE) preservar el funcionamiento y la presentación funcional propios de cada proyecto (formularios, lienzos, juegos).

#### Scenario: Interacción del proyecto sigue funcionando
- **WHEN** el usuario abre un proyecto que tiene controles propios (formularios, lienzo, juego) tras la actualización del diseño
- **THEN** los controles siguen visibles y operativos como antes