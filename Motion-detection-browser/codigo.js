"use strict";

var W = 320, H = 260;
var bolaCanvas = document.getElementById("canvas-bola");
var partCanvas = document.getElementById("canvas-particulas");
var ctxBola = bolaCanvas.getContext("2d");
var ctxPart = partCanvas.getContext("2d");
var estadoEl = document.getElementById("estado");
var botonPermiso = document.getElementById("btn-permiso");

var sensor = { x: 0, y: 0, z: 0, alpha: 0, beta: 0, gamma: 0, activo: false };
var sim = { x: 0, y: 0, usandoSim: false };

// ---- Bola (one.html) ----
var bola = { x: W / 2, y: H / 2, vx: 0, vy: 0, r: 25 };
function moverBola(dt, ax, ay) {
	var e = Math.min(3, dt / 40);
	bola.vx = bola.vx * Math.pow(0.98, e) + ax * 5 * e;
	bola.vy = bola.vy * Math.pow(0.98, e) + ay * 5 * e;
	bola.x = bola.x + (bola.vx / 50) * e;
	bola.y = bola.y + (bola.vy / 50) * e;
	if (bola.x < bola.r) { bola.x = bola.r; bola.vx = -bola.vx; }
	if (bola.y < bola.r) { bola.y = bola.r; bola.vy = -bola.vy; }
	if (bola.x > W - bola.r) { bola.x = W - bola.r; bola.vx = -bola.vx; }
	if (bola.y > H - bola.r) { bola.y = H - bola.r; bola.vy = -bola.vy; }
}

// ---- Partículas (many.html) ----
var NUM_PARTICULAS = 50;
var particulas = [];
function colorAleatorioRgba() {
	var v = 100 + Math.floor(Math.random() * 120);
	return "rgba(" + Math.floor(Math.random() * 120) + "," + v + "," + Math.floor(Math.random() * 120) + "," + (0.3 + Math.random() * 0.4).toFixed(3) + ")";
}
function crearParticulas() {
	particulas = [];
	for (var i = 0; i < NUM_PARTICULAS; i++) {
		particulas.push({
			x: Math.random() * W,
			y: Math.random() * H,
			vx: 0,
			vy: 0,
			r: 5 + Math.random() * 20,
			color: colorAleatorioRgba()
		});
	}
}
crearParticulas();

function moverParticulas(dt, ax, ay) {
	var e = Math.min(3, dt / 40);
	for (var i = 0; i < NUM_PARTICULAS; i++) {
		var p = particulas[i];
		p.vx = p.vx * Math.pow(0.96, e) + ax * 0.2 * e;
		p.vy = p.vy * Math.pow(0.96, e) + ay * 0.2 * e;
		p.x += p.vx * e;
		p.y += p.vy * e;
		if (p.x < p.r) { p.x = p.r; p.vx = Math.abs(p.vx); }
		if (p.x > W - p.r) { p.x = W - p.r; p.vx = -Math.abs(p.vx); }
		if (p.y < p.r) { p.y = p.r; p.vy = Math.abs(p.vy); }
		if (p.y > H - p.r) { p.y = H - p.r; p.vy = -Math.abs(p.vy); }
	}
}

// ---- Sensores ----
var muestrasIntervalo = 0;
var muestrasTotal = 0;
var fuente = "ninguna";
var depuracionEl = document.getElementById("depuracion");
var permisos = { accelerometer: "?", gyroscope: "?", magnetometer: "?" };

function registrarMuestra() {
	muestrasIntervalo++;
	muestrasTotal++;
}

function toGrados(rad) {
	return rad * 180 / Math.PI;
}

function consultarPermisos() {
	if (!navigator.permissions || !navigator.permissions.query) { return; }
	["accelerometer", "gyroscope", "magnetometer"].forEach(function (nombre) {
		try {
			navigator.permissions.query({ name: nombre }).then(function (st) {
				permisos[nombre] = st.state;
			}).catch(function () {});
		} catch (e) {}
	});
}
consultarPermisos();

window.addEventListener("devicemotion", function (ev) {
	var acc = ev.accelerationIncludingGravity || ev.acceleration;
	if (acc) {
		sensor.x = -(acc.x || 0);
		sensor.y = acc.y || 0;
		sensor.z = acc.z || 0;
		sensor.activo = true;
		fuente = "devicemotion";
		registrarMuestra();
	}
}, false);

window.addEventListener("deviceorientation", function (ev) {
	sensor.alpha = ev.alpha || 0;
	sensor.beta = ev.beta || 0;
	sensor.gamma = ev.gamma || 0;
	sensor.activo = true;
}, false);

