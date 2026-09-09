//inicializacion de las variables globales
var canvas = null;              //variable que almacenara el lienzo de la aplicacion
var ctx = null;                 //variable en le que se almacenara el contexto del lienzo
var ultinaPresion=null;         //variable que controlara si el boton del mouse se ha precionado
var ultimaliberacion=null;      //variable que controlara si el boton del mouse se ha dejado de precionar
var raton={x:0,y:0};            //variable donde se almacena la la lectura de la posicion del mouse
var puntero={x:0,y:0};          //variable donde se alcena la pocision del raton
var tposiciones=[];             //variable donde se alacenara la posicion anterior
var arrastrando=null;           //variable que controla si un nodo que se esta moviendo
var arrastrables = [];          //arreglo de nodos donde se almacenara los onjetos circulos(nodos)
var lineas = [];                //arreglo de nodos donde se almacenara los onjetos lineas(aristas)
var i=0, l=0;                   //contadores utilizados recurerntemente
var bgColor='#6DF28E';          //variable donde se almacena el color del canvas(linezo)
var cantidad=0;                 //variable que almacena la cantidad de nodos
var control=false;              //variable que controla las llamadas
var borrar=false;               //variable que indica si el modo borrar esta activo
var parPendiente=null;          //indices del par de nodos pendientes de crear una arista
var nodoSeleccionado=-1;        //indice del primer nodo seleccionado en modo de agregar caminos
var resultadoActual=null;       //variable que almacena el ultimo resultado del calculo
var entradasHabilitadas=false;  //variable que evita registrar los eventos de entrada mas de una vez
var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','q','r','s','t','u','v','w','x','y','z'];    //arreglo del abecedario para el identificador de cada nodo
var colores = ['#005A9C', '#B00020', '#6A00A8', '#1B5E20', '#8D6E00', '#01579B'];

function mostrarDialogo(id){
    document.getElementById(id).style.display = 'flex';
}

function ocultarDialogo(id){
    document.getElementById(id).style.display = 'none';
}

function limpiarAviso(id){
    var elem = document.getElementById(id);
    if(elem) elem.textContent = '';
}

function mostrarAviso(id, mensaje){
    var elem = document.getElementById(id);
    if(elem) elem.textContent = mensaje;
}

function validacion(id){
    var elem = document.getElementById(id);
    if (elem.checkValidity()){
        elem.style.borderColor="blue";
        return true;
    }
    elem.style.borderColor="yellow";
    return false;
}

//funcionen que pertene al primer boton del programa
function pregunta1(){
    limpiarAviso('aviso0');
    document.getElementById("nodos").value='';
    mostrarDialogo("formulario0");
}

function aceptarNodos(){
    var n = parseInt(document.getElementById("nodos").value, 10);
    if(isNaN(n) || n < 1 || n > 26){
        mostrarAviso('aviso0', 'La cantidad de nodos debe estar entre 1 y 26');
        return;
    }
    cantidad = n;
    ocultarDialogo('formulario0');
    inicio();
}

//funcion que pertenece al segundo boton del programa
function pregunta2(){
    control = !control;
    nodoSeleccionado = -1;
    tposiciones = [];
    parPendiente = null;
    document.body.style.cursor = control ? 'crosshair' : 'default';
}

function abrirFormularioCapacidades(){
    limpiarAviso('aviso1');
    document.getElementById("capacidad1").value='';
    document.getElementById("capacidad2").value='';
    mostrarDialogo('formulario1');
}

function aceptarCapacidades(){
    var c1 = parseInt(document.getElementById("capacidad1").value, 10);
    var c2 = parseInt(document.getElementById("capacidad2").value, 10);
    if(isNaN(c1) || isNaN(c2) || c1 < 0 || c2 < 0){
        mostrarAviso('aviso1', 'Las capacidades deben ser numeros no negativos');
        return;
    }
    if(parPendiente === null){
        mostrarAviso('aviso1', 'Selecciona dos nodos distintos en el lienzo');
        return;
    }
    var nodoi = arrastrables[parPendiente[0]];
    var nodof = arrastrables[parPendiente[1]];
    if(!nodoi || !nodof || nodoi === nodof){
        mostrarAviso('aviso1', 'Selecciona dos nodos distintos en el lienzo');
        return;
    }
    lineas.push(new Linea(nodoi, nodof, c1, c2));
    nodoSeleccionado = -1;
    limpiarResultados();
    parPendiente = null;
    tposiciones = [];
    ocultarDialogo('formulario1');
}

function cancelarCapacidades(){
    parPendiente = null;
    tposiciones = [];
    nodoSeleccionado = -1;
    ocultarDialogo('formulario1');
}

