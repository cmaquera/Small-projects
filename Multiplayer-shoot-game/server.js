/*jslint bitwise: true */
/*global console, process, require */
(function () {
    'use strict';
    var serverPort = process.env.PORT || 1337,
        server = null,
        io = null,
        nSight = 0,
        gameEnd = 0,
        canvasWidth = 600,
        canvasHeight = 400,
        players = [],
        stack = [],
        target = null;

    function Circle(x, y, radius) {
        this.x = (x === undefined) ? 0 : x;
        this.y = (y === undefined) ? 0 : y;
        this.radius = (radius === undefined) ? 0 : radius;
    }

    Circle.prototype = {
        constructor: Circle,
        
        distance: function (circle) {
            if (circle !== undefined) {
                var dx = this.x - circle.x,
                    dy = this.y - circle.y;
                return (Math.sqrt(dx * dx + dy * dy) - (this.radius + circle.radius));
            }
            return Infinity;
        }
    };

    function random(max) {
        return ~~(Math.random() * max);
    }

    function reposicionarTarget() {
        var margen = target.radius + 10;
        var anchoUtil = canvasWidth - margen * 2;
        var altoUtil = canvasHeight - margen * 2;
        target.x = margen + random(anchoUtil);
        target.y = margen + random(altoUtil);
    }

    function act(player) {
        var now = Date.now();
        if (gameEnd - now < -1000) {
            gameEnd = now + 15000;
            io.sockets.emit('gameEnd', {time: gameEnd});
            reposicionarTarget();
            io.sockets.emit('target', {x: target.x, y: target.y});
        } else if (gameEnd - now > 0) {
            if (players[player] && players[player].distance(target) < 0) {
                io.sockets.emit('score', {id: player, score: 1});
                reposicionarTarget();
                io.sockets.emit('target', {x: target.x, y: target.y});
            }
        }
    }

    var http = require('http'),
        fs = require('fs'),
        path = require('path'),        
        contentTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".ico": "image/x-icon",
            ".m4a": "audio/mp4",
            ".oga": "audio/ogg"
        };

    var baseDir = __dirname;

    function MyServer(request, response) {
        var cleanUrl = request.url.split('?')[0];
        if (cleanUrl === '/' || cleanUrl === '') {
            cleanUrl = '/index.html';
        }

        if (cleanUrl === '/shared.css' || cleanUrl === '../shared.css' || path.basename(cleanUrl) === 'shared.css') {
            var sharedCssPath = path.join(__dirname, '..', 'shared.css');
            fs.readFile(sharedCssPath, function (err, content) {
                if (err) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('shared.css not found');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/css' });
                    response.end(content);
                }
            });
            return;
        }

        var safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
        var filePath = path.join(baseDir, safePath);

        if (!filePath.startsWith(baseDir)) {
            response.writeHead(403, { 'Content-Type': 'text/plain' });
            response.end('403 Forbidden');
            return;
        }

        var extname = path.extname(filePath);
        var contentType = contentTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code === 'ENOENT') {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end('<h1>404 Not Found</h1>');
                } else {
                    response.writeHead(500, { 'Content-Type': 'text/html' });
                    response.end('<h1>500 Internal Server Error</h1>');
                }
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content);
            }
        });
    }

    target = new Circle(300, 200, 20);

    server = require('http').createServer(MyServer);
    server.listen(serverPort, function () {
        console.log('Multiplayer shoot game escuchando en http://localhost:' + serverPort);
    });

    io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        if (stack.length) {
            socket.player = stack.pop();
        } else {
            socket.player = nSight;
            nSight += 1;
        }
        players[socket.player] = new Circle(0, 0, 10);
        socket.emit('me', {id: socket.player});
        socket.emit('target', {x: target.x, y: target.y});
        if (gameEnd > Date.now()) {
            socket.emit('gameEnd', {time: gameEnd});
        }
        io.sockets.emit('sight', {id: socket.player, x: 0, y: 0});
        console.log(socket.id  + ' conectado como jugador ' + socket.player);

        socket.on('mySight', function (sight) {
            if (players[socket.player]) {
                players[socket.player].x = sight.x;
                players[socket.player].y = sight.y;
            }
            if (sight.lastPress === 1) {
                act(socket.player);
            }
            io.sockets.emit('sight', {id: socket.player, x: sight.x, y: sight.y, lastPress: sight.lastPress});
        });

        socket.on('disconnect', function () {
            io.sockets.emit('sight', {id: socket.player, x: null, y: null});
            console.log('Jugador ' + socket.player + ' desconectado.');
            if (io.sockets.clients().length <= 1) {
                stack.length = 0;
                nSight = 0;
                console.log('Reiniciadas miras a cero.');
            } else {
                stack.push(socket.player);
            }
        });
    });
}());