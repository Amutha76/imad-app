
console.log("I am inside main");
var button=document.getElementById('btncounter');
var submitName=document.getElementById("btnsubmitName");
var articleOneSubmitName=document.getElementById("articleOnebtnSubmit");
alert(articleOneSubmitName.value);


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
  var name=EleName.value;
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



articleOneSubmitName.onclick=function(){
    alert('I am inside articleone submit');
  var articleOneEleName=document.getElementById("articleOnetxtComment");  
  var name=articleOneEleName.value;
  var request=new XMLHttpRequest();
  request.open('GET','http://bamutha76.imad.hasura-app.io/article-one/submit-name?name='+ name,true);
  request.send(null); 
 
  request.onreadystatechange=function(){
  
     if (request.readyState=== XMLHttpRequest.DONE){
            
            if(request.status==200){
                var names=request.responseText;
                var ulName=document.getElementById("articleOneUl");
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

