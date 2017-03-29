var express = require('express');
var app = express();
var body_parser=require('body-parser');

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.use(body_ parser.urlencoded({extended:false}));
//body parser라는 미들웨어를 통과한 후에 라우터가 동작하게 된다.
//요청이 들어오면 바디파서가 동작하면서 포스트 방식으로 전송된 데이터를 우리가
//사용할 수 있게 되는 것
app.get('/topic/:id', function(req, res){
  var topics = [
    'first...',
    'second...',
    'thrid...'
  ];
  var as = `
  <a href="/topic/0">First</a><br>
  <a href="/topic/1">Second</a><br>
  <a href="/topic/2">Third</a><br>
  ${topics[req.params.id]}`
  res.send(as);
});

app.get('/form', function(req,res){
  //res.send('hello');
  res.render('form');
});

app.post('/form_receiver', function(req,res){
  var title = req.body.title;
  var des = req.body.description;
  res.send(title + ', ' + des);
})

app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var dsc = req.query.description;
  res.send(title+dsc);
})



app.listen(3000, function(){
  console.log('connected 3000');
})
