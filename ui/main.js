console.log('Loaded!');

// Changing inner html value
var element=document.getElementById("main-id");

alert("Hi, I am Javascript");

element.innerHTML= "New Value";


//Moving the image
var madi=document.getElementById("madi");
var marginleft=0;

function moveright(marginleft){
   alert("I am inside onclick");
  marginleft=marginleft+10;
  madi.style.marginLeft=marginleft +'px';
}

madi.onclick=function(){
   
var interval=setInterval(moveright,100);
};
  