var c = []; //variable en que se alamcenra la cadena de de caminos desde el nodo funete al no do sumidero
//CREACION DEL CLASE ARISTA
var Arista = function(origen, destino, capacidad){
    this.origen = origen;           //Nodo origen
    this.destino = destino;         //Nodo destino
    this.capacidad = capacidad;     //Capacidad de nodo origen
    this.aristaIversa = null;       //La arista inversa al flujo
    this.flujo = 0;                 //Flujo que llev a la arista
};

//CREACION DE LA CLASE QUE MUESTRA 
var FlujoRed = function (){
    this.aristas = {};      //Arreglo de onjetos "Arista"
    this.fuente;            //Variable que almacena el nodo fuente del grafo

    //Metodo que busca el camino en la red Residual
    this.buscarAristaCamino = function(camino, arista, residual){
        for(var i=0; i<camino.length;i++){
            //Si la arista elegida para aumentar el camino ya fue elegida
            if(camino[i][0] == arista && camino[i][1] == residual){
                return true; //no la tomamos esa arista
            }
        }
        return false; //tomamos esa arista
    };

    //METODO EN EL QUE SE AGREGAN ARISTAS A LA RED DE FLUJO
    this.agregarArista = function(origen, destino, capacidad, capacidad2){
        //Si el nodo origen es igual al destino 
        if(origen == destino) return;       //entoces no devolvemos ningun valor y termina el proceso del metodo

        var arista, aristaIversa;
        arista = new Arista(origen, destino, capacidad);            //Se procedera con la creacion de la Arista
        aristaIversa = new Arista(destino, origen, capacidad2);     //Se procedera con la creacion de la Arista Inversa

        arista.aristaIversa =  aristaIversa;    //Asignacion de la Arista inversa a la Arista
        aristaIversa.aristaIversa = arista;     //Asignaicon de la Arista como Arista inversa a la Arista inversa

        //Si el Arreglo de objetos con nodo origen aun no es creada
        if(this.aristas[origen] === undefined) this.aristas[origen]=[];     //entonces creamos el Arreglo de origen
        //Si el Arreglo de objetos con el nodo destino aun no es creada
        if(this.aristas[destino] === undefined) this.aristas[destino] =[];  //entonces creamos el Arreglo de destino

        //Agragamos el objeto Arista al Arreglo de el nodo origen
        this.aristas[origen].push(arista);
        //Agragamos el objeto Arista Inversa al Arreglo de el nodo destino 
        this.aristas[destino].push(aristaIversa);
    };


    //Metodo que busca aristas dobles por el camino aumetado
    this.buscarCaminoDoble = function(camino, arista){
        for(var i=0; i<camino.length;i++){
            //si la arista elegia por el camino aumentado es la misma que la anterior pero va en sentido contrario 
            if(camino[i][0].aristaIversa == arista || camino[i][0] == arista || arista.destino == this.fuente || camino[i][0].origen == arista.destino){
                return true; //entonces no se procedera por ese camino
            }
        }
        return false;   //entonces se procedera por el camino
    };


    //Buscar los caminos desde el origen hasta el destino
    this.buscarCamino = function(origen, destino, camino){
        //Si el origen y el destino del camino aumentado es el mismo
        if(origen == destino) return camino;    // retorno el camino existente por que no existe mas camino que recorrer


        for(var i=0; i<this.aristas[origen].length;i++){
            //si la arista elgida para el camino aumeteado no tiene un camino doble 
            if(!this.buscarCaminoDoble(camino, this.aristas[origen][i])){
                var arista = this.aristas[origen][i];               //se el asignara a una variable auxiliar
                var residual = arista.capacidad - arista.flujo;     //calculara la capacidad residual de la arista existente en el nodo origen de la arista
            }

            //Si aun la arista cuenta con capacidad para agregar flujo y no se encuentra en el camino aumentado
            if(residual > 0 && !this.buscarAristaCamino(camino, arista, residual)){
                var tcamino = camino.slice(0);          //Unbicamos el Arreglo camino en el elemento inicial
                tcamino.push([arista, residual]);       //Se agrada al arreglo camino un objeto camino (esto seria parecido a una etiqueta)
                var resultado = this.buscarCamino(arista.destino,destino, tcamino);     //Buscamos un una arista para el camino aumentado, pero en este caso ya contamos con un camino aterior
                //Si existe un camino desde el nodo fuente al nodo sumidero
                if(resultado != null) return resultado;
            }
        }
        //si no existen aristas salientes del nodo origen no existe camino que buescar
        return null;
    };

    //Metodo con la funcion de calcular el flujo maximo de la Red de residual
    this.flujoMaximo = function(origen, destino){
        this.fuente = origen;       //Asiganos el valor nodo origen como el nodo fuente
        var camino = this.buscarCamino(origen, destino, []);        //Variable en que se amacenara el Arreglo camino
        //if(c != null) c.slice(0);
        //Miesntras el camino exista
        while(camino != null){
            var flujo = 999999;     //Asiganacion del flujo Maximo

            for(var i=0;i<camino.length;i++){
                //Si la capacidad residual del Arreglo camino es menor que el flujo
                if(camino[i][1] < flujo){
                    flujo = camino[i][1];   //entonces se asigana  el valor residual del camino 
                    console.log('camino ' +i +' : '+ camino[i][1] );        
                }
            }

            for(var i=0; i<camino.length;i++){
                camino[i][0].flujo += flujo;                //el flujo de las aristas del camino se aumenta en la menor capacidad residual
                camino[i][0].aristaIversa.flujo = -camino[i][0].flujo;
                //camino[i][0].aristaIversa.flujo -= flujo;   //el flujo de las aristas inversas del camino se disminuye en la menor capacidad residual

                console.log('flujo camino ' + i +' origen: ' + camino[i][0].origen +' destino: ' + camino[i][0].destino);
            }
            c.push(camino);     //se agrega a la arreglo de de camininos encontrados del nodo funete al nodo sumidero 
            camino = this.buscarCamino(origen, destino, []);    //Abuscar el siguiente camino aumentante
        }

        var suma = 0; //variable en el que se almacenaran el flujo maximo

        for(var i=0; i<this.aristas[origen].length;i++){
            suma += this.aristas[origen][i].flujo;      //suma de los flujos entrantes al nodo fuente
        }
        return suma; //retornamos la el flujo maximo del grafo o red
    };
};































































