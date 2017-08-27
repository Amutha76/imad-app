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
var submitcomment=document.getElementById("btnsubmitcomment");
var submitcomment=document.getElementById("btnsubmitLogout");
//var checklogin=false;




if (ArticleTitle.length>2){
    currentArticleTitle = window.location.pathname.split('/')[2];
    getcomments();
}else{
    loadlogin();
    getArticles();
}
//  checklogin=loadlogin();
//    alert('testing checklogin 1' +checklogin );
 //   alert('testing checklogin 2' +checklogin.value );
  //  if(checklogin  !== true){
 //        submitLogin.value="Login";
 //   }else{
 //        submitLogin.value="Logout";
 //   }
//}
//}else {
   
    //getArticles();
//}




function getcomments()
{
  // var currentArticleTitle = window.location.pathname.split('/')[1];
   // alert('I am inside getcomments' + currentArticleTitle );
    var request=new XMLHttpRequest();
   // var checklogin=loadlogin();
    //alert('Check Login value is ' + checklogin );
   // if(loadlogin() ===true){
   //     entercomments.style.visibility = "hidden";
    //}else{
    //     entercomments.style.visibility = "visible";
//    }
    loadcomment();
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


function loadcomment(){
   // var rtnloginval='logout';
    var request=new XMLHttpRequest();
    request.open('GET','/check-login',true);
    request.send(null); 
    request.onreadystatechange=function(){
    var checklogin = this.responseText;
   // alert('I am inside loadlogin ' + checklogin );
     if (request.readyState=== XMLHttpRequest.DONE){
          if (request.status === 200) {
           // alert('load login is true');
           togglecommenton() ;
            }else{
            
            togglecommentoff();  
              
            }
     }else{
           togglecommentoff();
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

if(submitLogin !==null){
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
                      // alert('User successfully logged in');
                       logoutvisible();
                     } else if (request.status==403){
                         alert('Invalid username and password');
                     } else if (request.status==500){
                         alert('Internal server error');
                     }
                }
            };
      };
}
  
  if(submitcomment !==null){
      submitcomment.onclick=function(){
      
      var comment=document.getElementById("txtcomment").value;  
      
      var request=new XMLHttpRequest();
      
          request.open('POST','/insertcomment/'+currentArticleTitle,true);
          request.setRequestHeader('Content-Type','application/json');
          alert('comment is' + comment);
          request.send(JSON.stringify({comment:comment})); 
         
          request.onreadystatechange=function(){
          
             if (request.readyState=== XMLHttpRequest.DONE){
                    
                    if(request.status==200){
                      // alert('User successfully logged in');
                       comment.innerHTML='';
                       loadcomment();
                     } 
                }
            };
      };
  }
  
  if(submitcomment !==null){
      submitcomment.onclick=function(){
      
      var comment=document.getElementById("txtcomment").value;  
      
      var request=new XMLHttpRequest();
      
          request.open('POST','/insertcomment/'+currentArticleTitle,true);
          request.setRequestHeader('Content-Type','application/json');
          alert('comment is' + comment);
          request.send(JSON.stringify({comment:comment})); 
         
          request.onreadystatechange=function(){
          
             if (request.readyState=== XMLHttpRequest.DONE){
                    
                    if(request.status==200){
                      // alert('User successfully logged in');
                       comment.innerHTML='';
                       loadcomment();
                     } 
                }
            };
      };
  }
  
  
 if(submitRegister !==null){ 
    submitRegister.onclick=function(){
      alert('I am calling insert');
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
 } 
//var currentArticleTitle = window.location.pathname.split('/')[2];
    
function togglecommenton(){
    var entercomments = document.getElementById('entercomment');    
    entercomments.style.visibility = "visible";
}    

function togglecommentoff(){
var entercomments = document.getElementById('entercomment');    
      entercomments.style.visibility = "hidden";
}

function loadlogin(){
   // var rtnloginval='logout';
    var request=new XMLHttpRequest();
    request.open('GET','/check-login',true);
    request.send(null); 
    request.onreadystatechange=function(){
    var checklogin = this.responseText;
   // alert('I am inside loadlogin ' + checklogin );
     if (request.readyState=== XMLHttpRequest.DONE){
          if (request.status === 200) {
             logoutvisible()
            
            }else{
            
             loginvisible();  
              
            }
     }else{
            loginvisible();
     }
 };

}    

function loginvisible(){
  var loginarea = document.getElementById('login_area');
  var logoutarea = document.getElementById('logout_area');
  loginarea.style.visibility = "visible";
  logoutarea.style.visibility = "hidden";
}
function logoutvisible(){
  var loginarea = document.getElementById('login_area');
  var logoutarea = document.getElementById('logout_area');
  loginarea.style.visibility = "hidden";
  logoutarea.style.visibility = "visible";
}
