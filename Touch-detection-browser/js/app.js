(function () {
	'use strict';
	window.addEventListener('load', inicializacion, false);
	window.addEventListener('resize', cambiarTamaño, false);

	var canvas = null, contexto = null;
	var anchoLogico = 0, altoLogico = 0;
	var toques = [];
	var colores = ['#16F24D', '#6DF28E', '#00E5FF', '#FFD600', '#FF4081', '#B388FF'];

	function inicializacion() {
		canvas = document.getElementById('canvas');
		contexto = canvas.getContext('2d');
		cambiarTamaño();
		habilitarEntradas();
		correr();
	}

	function cambiarTamaño() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		anchoLogico = canvas.width;
		altoLogico = canvas.height;
	}

	function correr() {
		requestAnimationFrame(correr);
		pintar(contexto);
	}

	function coordenadas(e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) * (anchoLogico / rect.width),
			y: (e.clientY - rect.top) * (altoLogico / rect.height)
		};
	}

	function pintar(c) {
		c.fillStyle = '#0D0D0D';
		c.fillRect(0, 0, anchoLogico, altoLogico);

		c.strokeStyle = 'rgba(22,242,77,0.10)';
		c.lineWidth = 1;
		var paso = 40;
		for (var gx = paso; gx < anchoLogico; gx += paso) {
			c.beginPath();
			c.moveTo(gx + 0.5, 0);
			c.lineTo(gx + 0.5, altoLogico);
			c.stroke();
		}
		for (var gy = paso; gy < altoLogico; gy += paso) {
			c.beginPath();
			c.moveTo(0, gy + 0.5);
			c.lineTo(anchoLogico, gy + 0.5);
			c.stroke();
		}

		c.strokeStyle = 'rgba(22,242,77,0.25)';
		c.beginPath();
		c.moveTo(anchoLogico / 2, 0);
		c.lineTo(anchoLogico / 2, altoLogico);
		c.stroke();
		c.beginPath();
		c.moveTo(0, altoLogico / 2);
		c.lineTo(anchoLogico, altoLogico / 2);
		c.stroke();

		c.fillStyle = 'rgba(255,255,255,0.9)';
		c.font = "14px 'Droid Sans Mono', monospace";
		var activos = 0;
		for (var i = 0; i < toques.length; i++) {
			if (toques[i]) {
				activos++;
				var t = toques[i];
				var color = colores[i % colores.length];

				c.strokeStyle = color;
				c.lineWidth = 2;
				c.beginPath();
				c.arc(t.x, t.y, 22, 0, 2 * Math.PI);
				c.stroke();

				c.fillStyle = color;
				c.beginPath();
				c.arc(t.x, t.y, 5, 0, 2 * Math.PI);
				c.fill();

				c.strokeStyle = 'rgba(255,255,255,0.35)';
				c.lineWidth = 1;
				c.beginPath();
				c.moveTo(t.x - 32, t.y);
				c.lineTo(t.x + 32, t.y);
				c.stroke();
				c.beginPath();
				c.moveTo(t.x, t.y - 32);
				c.lineTo(t.x, t.y + 32);
				c.stroke();

				c.fillStyle = color;
				c.font = "12px 'Droid Sans Mono', monospace";
				c.textAlign = 'left';
				c.fillText('dedo ' + i, t.x + 8, t.y - 26);
			}
		}

		c.textAlign = 'left';
		c.fillStyle = 'rgba(109,242,142,0.9)';
		c.font = "14px 'Droid Sans Mono', monospace";
		c.fillText('Toques: ' + activos, 12, 26);

		c.fillStyle = 'rgba(255,255,255,0.35)';
		c.font = "12px 'Droid Sans Mono', monospace";
		var linea = 44;
		for (var j = 0; j < toques.length; j++) {
			if (toques[j]) {
				var t2 = toques[j];
				var cx = (t2.x / anchoLogico * 100).toFixed(0);
				var cy = (t2.y / altoLogico * 100).toFixed(0);
				c.fillText('#' + j + '  X:' + Math.round(t2.x) + ' (' + cx + '%)  Y:' + Math.round(t2.y) + ' (' + cy + '%)', 12, linea);
				linea += 16;
			}
		}
	}

	function habilitarEntradas() {
		canvas.addEventListener('touchstart', function (evento) {
			evento.preventDefault();
			var toque = evento.changedTouches;
			for (var i = 0; i < toque.length; i++) {
				var c = coordenadas(toque[i]);
				toques[toque[i].identifier % 100] = { x: c.x, y: c.y };
			}
		}, { passive: false });

		canvas.addEventListener('touchend', function (evento) {
			var toque = evento.changedTouches;
			for (var i = 0; i < toque.length; i++) {
				toques[toque[i].identifier % 100] = null;
			}
		}, false);

		canvas.addEventListener('touchcancel', function (evento) {
			var toque = evento.changedTouches;
			for (var i = 0; i < toque.length; i++) {
				toques[toque[i].identifier % 100] = null;
			}
		}, false);

		canvas.addEventListener('touchmove', function (evento) {
			evento.preventDefault();
			var toque = evento.changedTouches;
			for (var i = 0; i < toque.length; i++) {
				var t = toques[toque[i].identifier % 100];
				if (t) {
					var c = coordenadas(toque[i]);
					t.x = c.x;
					t.y = c.y;
				}
			}
		}, { passive: false });

		canvas.addEventListener('mousedown', function (evento) {
			evento.preventDefault();
			var c = coordenadas(evento);
			toques[0] = { x: c.x, y: c.y };
		}, false);

		document.addEventListener('mousemove', function (evento) {
			if (toques[0]) {
				var c = coordenadas(evento);
				toques[0].x = c.x;
				toques[0].y = c.y;
			}
		}, false);

		document.addEventListener('mouseup', function () {
			toques[0] = null;
		}, false);
	}

	window.requestAnimationFrame = (function () {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) { window.setTimeout(callback, 17); };
	})();
})();