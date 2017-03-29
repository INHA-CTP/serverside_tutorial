var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
  //값을 응답..
});
app.get('/login', function(req, res){
  res.send('login plz');
})


app.listen(3000, function(){
  console.log('connected 3000 port');
})
