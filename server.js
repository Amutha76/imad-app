var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');

var config={
    userid :'bamutha76',
    database:'bamutha76',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

console.log('server.js');

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-some-randome-string');
    res.send(hashedString);
});

var pool=new Pool(config);
app.get('/test-db', function(req,res){
       // we are going to make a query and return the response on the page
    pool.query('Select * from test',function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

//var title='Amutha home page';
function createTemplate(data){
var tit=data.title;
var heading=data.heading;
var date=data.date;
//var date=data.date;
//var createdate=new Date();
//var date=createdate.toDateString();
var content=data.content;

var htmlContent=
   ` <html>
    <head>
        <title>${tit}</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
                <hr>
            </div>
            <h3>
                ${heading}
            </h3>
            <p>
               ${date.toDateString()}
            </p>
            <p>
               ${content}        
            </p>
            <script type="text/javascript" src="/ui/main.js">
            </script>
    </body>
</html>`;
return htmlContent;
}    

var names=[];
app.get('/submit-name', function (req, res) {
  var name=req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
  
});

var articleOneNames=[];
app.get('/article-one/submit-name', function (req, res) {
  var articleOneName=req.query.name;
  articleOneNames.push(articleOneName);
  res.send(JSON.stringify(articleOneNames));
  
});

var articleTwoNames=[];
app.get('/article-two/submit-name', function (req, res) {
  var articleTwoName=req.query.name;
  articleTwoNames.push(articleTwoName);
  res.send(JSON.stringify(articleTwoNames));
  
});

var articleThreeNames=[];
app.get('/article-three/submit-name', function (req, res) {
  var articleThreeName=req.query.name;
  articleThreeNames.push(articleThreeName);
  res.send(JSON.stringify(articleThreeNames));
  
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//app.get('/article-one', function (req, res) {
 // res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
//});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/articles/:articleName', function(req,res){
    var articleName = req.params.articleName;
    pool.query("select * from article where title= $1 ", [articleName] , function(err,result){
        if(err){
           res.status(500).send(err.toString());     
        }else if(result.rows.length===0){
           res.status(404).send("Article Not Found");    
        }
        else{
          var article=result.rows[0];
          res.send(createTemplate(article));
        }
    });
    
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});