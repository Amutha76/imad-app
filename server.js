var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

console.log('server.js')
var articles={

    'article-one':{
        title :'Article One  Amuthalakshmi Balasubramanian',
        heading:'Article One',
        date : ' August 4, 2017',
        content : `<div>
                      Welcome to Article One. Please enter your commnets!!<p>
                      <input type="text" id="txtComment" size="50" height="100">
                      <input type="submit" id="btnSubmit">
                   </div>`
         
    },
    'article-two':{
        title :'Article Two  Amuthalakshmi Balasubramanian',
        heading:'Article Two',
        date : ' August 6, 2017',
        content : `<div>
                        This is the content for article Two hhjjkjhhgfghh. 
                    </div>`
               
    },
    'article-three':{
    title :'Article Three  Amuthalakshmi Balasubramanian',
    heading:'Article Three',
    date : ' August 8, 2017',
    content : `<div>
                    This is the content for article jhhjghgjhg Three. 
                </div>`
}

    };

var title='Amutha home page';
function createTemplate(data){
var tit=data.title;
var heading=data.heading;
var date=data.date;
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
               ${date}
            </p>
            <p>
               ${content}        
            </p>
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


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/:articleName', function(req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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