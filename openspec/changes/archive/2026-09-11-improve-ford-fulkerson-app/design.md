## Context

Ver `proposal.md` — Why. El proyecto actual se compone de `Ford-fulkerson/index.html`, `js/ford-fulkerson.js` (clase `FlujoRed` con el algoritmo) y `js/app.js` (estado, bucle de render y clases `Circulo`/`Linea`). Los tres formularios existen en el HTML pero están ocultos (`display: none`) y sin cablear: `pregunta1` y `pregunta3` usan `prompt()`, `pregunta21` usa `prompt()`, la habilitación de caminos usa `confirm()`, el resultado se muestra con `alert()` y el estado global (`arrastrables`, `lineas`, `c`, `cantidad`, `control`) nunca se limpia. La hoja `shared.css` ya aporta la base visual y los estilos `.btn`, `.btn1`, `input`; el proyecto tiene un bloque `<style>` local con las reglas de los formularios y el lienzo.

## Goals / Non-Goals

**Goals:**
- Mantener la estructura de dos archivos JS (algoritmo + UI) y la carga directa de Página sin dependencias nuevas.
- Convertir los tres formularios en diálogos en página operativos y eliminar `prompt()`/`confirm()`/`alert()` de los flujos de entrada y resultados.
- Reutilizar el bucle de render y las clases existentes (`Circulo`, `Linea`, `FlujoRed`) con los menores cambios estructurales posibles.
- Que el estado de la sesión se vacíe de forma fiable con un control de reinicio y entre cálculos.

**Non-Goals:**
- Reescribir el algoritmo de Ford-Fulkerson (el método `flujoMaximo`/`buscarCamino` se conserva salvo correcciones mínimas de riesgo bajo).
- Cambiar el diseño general del repositorio (`shared.css`, cabecera, pie) ni la tarjeta del índice.
- Añadir persistencia, servidor o dependencias externas.

## Decisions

### D1. Formularios como modales en página sobre el lienzo
Los tres formularios (`formulario0`, `formulario1`, `formulario2`) se muestran como tarjetas centradas encima del lienzo (overlay con `position: fixed` y `z-index` superior al lienzo). El botón «Aceptar» pasa de `type="submit"` a `type="button"` con handler propio que lee y valida los campos antes de aplicar; el formulario solo se cierra si la entrada es válida.
- *Alternativas descartadas*: recrear diálogos desde cero en JS (redundante), mantener `prompt()` (se elimina por decisión de alcance), usar `<dialog>` nativo (soporte y estilo menos predecibles en el diseño actual).
- *Efecto*: cada botón de la barra — AGREGAR NODOS, AGREGAR CAMINOS, CALCULAR FLUJO MÁXIMO — queda asociado a un formulario, alineando el HTML existente con el comportamiento real.

### D2. Iteración de los botones sin `confirm()`
AGREGAR CAMINOS pasa a ser un interruptor visual: el estado (activado/desactivado) se refleja en el propio botón resaltándolo con la regla existente `#btn-2:focus` (mismo efecto que hoy, pero sin cuadro de confirmación). Un texto de ayuda de estado indica al usuario que haga clic en dos nodos para crear una arista.
- *Efecto*: se elimina el `confirm()` y se mejora el affordance.

### D3. Capacidades y aristas pendientes
Al seleccionar el segundo nodo en modo caminos, se guardan los índices pendientes en una variable de sesión y se abre `formulario1`; el handler de «Aceptar» valida `capacidad1`/`capacidad2` (no negativas) y crea la `Linea`. El campo mal escrito `mane="capacidad2"` se corrige a `name="capacidad2"`.
- *Efecto*: `pregunta21()` deja de usar `prompt()`, desaparece la recursión por cancelación y el flujo usa los campos del formulario como indica el HTML.

### D4. Selección de fuente/sumidero y resultados en página
«CALCULAR FLUJO MÁXIMO» abre `formulario2`; el handler de «Aceptar» valida que fuente y sumidero sean letras de nodos existentes en `arrastrables` (si no, aviso sin calcular), construye el `FlujoRed` desde `lineas` y llama a `flujoMaximo`. El resultado (valor total y desglose por camino) se renderiza en un panel `#resultados` bajo el lienzo en lugar de `alert()`.
- *Efecto*: cumplimiento del requisito de presentación en página.

