var button=document.getElementById('btncounter');

button.onclick=function(){
    
    var request=new XMLHttpRequest();
     
    request.open('GET','http://bamutha76.imad.hasura-app.io/counter',true);
    request.send(null);
    alert('tes3t ' + request.readyState + ' ' + XMLHttpRequest.DONE);
    if (request.readyState== XMLHttpRequest.DONE){
         alert('test1');
        if(request.status==200){
            alert('test');
            var counter=request.responseText;
            var span=document.getElementById('spncount');
            span.innerHTML=counter.toString();        
        }
    }
    
   
    
};

