## 1. HTML y estilos de los diálogos

- [x] 1.1 Corregir en `Ford-fulkerson/index.html` el atributo mal escrito `mane="capacidad2"` por `name="capacidad2"` y verificar con una búsqueda que el formulario1 tiene ambos campos con `name`
- [x] 1.2 Añadir en el bloque `<style>` local de `index.html` el estilo de los diálogos (overlay centrado con `position: fixed`, `z-index` superior al lienzo, fondo semitransparente, tarjeta de formulario con borde verde y ancho de `.campo`) y verificar en el navegador que los tres formularios se ven centrados sobre el lienzo
- [x] 1.3 Poner los botones «Aceptar» de los tres formularios como `type="button"` (o impedir el envío) y darles handlers (`aceptarNodos`, `aceptarCapacidades`, `aceptarFuenteSumidero`), verificando que ningún formulario recarga la página
- [x] 1.4 Añadir a la barra de botones un botón «BORRAR» (interruptor), un botón «REINICIAR» y un panel `#resultados` bajo el lienzo, y verificar que aparecen en la página sin romper el diseño

## 2. Algoritmo (ford-fulkerson.js)

- [x] 2.1 Modificar `flujoMaximo` para que reinicie el arreglo de caminos en cada ejecución (sin acumular en el global `c`) y devuelva `{ maximo, caminos }` con cada camino (secuencia de nodos y flujo aportado), verificando en consola el resultado con el ejemplo comentado del grafo a–i
- [x] 2.2 Sustituir la inicialización fija `flujo = 999999` por el primer residual `camino[0][1]` (o un valor inicial neutro) y verificar que el valor del flujo máximo no cambia respecto al funcionamiento anterior
- [x] 2.3 Eliminar la función de prueba `cuerpo()` y verificar que no hay llamadas a `cuerpo()` en `app.js` ni en el HTML
- [x] 2.4 Verificar la correctitud del algoritmo con un caso manual mínimo (p. ej., 2–3 nodos calculados a mano) y con el ejemplo comentado, anotando cualquier desviación observada

## 3. Interacciones y estado (app.js)

- [x] 3.1 Implementar `resetGrafo()` que vacíe `arrastrables`, `lineas`, la sesión de cálculo (`c`, flujos por arista, `#resultados`), `cantidad`, `control` y `tposiciones`, y limpie el lienzo; enlazar «REINICIAR» a esta función y verificar que el lienzo queda vacío sin recargar la página
- [x] 3.2 Reescribir `pregunta1()` para leer el campo `#nodos` del formulario0 (sin `prompt()`), validar 1–26 y llamar a `inicio()`, verificando que una cantidad inválida muestra un aviso sin crear nodos y una válida crea los nodos
- [x] 3.3 Convertir `pregunta2()` en un interruptor visual del modo caminos (sin `confirm()`), reflejando el estado en el botón existente `#btn-2:focus`, y verificar que alterna correctamente el modo de creación de aristas
- [x] 3.4 Implementar `aceptarCapacidades()` para validar `capacidad1`/`capacidad2` (mayores o iguales a 0), crear la `Linea` con las capacidades y cerrar el formulario1, verificando que las capacidades negativas muestran aviso y no crean la arista, sin `prompt()` ni recursión
- [x] 3.5 Implementar `aceptarFuenteSumidero()` que valide que fuente y sumidero existen entre los nodos dibujados, construya el `FlujoRed` desde `lineas` y calcule el flujo máximo, verificando que una fuente o sumidero inexistente muestra aviso sin calcular
- [x] 3.6 Implementar el modo «BORRAR»: clic sobre una arista (distancia punto–segmento bajo un umbral) la elimina, y clic sobre un nodo lo elimina junto con sus aristas incidentes, verificando que los elementos desaparecen del lienzo
- [x] 3.7 Hacer que cualquier edición o reinicio posterior a un cálculo descarte los caminos, colores y resultados de la ejecución anterior, verificando en el navegador que no quedan restos coloreados tras modificar el grafo

## 4. Dibujo y presentación de resultados (app.js)

- [x] 4.1 Añadir cabeza de flecha de dirección en `Linea.prototype.dibujar` (origen→destino) y otra en sentido inverso cuando `contraflujo > 0`, verificando las flechas visibles en el lienzo sin invadir los círculos
- [x] 4.2 Actualizar cada `Linea` con el flujo de su arista tras el cálculo y mostrar `flujo/capacidad` en cada extremo mediante `dibujarFlujo`, verificando los valores por arista en el lienzo
- [x] 4.3 Colorear cada camino aumentante con colores de la paleta `colores` y renderizar `#resultados` con el desglose (nodos y flujo de cada camino y el flujo máximo total), verificando el panel tras calcular
- [x] 4.4 Verificar en conjunto que al recalcular después de editar el grafo el panel y los colores reflejan solo la ejecución actual

## 5. Verificación final e integración

- [x] 5.1 Recorrido manual completo en el navegador: crear nodos, añadir aristas con capacidades bidireccionales, calcular el flujo máximo de un nodo a otro y comprobar valor total, desglose por camino y colores por camino
- [x] 5.2 Confirmar que `prompt()`, `confirm()` y `alert()` ya no se usan en los flujos de entrada ni de resultados (buscar en `js/`) y que la página sigue enlazando `shared.css` con cabecera y pie intactos
- [x] 5.3 Confirmar que `shared.css` y el índice no han cambiado (revisar que las únicas modificaciones están en `Ford-fulkerson/`) y que la tarjeta del índice sigue abriendo `../Ford-fulkerson/index.html`