### D5. Desglose y coloreado de caminos desde el algoritmo
`flujoMaximo` se modifica de forma mínima para: (1) reiniciar el arreglo de caminos al inicio de cada ejecución (en lugar de acumular en el global `c`), (2) inicializar el flujo mínimo del camino con el primer residual en vez del valor fijo `999999`, y (3) devolver tanto el flujo máximo como la lista de caminos: cada camino se describe como secuencia de nodos (letras) y flujo aportado. Tras el cálculo se actualiza cada `Linea` con el flujo de su arista correspondiente (que se busca en `FlujoRed`) para que `dibujarFlujo` muestre `flujo/capacidad`, y `pintar` asigna a cada camino un color de la paleta existente `colores`.
- *Alternativa descartada*: leer el global `c` sin cambios y restablecerlo manualmente en `app.js` — arriesga acoplar el estado del algoritmo con la UI y dejar caminos huérfanos al reiniciar.
- *Efecto*: resultados visibles por arista y por camino cumpliendo «Estado limpio entre cálculos».

### D6. Flechas de dirección en las aristas
`Linea.prototype.dibujar` dibuja además la cabeza de flecha (triángulo) en el extremo destino de la dirección origen→destino; si `contraflujo > 0` se dibuja otra flecha en sentido contrario. Se calcula el ángulo entre centros y se inseta la punta a una distancia menor que el radio del círculo para no invadirlo.
- *Efecto*: grafo dirigido legible.

### D7. Modo de borrado y reinicio
Se añade un botón «BORRAR» (interruptor) y un botón «REINICIAR». En modo borrar, `actividad()` detecta clic sobre una arista (distancia punto–segmento bajo un umbral) y la elimina de `lineas`; un clic sobre un nodo lo elimina de `arrastrables` junto con todas sus aristas incidentes. «REINICIAR» llama a `resetGrafo()` que vacía `arrastrables`, `lineas`, la sesión de cálculo (`c`, flujos por arista, resultados), `cantidad`, `control`, `tposiciones` y pinta el lienzo en su color base; el botón `#actualizar` existente (recarga completa) se conserva.
- *Efecto*: edición y reinicio sin recargar la página; cualquier edición posterior a un cálculo descarta los colores y caminos anteriores.

### D8. Estilos locales para los diálogos
El bloque `<style>` local añade las reglas del overlay y las tarjetas de los formularios (fondo oscuro con borde verde, siguiendo `shared.css`), limita el ancho de `.campo` (ya hay una regla `#formulario2 .contenido .campo`) y deja el resto a la base compartida. No se toca `shared.css`.

## Risks / Trade-offs

- [El algoritmo de Ford-Fulkerson puede tener errores en casos límite (p. ej., las condiciones de `buscarCaminoDoble`)] → El alcance no reescribe el algoritmo; se verifica la correctitud contra el ejemplo comentado (grafo a–i) y con pruebas manuales; si un caso simple da un resultado incorrecto, se anota y se aplica un ajuste mínimo documentado sin cambiar el contrato de comportamiento.
- [Eliminar nodos/aristas tras un cálculo deja mapas de color obsoletos] → Cualquier edición o reinicio descarta el estado de resultados (`c`, flujos, panel) antes de volver a pintar.
- [Los modales pueden tapar el lienzo o chocar con el `z-index` de la cabecera] → El overlay se estiliza con `z-index` superior (20) y fondo semitransparente; la cabecera del sitio queda por debajo.
- [`shared.css` aplica un estilo global a todos los `input` (ancho completo, borde inferior)] → Los campos `.campo` se limitan en ancho y se estilizan de forma acorde en el bloque local.
- [Recolorizar cada arista por camino en cada frame] → Coste despreciable para el límite de 26 nodos; si fuese necesario se podría cachear, pero no se prevé.

## Migration Plan

Cambio contenido en `Ford-fulkerson/`; sin despliegue ni compatibilidad entre versiones (página estática). Rollback: `git checkout` de la carpeta. El resto del repositorio (índice, `shared.css`, otros proyectos) no se ve afectado.

## Open Questions

Sin preguntas abiertas que cambien las specs, el enfoque o el desglose de tareas.