var canvas = null, 
	ctx = null, 
	x = 50, 
	y = 50, 
	grafo = null,
	mouseX = -1000,
	mouseY = -1000; 

window.requestAnimationFrame = (function () { 
	return window.requestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	function (callback) { 
		window.setTimeout(callback, 17); 
	}; 
}()); 

window.addEventListener('mousemove', function(evt){
	var rect = canvas.getBoundingClientRect();
	mouseX = evt.clientX - rect.left;
	mouseY = evt.clientY - rect.top;
}, false);


function paint(ctx) { 
	ctx.fillStyle = '#0D0D0D'; 
	ctx.fillRect(0, 0, canvas.width, canvas.height); 
	grafo.dibujarGrafo(ctx);

	ctx.strokeStyle = 'rgba(22,242,77,0.5)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(mouseX, mouseY, 120, 0, 2*Math.PI);
	ctx.stroke();
	ctx.lineWidth = 1;
} 

function act() {
	grafo.moverNodos(canvas.width, canvas.height, mouseX, mouseY);

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