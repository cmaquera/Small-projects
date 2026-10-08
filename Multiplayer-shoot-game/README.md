# Multiplayer Shoot Game 🎯

Juego multijugador 2D en tiempo real utilizando HTML5 Canvas, Node.js y Socket.io. Los jugadores compiten apuntando y haciendo clic (o tocando en pantallas móviles) sobre los objetivos antes de que termine el temporizador de la ronda.

---

## 🌟 Características

- **Área de juego ampliada (600x400):** Canvas escalado x2 respecto a la versión original para mayor comodidad visual y competitiva.
- **Barra HUD Retro:** Muestra en tiempo real tu puntaje individual, el tiempo restante de la ronda (15 segundos) y tu ID de jugador asignado por el servidor.
- **Marcador dinámico:** Lista a todos los jugadores conectados con indicadores de color personalizados y puntuaciones en vivo.
- **Efectos de partículas:** Chispas visuales de impacto en los objetivos acertados.
- **Soporte Táctil Móvil:** Controles optimizados para jugar desde teléfonos inteligentes apuntando y disparando con el dedo.
- **Doble Modo de Ejecución:** Funciona de forma integrada a través del Gateway central en el puerto `8000` (namespace `/shoot`) o en modo independiente en el puerto `1337`.

---

## 🚀 Ejecución

### Opción A: Desde el Gateway Unificado (Recomendado)
Desde la raíz del repositorio:
```bash
npm start
```
Luego ingresa a: [http://localhost:8000/Multiplayer-shoot-game/](http://localhost:8000/Multiplayer-shoot-game/)

### Opción B: Modo Independiente (Standalone)
Desde esta carpeta:
```bash
cd Multiplayer-shoot-game
npm install
npm start
```
El juego estará escuchando en [http://localhost:1337](http://localhost:1337).

Abre dos o más pestañas para competir en multijugador en tiempo real.
