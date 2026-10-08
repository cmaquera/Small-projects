const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const PHP_PORT = process.env.PHP_PORT || 8999;

// Iniciar servidor interno de PHP para procesar .php de forma transparente si PHP está instalado
let phpProcess = null;
try {
    phpProcess = spawn('php', ['-S', `127.0.0.1:${PHP_PORT}`], {
        cwd: __dirname,
        stdio: 'ignore'
    });
    phpProcess.on('error', () => {
        console.log('[Gateway] PHP no detectado en PATH; peticiones .php funcionarán en modo estático.');
        phpProcess = null;
    });
} catch (e) {
    phpProcess = null;
}

// Proxy transparente para archivos .php (ej. Formularios-PHP-Ajax)
app.all('*.php', (req, res) => {
    if (!phpProcess) {
        return res.status(503).send('PHP no está disponible en este entorno.');
    }

    const options = {
        hostname: '127.0.0.1',
        port: PHP_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
        res.status(502).send('Error conectando con el intérprete PHP: ' + err.message);
    });

    req.pipe(proxyReq, { end: true });
});

// Endpoint de salud para Dokploy y Docker
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        phpEnabled: !!phpProcess
    });
});

// Servir shared.css sin importar desde qué subruta relativa se solicite
app.get(['/shared.css', '*/shared.css', '../shared.css'], (req, res) => {
    res.sendFile(path.join(__dirname, 'shared.css'));
});

// Servir todos los archivos estáticos desde la raíz
app.use(express.static(__dirname));

// Configurar Socket.io sobre el mismo servidor HTTP
const io = new Server(server, {
    cors: { origin: '*' }
});

// ==============================================================
// 1. Módulo Multiplayer Shoot Game (Namespace: /shoot)
// ==============================================================
const shootIo = io.of('/shoot');
const shootCanvasWidth = 600;
const shootCanvasHeight = 400;
const shootPlayers = [];
const shootStack = [];
let shootNSight = 0;
let shootGameEnd = 0;
const shootTarget = { x: 300, y: 200, radius: 20 };

function reposicionarTarget() {
    const margen = shootTarget.radius + 10;
    shootTarget.x = margen + Math.floor(Math.random() * (shootCanvasWidth - margen * 2));
    shootTarget.y = margen + Math.floor(Math.random() * (shootCanvasHeight - margen * 2));
}

function shootAct(player) {
    const now = Date.now();
    if (shootGameEnd - now < -1000) {
        shootGameEnd = now + 15000;
        shootIo.emit('gameEnd', { time: shootGameEnd });
        reposicionarTarget();
        shootIo.emit('target', { x: shootTarget.x, y: shootTarget.y });
    } else if (shootGameEnd - now > 0) {
        const p = shootPlayers[player];
        if (p) {
            const dx = p.x - shootTarget.x;
            const dy = p.y - shootTarget.y;
            const dist = Math.sqrt(dx * dx + dy * dy) - (10 + shootTarget.radius);
            if (dist < 0) {
                shootIo.emit('score', { id: player, score: 1 });
                reposicionarTarget();
                shootIo.emit('target', { x: shootTarget.x, y: shootTarget.y });
            }
        }
    }
}

shootIo.on('connection', (socket) => {
    const player = shootStack.length ? shootStack.pop() : shootNSight++;
    socket.player = player;
    shootPlayers[player] = { x: 0, y: 0 };

    socket.emit('me', { id: player });
    socket.emit('target', { x: shootTarget.x, y: shootTarget.y });
    if (shootGameEnd > Date.now()) {
        socket.emit('gameEnd', { time: shootGameEnd });
    }
    shootIo.emit('sight', { id: player, x: 0, y: 0 });
    console.log(`[Shoot Game] Jugador ${player} conectado (${socket.id})`);

    socket.on('mySight', (sight) => {
        if (shootPlayers[socket.player]) {
            shootPlayers[socket.player].x = sight.x;
            shootPlayers[socket.player].y = sight.y;
        }
        if (sight.lastPress === 1) {
            shootAct(socket.player);
        }
        shootIo.emit('sight', { id: socket.player, x: sight.x, y: sight.y, lastPress: sight.lastPress });
    });

    socket.on('disconnect', () => {
        shootIo.emit('sight', { id: socket.player, x: null, y: null });
        console.log(`[Shoot Game] Jugador ${socket.player} desconectado`);
        if (shootIo.sockets.size <= 1) {
            shootStack.length = 0;
            shootNSight = 0;
        } else {
            shootStack.push(socket.player);
        }
    });
});

// ==============================================================
// 2. Módulo Streaming Video (Namespace: /streaming)
// ==============================================================
const streamIo = io.of('/streaming');

streamIo.on('connection', (socket) => {
    console.log(`[Streaming] Cliente conectado (${socket.id})`);
    streamIo.emit('clientCount', streamIo.sockets.size);

    socket.on('newFrame', (frameData) => {
        // Retransmite a todos los clientes del namespace streaming
        streamIo.emit('setFrame', frameData);
    });

    socket.on('disconnect', () => {
        console.log(`[Streaming] Cliente desconectado (${socket.id})`);
        streamIo.emit('clientCount', streamIo.sockets.size);
    });
});

// Iniciar servidor unificado en 0.0.0.0 (accesible desde localhost y red local / celular)
server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`  Small-Projects Unified Gateway Activo`);
    console.log(`  Local: http://localhost:${PORT}`);
    console.log(`  Todos los proyectos y WebSockets en un solo puerto (${PORT})`);
    console.log(`=======================================================`);
});

// Limpieza y apagado ordenado (Dokploy / Docker SIGTERM y SIGINT)
const gracefulShutdown = () => {
    console.log('[Gateway] Deteniendo servidor y procesos asociados...');
    if (phpProcess) {
        try { phpProcess.kill(); } catch (e) {}
    }
    server.close(() => {
        process.exit(0);
    });
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
