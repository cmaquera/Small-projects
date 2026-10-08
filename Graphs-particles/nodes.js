// Sistema de nodos y grafos para canvas
var RADIO_INFLUENCIA_MOUSE = 120;   // radio en el que el mouse afecta a los nodos
var FUERZA_REPULSION = 8;           // intensidad con la que el mouse aparta los nodos
var DISTANCIA_CONEXION_MAX = 70;    // distancia máxima para trazar arista
var DIST_MAX_SQ = DISTANCIA_CONEXION_MAX * DISTANCIA_CONEXION_MAX;

var PALETA = ['#16F24D', '#4FC3F7', '#FF6B6B', '#FFD93D', '#B388FF', '#FF8A65', '#4DD8B5', '#F48FB1'];

function Nodo(x, y, radio) {
	this.radio = radio;
	this.x = x;
	this.y = y;
	this.desx = (Math.random() > 0.5) ? 1 : -1;
	this.desy = (Math.random() > 0.5) ? 1 : -1;
	this.color = PALETA[Math.floor(Math.random() * PALETA.length)];
}

Nodo.prototype.mover = function(limitex, limitey, mx, my) {
	this.x += this.desx;
	this.y += this.desy;

	if (mx !== undefined && my !== undefined && mx > 0 && my > 0) {
		var dx = this.x - mx;
		var dy = this.y - my;
		var distSq = dx * dx + dy * dy;
		if (distSq < RADIO_INFLUENCIA_MOUSE * RADIO_INFLUENCIA_MOUSE && distSq > 0) {
			var dist = Math.sqrt(distSq);
			var fuerza = (RADIO_INFLUENCIA_MOUSE - dist) / RADIO_INFLUENCIA_MOUSE;
			this.x += (dx / dist) * fuerza * FUERZA_REPULSION;
			this.y += (dy / dist) * fuerza * FUERZA_REPULSION;
		}
	}

	if (this.x < 0) { this.x = 0; this.desx = Math.abs(this.desx); }
	if (this.y < 0) { this.y = 0; this.desy = Math.abs(this.desy); }
	if (this.x > limitex) { this.x = limitex; this.desx = -Math.abs(this.desx); }
	if (this.y > limitey) { this.y = limitey; this.desy = -Math.abs(this.desy); }
};

Nodo.prototype.dibujar = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.strokeStyle = 'rgba(255,255,255,0.45)';
	ctx.lineWidth = 1;
	ctx.stroke();
};

function Grafo() {
	this.listaNodos = [];
}

Grafo.prototype.agregarNodo = function(x, y, radio) {
	this.listaNodos.push(new Nodo(x, y, radio));
};

Grafo.prototype.inicializar = function() {
	this.listaNodos = [];
	var cantidadNodos = Math.min(160, Math.floor((window.innerWidth * window.innerHeight) / 7000));
	cantidadNodos = Math.max(60, cantidadNodos);

	for (var i = 0; i < cantidadNodos; i++) {
		var posx = Math.floor(Math.random() * window.innerWidth);
		var posy = Math.floor(Math.random() * window.innerHeight);
		this.agregarNodo(posx, posy, 4);
	}
};

Grafo.prototype.moverNodos = function(limitex, limitey, mx, my) {
	for (var i = 0; i < this.listaNodos.length; i++) {
		this.listaNodos[i].mover(limitex, limitey, mx, my);
	}
};

Grafo.prototype.dibujarGrafo = function(ctx) {
	var nodos = this.listaNodos;
	var len = nodos.length;

	// Dibujar aristas con opacidad basada en distancia
	for (var i = 0; i < len; i++) {
		var ni = nodos[i];
		for (var j = i + 1; j < len; j++) {
			var nj = nodos[j];
			var dx = ni.x - nj.x;
			var dy = ni.y - nj.y;
			var distSq = dx * dx + dy * dy;

			if (distSq < DIST_MAX_SQ) {
				var alpha = (1 - (Math.sqrt(distSq) / DISTANCIA_CONEXION_MAX)) * 0.45;
				ctx.strokeStyle = ni.color;
				ctx.globalAlpha = alpha;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(ni.x, ni.y);
				ctx.lineTo(nj.x, nj.y);
				ctx.stroke();
			}
		}
	}
	ctx.globalAlpha = 1;

	// Dibujar nodos
	for (var k = 0; k < len; k++) {
		nodos[k].dibujar(ctx);
	}
};