//funcion que corresponde al tercer boton del programa
function pregunta3(){
    limpiarAviso('aviso2');
    document.getElementById("fuente").value='';
    document.getElementById("sumidero").value='';
    mostrarDialogo("formulario2");
}

function aceptarFuenteSumidero(){
    var origen = document.getElementById("fuente").value.trim();
    var destino = document.getElementById("sumidero").value.trim();
    var nodos = [];
    for(var k=0; k<arrastrables.length; k++) nodos.push(arrastrables[k].numero);

    if(origen === '' || destino === ''){
        mostrarAviso('aviso2', 'Introduce un nodo fuente y un nodo sumidero');
        return;
    }
    if(origen === destino || nodos.indexOf(origen) === -1 || nodos.indexOf(destino) === -1){
        mostrarAviso('aviso2', 'La fuente y el sumidero deben ser nodos distintos del grafo');
        return;
    }

    var fm = new FlujoRed();
    for(var k=0; k<lineas.length; k++){
        fm.agregarArista(lineas[k].circuloi.numero, lineas[k].circulof.numero, lineas[k].flujo, lineas[k].contraflujo);
    }
    var resultado = fm.flujoMaximo(origen, destino);
    ocultarDialogo('formulario2');
    aplicarResultado(resultado, fm);
}

function aplicarResultado(resultado, fm){
    resultadoActual = { maximo: resultado.maximo, caminos: [] };

    for(var j=0; j<resultado.caminos.length; j++){
        var camino = resultado.caminos[j];
        var nodos = [fm.fuente];
        var flujoC = camino[0][1];
        for(var k=0; k<camino.length; k++){
            nodos.push(camino[k][0].destino);
            if(camino[k][1] < flujoC) flujoC = camino[k][1];
        }
        resultadoActual.caminos.push({ nodos: nodos, flujo: flujoC, color: colores[j % colores.length], aristas: camino });
    }

    for(var k=0; k<lineas.length; k++){
        var linea = lineas[k];
        var arista = buscarArista(fm, linea.circuloi.numero, linea.circulof.numero);
        if(arista){
            linea.color = '#000';
            linea.flujoEnviado = arista.flujo;
            linea.contraflujoEnviado = (-arista.aristaIversa.flujo) > 0 ? -arista.aristaIversa.flujo : 0;
        }
    }
    renderResultados();
}

function buscarArista(fm, origen, destino){
    var salientes = fm.aristas[origen];
    if(!salientes) return null;
    for(var k=0; k<salientes.length; k++){
        if(salientes[k].destino === destino) return salientes[k];
    }
    return null;
}

function renderResultados(){
    var panel = document.getElementById('resultados');
    if(!panel) return;
    var html = '<h3>Flujo máximo: ' + resultadoActual.maximo + '</h3>';
    if(resultadoActual.caminos.length > 0){
        html += '<div>';
        for(var j=0; j<resultadoActual.caminos.length; j++){
            var cam = resultadoActual.caminos[j];
            html += '<span class="camino" style="color:' + cam.color + '">' + cam.nodos.join(' → ') + ' : ' + cam.flujo + '</span>';
        }
        html += '</div>';
    } else {
        html += '<span class="camino">No hay camino entre los nodos elegidos</span>';
    }
    panel.innerHTML = html;
}

//funcion que corresponde al boton de borrar
function preguntaBorrar(){
    borrar = !borrar;
    document.body.style.cursor = borrar ? 'not-allowed' : 'default';
}

function borrarNodo(idx){
    var nodo = arrastrables[idx];
    lineas = lineas.filter(function(x){ return x.circuloi !== nodo && x.circulof !== nodo; });
    arrastrables.splice(idx, 1);
    tposiciones = [];
    parPendiente = null;
    nodoSeleccionado = -1;
}

function distanciaSegmento(px,py,x1,y1,x2,y2){
    var dx=x2-x1, dy=y2-y1;
    var len2 = dx*dx + dy*dy;
    if(len2 === 0) return Math.sqrt((px-x1)*(px-x1)+(py-y1)*(py-y1));
    var t = ((px-x1)*dx + (py-y1)*dy) / len2;
    t = Math.max(0, Math.min(1, t));
    var cx = x1 + t*dx, cy = y1 + t*dy;
    return Math.sqrt((px-cx)*(px-cx) + (py-cy)*(py-cy));
}

