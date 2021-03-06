var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config={
    userid :'bamutha76',
    database:'bamutha76',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRandomValue',
    cookie:{maxAge:1000*60*60*24*30}
}));

console.log('server.js');

function hash(input,salt){
    console.log('I am inside hash');
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2Sync',salt,'10000','512','sha512',hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res){
    console.log('I am about to call hash');
    var hashedString=hash(req.params.input,'this is a new string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send('User successfully created ' + username);
       }
    });
});

app.get('/article-list',function(req,res){
    console.log('I am inside article list');
   pool.query('SELECT title,date FROM article',function(err,result){
   
   if (err){
       res.status(500).send(err.toString());
   } else {
       res.send(JSON.stringify(result.rows));
   }
   
   }); 
});

app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username=$1', [username],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else {
         if (result.rows.length===0){
           res.status(403).send('Invalid username or Password');
         } else{
           var dbString=result.rows[0].password;
           var salt=dbString.split('$')[1];
           var hashedString=hash(password,salt);
           if (dbString===hashedString){
               req.session.auth={userId:result.rows[0].id};
               res.send('User credentials are correct');
           }else{
               res.status(403).send('Invalid username or Password');
           }
           
        }
       }
    });
});
app.post('/insertcomment',function(req,res){
    console.log('inserting comment' + req.body.comment);
    if(req.session && req.session.auth && req.session.auth.userId){
        console.log('inserting article title' + req.body.currentArticleTitle);
        console.log('author id :'+ req.session.auth.userId);
        pool.query('select id from article where title=$1',[req.body.currentArticleTitle],function(err,result){
            if (err){
                console.log('error');
                res.status(500).send(err.toString());
            }else{
                if(result.rows.length===0){
                    console.log('article not found');
                    res.status(400).send('Article Not found');
                }else{
                    var articleid=result.rows[0].id;
                    var date=new Date();
                    console.log('comment is '+req.body.comment);
                    console.log('author id :'+ req.session.auth.userId);
                    console.log('article id '+ articleid);
                    
                    pool.query('insert into comment (comment,auth_id,article_id) values($1,$2,$3)',[req.body.comment,req.session.auth.userId,articleid],function(err,result){
                        console.log(err.toString());
                        if(err){
                            err.status(500).send(err.toString());
                            result.status(500).send(err.toString());
                        }else{
                            err.status(200).send('Comment successfully inserted');
                            result.status(200).send('Comment successfully inserted');
                        }
                    });
                        
                    
                }
            }
        });
            
        
    }
        
            

            
        
        
        
    
});
app.get('/check-login',function(req,res){
   // var checklogin='logout';

    if(req.session && req.session.auth && req.session.auth.userId){
       console.log(req.session.auth.userId);
       pool.query('SELECT * FROM "user" WHERE id=$1', [req.session.auth.userId],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else {
               if (result.rows.length===0){
                 res.status(403).send('Invalid username or Password');
             } else{
                 console.log(result.rows[0].username);
                 res.send(result.rows[0].username);
             }
            }
        });
        
     }else{
        res.status(400).send('You are not logged in');
     }
    
});


app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('Your are logged out successfully');
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
            <p>
               ${date.toDateString()}
            </p>
            <p>
               ${content}        
            </p>
            <div id="entercomment">
            <textarea id="txtcomment" rows="5" cols="100" placeholder="Enter your comments here"></textarea><p>
            <input type="submit" id="btnsubmitcomment"></input>
            </div>
            <div id="displaycomment"></div>
            
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

//var counter=0;
//app.get('/counter',function(req,res){
//    counter=counter+1;
//    res.send(counter.toString());
//});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.post('/getcomments',function(req,res){
    var articleTitle=req.body.currentArticleTitle;
    console.log('Inside get-comments');
    console.log(articleTitle);
    //var auth_id=req.session.auth.auth_id;
    pool.query('select comment.comment,comment.date,username from "user",article,comment where "user".id=auth_id and article.id=comment.article_id and article.title=$1', [articleTitle] , function(err,result){
        if(err){
            console.log('Error '+err.toString());
           res.status(500).send(err.toString());     
        }else if(result.rows.length===0){
           console.log('No rows are selected')        
           res.status(404).send("Article Not Found");    
        }
        else{
            console.log('Number of rows ' + result.rows.length);
           res.send(JSON.stringify(result.rows));
        }
    });
})
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