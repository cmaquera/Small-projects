var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors'); // opcional
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3737;

app.get(['/shared.css', '*/shared.css'], function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'shared.css'));
});

app.use(express.static(__dirname));

// Permitir CORS para cuando se cargue desde el puerto 8000 de PHP
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

function broadcastViewerCount() {
    var count = io.engine ? io.engine.clientsCount : 0;
    io.emit('clientCount', count);
}

io.on('connection', function (socket) {
    console.log('Cliente conectado: ' + socket.id);
    broadcastViewerCount();

    socket.on('newFrame', function (img) {
        // Retransmite el fotograma a todos los demás clientes y al emisor
        io.emit('setFrame', img);
    });

    socket.on('disconnect', function () {
        console.log('Cliente desconectado: ' + socket.id);
        broadcastViewerCount();
    });
});

server.listen(port, function () {
    console.log("Servidor de Streaming Socket.io activo en http://localhost:" + port);
});