function limpiarResultados(){
    resultadoActual = null;
    for(var j=0; j<lineas.length; j++){
        lineas[j].color = '#000';
        lineas[j].flujoEnviado = undefined;
        lineas[j].contraflujoEnviado = undefined;
    }
    var panel = document.getElementById('resultados');
    if(panel) panel.innerHTML = '';
}

function resetGrafo(){
    arrastrables = [];
    lineas = [];
    tposiciones = [];
    parPendiente = null;
    nodoSeleccionado = -1;
    cantidad = 0;
    control = false;
    borrar = false;
    document.body.style.cursor = 'default';
    limpiarResultados();
    ocultarDialogo('formulario0');
    ocultarDialogo('formulario1');
    ocultarDialogo('formulario2');
    var cv = document.getElementById('micanvas');
    if(cv && cv.getContext){
        var contexto = cv.getContext('2d');
        contexto.fillStyle = bgColor;
        contexto.clearRect(0,0,cv.width,cv.height);
        contexto.fillRect(0,0,cv.width,cv.height);
    }
}

//funcion inicializadora del interfaz grafica
function inicio(){
    canvas=document.getElementById('micanvas'); //almacenamiento de un elemento del documento(HTML) a una variable
    ctx=canvas.getContext('2d');    //generarle al lienzo un contexto de dos dimenciones para graficar en ella
    canvas.width=1000;              //definiendo el ancho del lienzo en pixeles
    canvas.height=600;              //definiendo el alto del lienzo en pixeles

    for (i = 0; i < cantidad; i++) {
        arrastrables.push(new Circulo(aleatorio(canvas.width), aleatorio(canvas.height), 20, abc[arrastrables.length])); //creacion de un arreglo de objetos circulos(nodos)
    }

    if(!entradasHabilitadas){
        habilitarEntradas();        //se habilita la llamada constante a las variables de entrada
        entradasHabilitadas = true;
    }
    correr();                       //se inicializa el corredor de la aplicacion (algo parecido al Timer en C++ o C#)
}

//funcion que debuelve una vqariable aleatoria
function aleatorio(max){
    return ~~(Math.random()*max);//retorno del numero aleatorio
}

//funcion que se realiza cada cierto tiempo creando un bucle
function correr(){
    requestAnimationFrame(correr);  //inicalizador del timer
    actividad();                    //actualizamos la actividad de los elementos del canvas(Lienzo)
    pintar(ctx);                    //pintamos los elementos en el lienzo

    //inicializamos los controladores de los botones del raton en cada iteracion
    ultinaPresion=null;
    ultimaliberacion=null;
}

//funcion que se inidica el comportamiento de los elementos en el lienzo(camvas)
function actividad(){
    //asignacion del la posicion del raton a una variable puntero
    puntero.x=raton.x;
    puntero.y=raton.y;

    //limites del canvas(lienzo)
    if(puntero.x<0)
        puntero.x=0;
    if(puntero.x>canvas.width)
        puntero.x=canvas.width;
    if(puntero.y<0)
        puntero.y=0;
    if(puntero.y>canvas.height)
        puntero.y=canvas.height;

    //si se ha precionado el boton del raton(el click)
    if(ultinaPresion===1){
        //si el modo borrar esta activo
        if(borrar){
            var borrado = false;
            for(i=0, l=lineas.length; i<l && !borrado; i++){
                if(distanciaSegmento(puntero.x, puntero.y, lineas[i].circuloi.x, lineas[i].circuloi.y, lineas[i].circulof.x, lineas[i].circulof.y) < 10){
                    lineas.splice(i,1);
                    borrado = true;
                }
            }
            if(!borrado){
                for(i=0, l=arrastrables.length; i<l; i++){
                    if(arrastrables[i].distancia(puntero) < 0){
                        borrarNodo(i);
                        borrado = true;
                        break;
                    }
                }
            }
            if(borrado) limpiarResultados();
        }
        else{
            for (i=0, l = arrastrables.length;i<l; i++){
                //si existe colicion entre los circulos(nodos) y puntero
                if(arrastrables[i].distancia(puntero)<0){
                    //si el control de llamadas esta activo
                    if(control){
                        tposiciones.push(i);            //agrega el indice del arreglo de circulos(nodos) al arreglo posiciones
                        //si el siguiente click es par
                        if(tposiciones.length%2 == 0){
                            var n = tposiciones.length;
                            if(arrastrables[tposiciones[n-2]].numero !== arrastrables[tposiciones[n-1]].numero){
                                parPendiente = [tposiciones[n-2], tposiciones[n-1]];
                                nodoSeleccionado = tposiciones[n-1];
                                abrirFormularioCapacidades();
                            }
                            tposiciones = [];
                        }
                        else{
                            nodoSeleccionado = tposiciones[0];
                        }
                    }
                    //si no esta activo el control de llamdas
                    else{
                        arrastrando=i;  //guardar el indice del el circulo(nodo) seleccionado
                    }
                    break; //salir de las iteraciones for
                }
            }
        }
    }
    //si se ha dejado de precionar el boton del raton
    else if(ultimaliberacion === 1){
        arrastrando = null;     //eliminar el indice guardado del circulo(nodo) seleccionado anteriormente
    }

    //si existe el indice guardado para mover circulo(nodo) seleccionado
    if(arrastrando !== null){
        //actualizar la posicion del esfera arrastrada. Asimismo, las lineas asiganadas a ellas
        arrastrables[arrastrando].x = puntero.x;
        arrastrables[arrastrando].y = puntero.y;
    }
}

