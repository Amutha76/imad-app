var button=document.getElementById('btncounter');
var counter=0;
button.onClick=function(){
    alert(' I am inside click function');
    counter=counter+1;
    var span=document.getElementById('spncount');
    span.innerHTML=counter.toString();
};

