(function () {
    'use strict';

    // Definición de la librería de Box2D
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
        b2World = Box2D.Dynamics.b2World,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

    var canvasDebug = document.getElementById('canvas-debug');
    var contadorEsferas = document.getElementById('contador-esferas');
    var btnLimpiar = document.getElementById('btn-limpiar');

    var ancho = canvasDebug.width;
    var alto = canvasDebug.height;

    // Creación del mundo Box2D
    var gravedad = new b2Vec2(0, 20);
    var mundo = new b2World(gravedad, true);

    var muros = [];
    var esferas = [];

    // Generación de paredes estáticas
    var dimensionesPared = [
        { x: ancho / 2, y: alto,     w: ancho / 2, h: 2 },   // Suelo
        { x: 0,         y: alto / 2, w: 2,         h: alto },// Izquierda
        { x: ancho,     y: alto / 2, w: 2,         h: alto },// Derecha
        { x: 200,       y: 300,      w: 50,        h: 10 },  // Plataforma izquierda
        { x: 400,       y: 300,      w: 50,        h: 10 },  // Plataforma derecha
        { x: 300,       y: 200,      w: 50,        h: 10 }   // Plataforma central
    ];

    for (var i = 0; i < dimensionesPared.length; i++) {
        var defPared = new b2BodyDef();
        defPared.type = b2Body.b2_staticBody;
        defPared.position.Set(dimensionesPared[i].x / 30, dimensionesPared[i].y / 30);

        var fixture = new b2FixtureDef();
        fixture.density = 10;
        fixture.friction = 0.5;
        fixture.restitution = 0.9;
        fixture.shape = new b2PolygonShape();
        fixture.shape.SetAsBox(dimensionesPared[i].w / 30, dimensionesPared[i].h / 30);

        var muro = mundo.CreateBody(defPared);
        muro.CreateFixture(fixture);
        muros.push(muro);
    }

    // Configuración de visualización de depuración
    var dibujarDebug = new b2DebugDraw();
    dibujarDebug.SetSprite(canvasDebug.getContext('2d'));
    dibujarDebug.SetDrawScale(30);
    dibujarDebug.SetFillAlpha(0.35);
    dibujarDebug.SetLineThickness(1.5);
    dibujarDebug.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    mundo.SetDebugDraw(dibujarDebug);

    function actualizarContador() {
        if (contadorEsferas) {
            contadorEsferas.textContent = 'Esferas: ' + esferas.length;
        }
    }

    function crearEsfera(clientX, clientY) {
        var rect = canvasDebug.getBoundingClientRect();
        var scaleX = canvasDebug.width / rect.width;
        var scaleY = canvasDebug.height / rect.height;
        var mousex = (clientX - rect.left) * scaleX;
        var mousey = (clientY - rect.top) * scaleY;

        var defEsfera = new b2BodyDef();
        defEsfera.type = b2Body.b2_dynamicBody;
        defEsfera.position.Set(mousex / 30, mousey / 30);

        var fixture = new b2FixtureDef();
        fixture.density = 10;
        fixture.friction = 0.5;
        fixture.restitution = 0.8;
        fixture.shape = new b2CircleShape(10 / 30);

        var esfera = mundo.CreateBody(defEsfera);
        esfera.CreateFixture(fixture);

        var factorVelocidad = 10;
        var aleatorioVelocidad = Math.round(Math.random() * factorVelocidad * 2) - factorVelocidad;
        var velocidad = new b2Vec2(aleatorioVelocidad, 0);
        esfera.SetLinearVelocity(velocidad);

        esferas.push(esfera);

        // Limitar a máximo 80 esferas simultáneas para preservar rendimiento
        if (esferas.length > 80) {
            var vieja = esferas.shift();
            mundo.DestroyBody(vieja);
        }

        actualizarContador();
    }

    function limpiarEsferas() {
        for (var k = 0; k < esferas.length; k++) {
            mundo.DestroyBody(esferas[k]);
        }
        esferas = [];
        actualizarContador();
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarEsferas);
    }

    canvasDebug.addEventListener('click', function (evento) {
        crearEsfera(evento.clientX, evento.clientY);
    });

    canvasDebug.addEventListener('touchstart', function (evento) {
        if (evento.touches.length > 0) {
            crearEsfera(evento.touches[0].clientX, evento.touches[0].clientY);
            evento.preventDefault();
        }
    }, { passive: false });

    // Bucle de física con requestAnimationFrame y paso de tiempo fijo
    var ultimoTiempo = performance.now();
    var pasoFijo = 1 / 60;

    function animar(tiempoActual) {
        window.requestAnimationFrame(animar);

        var delta = (tiempoActual - ultimoTiempo) / 1000;
        if (delta > 0.1) delta = 0.1;
        ultimoTiempo = tiempoActual;

        mundo.Step(pasoFijo, 10, 10);
        mundo.DrawDebugData();
        mundo.ClearForces();
    }

    window.requestAnimationFrame(animar);
}());
