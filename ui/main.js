var button=document.getElementById('btncounter');
console.log('main.js');
var counter=0;
button.onclick=function(){
    
    counter=counter+1;
    var span=document.getElementById('spncount');
    span.innerHTML=counter.toString();
};

