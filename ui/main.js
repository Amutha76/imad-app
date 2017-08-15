var button=document.getElementById('btncounter');
alert('I am in main.js');
var counter=0;
button.onclick=function(){
    alert('I am inside onclick in main.js');
    counter=counter+1;
    var span=document.getElementById('spncount');
    span.innerHTML=counter.toString();
};

