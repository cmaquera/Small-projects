# Streaming Socket.io 📹

Estudio interactivo de streaming y retransmisión de video en tiempo real desde la cámara web hacia el navegador mediante WebSockets (Node.js + Socket.io), HTML5 Canvas y la API `getUserMedia`.

---

## 🌟 Características

- **Panel de Estudio Didáctico (`index.html`):** Explica paso a paso el pipeline de transmisión (Captura WebCam → Codificación Base64 en Canvas → Retransmisión WebSocket → Recepción en vivo).
- **Monitor Dual en Vivo:** Visualiza tu cámara emisora y la señal receptora en la misma pantalla con métricas de FPS, contador total de fotogramas, resolución nativa y espectadores conectados.
- **Sincronización Dinámica de Aspect Ratio:** Adapta automáticamente las dimensiones del canvas a la relación de aspecto nativa del sensor (16:9 panorámico en webcams, 9:16 vertical en celulares o 4:3 clásico) con `object-fit: contain`, eliminando imágenes achatadas o distorsionadas.
- **Detección de Contexto Seguro (`isSecureContext`):** Muestra advertencias y guías claras cuando se intenta acceder a la cámara desde celulares en conexiones HTTP locales.
- **Vistas Modulares Independientes:**
  - `Streaming.html`: Pantalla emisora dedicada.
  - `StreamingClient.html`: Pantalla receptora dedicada.
- **Doble Modo de Ejecución:** Opera tanto sobre el Gateway unificado en el puerto `8000` (namespace `/streaming`) como en modo independiente en el puerto `3737`.

---

## 🚀 Ejecución

### Opción A: Desde el Gateway Unificado (Recomendado)
Desde la raíz del repositorio:
```bash
npm start
```
Luego accede a: [http://localhost:8000/Streaming-Socket.io/](http://localhost:8000/Streaming-Socket.io/)

### Opción B: Modo Independiente (Standalone)
Desde esta carpeta:
```bash
cd Streaming-Socket.io
npm install
npm start
```
El servidor escuchará en el puerto `3737` ([http://localhost:3737/Streaming-Socket.io/](http://localhost:3737/Streaming-Socket.io/)).

---

## 📱 Uso en Teléfonos Móviles

Debido a los estándares de seguridad web (`Secure Contexts`), los navegadores móviles restringen el acceso a la cámara (`getUserMedia`) exclusivamente a conexiones **HTTPS** o `localhost`:

1. **En producción / Dokploy:** Al configurar un dominio con certificado SSL/HTTPS (Let's Encrypt), la cámara funciona inmediatamente en cualquier celular (Android y iPhone).
2. **En red local con Android (Chrome):**
   - Ve a `chrome://flags/#unsafely-treat-insecure-origin-as-secure`.
   - Activa el flag y añade la URL de tu equipo (ej. `http://192.168.0.11:8000`).
   - Reinicia Chrome en tu teléfono.
3. **Con túnel HTTPS temporal:**
   - Ejecuta en tu PC: `npx localtunnel --port 8000`
   - Abre la URL `https://...` generada en tu celular.
