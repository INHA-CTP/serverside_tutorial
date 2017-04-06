var request = require('request');
var cheerio = require('cheerio');

var Iconv = require('iconv').Iconv;
var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

var options = {
  url: "http://sugang.inha.ac.kr/sugang/SU_51001/Lec_Time_Search.aspx",
  headers: {
  },
  encoding: null
};

 //var data = iconv.convert(body).toString();

request.get(options, function(error, response, body) {
  var $ = cheerio.load(iconv.convert(body));
  var tableElementes = $('table.TableStyle01 tbody tr')

  tableElementes.each(function(){
    var reqCode = $(this).find('td').text();
    console.log(reqCode+'\n');
  })
});
