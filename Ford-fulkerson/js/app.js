
//inicializacion de las variables globales
var canvas = null;              //variable que almacenara el lienzo de la aplicacion
var ctx = null;                 //variable en le que se almacenara el contexto del lienzo
var ultinaPresion=null;         //variable que controlara si el boton del mouse se ha precionado
var ultimaliberacion=null;      //variable que controlara si el boton del mouse se ha dejado de precionar
var raton={x:0,y:0}             //variable donde se almacena la la lectura de la posicion del mouse
var puntero={x:0,y:0}           //variable donde se alcena la pocision del raton
var tposiciones=[];             //variable donde se alacenara la posicion anterior
var arrastrando=null;           //variable que controla si un nodo que se esta moviendo
var arrastrables = [];          //arreglo de nodos donde se almacenara los onjetos circulos(nodos)
var lineas = [];                //arreglo de nodos donde se almacenara los onjetos lineas(aristas)
var i=0, l=0;                   //contadores utilizados recurerntemente
var bgColor='#6DF28E';          //variable donde se almacena el color del canvas(linezo)
var cantidad=0;                 //variable que almacena la cantidad de nodos 
var control=false;              //variable que controla las llamadas
var abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','q','r','s','t','u','v','w','x','y','z'];    //arreglo del abecedario para el identificador de cada nodo
var colores = ['#995C1F', '#0f0', '#0ff', '#ff0', '#f0f', '#FFA347'];

function mostrarDialogo(id){
        document.getElementById(id).style.display = 'block';
}

function ocultarDialogo(id){
    document.getElementById(id).style.display = 'none';
}

function validacion(id){
    var elem = document.getElementById(id);
    if (elem.checkValidity())
        elem.style.borderColor="blue";
    else
        elem.style.borderColor="yellow";
}

//funcionen que pertene al primer boton del programa
function pregunta1(){
    //muestra de mesaje
    //mostrarDialogo("formulario0");
    //cantidad = parseInt(document.getElementById("nodos").value);
    cantidad = prompt('holi');
    //si la cantidad que proporciona el usuario es mayor a cero
    if(cantidad > 0 && cantidad < 27){
        //que inicie la intefaz grafica del progama
        inicio();
    }
}

//funcion que pertenece al segundo boton del programa
function pregunta2(){
    var confirmacion = false;
    //control es la variable que controla que la llamada siempre este activa
    //si el control es falso 
    if(control == false){
        confirmacion = confirm("Usted ya puede crear aristas");  //se mostra un mensaje de que se activaran las llamadas
        //si la confirmacion del usuario es afirmativa
        if(confirmacion) control = !control; //se procedera a cambiar el valor del control
        document.getElementById("btn-2").focus();
    }
    //si no es el caso del control falso y sea verdadero
    else if (control == true){
        confirmacion = confirm("Usted ya no puede crear aristas");  //se mostrara un mensaje que notificara que las llamdas se desactivaran
        //si la confirmacion del usuario es afirmativa
        if(confirmacion) control = !control; //se procedera a cambiar el valor del control
        document.getElementById("btn-2").blur();
    }
}

//funcion que corresponde al tercer boton del programa
function pregunta3(){
    //inicializar el valor de lista a 0
    //si el mesaje de confirmacion del calculo del flujo maximo es verdadero
    if(confirm("Esta seguro de calcular el flujo maximo?")){
        var fm = new FlujoRed();    //crea la varriable en el que se creara la red de flujo
        for(i=0,l=lineas.length; i<l;i++){
            fm.agregarArista(lineas[i].circuloi.numero, lineas[i].circulof.numero, lineas[i].flujo, lineas[i].contraflujo);     //se agraga cada una de las nodos e lineas de la parte grafica
        }
        //creacion del los nodos origen y destino inicializados en un valor nulo
        var origen=null, destino=null, ten= false;
        origen = prompt("Origen : ");   //pregunta para la eleccion de el nodo fuente
       /* for (i = 0, l=arrastrables.length; i < l; i++){
            if(arrastrables[i].numero == origen){ break;}
            else ten=true;
        }
        if(ten){alert("Debe de seleccionar un nodo del grafo"); ten = false; pregunta3(); }*/

        destino = prompt("Destino :");  //pregunta para la eleccion de el nodo sumidero
        /*for (i = 0, l=arrastrables.length; i < l; i++){
            if(arrastrables[i].numero != destino){ break; } 
            else ten=true;
        }
        if(ten){alert("Debe de seleccionar un nodo del grafo"); ten=false; pregunta3(); }*/
        //si los valores del nodo fuente y sumidero no son nulos
        if(origen !=null && destino !=null){
            var max = fm.flujoMaximo(origen,destino);   //se procedera a calcular el flujo maximo del la red de flujo 
            console.log('Flujo Maximo : '+ max)
            alert("flujo maximo : "+ max);              //muestra del flujo maximo mediante un mensaje
        }
    }
}

