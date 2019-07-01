//creacion de la clase grafo
function Nodo(x, y, radio){
	this.radio = radio,
	this.x = x;
	this.y = y;
	this.desx = (Math.random(0,1) > 0.5) ? 1 : -1;
	this.desy = (Math.random(0,1) > 0.5) ? 1 : -1;
}

Nodo.prototype.mover = function(limitex, limitey){
	this.x = this.x + this.desx;
	this.y = this.y + this.desy;

	if(this.x < 0) this.x = limitex;
	if(this.y < 0) this.y = limitey;
	if(this.x > limitex) this.x = 0;
	if(this.y > limitey) this.y = 0;
};

Nodo.prototype.dibujar = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
	ctx.stroke();
};

function Arista(nodoi, nodof){
	this.nodof = nodof;
	this.nodoi = nodoi;
}

Arista.prototype.dibujar = function(ctx){
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(this.nodoi.x,this.nodoi.y);
	ctx.lineTo(this.nodof.x,this.nodof.y);
	ctx.stroke();
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

Grafo.prototype.moverNodos = function(limitex, limitey){
	for(var i= 0; i< this.listaNodos.length; i++){
		this.listaNodos[i].mover(limitex, limitey);
	}
};