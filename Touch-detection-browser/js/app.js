(function(){
	'use strict';
	window.addEventListener('load', inicializacion, false);
	window.addEventListener('resize', cambiarTamaño, false);
	var canvas=null, contexto=null;
	var scalaX=1, scalaY=1;
	var toques=[];
	var colores=['#f00', '#0f0', '#00f', '#fff'];

	function inicializacion(){
		canvas = document.getElementById('canvas');
		contexto = canvas.getContext('2d');
		canvas.width =200;
		canvas.height=300;

		canvas.style.position='fixed';
		canvas.style.top='0';
		canvas.style.left='0';
		canvas.style.width='100%';
		canvas.style.height='100%';

		habilitarEntradas();
		cambiarTamaño();
		correr();
	}

	function cambiarTamaño(){
		if(window.innerWidth> window.innerHeight){
			//modo paisaje
			canvas.width=300;
			canvas.height=200;
		}
		else {
			//modo retrato
			canvas.width=200;
			canvas.height=300;
		}

		scalaX=canvas.width/window.innerWidth;
		scalaY=canvas.height/window.innerHeight;
	}

	function correr(){
		requestAnimationFrame(correr);
		actividad();
		pintar(contexto);
	}

	function actividad(){

	}

	function pintar(contexto){
		contexto.fillStyle='#000';
		contexto.fillRect(0,0,canvas.width,canvas.height);

		contexto.fillStyle='#999';
		contexto.fillText('Toque para probar :D',10,10);
		for(var i=0; i<toques.length;i++){
			if(toques[i]){
				contexto.fillStyle=colores[i%colores.length];
				contexto.fillRect(toques[i].x-10, toques[i].y-10,20,20);
				contexto.fillText('ID: ' +i+ ' X: ' +toques[i].x +' Y: ' +toques[i].y, 10,10*i+20);
			}
		}
	}

	function habilitarEntradas(){
		canvas.addEventListener('touchstart', function(evento){
			var toque=evento.changedTouches;
			for(var i=0; i<toque.length;i++){
				var x=~~((toque[i].pageX-canvas.offsetLeft)*scalaX);
				var y=~~((toque[i].pageY-canvas.offsetTop)*scalaY);
				toques[toque[i].identifier%100]=new punto(x,y);
			}
		},false);

		canvas.addEventListener('touchend', function(evento){
			var toque=evento.changedTouches;
			for(var i=0; i<toque.length;i++){
				toques[toque[i].identifier%100]=null;
			}
		},false);

		canvas.addEventListener('touchcancel', function(evento){
			var toque=evento.changedTouches;
			for(var i=0; i<toque.length;i++){
				toques[toque[i].identifier%100]=null;
			}
		},false);

		canvas.addEventListener('touchmove', function(evento){
			evento.preventDefault();
			var toque=evento.changedTouches;
			for(var i=0; i<toque.length;i++){
				if(toques[toque[i].identifier%100]){
					toques[toque[i].identifier%100].x=~~((toque[i].pageX-canvas.offsetLeft)*scalaX);
					toques[toque[i].identifier%100].y=~~((toque[i].pageY-canvas.offsetTop)*scalaY);
				}
			}
		},false);

		canvas.addEventListener('mousedown',function(evento){
	        evento.preventDefault();
	        var x=~~((evento.pageX-canvas.offsetLeft)*scalaX);
	        var y=~~((evento.pageY-canvas.offsetTop)*scalaY);
	        toques[0]=new punto(x,y);
	    },false);
	        
	    document.addEventListener('mousemove',function(evento){
	        if(toques[0]){
	            toques[0].x=~~((evento.pageX-canvas.offsetLeft)*scalaX);
	            toques[0].y=~~((evento.pageY-canvas.offsetTop)*scalaY);
	            }
	        },false);

	    document.addEventListener('mouseup',function(evento){
	        toques[0]=null;
	    },false);
	}

	function punto(x,y){
		this.x=x||0;
		this.y=y||0;
	}

	window.requestAnimationFrame=(function(){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback){window.setTimeout(callback,17);};
	})();

})();