//creacion de la clase grafo
var RADIO_INFLUENCIA_MOUSE = 120;   //radio en el que el mouse afecta a los nodos
var FUERZA_REPULSION = 8;           //intensidad con la que el mouse aparta los nodos

var PALETA = ['#16F24D', '#4FC3F7', '#FF6B6B', '#FFD93D', '#B388FF', '#FF8A65', '#4DD8B5', '#F48FB1'];

function Nodo(x, y, radio){
	this.radio = radio,
	this.x = x;
	this.y = y;
	this.desx = (Math.random(0,1) > 0.5) ? 1 : -1;
	this.desy = (Math.random(0,1) > 0.5) ? 1 : -1;
	this.color = PALETA[Math.floor(Math.random() * PALETA.length)];
}

Nodo.prototype.mover = function(limitex, limitey, mx, my){
	this.x = this.x + this.desx;
	this.y = this.y + this.desy;

	if(mx !== undefined && my !== undefined){
		var dx = this.x - mx;
		var dy = this.y - my;
		var dist = Math.sqrt(dx*dx + dy*dy);
		if(dist < RADIO_INFLUENCIA_MOUSE && dist > 0){
			var fuerza = (RADIO_INFLUENCIA_MOUSE - dist) / RADIO_INFLUENCIA_MOUSE;
			this.x += (dx/dist) * fuerza * FUERZA_REPULSION;
			this.y += (dy/dist) * fuerza * FUERZA_REPULSION;
		}
	}

	if(this.x < 0){ this.x = 0; this.desx = Math.abs(this.desx); }
	if(this.y < 0){ this.y = 0; this.desy = Math.abs(this.desy); }
	if(this.x > limitex){ this.x = limitex; this.desx = -Math.abs(this.desx); }
	if(this.y > limitey){ this.y = limitey; this.desy = -Math.abs(this.desy); }
};

Nodo.prototype.dibujar = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.strokeStyle = 'rgba(255,255,255,0.45)';
	ctx.lineWidth = 1;
	ctx.stroke();
};

function Arista(nodoi, nodof){
	this.nodof = nodof;
	this.nodoi = nodoi;
}

Arista.prototype.dibujar = function(ctx){
	ctx.globalAlpha = 0.35;
	ctx.strokeStyle = this.nodoi.color;
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.nodoi.x,this.nodoi.y);
	ctx.lineTo(this.nodof.x,this.nodof.y);
	ctx.stroke();
	ctx.globalAlpha = 1;
};


function Grafo(){
	//this.vertice = vertice;
	this.listaNodos = [];
	this.listaAristas = [];
	this.listaAdiaciencia = [];
}

Grafo.prototype.agregarNodo = function(x,y,radio){
	var objtem = new Nodo(x,y, radio);
	this.listaNodos.push(objtem);
};

Grafo.prototype.generarListaAdiaciencia = function(){
	for(var i=0; i< this.listaNodos.length; i++){
		this.listaAdiaciencia[i] = [];
		for(var j=0; j< this.listaNodos.length; j++){
			var a = this.listaNodos[i].x-this.listaNodos[j].x;
			var b = this.listaNodos[i].y-this.listaNodos[j].y;
			var dis = Math.sqrt(Math.abs(a*a) + Math.abs(b*b));
			if(i != j && dis < 50){
				this.listaAdiaciencia[i][j] = 1;
				//Math.round(Math.random()/1.7)
			}
			else this.listaAdiaciencia[i][j] = 0;
		}
	}
};

Grafo.prototype.agregarAristas = function(){
	for(var i=0; i< this.listaNodos.length; i++){
		for(var j=0; j < this.listaNodos.length; j++){
			if(this.listaAdiaciencia[i][j] == 1){
				var objtem = new Arista(this.listaNodos[i], this.listaNodos[j]);
				this.listaAristas.push(objtem);
			}
		}
	}
};

Grafo.prototype.actualizarAristas = function(){
	var nuevaListaAristas = [];
	for(var i=0; i< this.listaNodos.length; i++){
		for(var j=0; j < this.listaNodos.length; j++){
			if(this.listaAdiaciencia[i][j] == 1){
				var objtem = new Arista(this.listaNodos[i], this.listaNodos[j]);
				nuevaListaAristas.push(objtem);
			}
		}
	}

	this.listaAristas.splice(0, this.length);
	this.listaAristas = nuevaListaAristas;
}

Grafo.prototype.dibujarGrafo = function(ctx){
	for(var i = 0; i < this.listaAristas.length; i++){
		this.listaAristas[i].dibujar(ctx);
	}

	for(var i = 0; i < this.listaNodos.length; i++){
		this.listaNodos[i].dibujar(ctx);
	}
};

Grafo.prototype.inicializar = function(){
	for(var i = 0; i < 500; i++){
		var posx = Math.floor(Math.random() * window.innerWidth) +1;
		var posy = Math.floor(Math.random() * window.innerHeight) +1;
		
		this.agregarNodo(posx, posy, 5);
	}

	this.generarListaAdiaciencia();

	this.agregarAristas();
};

Grafo.prototype.moverNodos = function(limitex, limitey, mx, my){
	for(var i= 0; i< this.listaNodos.length; i++){
		this.listaNodos[i].mover(limitex, limitey, mx, my);
	}
};