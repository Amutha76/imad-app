
console.log("I am inside main");

var submitName=document.getElementById("btnsubmitName");


submitName.onclick=function(){
  var name=document.getElementById("txtName").value;  
  var password=document.getElementById("pwdPassword").value;
 
  var request=new XMLHttpRequest();
  request.open('POST','http://bamutha76.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username,password:password})); 
 
  request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
               alert('User credentials are correct');
             } else if (request.status==403){
                 alert('Invalid username and password');
             } else if (request.status==500){
                 alert('Internal server error');
             }
        }
    };

};



