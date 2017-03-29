var express = require('express');
var app = express();
var cookie_parser = require('cookie-parser');
app.use(cookie_parser());

//객체를 생성한다 => 데이터베이스 대용
var products = {
  1:{title:'Algorithms', description:'FAV'},
  2:{title:'Database', description:'FAV'}
};


app.get('/products', function(req, res){
  var output = '';
  for(var name in products){
    //zero base? one base?
    output += `
      <li>
        <a href="/cart/${name}"> ${products[name].title} </a>
      </li>
    `; //변수로 인식시키기 위한 ~
    console.log(products[name].title);
  }
  res.send(`
    <h1>Products</h1>
    <ul>${output}</ul>
    <a href="/cart"Cart</a>
    `);
});

/*
cart = {
  click => cookie cnt + 1;
  (product ID) 1 : 1 (num of products)
  사용자의 컴퓨터에 저장할 것
}
*/
app.get('/cart/:id', function(req, res){
  var id = req.params.id;
  var cart = {}; //cart inform 없는 상태에서 한 번만 실행되면 된다.
                 //else request cookie의 결과로 던져주는 값 사용
  if(req.cookies.cart){ //이 값이 세팅되어 있다면
    var cart = req.cookies.cart; //가지고 온 값을 사용한다
  } else {
    var cart = {};
  }
  if(!cart[id]){
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  //기존의 값에 1이 더해지는 결과
  //쿠키를 통해 전달된 값은 문자의 형태로 전달된다 *형 변환 필수*
  res.cookie('cart', cart);
  //res.send(cart);
  res.redirect('/cart')
});

app.get('/cart', function(req,res){
  var cart = req.cookies.cart;
  if(!cart){
    res.send('empty');
  } else {
    var output='';
    for(var id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`
    }
  }
  res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href='/products'>products list</a>
    `);

})

app.listen(3003, function(){
  console.log('connected to 3003 port');
});