function cuerpo(){

    //document.writeln('<h2>flujo maximo de los nodos A ==> I<h2>');
    var fn = new FlujoRed();
   
    fn.agregarArista('a','b',20,0);
    fn.agregarArista('a','c',30,0);
    fn.agregarArista('a','d',10,0);
    fn.agregarArista('b','e',30,0);
    fn.agregarArista('b','c',40,0);
    fn.agregarArista('c','d',10,5);
    fn.agregarArista('c','e',20,0);
    fn.agregarArista('d','e',20,0);


/*
    fn.agregarArista('a','b',3,0);
    fn.agregarArista('a','c',2,4);
    fn.agregarArista('a','d',2,0);
    fn.agregarArista('b','c',4,3);
    fn.agregarArista('b','e',4,3);
    fn.agregarArista('b','g',4,2);
    fn.agregarArista('c','d',1,2);
    fn.agregarArista('c','e',3,0);
    fn.agregarArista('c','f',4,2);
    fn.agregarArista('d','f',6,0);
    fn.agregarArista('d','h',4,2);
    fn.agregarArista('e','f',3,1);
    fn.agregarArista('e','g',4,3);
    fn.agregarArista('e','i',4,0);
    fn.agregarArista('f','h',4,2);
    fn.agregarArista('f','i',3,0);
    fn.agregarArista('g','i',4,0);
    fn.agregarArista('h','i',3,0);
*/
    var max = fn.flujoMaximo('a','e');

    console.log(max);
   // document.writeln('<h2> Flujo Maximo : ' + max + '</h2>');
}

