// тут может находится ваш код
let colors=['red','orange','yellow','green',"aqua","blue", "violet"];
let el, animation, ctx, crR;
let elements=[];
let hits=0;

let $startButton=$('#start');
let $stopButton=$('#stop');
let $clickArea=$("#canvas");
let score=document.getElementById("score");

var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

$startButton.on("click", function (){
    elements=[];
    hits=0;
    score.innerText=hits;
    newRect();
    animate();
});

$stopButton.on("click", function (){  
    cancelAnimationFrame(animation);
    clearTimeout(crR);
    clear();
});

$clickArea.on("click", function (event){
  for (let i=0; i<elements.length;i++)
  {
    if ((elements[i].x<event.clientX-canvas.offsetLeft && elements[i].x+30 > event.clientX-canvas.offsetLeft ) 
    && (event.clientY-canvas.offsetTop < elements[i].y+30 && event.clientY-canvas.offsetTop > elements[i].y))
    {
      elements[i].y=500; 
      hits++;
      score.innerText=hits;
    }
  }
});

class Rect {
  constructor(){
    this.x=Math.round(Math.random()*630);
    this.y=0;
    this.w=20;
    this.h=20;
    this.color=colors[Math.round(Math.random()*7)];
    this.speed=Math.round(Math.random()*2+0.5);
  }
  Draw (context)
  {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x,this.y,this.w,this.h);
  }
}

let newRect=function()
{
  el=new Rect();
  elements.push(el);
  crR=setTimeout(() => newRect(), 2000);
}

let moveRect=function(){
  for (let i=0; i<elements.length; i++)
  {
    elements[i].y+=elements[i].speed;
  }
}

let delRect=function(){
  for (let i=0; i<elements.length; i++)
  {
    if (elements[i].y>=480)
      elements.splice(i,1);
  }
}

let clear=function(){
  ctx.clearRect(0,0,640,480);
  elements=[];
}

function animate() {
  
  ctx.clearRect(0,0,640,480); // clear canvas

  moveRect();
  delRect();

  for (let i=0; i<elements.length; i++)
    elements[i].Draw(ctx);

  animation= requestAnimationFrame(animate);
}
