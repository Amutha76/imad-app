var button=document.getElementById('btncounter');

var counter=0;
button.onclick=function(){
    alert(' I am inside click function');
    counter=counter+1;
    var span=document.getElementById('spncount');
    span.innerHTML=counter.toString();
};

