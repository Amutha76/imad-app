var button=document.getElementById('btncounter');
var submitName=document.getElementById("btnsubmitName");
 var ulName=document.getElementById("ulName");

button.onclick=function(){
     var request=new XMLHttpRequest();
     request.open('GET','http://bamutha76.imad.hasura-app.io/counter',true);
     request.send(null);    
     
     request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
                var counter=request.responseText;
                var span=document.getElementById('spncount');
                span.innerHTML=counter.toString();        
            }
        }
};

};

submitName.onclick=function(){
  var EleName=document.getElementById("txtName");    
  var request=new XMLHttpRequest();
  request.open('GET','http://bamutha76.imad.hasura-app.io/submit-name?name='+EleName,true);
  request.send(null); 
  var names=request.responseText; 
  names=JSON.parse(names);
  var list='';
  request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
                for( var i=0; i<names.length ; i++){
                    list+='<li>' + names[i] + '</li>';
      
                }        
            }
        }
};
 
  
  ulName.innerHTML=list;
    
};

 
//request.onreadystatechange=function()
//{
  //  alert('fff');
//};

