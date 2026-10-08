# Streaming Socket.io

Prototipo de streaming de video en tiempo real desde la cámara web hacia el navegador mediante WebSockets (Node.js + Socket.io) y Canvas.

## Prerrequisitos

- Node.js (v14 o superior)
- Cámara web o dispositivo de captura de video compatible en el navegador

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor:
   ```bash
   npm start
   ```
   El servidor escuchará en el puerto `3737`.

3. Abrir en el navegador:
   - Página principal del proyecto: `http://localhost:3737/Streaming-Socket.io/index.html` (o abrir `index.html` directamente en el navegador).
   - Transmisor (emite la cámara): `Streaming.html`
   - Receptor (visualiza los cuadros emitidos): `StreamingClient.html`