window.addEventListener("deviceorientationabsolute", function (ev) {
	sensor.alpha = ev.alpha || 0;
	sensor.beta = ev.beta || 0;
	sensor.gamma = ev.gamma || 0;
	sensor.activo = true;
}, false);

function iniciarSensoresGenericos() {
	if (typeof window.Accelerometer === "undefined") { return false; }
	var arranco = false;
	try {
		var acelerometro = new window.Accelerometer({ frequency: 60 });
		acelerometro.onreading = function () {
			sensor.x = -((acelerometro.x || 0) / 9.80665);
			sensor.y = (acelerometro.y || 0) / 9.80665;
			sensor.z = (acelerometro.z || 0) / 9.80665;
			sensor.activo = true;
			fuente = "generic accel";
			registrarMuestra();
		};
		acelerometro.onerror = function (e) { fuente = "errAccel:" + e.error.name; };
		acelerometro.start();
		arranco = true;
	} catch (e) { fuente = "errAccelStart"; }

	try {
		var orient = null;
		if (typeof window.AbsoluteOrientationSensor !== "undefined") {
			orient = new window.AbsoluteOrientationSensor({ frequency: 30 });
		} else if (typeof window.RelativeOrientationSensor !== "undefined") {
			orient = new window.RelativeOrientationSensor({ frequency: 30, referenceFrame: "device" });
		}
		if (orient) {
			orient.onreading = function () {
				var q = orient.quaternion;
				if (q && q.length === 4) {
					sensor.alpha = toGrados(Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2])));
					sensor.beta = toGrados(Math.asin(Math.max(-1, Math.min(1, 2 * (q[0] * q[2] - q[3] * q[1])))));
					sensor.gamma = toGrados(Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3])));
				}
				sensor.activo = true;
				fuente = "generic orient";
				registrarMuestra();
			};
			orient.onerror = function (e) { fuente += "errOrient:" + e.error.name; };
			orient.start();
			arranco = true;
		}
	} catch (e) { fuente += " errOrientStart"; }
	return arranco;
}

function num(v) {
	var n = Number(v);
	return isFinite(n) ? n : 0;
}

function leerAceleracion() {
	if (sensor.activo) {
		return { x: num(sensor.x), y: num(sensor.y), z: num(sensor.z) };
	}
	return { x: num(sim.x), y: num(sim.y), z: num(sim.z) };
}

function activarSimulacion() {
	if (sim.usandoSim) { return; }
	sim.usandoSim = true;
	if (estadoEl) { estadoEl.textContent = "Sin lecturas de sensores: mueve el ratón o el dedo para simular el movimiento."; }
	window.addEventListener("mousemove", function (ev) {
		var r = partCanvas.getBoundingClientRect();
		sim.x = (ev.clientX - (r.left + r.width / 2)) / 30;
		sim.y = (ev.clientY - (r.top + r.height / 2)) / 30;
	}, false);
	window.addEventListener("touchmove", function (ev) {
		if (ev.touches.length > 0) {
			var r = partCanvas.getBoundingClientRect();
			sim.x = (ev.touches[0].clientX - (r.left + r.width / 2)) / 30;
			sim.y = (ev.touches[0].clientY - (r.top + r.height / 2)) / 30;
		}
	}, false);
}

function mostrarEstado() {
	if (sim.usandoSim) {
		if (estadoEl) { estadoEl.textContent = "Sin lecturas de sensores: mueve el ratón o el dedo para simular el movimiento."; }
		return;
	}
	if (muestrasTotal > 0 && !sim.usandoSim) {
		if (estadoEl) { estadoEl.textContent = "Sensores activados. Mueve tu dispositivo."; }
	}
}

function asegurarSensores() {
	if (typeof window.Accelerometer !== "undefined") {
		iniciarSensoresGenericos();
	}
	if (permisos.accelerometer === "granted" || permisos.gyroscope === "granted") {
		sensor.activo = true;
		setTimeout(function () {
			if (muestrasTotal === 0) { activarSimulacion(); }
		}, 3000);
	}
}

function pedirPermiso() {
	var peticiones = [];
	if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
		peticiones.push(DeviceMotionEvent.requestPermission());
	}
	if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
		peticiones.push(DeviceOrientationEvent.requestPermission());
	}
	if (peticiones.length === 0) { peticiones.push(Promise.resolve("granted")); }
	Promise.all(peticiones).then(function (resultados) {
		var concedido = resultados.indexOf("denied") === -1;
		if (concedido) {
			consultarPermisos();
			asegurarSensores();
			if (estadoEl) { estadoEl.textContent = "Permiso concedido. Esperando lecturas del sensor…"; }
			if (botonPermiso) { botonPermiso.style.display = "none"; }
			setTimeout(function () {
				if (muestrasTotal === 0) { activarSimulacion(); }
			}, 3000);
		} else {
			if (estadoEl) { estadoEl.textContent = "Permiso denegado: revisa los ajustes del sitio en el navegador."; }
			if (botonPermiso) { botonPermiso.style.display = "none"; }
			activarSimulacion();
		}
	}).catch(function () {
		if (botonPermiso) { botonPermiso.style.display = "none"; }
		activarSimulacion();
	});
}

