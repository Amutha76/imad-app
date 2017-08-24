//var currentArticleTitle = window.location.pathname.split('/')[2];
console.log("I am inside main");
alert('I am  testing window location' + window.location.pathname );

var ArticleTitle = window.location.pathname.split('/');
//alert(ArticleTitle.length + window.location.pathname);
//if (ArticleTitle.length>2){
    //var currentArticleTitle = window.location.pathname.ssting wiplit('/')[2];
   // getcomments();
//}else {
   
    //getArticles();
//}


var displaycomments = document.getElementById('displaycomment');
var entercomments = document.getElementById('entercomment');

var submitLogin=document.getElementById("btnsubmitLogin");
var submitRegister=document.getElementById("btnsubmitRegister");
var articleList=document.getElementById("articles");

articleList.onclick=function(){
    getcomments();
};

function getcomments()
{
   var currentArticleTitle = window.location.pathname.split('/')[1];
    alert('I am inside getcomments' + window.location.pathname );
    var request=new XMLHttpRequest();
    request.open('POST','/getcomments/'+currentArticleTitle,true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({articletitle:currentArticleTitle}));
    //request.send(null);
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


if (submitLogin !== null){
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
}
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
//request.onreadystatechange=function(){
//    if (request.readyState === XMLHttpRequest.DONE) {
//            if (request.status === 200) {
//                alert('I am ready');
//                if (ArticleTitle.length>2){
//                 alert('I am going to get comments');
//                 getcomments();
//                }
//            }
        
//    }else{
//        alert('Not ready');
//    }
//}
//getcomments();
