## Purpose

Aplicación web interactiva que permite construir un grafo dirigido con capacidades, calcular su flujo máximo con el algoritmo de Ford-Fulkerson y visualizar en un lienzo el resultado: flujo por arista, dirección de las aristas y caminos aumentantes resaltados.

## ADDED Requirements

### Requirement: Definición del grafo mediante diálogos en la página
La aplicación SHALL (DEBE) permitir definir el grafo a través de diálogos de formulario embebidos en la página (cantidad de nodos, capacidades de cada arista y fuente/sumidero) y SHALL (DEBE) prescindir de `prompt()`, `confirm()` y `alert()` en esos flujos de entrada.

#### Scenario: Agregar nodos con el formulario
- **WHEN** el usuario pulsa «AGREGAR NODOS» e introduce una cantidad de nodos válida en el formulario
- **THEN** se crean en el lienzo tantos nodos como indique la cantidad, cada uno con su letra de identificación

#### Scenario: Agregar aristas con el formulario
- **WHEN** el usuario está en modo de creación de caminos y selecciona dos nodos
- **THEN** se muestra un formulario para introducir las capacidades de Ni–Nf y Nf–Ni, y al aceptarlo se dibuja la arista entre ambos nodos

#### Scenario: Introducir fuente y sumidero con el formulario
- **WHEN** el usuario pulsa «CALCULAR FLUJO MÁXIMO»
- **THEN** se muestra un formulario embebido para elegir el nodo fuente y el nodo sumidero

### Requirement: Validación de las entradas del grafo
La aplicación SHALL (DEBE) validar las entradas del usuario antes de aplicarlas: la cantidad de nodos solo se acepta entre 1 y 26, las capacidades no aceptan valores negativos, y el nodo fuente y el nodo sumidero deben ser letras de nodos existentes en el grafo; ante una entrada inválida SHALL (DEBE) mostrar un mensaje sin aplicar la operación.

#### Scenario: Cantidad de nodos fuera de rango
- **WHEN** el usuario introduce una cantidad de nodos menor que 1 o mayor que 26 en el formulario de nodos
- **THEN** se muestra un aviso y no se crea ningún nodo

#### Scenario: Capacidad negativa
- **WHEN** el usuario introduce una capacidad negativa en el formulario de capacidades
- **THEN** se muestra un aviso y no se crea la arista

#### Scenario: Fuente o sumidero inexistente
- **WHEN** el usuario introduce un nodo fuente o sumidero que no existe en el grafo
- **THEN** se muestra un aviso y no se realiza el cálculo

### Requirement: Cálculo del flujo máximo con fuente y sumidero
La aplicación SHALL (DEBE) calcular el flujo máximo del grafo desde el nodo fuente hasta el nodo sumidero elegidos cuando ambos existan en el grafo.

#### Scenario: Calcular el flujo máximo
- **WHEN** el usuario acepta un nodo fuente y un nodo sumidero válidos
- **THEN** la aplicación calcula el flujo máximo de la red entre esos dos nodos

### Requirement: Presentación de los resultados en la página
La aplicación SHALL (DEBE) mostrar el valor del flujo máximo y el desglose de los caminos aumentantes en la propia página, sin usar `alert()`.

#### Scenario: Ver el valor del flujo máximo
- **WHEN** finaliza el cálculo del flujo máximo
- **THEN** la página muestra el valor total del flujo máximo

#### Scenario: Ver el desglose por camino
- **WHEN** finaliza el cálculo del flujo máximo
- **THEN** la página lista cada camino aumentante con los nodos que recorre y la cantidad de flujo que aporta

### Requirement: Visualización del flujo y la dirección en las aristas
La aplicación SHALL (DEBE) dibujar cada arista con una cabeza de flecha que indique su dirección, y tras el cálculo SHALL (DEBE) mostrar el flujo enviado junto a la capacidad en cada extremo de la arista.

#### Scenario: Flechas de dirección
- **WHEN** se dibuja una arista entre dos nodos
- **THEN** se ve una cabeza de flecha que indica la dirección de la arista, y una flecha en el sentido inverso si el contraflujo es mayor que cero

#### Scenario: Flujo por arista tras el cálculo
- **WHEN** finaliza el cálculo del flujo máximo
- **THEN** cada arista muestra el flujo enviado y su capacidad

### Requirement: Resaltado de caminos aumentantes
La aplicación SHALL (DEBE) resaltar cada camino aumentante encontrado en el lienzo con un color distinto.

#### Scenario: Caminos de colores distintos
- **WHEN** finaliza el cálculo del flujo máximo
- **THEN** las aristas de cada camino aumentante se dibujan con un color diferente del resto

### Requirement: Edición del grafo
La aplicación SHALL (DEBE) permitir eliminar nodos y aristas mediante un modo de borrado, y SHALL (DEBE) ofrecer un control de reinicio que vacíe el lienzo y el estado de la sesión (nodos, aristas, caminos y resultados).

#### Scenario: Borrar una arista
- **WHEN** el usuario activa el modo de borrado y pulsa sobre una arista
- **THEN** la arista se elimina del lienzo

#### Scenario: Borrar un nodo
- **WHEN** el usuario activa el modo de borrado y pulsa sobre un nodo
- **THEN** el nodo se elimina junto con todas las aristas incidentes

#### Scenario: Reiniciar el grafo
- **WHEN** el usuario pulsa el control de reinicio
- **THEN** el lienzo queda vacío y se borran nodos, aristas, caminos, resultados y modos de edición activos, sin recargar la página

### Requirement: Estado limpio entre cálculos
La aplicación SHALL (DEBE) descartar los caminos, colores y resultados de una ejecución anterior cada vez que se modifica el grafo o se vuelve a calcular, para que no se mezclen con la ejecución actual.

#### Scenario: Recalcular después de modificar el grafo
- **WHEN** el usuario modifica el grafo o vuelve a calcular el flujo máximo tras una primera ejecución
- **THEN** los colores y caminos de la ejecución anterior desaparecen y solo se muestran los de la ejecución actual