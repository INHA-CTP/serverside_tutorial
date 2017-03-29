var fs =  require('fs');
var dat = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(dat);


var dat2 = fs.readFile('data.txt', {encoding:'utf8'}, function(error, data){
  console.log(data);
})
