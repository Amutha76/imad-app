var button=document.getElementById('btncounter');

button.onclick=function(){
     var request=new XMLHttpRequest();
     //request.open();
     //request.send();
     //method="GET",
     //url="http://bamutha76.imad.hasura-app.io";
     //request.open(method,url,true);
     
     //request.onreadystatechange=function(){
       // alert('test 2');
        //if (request.readyState=== XMLHttpRequest.DONE){
            
         //   if(request.status==200){
          //      alert('test');
        //        var counter=request.responseText;
        //        var span=document.getElementById('spncount');
        //        span.innerHTML=counter.toString();        
        //    }
    //    }
    
    // request.open('GET','http://bamutha76.imad.hasura-app.io/counter',true);
    //request.send(null);     
    
//};

  if (!request) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      
    }
request.onreadystatechange=function()
{
    alert('fff');
};
};
