var button=document.getElementById('btncounter');
var EleName=document.getElementById("txtName");
var submitName=document.getElementById("btnsubmitName");


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



submitName.onclick=function(){
   
  var names=['Name 1', 'Name 2', 'Name 3', 'Name 4'];
  var list='';
  for( var i=0; i<names.length ; i++){
      list+='<li>' + names[i] + '</li>';
       alert('inside onclick' + names[i]);
  }
  
  var ulName=document.getElementById("ulName");
  ulName.innerHtml=list;
    
};

 
//request.onreadystatechange=function()
//{
  //  alert('fff');
//};
};
