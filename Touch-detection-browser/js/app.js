(function () {
	'use strict';
	var canvas = null,
		ctx = null,
		W = 0,
		H = 0,
		toques = [],
		colores = ['#16F24D', '#6DF28E', '#00E5FF', '#FFD600', '#FF4081', '#B388FF'],
		accento = '#16F24D';

	function init() {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		resize();
		window.addEventListener('resize', resize, false);
		habilitarEntradas();
		pintar();
	}

	function resize() {
		W = canvas.width = window.innerWidth;
		H = canvas.height = window.innerHeight;
		pintar();
	}

	function getPos(e) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) * (W / rect.width),
			y: (e.clientY - rect.top) * (H / rect.height)
		};
	}

	function pintar() {
		if (!ctx) { return; }

		ctx.fillStyle = '#0D0D0D';
		ctx.fillRect(0, 0, W, H);

		ctx.strokeStyle = 'rgba(255,255,255,0.05)';
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (var x = 0; x < W; x += 40) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, H);
		}
		for (var y = 0; y < H; y += 40) {
			ctx.moveTo(0, y);
			ctx.lineTo(W, y);
		}
		ctx.stroke();

		ctx.strokeStyle = 'rgba(22,242,77,0.15)';
		ctx.beginPath();
		ctx.moveTo(W / 2, 0);
		ctx.lineTo(W / 2, H);
		ctx.moveTo(0, H / 2);
		ctx.lineTo(W, H / 2);
		ctx.stroke();

		var activos = 0;
		for (var i = 0; i < toques.length; i++) {
			if (!toques[i]) { continue; }
			activos++;
			var t = toques[i];
			var color = colores[i % colores.length];

			ctx.strokeStyle = 'rgba' + colorA(color, 0.25);
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(t.x, 0);
			ctx.lineTo(t.x, H);
			ctx.moveTo(0, t.y);
			ctx.lineTo(W, t.y);
			ctx.stroke();

			ctx.strokeStyle = color;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(t.x, t.y, 16, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(t.x, t.y, 4, 0, 2 * Math.PI);
			ctx.fill();

			ctx.strokeStyle = 'rgba(255,255,255,0.30)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(t.x - 16, t.y); ctx.lineTo(t.x + 16, t.y);
			ctx.moveTo(t.x, t.y - 16); ctx.lineTo(t.x, t.y + 16);
			ctx.stroke();

			ctx.fillStyle = color;
			ctx.font = 'bold 12px "Droid Sans Mono", monospace';
			ctx.textAlign = 'left';
			ctx.fillText('dedo ' + i, Math.min(t.x + 20, W - 90), Math.max(t.y - 22, 16));
		}

		ctx.textAlign = 'left';
		ctx.font = '13px "Droid Sans Mono", monospace';
		ctx.fillStyle = '#6DF28E';
		ctx.fillText('Toca la pantalla con uno o varios dedos', 16, 134);

		var anchoPanel = Math.min(360, W - 32);
		var altoPanel = 12 + 26 + 8 + 16 * activos + 10;
		var py0 = Math.max(H - altoPanel - 16, 150);
		ctx.fillStyle = 'rgba(0,0,0,0.78)';
		ctx.fillRect(16, py0, anchoPanel, altoPanel);
		ctx.strokeStyle = accento;
		ctx.lineWidth = 2;
		ctx.strokeRect(16, py0, anchoPanel, altoPanel);

		ctx.font = 'bold 18px "Droid Sans Mono", monospace';
		ctx.fillStyle = accento;
		ctx.fillText('Toques: ' + activos, 30, py0 + 26);

		ctx.font = '13px "Droid Sans Mono", monospace';
		var linea = py0 + 48;
		for (var j = 0; j < toques.length; j++) {
			if (!toques[j]) { continue; }
			var t2 = toques[j];
			var pctX = (t2.x / W * 100).toFixed(1);
			var pctY = (t2.y / H * 100).toFixed(1);
			ctx.fillStyle = colores[j % colores.length];
			ctx.fillText('#' + j + '  X:' + Math.round(t2.x) + ' Y:' + Math.round(t2.y) + '  (' + pctX + '%, ' + pctY + '%)', 30, linea);
			linea += 16;
		}
		ctx.textAlign = 'left';
	}

	function colorA(c, a) {
		var r = parseInt(c.slice(1, 3), 16),
			g = parseInt(c.slice(3, 5), 16),
			b = parseInt(c.slice(5, 7), 16);
		return '(' + r + ',' + g + ',' + b + ',' + a + ')';
	}

	function habilitarEntradas() {
		canvas.addEventListener('touchstart', function (evento) {
			evento.preventDefault();
			var ts = evento.changedTouches;
			for (var i = 0; i < ts.length; i++) {
				var c = getPos(ts[i]);
				toques[ts[i].identifier % 100] = { x: c.x, y: c.y };
			}
			pintar();
		}, { passive: false });

		canvas.addEventListener('touchmove', function (evento) {
			evento.preventDefault();
			var ts = evento.changedTouches;
			for (var i = 0; i < ts.length; i++) {
				var tj = toques[ts[i].identifier % 100];
				if (tj) {
					var cc = getPos(ts[i]);
					tj.x = cc.x;
					tj.y = cc.y;
				}
			}
			pintar();
		}, { passive: false });

		canvas.addEventListener('touchend', function (evento) {
			var ts = evento.changedTouches;
			for (var i = 0; i < ts.length; i++) {
				toques[ts[i].identifier % 100] = null;
			}
			pintar();
		}, false);

		canvas.addEventListener('touchcancel', function (evento) {
			var ts = evento.changedTouches;
			for (var i = 0; i < ts.length; i++) {
				toques[ts[i].identifier % 100] = null;
			}
			pintar();
		}, false);

		canvas.addEventListener('mousedown', function (evento) {
			var c = getPos(evento);
			toques[0] = { x: c.x, y: c.y };
			pintar();
		}, false);

		document.addEventListener('mousemove', function (evento) {
			if (toques[0]) {
				var c = getPos(evento);
				toques[0].x = c.x;
				toques[0].y = c.y;
				pintar();
			}
		}, false);

		document.addEventListener('mouseup', function () {
			toques[0] = null;
			pintar();
		}, false);
	}

	window.addEventListener('load', init, false);
})();