//funcion encargada de pintar los elementos en el canvas(lienzo)
function pintar(ctx){
    //limpiar canvas o linezo
    ctx.fillStyle=bgColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //si el arreglo de objetos linea no esta vacio
    if(lineas != null){

        //colorear las aristas de cada camino aumentante del ultimo resultado
        if(resultadoActual !== null){
            for(var j=0; j<resultadoActual.caminos.length; j++){
                var cam = resultadoActual.caminos[j];
                for(var k=0; k<cam.aristas.length; k++){
                    var arista = cam.aristas[k][0];
                    for(var m=0; m<lineas.length; m++){
                        if(lineas[m].circuloi.numero === arista.origen && lineas[m].circulof.numero === arista.destino)
                            lineas[m].color = cam.color;
                    }
                }
            }
        }

        for(i = 0, l = lineas.length; i<l; i++){
            lineas[i].dibujar(ctx);     //dibujar la linea en el linzo
        }

        for(i = 0, l = lineas.length; i<l; i++){
            ctx.fillStyle = '#336699';      //seleccinar el color de las capacidades de los nodos
            ctx.strokeStyle = '#336699';
            lineas[i].dibujarFlujo(ctx);    //dibujar las capacidades de los nodos a los extremos de la lineas
        }
    }

    ctx.fillStyle='red';        //seleccionar el color de los circulos(nodos)
    for(i = 0, l = arrastrables.length; i<l; i++){
        arrastrables[i].dibujar(ctx);       //dibujar los nodos en el lienzo
    }

    ctx.fillStyle='#000';       //seleccionar el color de los identificadores de los nodos
    ctx.strokeStyle ='#000';
    for(i = 0, l = arrastrables.length; i<l; i++){
        arrastrables[i].identificacion(ctx);        //bibujar el identificador de los nodos
    }

    //resaltar el primer nodo seleccionado en modo de agregar caminos
    if(control && nodoSeleccionado >= 0 && nodoSeleccionado < arrastrables.length){
        var sn = arrastrables[nodoSeleccionado];
        ctx.strokeStyle = '#16F24D';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(sn.x, sn.y, sn.radio + 6, 0, Math.PI*2, true);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    //dibujar linea provisional entre el primer nodo y el puntero
    if(control && nodoSeleccionado >= 0 && nodoSeleccionado < arrastrables.length && parPendiente === null){
        var nod1 = arrastrables[nodoSeleccionado];
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(nod1.x, nod1.y);
        ctx.lineTo(puntero.x, puntero.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
    }

    ctx.fillStyle = '#0f0';     //seleccionar el color del puntero
    ctx.fillRect(puntero.x -1, puntero.y -1, 5,5);  //dibujar el puntero

    //dibujar el resultado del flujo maximo en el canvas
    if(resultadoActual !== null){
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(10, 10, 260, 60);
        ctx.strokeStyle = '#16F24D';
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, 260, 60);
        ctx.fillStyle = '#16F24D';
        ctx.font = 'bold 22px Arial';
        ctx.fillText('Flujo maximo: ' + resultadoActual.maximo, 24, 40);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#e8eaed';
        ctx.fillText('Caminos: ' + resultadoActual.caminos.length, 24, 60);
    }
}

//habilitar los eventos de mouse que se usaran posteriormente
function habilitarEntradas(){
    //evento del movimiento del mouse
    document.addEventListener('mousemove',function(evt){
        raton.x=evt.pageX-canvas.offsetLeft - 6;
        raton.y=evt.pageY-canvas.offsetTop - 28;
    },false);

    //evento del click del mouse
    document.addEventListener('mouseup', function(evt){
        ultimaliberacion=evt.which;
    },false);
    //evento del soltar el click del mouse
    canvas.addEventListener('mousedown',function(evt){
        evt.preventDefault();
        ultinaPresion=evt.which;
    },false);
}

//CLASE CIRCULO
function Circulo(x,y,radio,numero){
    this.x=(x===undefined)?0:x;
    this.y=(y===undefined)?0:y;
    this.radio=(radio===undefined)?0:radio;
    this.numero=(numero===undefined)?0:numero;
}

//metodo de ciculo para saber la distancia entre dos puntos
Circulo.prototype.distancia=function(circulo){
    if(circulo!== undefined){
        var dx=this.x-circulo.x;
        var dy=this.y-circulo.y;
        var circuloRadio = circulo.radio || 0;
        return (Math.sqrt(dx*dx+dy*dy)-(this.radio+circuloRadio));
    }
};

//metodo del objeto circulo en el que se dibuaja las esferas
Circulo.prototype.dibujar=function(ctx){
    if(ctx !== undefined){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radio,0,Math.PI*2,true);
        ctx.fill();
    }
};

