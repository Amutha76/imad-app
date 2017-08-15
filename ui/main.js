var button=document.getElementById('btncounter');
var counter=0;
button.onclick=function(){
    
    var request=new XMLHttpRequest();
    
    if (request.readyState== XMLHttpRequest.DONE){
        
        if(request.status==200){
            alert('test');
            var counter=request.responseText;
            var span=document.getElementById('spncount');
            span.innerHTML=counter.toString();        
        }
    }
    
    request.open('GET','http://bamutha76.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

