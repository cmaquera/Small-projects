(function(){
    'use strict';
    window.addEventListener('load',init,false);
    var socket=null;
    var canvas=null,ctx=null;
    var time=0;
    var pause=true;
    var moving=false;
    var lastPress=null;
    var mousex=0,mousey=0;
    var score=0,counter=0;
    var bgColor='#000';
    var players=[];
    var player=new Circle(0,0,5);
    var target=new Circle(100,100,10);
    var spritesheet=new Image();
    spritesheet.src='targetshoot.png';

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=200;

        enableInputs();
        enableSockets();
        run();
    }

    function random(max){
        return ~~(Math.random()*max);
    }

    function run(){
        requestAnimationFrame(run);
            
        var now=Date.now();
        var deltaTime=now-time;
        if(deltaTime&gt;1000)deltaTime=0;
        time=now;
        
        act(deltaTime);
        paint(ctx);
    }

    function act(deltaTime){
        player.x=mousex;
        player.y=mousey;

        if(player.x&lt;0)
            player.x=0;
        if(player.x&gt;canvas.width)
            player.x=canvas.width;
        if(player.y&lt;0)
            player.y=0;
        if(player.y&gt;canvas.height)
            player.y=canvas.height;
        
        if(moving){
            socket.emit('mySight', player.x, player.y);
            moving=false;
        }

        counter-=deltaTime;
        if(!pause){
            if(lastPress==1){
                bgColor='#333';
                if(player.distance(target)&lt;0){
                    score++;
                    target.x=random(canvas.width/10-1)*10+target.radius;
                    target.y=random(canvas.height/10-1)*10+target.radius;
                }
            }
            else{
                bgColor='#000';
            }

            if(counter&lt;1){
                pause=true;
            }
        }
        else if(lastPress==1&amp;&amp;counter&lt;-1000){
            pause=false;
            counter=10000;
            score=0;
        }
        lastPress=null;
    }

    function paint(ctx){
        ctx.fillStyle=bgColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle='#f00';
        //target.stroke(ctx);
        target.drawImageArea(ctx,spritesheet,0,0,20,20);
        ctx.strokeStyle='#0f0';
        //player.stroke(ctx);
        for(var i=0,l=players.length;i&lt;l;i++){
            if(players[i]!=null)
                players[i].drawImageArea(ctx,spritesheet,10*(i%4),20,10,10);
        }

        ctx.fillStyle='#fff';
        //ctx.fillText('Distance: '+player.distance(target).toFixed(1),0,10);
        ctx.fillText('Score: '+score,0,10);
        if(counter&gt;0)
            ctx.fillText('Time: '+(counter/1000).toFixed(1),250,10);
        else
            ctx.fillText('Time: 0.0',250,10);
        if(pause){
            ctx.fillText('Score: '+score,120,100);
            if(counter&lt;-1000)
                ctx.fillText('CLICK TO START',100,120);
        }
    }
    
    function enableSockets(){
        socket=io.connect();
        socket.on('sight', function(n,x,y) {
            if(x==null&amp;&amp;y==null)
                players[n]=null;
            else if(!players[n])
                players[n]=new Circle(x,y,5);
            else{
                players[n].x=x;
                players[n].y=y;
            }
        });
    }

    function enableInputs(){
        document.addEventListener('mousemove',function(evt){
            mousex=evt.pageX-canvas.offsetLeft;
            mousey=evt.pageY-canvas.offsetTop;
            moving=true;
        },false);
        canvas.addEventListener('mousedown',function(evt){
            lastPress=evt.which;
        },false);
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

    Circle.prototype.stroke=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.stroke();
    }

    Circle.prototype.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width)
            ctx.drawImage(img,sx,sy,sw,sh,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
        else
            this.stroke(ctx);
    }

    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
})();
