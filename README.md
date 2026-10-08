# Small Projects Monorepo 🚀

> Colección interactiva de mini proyectos web, experimentos visuales en Canvas 2D, motores de física, algoritmos de grafos, juegos multijugador en tiempo real con WebSockets y soporte completo para Docker y Dokploy.

Desarrollado y mantenido por **[Cesar Maquera (CMaquera)](https://github.com/cmaquera)**.

---

## 🌟 Características Principales

- **Arquitectura de Gateway Unificado (Single-Port):** Todos los proyectos, WebSockets y scripts PHP se sirven a través de un único puerto (`8000` por defecto), eliminando la dispersión visual de puertos.
- **WebSockets en Tiempo Real:** Servidor Socket.io centralizado con namespaces dedicados (`/shoot` para juegos y `/streaming` para video en vivo).
- **Proxy PHP Transparente:** Soporte integrado para procesar formularios y scripts `*.php` mediante un subproceso interno de PHP CLI sin exponer puertos adicionales.
- **Diseño Retro Cyberpunk Homologado:** Interfaz unificada con tipografía monospace (`Droid Sans Mono`), tema oscuro `#0D0D0D` y acentos verde neón `#16F24D` compartidos mediante `shared.css`.
- **Compatibilidad Móvil (Touch & Sensores):** Proyectos optimizados para pantallas táctiles, acelerómetro y giroscopio móvil.
- **Listo para Docker y Dokploy:** Incluye `Dockerfile` basado en Alpine Linux con Node.js y PHP, `docker-compose.yml`, `HEALTHCHECK` dinámico y soporte automático de HTTPS con Traefik.

---

## 📁 Catálogo de Proyectos Incluidos

| Proyecto | Carpeta | Tecnologías | Descripción |
| :--- | :--- | :--- | :--- |
| **Catálogo Principal** | `/` | HTML5, CSS3, JS | Panel central con buscador dinámico, etiquetas y diseño terminal homologado. |
| **Multiplayer Shoot Game** | `Multiplayer-shoot-game/` | Canvas, Node.js, Socket.io | Juego de disparos multijugador 2D en tiempo real (600x400) con HUD retro, marcador dinámico y controles táctiles. |
| **Streaming Socket.io** | `Streaming-Socket.io/` | WebRTC, Canvas, Socket.io | Transmisión de video de cámara en vivo y recepción cliente-servidor con sincronización de aspecto nativo y panel dual. |
| **Graphs & Particles** | `Graphs-particles/` | Canvas 2D, Matemáticas | Simulación de red de partículas y grafos interconectados con líneas luminosas y repulsión táctil/cursor. |
| **Box2D Esferas** | `Box2D-esferas/` | Box2D.js, Canvas | Simulación física de cuerpos rígidos, gravedad y colisiones de esferas interactivas. |
| **Platformer Game** | `Platformer-game-phaser/` | Phaser 2D, Canvas | Juego clásico de plataformas 2D con recolección de monedas, puntuación, victoria y controles táctiles en pantalla. |
| **Ford-Fulkerson** | `Ford-fulkerson/` | Grafos, Canvas 2D | Visualizador paso a paso del algoritmo de flujo máximo en redes de transporte y caminos aumentantes. |
| **Motion Detection** | `Motion-detection-browser/` | DeviceOrientation API | Detección de giroscopio y acelerómetro móvil para mover esferas mediante la inclinación física del celular. |
| **Touch Detection** | `Touch-detection-browser/` | Touch Events API | Panel interactivo de coordenadas y detección multitáctil simultánea en pantallas móviles. |
| **Mouse Detection** | `Mouse-detection-browser/` | Canvas 2D, Mouse Tracking | Mira táctica de seguimiento y coordenadas del cursor en tiempo real. |
| **Partículas JS** | `Particulas-JS/` | Canvas 2D puro | Generador dinámico de partículas con trayectorias de física y expansión. |
| **Formularios PHP Ajax** | `Formularios-PHP-Ajax/` | PHP 8, Fetch API, AJAX | Envío y procesamiento de formularios mediante POST tradicional y peticiones asíncronas JSON. |

---

## 🛠️ Requisitos Previos

- **Node.js** v18 o superior.
- **npm** v9 o superior.
- *(Opcional)* **PHP CLI** (v7.4 o v8.x) si deseas ejecutar peticiones `.php` en tu máquina local sin Docker. Si usas Docker, PHP ya viene incluido automáticamente.

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/cmaquera/Small-projects.git
cd Small-projects
```

### 2. Instalar dependencias del Gateway
```bash
npm install
```

### 3. Iniciar el servidor unificado
```bash
npm start
```

### 4. Abrir en el navegador
- **Desde tu PC:** [http://localhost:8000](http://localhost:8000)
- **Desde tu Celular (misma red Wi-Fi):** `http://<TU_IP_LOCAL>:8000` *(ejemplo: `http://192.168.0.11:8000`)*.

---

## ⚙️ Variables de Entorno

El proyecto incluye un archivo de referencia [.env.example](.env.example):

| Variable | Valor por Defecto | Descripción |
| :--- | :--- | :--- |
| **`PORT`** | `8000` | Puerto principal donde escucha Express (catálogo, estáticos y WebSockets). |
| **`PHP_PORT`** | `8999` | Puerto interno exclusivo para el proxy de scripts PHP CLI (`*.php`). |

---

## 🐳 Despliegue con Docker

### Usando Docker Compose
```bash
# Construir y levantar el contenedor en segundo plano:
docker compose up -d --build

# Ver logs en tiempo real:
docker compose logs -f

# Detener el contenedor:
docker compose down
```

El servicio estará disponible de inmediato en [http://localhost:8000](http://localhost:8000).

---

## ☁️ Despliegue en Dokploy

El proyecto está 100% optimizado para desplegarse en **[Dokploy](https://dokploy.com)**:

1. **Crear Aplicación en Dokploy:**
   - En tu panel de Dokploy, crea una nueva aplicación enlazada a tu repositorio de GitHub.
   - Selecciona **Build Type:** `Dockerfile` (detectará automáticamente el [Dockerfile](Dockerfile) optimizado con Alpine, Node 20 y PHP).
2. **Configurar Puerto y Dominio:**
   - En **Port / General:** ingresa `8000` (o el valor que definas en la variable `PORT`).
   - En **Domains:** añade tu dominio (ej. `proyectos.tudominio.com`) y activa el certificado **HTTPS con Let's Encrypt**.
3. **Desplegar:**
   - Haz clic en **Deploy**.
   - Dokploy compilará el contenedor, configurará Traefik para gestionar los WebSockets (`Upgrade: websocket`) y habilitará el monitoreo de salud mediante `/health`.

> [!TIP]
> **Cámara y WebRTC en Celulares con Dokploy:**
> Las políticas de seguridad web (`Secure Contexts`) impiden el uso de `getUserMedia` (cámara) en conexiones móviles HTTP con IP local. Al desplegar en Dokploy bajo un dominio con HTTPS, la cámara funcionará automáticamente en cualquier teléfono (Android y iPhone) sin configuraciones adicionales.

---

## 🧪 Estructura del Repositorio

```text
Small-projects/
├── Box2D-esferas/            # Simulación física con Box2D
├── Ford-fulkerson/           # Visualizador de grafos y flujo máximo
├── Formularios-PHP-Ajax/     # Formularios tradicionales y AJAX con PHP
├── Graphs-particles/         # Red de partículas interconectadas
├── Motion-detection-browser/ # Sensores de movimiento móvil (acelerómetro/giroscopio)
├── Mouse-detection-browser/  # Seguimiento del cursor en Canvas
├── Multiplayer-shoot-game/   # Juego multijugador WebSocket (600x400)
├── Particulas-JS/            # Efectos visuales de partículas 2D
├── Platformer-game-phaser/   # Juego de plataformas 2D en Phaser
├── Streaming-Socket.io/      # Transmisión y recepción de video WebSocket
├── Touch-detection-browser/  # Detección multitáctil en pantalla
├── shared.css                # Hoja de estilos global homologada (Cyberpunk retro)
├── index.html                # Catálogo interactivo principal
├── server.js                 # Gateway central Express + Socket.io + Proxy PHP
├── Dockerfile                # Imagen Docker multi-lenguaje (Node 20 + PHP)
├── docker-compose.yml        # Orquestación de Docker en puerto único
├── .dockerignore             # Exclusiones de construcción Docker
├── .env.example              # Plantilla de variables de entorno
└── package.json              # Configuración y dependencias raíz de Node.js
```

---

## 👤 Autor

- **Cesar Maquera** - [GitHub (@cmaquera)](https://github.com/cmaquera)

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el código fuente para más detalles.
