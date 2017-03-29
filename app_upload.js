var express = require('express');
var app = express();
var multer = require('multer');

var _storage = multer.diskStorage({
  destination: function(req, file, cb){ //cb = call back function
    //if(파일의 형식이 이미지라면) - image dir로
    //if(파일의 형식이 텍스트라면) - txt dir로..
    //선처리가 가능하다!
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb){
    //file 객체 - fieldname, originalname, encoding... etc
    //cb(null, file.fieldname + '-' + Date.now());

    //if(만약 파일이 존재한다면) - 동일 파일의 이름 중에 가장 큰 숫자를 붙인다
    //else(파일이 없다면) - ~~
    //call back을 사용함으로 더 높은 자유도의 코딩이 가능하다.
    cb(null, file.originalname);
  }
})
//destination 첫 번째 속성 - 어디에 저장할 것인가?
//filename 두 번째 속성 - 파일 이름을 어떻게 해서 저장할 것인가?
//함수로 구현되어 있고 형식을 지켜야 한다.
var upload = multer({storage: _storage}); //storage 대신 dest도 가능하다
//upload는 미들웨어를 리턴 받는다. dest = detination으로 업로드 될 장소를 의미한다.

var body_parser = require('body-parser');
var fs = require('fs');

app.use(body_parser.urlencoded({extended: false}));
app.use('/user', express.static('uploads'));
//사용자로 하여금 정적인 접근이 가능하도록 설정
//address/user/"파일이름" => uploads라는 dir 내부 데이터 접근 가능해진다.
app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'jade');

//express에는 업로드가 제공되지 않는다
//추가적 모듈 필요 = multer
app.get('/upload', function(req, res){
  res.render('upload_form');
});
app.post('/upload', upload.single('userfile'), function(req,res){
  //post 방식으로 전송된 데이터가
  //미들웨어(multer)가 뒤에 있는 function이 실행되기 전에 실행된다.
  //사용자가 전송한 데이터 중에서 파일이 포함되어 있다면
  //가공해서 req 객체에 파일이라는 property를 추가한다.
  //function의 파라미터인 req에 파일이 포함되어 있다.
  console.log(req.file);
  res.send('Uploaded : ' + req.file.filename);
  //Unexpected Error가 발생하는데 이는 avatar 때문이다.
  //upload.single('avatar') 'avatar' -> 'name:defined' key value를 넣는다고 생각하자.
  //avatar를 전송되는 파일의 name으로 수정해야 한다.
})

app.listen(3000, function(){
  console.log('Connected 3000 port');
})
