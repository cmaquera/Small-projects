
(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var canvas=null,ctx=null;
    var lastUpdate=0;
    var mousex=0,mousey=0;
    var player=new Circle(0,0,5);
    var target=new Circle(100,100,10);

    function init(){
        canvas=document.getElementById('micanvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;
        
        run();
    }

    function run(){
        requestAnimationFrame(run);
            
        var now=Date.now();
        var deltaTime=(now-lastUpdate)/1000;
        if(deltaTime>1)deltaTime=0;
        lastUpdate=now;
        
        act(deltaTime);
        paint(ctx);
    }

    function act(deltaTime){
        player.x=mousex;
        player.y=mousey;
        
        if(player.x<0)
            player.x=0;
        if(player.x>canvas.width)
            player.x=canvas.width;
        if(player.y<0)
            player.y=0;
        if(player.y>canvas.height)
            player.y=canvas.height;
        
        if(target.distance(player)>0){
            var angle=target.getAngle(player);
            target.move(angle,deltaTime*100);
        }
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.strokeStyle='#0f0';
        player.stroke(ctx);
        ctx.strokeStyle='#f00';
        target.stroke(ctx);
        
        ctx.fillStyle='#fff';
        ctx.fillText('Distance: '+player.distance(target).toFixed(1),10,10);
        ctx.fillText('Angle: '+(player.getAngle(target)*(180/Math.PI)).toFixed(1),10,20);
    }

    document.addEventListener('mousemove',function(evt){
        mousex=evt.pageX-getAbsX(canvas);
        mousey=evt.pageY-getAbsY(canvas);
    },false);

    function getAbsX(e){
        var x=0;
        while(e!=null){
            x+=e.offsetLeft;
            e=e.offsetParent;
        }
        return x;
    }

    function getAbsY(e){
        var y=0;
        while(e!=null){
            y+=e.offsetTop;
            e=e.offsetParent;
        }
        return y;
    }

    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
    }
        
    Circle.prototype.distance=function(circle){
        if(circle!=null){
            var dx=this.x-circle.x;
            var dy=this.y-circle.y;
            return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
        }
    }

    Circle.prototype.getAngle=function(circle){
        if(circle!=null)
            return (Math.atan2(circle.y-this.y,circle.x-this.x));
    }

    Circle.prototype.move=function(angle,speed){
        if(speed!=null){
            this.x+=Math.cos(angle)*speed;
            this.y+=Math.sin(angle)*speed;
        }
    }

    Circle.prototype.stroke=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.stroke();
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();
