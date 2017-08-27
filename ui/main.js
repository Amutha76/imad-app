//var currentArticleTitle = window.location.pathname.split('/')[2];
console.log("I am inside main");
//alert('I am  testing window location' + window.location.pathname );
var currentArticleTitle='';
var ArticleTitle = window.location.pathname.split('/');
//alert(ArticleTitle.length + window.location.pathname);

var displaycomments = document.getElementById('displaycomment');
var entercomments = document.getElementById('entercomment');
var txtcomment=document.getElementById("txtcomment");
var submitLogin=document.getElementById("btnsubmitLogin");
var submitRegister=document.getElementById("btnsubmitRegister");
var articleList=document.getElementById("articles");
var checklogin='logout';

if (ArticleTitle.length>2){
    currentArticleTitle = window.location.pathname.split('/')[2];
    getcomments();
}
//}else {
   
    //getArticles();
//}




function getcomments()
{
  // var currentArticleTitle = window.location.pathname.split('/')[1];
   // alert('I am inside getcomments' + currentArticleTitle );
    var request=new XMLHttpRequest();
    var checklogin=loadlogin();
  //  alert('Check Login value is ' + checklogin );
    if(checklogin=='logout'){
        entercomments.style.visibility = "hidden";
    }else{
         entercomments.style.visibility = "visible";
    }
    request.open('POST','/getcomments',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({currentArticleTitle:currentArticleTitle}));
    //request.send(null);
   
    
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            
            if (request.status === 200) {
                var commentsData = JSON.parse(this.responseText);
                var commentsrows=commentsData.length;
                var commentshtml='';
                for (var i=0; i<commentsrows; i++){
                   
                    commentshtml+=`<div>' ${commentsData[i].comment}  </div><div> By ${commentsData[i].username} on  ${commentsData[i].date.split('T')[0]}</div><p>`;
                   
                }
             //   alert('comments ' + commentshtml);
                displaycomments.innerHTML=commentshtml;
            }else{
              displaycomments.innerHTML='No comments for this article';    
            }
        }
         
     };
}


function loadlogin(){
    var rtnloginval='logout';
    var request=new XMLHttpRequest();
    request.open('GET','/check-login',true);
    request.send(null); 
    request.onreadystatechange=function(){
    var checklogin = JSON.parse(this.responseText);
    alert('I am inside loadlogin ' + checklogin );
     if (request.readyState=== XMLHttpRequest.DONE){
          if (request.status === 200) {
              rtnloginval='login';
              //alert('you are logged in ' + checklogin );
              return rtnloginval;
            }else{
              rtnloginval='logout';  
              return rtnloginval;
              //alert('you are logged out ' + checklogin);
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
              var html="<ul>";
              for (i=0; i<articleData.length; i++){
                  html += `<li> <a href="/articles/${articleData[i].title}"> ${articleData[i].title} </a> ( ${articleData[i].date.split('T')[0]}) </li>`;
                  
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
  if (submitLogin.value=='Login'){
     
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
      submitLogin.value='Logout';  
  }else{
     
      request.open('GET','/logout',true);
      request.setRequestHeader('Content-Type','application/json');
      request.send(null); 
     
      request.onreadystatechange=function(){
      
         if (request.readyState=== XMLHttpRequest.DONE){
                
                if(request.status==200){
                   alert('User successfully logged out');
                   
                 } else if (request.status==500){
                     alert('Internal server error');
                 }
            }
      submitLogin.value='Login';
  };
}
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