console.log('Loaded!');

// Changing inner html value
var element=document.getElementById("main-id");

alert("Hi, I am Javascript");

element.innerHTML= "New Value";


//Moving the image
var madi=document.getElementById("madi");
madi.onclick=function(){
alert("I am inside onclick");
madi.style.marginLeft='100px';
}
  