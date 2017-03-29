var express = require('express');
var app = express();
var cookie_parser = require('cookie-parser');
app.use(cookie_parser());
//미들웨어가 에플리케이션에 착 달라붙음
app.get('/count', function(req, res){
  if(req.cookies.count){
    var cnt = parseInt(req.cookies.count);
  } else {
    var cnt = 0;
  }
  cnt += 1;
  res.cookie('count', cnt);
  res.send('count: ' + cnt);
});

app.listen(3003, function(){
  console.log('Connected 3003 port');
});
