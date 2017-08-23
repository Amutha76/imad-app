
console.log("I am inside main");

var submitLogin=document.getElementById("btnsubmitLogin");
var submitRegister=document.getElementById("btnsubmitRegister");

submitLogin.onclick=function(){
  
  var username=document.getElementById("txtName").value;  
  var password=document.getElementById("pwdPassword").value;
 
  var request=new XMLHttpRequest();
  request.open('POST','http://bamutha76.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username,password:password})); 
 
  request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
               alert('User successfully logged in');
             } else if (request.status==403){
                 alert('Invalid username and password');
             } else if (request.status==500){
                 alert('Internal server error');
             }
        }
    };

};

submitRegister.onclick=function(){
  
  var username=document.getElementById("txtName").value;  
  var password=document.getElementById("pwdPassword").value;
 
  var request=new XMLHttpRequest();
  request.open('POST','http://bamutha76.imad.hasura-app.io/create-user',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username,password:password})); 
 
  request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
               alert('User successfully created');
             } else if (request.status==403){
                 alert('Cannot create user');
             } else if (request.status==500){
                 alert('Internal server error');
             }
        }
    };

};


