var canvas = null,
    ctx = null,
    W = 0,
    H = 0,
    mouseX = 0,
    mouseY = 0,
    colorAcento = '#16F24D';

function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    paint();
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function paint() {
    if(!ctx) return;

    //fondo oscuro
    ctx.fillStyle = '#0D0D0D';
    ctx.fillRect(0, 0, W, H);

    //cuadricula sutil
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(var x = 0; x < W; x += 40){
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
    }
    for(var y = 0; y < H; y += 40){
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
    }
    ctx.stroke();

    //lineas de mira (crosshair)
    ctx.strokeStyle = 'rgba(22,242,77,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mouseX, 0);
    ctx.lineTo(mouseX, H);
    ctx.moveTo(0, mouseY);
    ctx.lineTo(W, mouseY);
    ctx.stroke();

    //circulo y punto en el cursor
    ctx.strokeStyle = colorAcento;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 14, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = colorAcento;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 3, 0, 2 * Math.PI);
    ctx.fill();

    //cajas divisorias en la mira
    ctx.strokeStyle = 'rgba(22,242,77,0.15)';
    ctx.beginPath();
    ctx.moveTo(mouseX - 12, mouseY); ctx.lineTo(mouseX + 12, mouseY);
    ctx.moveTo(mouseX, mouseY - 12); ctx.lineTo(mouseX, mouseY + 12);
    ctx.stroke();

    //leyenda superior
    ctx.font = '13px "Droid Sans Mono", monospace';
    ctx.fillStyle = '#6DF28E';
    ctx.fillText('Mueve el mouse por toda la pantalla', 16, 24);

    //panel de coordenadas
    var pctX = (mouseX / W * 100).toFixed(1);
    var pctY = (mouseY / H * 100).toFixed(1);
    ctx.fillStyle = 'rgba(0,0,0,0.78)';
    ctx.fillRect(16, H - 100, 340, 72);
    ctx.strokeStyle = colorAcento;
    ctx.lineWidth = 2;
    ctx.strokeRect(16, H - 100, 340, 72);

    ctx.font = 'bold 22px "Droid Sans Mono", monospace';
    ctx.fillStyle = colorAcento;
    ctx.fillText('X: ' + mouseX + '   Y: ' + mouseY, 30, H - 66);

    ctx.font = '14px "Droid Sans Mono", monospace';
    ctx.fillStyle = '#e8eaed';
    ctx.fillText(pctX + '% horizontal  /  ' + pctY + '% vertical', 30, H - 42);
}

function init(){
    canvas = document.getElementById('micanvas');
    ctx = canvas.getContext('2d');
    resize();

    window.addEventListener('resize', resize, false);
    window.addEventListener('mousemove', function(evt) {
        var pos = getMousePos(evt);
        mouseX = pos.x;
        mouseY = pos.y;
        paint();
    }, false);
}

window.addEventListener('load', init, false);