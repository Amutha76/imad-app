var button=document.getElementById('btncounter');
var counter=0;
button.onClick=function(){
    counter=counter + 1;
    var span=document.getElementById('spncount');
    span.innerHTML=counter.toString();
}