var express = require('express');
var app = express();
var session = require('express-session');
var body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: false}));
app.use(session({
  secret: 'SAF@$aff#$aGAJasfoqFJSOAe3F$#dahf',
  resave: false,
  saveUninitialized: true
  //세션을 실제로 사용하기 전 까지는 실제로 발급하지 말아라
  //false - true 가 권장 값임
}));

app.get('/count', function(req, res){

  if(req.session.count){
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  //서버에 값을 저장하고 이를 브라우저에 연결한다
  res.send('hi, session');
});

app.get('/tmp', function(req, res){
  res.send('result:' + req.session.count);
  //'/count'로 접근한 유저는 해당 값을 가진다
  // req.session.count값을 읽어올 수 있게된다.
});

app.get('/auth/login', function(req,res){
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text", name="username", placeholder="username">
    </p>
    <p>
      <input type="password", name="pass", placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', function(req, res){
  var user_name = req.body.username;
  var pwd = req.body.password;
  res.send(user_name);
  //res.send(pwd);
})



app.listen(3003, function(){
  console.log('Connected 3003 port');
});
