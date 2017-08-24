
console.log("I am inside main");
//var currentArticleTitle = window.location.pathname.split('/')[2];
var ArticleTitle = window.location.pathname.split('/');
alert(ArticleTitle.length + window.location.pathname);
if (ArticleTitle.length>1){
    var currentArticleTitle = window.location.pathname.split('/')[2];
    getcomments();
}else {
   
    getArticles();
}


var displaycomments = document.getElementById('displaycomment');
var entercomments = document.getElementById('entercomment');

var submitLogin=document.getElementById("btnsubmitLogin");
var submitRegister=document.getElementById("btnsubmitRegister");

function getcomments()
{
    var request=new XMLHttpRequest();
    request.open('GET','/getcomments/'+currentArticleTitle,true);
    //request.setRequestHeader('Content-Type','application/json');
    //request.send(JSON.stringify({articletitle:currentArticleTitle}));
    
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var commentsData = JSON.parse(this.responseText);
                var commentshtml='';
                for (i=0;i<commentsData.length;i++){
                    commentsData+='<div>'+commentsData[i].comment+'</div><div>'+commentsData[i].date+'</div><p>';
                }
                displaycomments.innerHTML=commentsData;
            }else{
              displaycomments.innerHTML='No comments for this article';    
            }
        }
         
     };
}

function getArticles(){
    var articleList=document.getElementById("articles");
    var request=new XMLHttpRequest();
    request.open('GET','/article-list',true);
    request.send(null); 
    request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
          if (request.status === 200) {
              var articleData = JSON.parse(this.responseText);
              var html="<ul>"
              for (i=0; i<articleData.length; i++){
                  html += `<li> <a href="/articles/${articleData[i].title}"> ${articleData[i].title} </a> ( ${articleData[i].date.split('T')[0]}) </li>`
                  
              }
             articleList.innerHTML=html;
              
          }
          
     }
 
};
    
}



submitLogin.onclick=function(){
  
  var username=document.getElementById("txtName").value;  
  var password=document.getElementById("pwdPassword").value;
 
  var request=new XMLHttpRequest();
  request.open('POST','/login',true);
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
  request.open('POST','/create-user',true);
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
 
//var currentArticleTitle = window.location.pathname.split('/')[2];
    
getArticles();
//getcomments();