//funcion que corresponde al momento de enlazar dos nodos 
function pregunta21(){
    var flujos = {f:0,cf:0}     //creacion de una variable que almacena dos variables (notacion json)
    flujos.f = prompt("Ingrese la capacidad del Ni - Nf : ",0);            //pregunta del ingreso de la capacidad  de el nodo origen al destino
    if(flujos.f < 0 || flujos.f == undefined) pregunta21();
    flujos.cf = prompt("Ingrese la capacidad del Nf - Ni : ",0);  //pregunta del ingreso de la capacidad de el nodo destino al origen
    if(flujos.cf < 0 || flujos.cf == undefined) pregunta21();
       
    return flujos;              //retorno del los capacidades de los dos nodos que interactuaron
}

//funcion inicializadora del interfaz grafica
function inicio(){
    canvas=document.getElementById('micanvas'); //almacenamiento de un elemento del documento(HTML) a una variable
    ctx=canvas.getContext('2d');    //generarle al lienzo un contexto de dos dimenciones para graficar en ella
    canvas.width=1000;              //definiendo el ancho del lienzo en pixeles
    canvas.height=600;              //definiendo el alto del lienzo en pixeles

    for (i = 0; i < cantidad; i++) {
        arrastrables.push(new Circulo(aleatorio(canvas.width), aleatorio(canvas.height), 20,abc[arrastrables.length])); //creacion de un arreglo de objetos circulos(nodos)
    }
    
    habilitarEntradas();    //se habilita la llamada constante a las variables de entrada 
    correr();               //se inicializa el corredor de la aplicacion (algo parecido al Timer en C++ o C#)
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
        for (i=0, l = arrastrables.length;i<l; i++){
            //si existe colicion entre los circulos(nodos) y puntero
            if(arrastrables[i].distancia(puntero)<0){
                //si el control de llamadas esta activo
                if(control){
                    tposiciones.push(i);            //agrega el indice del arreglo de circulos(nodos) al arreglo posiciones
                    var pos=tposiciones.length;     //calculo de la cantidad de elementos con que cuenta el arrglo tposiciones
                    //si el siguiente click es par 
                    if(tposiciones.length%2 == 0){
                        pos=tposiciones.length;     //actualiza la la cantidad de elementos del arreglo tposicines
                        var f = pregunta21();
                        if( arrastrables[tposiciones[pos-2]] != arrastrables[tposiciones[pos -1]]){      //variable en que se almacena la capaciadad de los nodos que interactuan
                            lineas.push(new Linea(arrastrables[tposiciones[pos-2]],arrastrables[tposiciones[pos-1]],f.f,f.cf)); //agregar las nuevas lineas con sus posiciones respectivas
                            break; //termino las iteraciones del for
                        }
                    }
                }
                //si no esta activo el control de llamdas
                else{
                    arrastrando=i;  //guardar el indice del el circulo(nodo) seleccionado
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

        for(i = 0, l = lineas.length; i<l; i++){
            lineas[i].dibujar(ctx);     //dibujar la linea en el linzo
            if(c != null){
                for(var j =0, h = c.length; j<h;j++){
                    for(var k =0; k< c[j].length; k++){
                        if(lineas[i].circuloi.numero == c[j][k][0].origen && lineas[i].circulof.numero == c[j][k][0].destino) 
                            lineas[i].color = colores[j]
                    }
                }
            }
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

    
    ctx.fillStyle = '#0f0';     //seleccionar el color del puntero
    ctx.fillRect(puntero.x -1, puntero.y -1, 5,5);  //dibujar el puntero
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
}
//metodo de la clase linea para bibujar la linea
Linea.prototype.dibujar=function(ctx){
    if(ctx !== undefined){
        ctx.beginPath();
        ctx.moveTo(this.circuloi.x,this.circuloi.y);
        ctx.lineTo(this.circulof.x,this.circulof.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
};

//metodo enque se dibuja o muestra enel lienzo los flujos espectivo a cada extremo de la linea
Linea.prototype.dibujarFlujo=function(ctx){
    if(ctx !== undefined){
        ctx.beginPath();
        ctx.font = "15px Arial";
        var puntosi = this.calcularPuntos(ctx,this.circuloi);
        var puntosf = this.calcularPuntos(ctx,this.circulof);

        ctx.fillText(this.flujo,puntosi.x,puntosi.y);
        ctx.fillText(this.contraflujo,puntosf.x,puntosf.y);
        ctx.lineWidth = 1;
        ctx.fill();

        ctx.strokeText(this.flujo,puntosi.x,puntosi.y);
        ctx.strokeText(this.contraflujo,puntosf.x,puntosf.y);
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