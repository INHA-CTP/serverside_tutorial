var body_parser = require('body-parser');
var fs = require('fs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'o2'
});
conn.connect();

app.locals.pretty = true;
app.use(body_parser.urlencoded({encoded:false}));
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/topic/add', function(req, res){
  var sql = 'SELECT * FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.render('add', {topics:topics});
    }
  });
});

app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
  conn.query(sql, [title, description, author], function(err, result, fields){
    if(err){
      console.log(err);
    } else {
      res.redirect('/topic/'+result.insertId);
    }
  });
});

app.get(['/topic/:id/edit'], function(req, res){
  var sql = 'SELECT * FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      var id = req.params.id;
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topic, fields){
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('edit', {topics:topics, topic:topic[0]});
          }
        });
      } else {
        console.log('Error : Invaild ID');
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

app.post('/topic/:id/edit', function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  conn.query(sql, [title, description, author, id], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/'+id);
    }
  });
});

app.get('/topic/:id/delete', function(req, res){
  var id = req.params.id;
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, topic, fields){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          if(topic.length == 0){
            console.log('ERROR : There is no ID record.');
            res.status(500).send('Internal Server Error');
          }
          //res.send(topic);
          res.render('delete', {topics:topics, topic:topic[0]});
        }
      });
    }
  });
})
//링크를 캐싱하는 플러그인의 경우 버튼을 눌러 데이터를 삭제해버릴 수 있음
//그렇기에 post방식으로 해야함
app.post('/topic/:id/delete', function(req, res){
  var id = req.params.id;
  var sql = 'DELETE FROM topic WHERE id=?';
  conn.query(sql, [id], function(err, result){
    res.redirect('/topic');
  })
});


app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT * FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic, fields){
              if(err){
                console.log(err);
                res.status(500).send("Internal Server Error");
              } else {
                res.render('view', {topics:topics, topic:topic[0]});
              }
            });
        } else {
          res.render('view', {topics:topics});
        }
    }
  })
});
//////////////

app.listen(3000, function(){
  console.log('connected 3000 port');
});
