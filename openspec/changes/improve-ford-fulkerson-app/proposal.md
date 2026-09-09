## Why

El visualizador de flujo máximo Ford-Fulkerson tiene interacciones rotas o provisionales: los tres formularios (cantidad de nodos, capacidades y fuente/sumidero) están ocultos y sin cableado real, los botones dependen de `prompt()`/`confirm()`/`alert()`, hay un placeholder `alert('hola')` y un atributo mal escrito (`mane` en vez de `name`). Además, el estado de la sesión (nodos, aristas, caminos encontrados) nunca se limpia entre ejecuciones, y el resultado del cálculo solo se muestra con `alert()` y la consola. Esto hace el proyecto difícil de usar y de entender.

## What Changes

- Cablear los tres diálogos (`formulario0`, `formulario1` y `formulario2`) a flujos reales basados en formularios: cantidad de nodos, capacidades Ni–Nf/Nf–Ni y selección de fuente/sumidero; eliminar `prompt()`, `confirm()` y `alert()` de los flujos principales.
- Corregir el atributo `mane="capacidad2"` por `name="capacidad2"`.
- Mostrar el resultado del cálculo en la página (valor del flujo máximo) en lugar de un `alert()`.
- Visualizar el resultado del algoritmo en el lienzo: flujo por arista, uso de colores distintos para cada camino aumentante y desglose por camino.
- Añadir cabezas de flecha de dirección a cada arista y flecha en el sentido inverso cuando el contraflujo sea mayor que cero.
- Añadir edición del grafo: modo de borrado para eliminar nodos o aristas, y un control de reinicio que limpia el grafo y el estado de la sesión recargando el lienzo sin recargar la página.
- Limpiar el estado entre ejecuciones: arreglos de nodos, aristas y caminos (`c`), cantidad y modo de edición; validar cantidad de nodos (1–26) y existencia de fuente/sumidero; reemplazar la inicialización dura `flujo = 999999`; eliminar la recursión potencial en `pregunta21` al cancelar un diálogo.
- Mantener el diseño unificado del repositorio (`shared.css`) con los diálogos estilizados de forma acorde.

## Capabilities

### New Capabilities
- `ford-fulkerson-app`: Comportamiento observable del visualizador interactivo de flujo máximo (definición del grafo, cálculo, visualización de resultados y edición).

### Modified Capabilities
- Ninguna: la capacidad es nueva; no cambian los requisitos de `project-index`, `project-presentation` ni `project-design-system`.

## Impact

- **Código afectado**: `Ford-fulkerson/index.html`, `Ford-fulkerson/js/app.js` y `Ford-fulkerson/js/ford-fulkerson.js`.
- **Dependencias**: ninguna nueva; se mantiene la hoja compartida `shared.css` y el enlace de vuelta al índice.
- **Compatibilidad**: el cambio es interno a la carpeta del proyecto; la tarjeta del índice y la capacidad de apertura del proyecto no cambian.
- **Entorno**: páginas estáticas (HTML/CSS/JS sin compilación ni servidor), igual que el resto del repositorio.