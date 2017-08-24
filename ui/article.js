var currentArticleTitle = window.location.pathname.split('/')[2];
var displaycomments = document.getElementById('displaycomment');
var entercomments = document.getElementById('entercomment');
alert('I am in article.js');

function getcomments()
{
    var request=new XMLHttpRequest();
    request.open('POST','/getcomments/'+currentArticleTitle,true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({articletitle:currentArticleTitle}));
    
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

 getcomments();