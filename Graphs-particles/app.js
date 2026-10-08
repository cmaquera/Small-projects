(function () {
	'use strict';
	var canvas = null, 
		ctx = null, 
		grafo = null,
		mouseX = -1000,
		mouseY = -1000; 

	function actualizarPuntero(clientX, clientY) {
		if (!canvas) return;
		var rect = canvas.getBoundingClientRect();
		mouseX = clientX - rect.left;
		mouseY = clientY - rect.top;
	}

	window.addEventListener('mousemove', function (evt) {
		actualizarPuntero(evt.clientX, evt.clientY);
	}, false);

	window.addEventListener('touchmove', function (evt) {
		if (evt.touches.length > 0) {
			actualizarPuntero(evt.touches[0].clientX, evt.touches[0].clientY);
		}
	}, { passive: true });

	window.addEventListener('touchend', function () {
		mouseX = -1000;
		mouseY = -1000;
	}, false);

	function paint() { 
		ctx.fillStyle = '#0D0D0D'; 
		ctx.fillRect(0, 0, canvas.width, canvas.height); 
		grafo.dibujarGrafo(ctx);

		if (mouseX > 0 && mouseY > 0) {
			ctx.strokeStyle = 'rgba(22,242,77,0.45)';
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			ctx.arc(mouseX, mouseY, 120, 0, 2 * Math.PI);
			ctx.stroke();
		}
	} 

	function act() {
		grafo.moverNodos(canvas.width, canvas.height, mouseX, mouseY);
	} 

	function run() { 
		window.requestAnimationFrame(run); 
		act(); 
		paint(); 
	} 

	function resize() {
		if (!canvas) return;
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
	}

	function init() { 
		canvas = document.getElementById('canvas'); 
		ctx = canvas.getContext('2d');
		resize();

		grafo = new Grafo();
		grafo.inicializar();

		window.addEventListener('resize', resize, false);
		run();
	} 

	window.addEventListener('load', init, false);
}());