var button=document.getElementById('btncounter');

button.onclick=function(){
    
    var request=new XMLHttpRequest();
     
   
    alert('tes3t ' + request.readyState + ' ' + XMLHttpRequest.DONE);
    if (request.readyState=== 0){
         alert('test1 ' + request.status);
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

