
console.log("I am inside main");

var submitName=document.getElementById("btnsubmitName");


submitName.onclick=function(){
  var name=document.getElementById("txtName").value;  
  var password=document.getElementById("pwdPassword").value;
 
  var request=new XMLHttpRequest();
  request.open('GET','http://bamutha76.imad.hasura-app.io/submit-name?name='+ name,true);
  request.send(null); 
 
  request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
                var names=request.responseText;
                var ulName=document.getElementById("ulName");
                names=JSON.parse(names);
                 var list='';
                for( var i=0; i<names.length ; i++){
                    list+='<li>' + names[i] + '</li>';
      
                }
                ulName.innerHTML=list;
            }
        }
    };

};



