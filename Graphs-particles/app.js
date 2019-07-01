var canvas = null, 
	ctx = null, 
	x = 50, 
	y = 50, 
	grafo = null; 

window.requestAnimationFrame = (function () { 
	return window.requestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	function (callback) { 
		window.setTimeout(callback, 17); 
	}; 
}()); 


function paint(ctx) { 
	ctx.fillStyle = '#fff'; 
	ctx.fillRect(0, 0, canvas.width, canvas.height); 
	grafo.dibujarGrafo(ctx);
} 

function act() {
	grafo.moverNodos(canvas.width, canvas.height);

	grafo.generarListaAdiaciencia();
	grafo.actualizarAristas();
} 

function run() { 
	window.requestAnimationFrame(run); 
	act(); 
	paint(ctx); 
} 

function init() { 
	canvas = document.getElementById('canvas'); 
	ctx = canvas.getContext('2d');
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	grafo = new Grafo();
	grafo.inicializar();

	run();
}

window.addEventListener('load', init, false);