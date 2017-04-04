var request = require('request');
var cheerio = require('cheerio');

var url = 'https://dobest.io/';

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
});
