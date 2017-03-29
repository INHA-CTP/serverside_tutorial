var express = require('express');
var app = express();
var md5 = require('md5');
var session = require('express-session');
var body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: false}));
app.use(session({
  secret: 'SAF@$aff#$aGAJasfoqFJSOAe3F$#dahf',
  resave: false,
  saveUninitialized: true
}));

app.get('/count', function(req, res){

  if(req.session.count){
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send('hi, session');
});

app.get('/tmp', function(req, res){
  res.send('result:' + req.session.count);
});

app.get('/auth/logout', function(req,res){
  delete req.session.displayName;
  res.redirect('/welcome');
});

app.get('/welcome', function(req, res){
  if(req.session.displayName) {
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
      `);
  } else {
    res.send(`
        <h1>Welcome</h1>
        <ul>
          <li><a href="/auth/login">Login</a></li>
          <li><a href="/auth/register">Register</a></li>
        </ul>
      `);
  }
});

app.get('/auth/register', function(req, res){
  var output = `
    <h1>Register</h1>
    <form action="/auth/register" method="post">
      <p>
        <input type="text", name="username", placeholder="username">
      </p>
      <p>
        <input type="password", name="password", placeholder="password">
      </p>
      <p>
        <input type="text", name="displayName", placeholder="nick-name">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `
  res.send(output);
});

app.post('/auth/register', function(req, res){
  var user = {
    username:req.body.username,
    password:req.body.password,
    displayName:req.body.displayName
  };
  users.push(user);
  //res.send('registered!');
  req.session.displayName = user.displayName;
  res.redirect('/welcome');
})

var users = [
  {
    username:'inkp',
    password:'202cb962ac59075b964b07152d234b70',
    displayName:'kyu'
  }
];



app.get('/auth/login', function(req,res){
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text", name="username", placeholder="username">
    </p>
    <p>
      <input type="password", name="password", placeholder="password">
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
  var pwd = md5(req.body.password);

  for(var i = 0; i<users.length; i++){
    if(user_name === users[i].username && pwd === users[i].password){
      req.session.displayName = users[i].displayName;
      return req.session.save(function(){
        res.redirect('/welcome');
      });
      //이 return 부분 처리 개선이 필요하다.
    }
  }
  res.send('Invaild\n <a href="/auth/login">login</a>');
});


app.listen(3003, function(){
  console.log('Connected 3003 port');
});