//metodo de objeto circulo en el identificador de cada esfera
Circulo.prototype.identificacion=function(ctx){
    if(ctx !== undefined){
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillText(this.numero, this.x-5, this.y+8);
        ctx.fill();
        ctx.strokeText(this.numero, this.x-5, this.y+8);
        ctx.stroke();
    }
}

//CLASE LINEA
function Linea(circuloi, circulof, flujo, contraflujo){
    this.circuloi = circuloi;
    this.circulof = circulof;
    this.flujo = flujo;
    this.contraflujo = contraflujo;
    this.color = "#000";
    this.flujoEnviado = undefined;
    this.contraflujoEnviado = undefined;
}

//metodo de la clase linea para bibujar la linea con su flecha de direccion
Linea.prototype.dibujar=function(ctx){
    if(ctx !== undefined){
        ctx.beginPath();
        ctx.moveTo(this.circuloi.x,this.circuloi.y);
        ctx.lineTo(this.circulof.x,this.circulof.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.stroke();

        this.dibujarFlecha(ctx, this.circuloi, this.circulof);
        if(this.contraflujo > 0){
            this.dibujarFlecha(ctx, this.circulof, this.circuloi);
        }
    }
};

//metodo que dibuja una cabeza de flecha en la direccion de la arista
Linea.prototype.dibujarFlecha=function(ctx, desde, hasta){
    if(ctx === undefined) return;
    var ang = Math.atan2(hasta.y - desde.y, hasta.x - desde.x);
    var radio = (hasta.radio || 20) + 6;
    var cx = hasta.x - Math.cos(ang)*radio;
    var cy = hasta.y - Math.sin(ang)*radio;
    var tam = 12;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - tam*Math.cos(ang - Math.PI/6), cy - tam*Math.sin(ang - Math.PI/6));
    ctx.lineTo(cx - tam*Math.cos(ang + Math.PI/6), cy - tam*Math.sin(ang + Math.PI/6));
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
};

//metodo enque se dibuja o muestra enel lienzo los flujos espectivo a cada extremo de la linea
Linea.prototype.dibujarFlujo=function(ctx){
    if(ctx !== undefined){
        ctx.beginPath();
        ctx.font = "14px Arial";
        var puntosi = this.calcularPuntos(ctx,this.circuloi);
        var puntosf = this.calcularPuntos(ctx,this.circulof);

        var txti = (typeof this.flujoEnviado !== 'undefined') ? (this.flujoEnviado + '/' + this.flujo) : this.flujo;
        var txtf = (typeof this.contraflujoEnviado !== 'undefined') ? (this.contraflujoEnviado + '/' + this.contraflujo) : this.contraflujo;

        ctx.fillText(txti,puntosi.x,puntosi.y);
        ctx.fillText(txtf,puntosf.x,puntosf.y);
        ctx.lineWidth = 1;
        ctx.fill();

        ctx.strokeText(txti,puntosi.x,puntosi.y);
        ctx.strokeText(txtf,puntosf.x,puntosf.y);
        ctx.lineWidth = 1;
        ctx.stroke();
    }
};

//metodo pera calculas los puntos en que se mostara los flujos
Linea.prototype.calcularPuntos=function(ctx, circulo){
    var pos = {x:0,y:0}
    var posx=((this.circuloi.x+this.circulof.x)/2);
    var posy=((this.circuloi.y+this.circulof.y)/2);

    pos.x = ((posx+circulo.x)/2);
    pos.y = ((posy+circulo.y)/2);

    return pos;
}

//sobreescritura de la funcion del tiempo para que sea conpatible con diferentes navegadores
window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){window.setTimeout(callback,17);};
})();