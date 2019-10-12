// тут может находится ваш код
let colors=['red','orange','white','green',"aqua","blue", "violet"];
let el, animation, ctx, crR;
let elements=[];
let hits=0;
let out=0;

let $startButton=$('#start');
let $stopButton=$('#stop');
let $modalButton=$('#modal');
let $closeButton=$('#close');
let $clickArea=$("#canvas");
let score=document.getElementById("score");
let lose=document.getElementById("lose");
let result=document.getElementById("result");

var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

$startButton.on("click", function (){
    elements=[];
    hits=0;
    out=0;
    score.innerText=hits;
    lose.innerText=out;
    newRect();
    animate();
});

$stopButton.on("click", function (){  
    cancelAnimationFrame(animation);
    clearTimeout(crR);
    clear();
});

$modalButton.on("click", function (){
  $('#modal').modal('show');
});
$closeButton.on("click", function(){
  $('#modal').modal('hide');
  let modal=document.getElementById("modal");
  modal.style.display="block";
});

$clickArea.on("click", function (event){
  for (let i=0; i<elements.length;i++)
  {
    if ((elements[i].x<event.clientX-canvas.offsetLeft && elements[i].x+30 > event.clientX-canvas.offsetLeft ) 
    && (event.clientY-canvas.offsetTop < elements[i].y+30 && event.clientY-canvas.offsetTop > elements[i].y))
    {
      elements[i].y=600; 
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
    if (elements[i].y>=480){
      if (elements[i].y<550){
        out++;
        lose.innerText=out;
      }
      elements.splice(i,1);
    }
  }
}

let clear=function(){
  ctx.clearRect(0,0,640,480);
  elements=[];
}

let checkResult=function(){
  if (hits>=30 || out >=10)
  {
    $('#stop').click();
  }
  if (hits>=30){
    result.innerText="YOU WIN!!!";
  }
  if(out>=10)
    result.innerText="YOU LOSE :(";
}

function animate() {
  
  ctx.clearRect(0,0,640,480); // clear canvas

  moveRect();
  delRect();
  checkResult();

  for (let i=0; i<elements.length; i++)
    elements[i].Draw(ctx);

  animation= requestAnimationFrame(animate);
}