if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
	if (botonPermiso) {
		botonPermiso.style.display = "inline-block";
		botonPermiso.addEventListener("click", pedirPermiso, false);
	}
} else {
	sensor.activo = true;
	asegurarSensores();
	setTimeout(function () {
		if (muestrasTotal === 0) { activarSimulacion(); }
	}, 3000);
	if (estadoEl) { estadoEl.textContent = "Sensores activados. Mueve tu dispositivo."; }
}

if (navigator.permissions && navigator.permissions.query) {
	["accelerometer", "gyroscope"].forEach(function (nombre) {
		try {
			navigator.permissions.query({ name: nombre }).then(function (st) {
				st.addEventListener("change", function () {
					permisos[nombre] = st.state;
					if (st.state === "granted") {
						asegurarSensores();
					}
				});
			}).catch(function () {});
		} catch (e) {}
	});
}

// ---- Dibujo ----
function pintarBola(acc) {
	ctxBola.clearRect(0, 0, W, H);

	ctxBola.fillStyle = "rgba(22,242,77,0.08)";
	ctxBola.strokeStyle = "rgba(22,242,77,0.5)";
	ctxBola.beginPath();
	ctxBola.arc(W / 2, H / 2, 90, 0, 2 * Math.PI);
	ctxBola.stroke();

	ctxBola.fillStyle = "#16F24D";
	ctxBola.strokeStyle = "#6DF28E";
	ctxBola.beginPath();
	ctxBola.arc(bola.x, bola.y, bola.r, 0, 2 * Math.PI);
	ctxBola.fill();
	ctxBola.stroke();

	ctxBola.fillStyle = "#6DF28E";
	ctxBola.font = "12px 'Droid Sans Mono', monospace";
	ctxBola.fillText("ax: " + num(acc.x).toFixed(2), 8, H - 20);
	ctxBola.fillText("ay: " + num(acc.y).toFixed(2), 8, H - 7);
}

function pintarParticulas(acc) {
	ctxPart.clearRect(0, 0, W, H);
	for (var i = 0; i < NUM_PARTICULAS; i++) {
		var p = particulas[i];
		ctxPart.fillStyle = p.color;
		ctxPart.beginPath();
		ctxPart.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
		ctxPart.fill();
	}

	ctxPart.fillStyle = "#16F24D";
	ctxPart.beginPath();
	ctxPart.arc(10, 10, Math.max(1, Math.min(16, Math.abs(num(acc.z)))), 0, 2 * Math.PI);
	ctxPart.fill();
}

function actualizarLecturas(acc) {
	var ids = ["val-x", "val-y", "val-z"];
	var v = [num(acc.x), num(acc.y), num(acc.z)];
	for (var i = 0; i < 3; i++) {
		var n = document.getElementById(ids[i]);
		if (n) { n.textContent = v[i].toFixed(2); }
	}
	var idsR = ["val-alpha", "val-beta", "val-gamma"];
	var vr = [num(sensor.alpha), num(sensor.beta), num(sensor.gamma)];
	for (var j = 0; j < 3; j++) {
		var r = document.getElementById(idsR[j]);
		if (r) { r.textContent = vr[j].toFixed(1); }
	}
}

var ultimoTiempo = 0;
var ultimoSegundo = 0;
function bucle(tiempo) {
	var dt = ultimoTiempo ? (tiempo - ultimoTiempo) : 40;
	ultimoTiempo = tiempo;
	if (Math.abs(sim.x) < 0.05 && Math.abs(sim.y) < 0.05) {
		sim.x = 0;
		sim.y = 0;
	}

	if (tiempo - ultimoSegundo >= 1000) {
		if (depuracionEl) {
			depuracionEl.textContent = "muestras/s: " + muestrasIntervalo +
				" · fuente: " + fuente +
				" · accel: " + permisos.accelerometer +
				" · gyro: " + permisos.gyroscope +
				(sim.usandoSim ? " · simulación" : "");
		}
		muestrasIntervalo = 0;
		ultimoSegundo = tiempo;
	}

	var acc = leerAceleracion();
	moverBola(dt, acc.x, acc.y);
	moverParticulas(dt, acc.x, acc.y);

	pintarBola(acc);
	pintarParticulas(acc);
	actualizarLecturas(acc);

	window.requestAnimationFrame(bucle);
}
window.requestAnimationFrame(bucle);