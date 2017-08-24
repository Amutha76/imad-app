var currentArticleTitle = window.location.pathname.split('/')[2];

function onLoadcommentForm()
{
    
    var request=new XMLHttpRequest();
    request.open('GET','/article-list',true);
    request.send(null); 
};

function getcomments()
{
    var request=new XMLHttpRequest();
    request.open('POST','/getcomments/'+currentArticleTitle,true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({articletitle:currentArticleTitle}));
}

onlLoadForm();