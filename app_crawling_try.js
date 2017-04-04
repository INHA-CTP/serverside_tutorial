var request = require('request');
var cheerio = require('cheerio');

var url = 'http://gyrfalcon.tistory.com/entry/HTTP-%EC%9D%91%EB%8B%B5-%EC%BD%94%EB%93%9C-%EC%A2%85%EB%A5%98-HTTP-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%A2%85%EB%A5%98';
//var url = 'https://dobest.io/';

request(url, function(error, response, body){
  if(error){
    throw error;
  }
  var $ = cheerio.load(body);

  var postElements = $('section.posts article.post');
  postElements.each(function(){
    var postTitle = $(this).find("h1").text();
    var postUrl = $(this).find("h1 a").attr("href");
    console.log(postTitle);
    console.log(postUrl);
  });

  var Elem = $('table.__se_tbl tbody tr')
  Elem.each(function(){
    var reqCode = $(this).find('td p').text();
    console.log(reqCode+'\n');
  })

});
