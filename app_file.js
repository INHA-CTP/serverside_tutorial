var body_parser = require('body-parser');
var fs = require('fs');
var express = require('express');
var app = express();
app.locals.pretty = true;
app.use(body_parser.urlencoded({encoded:false}));

app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log('error : readdir\n' + err);
      res.status(500).send("Internal Server Error");
    }
    res.render('new', {topics:files});
  });
});
/////////////
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err){
    if(err){
      console.log('error : writeFile\n' + err);
      res.status(500).send("Internal Server Error");
    }
    //res.send('Success post!</br>' + title +', ' + description + '</br>');
    res.redirect('/topic/'+title);
  });
});

app.get(['/topic', '/topic/:name'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log('error : readdir\n' + err);
      res.status(500).send("Internal Server Error");
    }
    var name = req.params.name;
    if(name){
      fs.readFile('data/'+name, 'utf8', (err, data)=>{
        if(err){
          console.log('error : readdir\n' + err);
          res.status(500).send("Internal Server Error");
        }
        res.render('view', {title:name, description:data, topics:files});
      });
    }
    else{
      res.render('view', {title:'Hello', description:'JavaScript/Node.js', topics:files});
    }
  });
});
//////////////


app.listen(3000, function(){
  console.log('connected 3000 port');
});
