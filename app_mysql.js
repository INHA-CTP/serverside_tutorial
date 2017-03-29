var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'o2'
});
conn.connect();


/*
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err,rows,fields){
  if(err){
    console.log(err);
  } else{
    console.log('rows', rows);
    console.log('fields', fields);
  }
});
*/

/*
for(var i=0; i<rows.length; i++){
  console.log(rows[i].author);
}
*/

/*
var sql = 'INSERT INTO topic (title, description, author) VALUE(?,?,?)';
var params = ['Supervisor', 'Watcher', 'graphittie'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else{
    console.log(rows.insertId);
  }
});
*/

/*
var sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
var params = ['NODEJS','leezche',5];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else{
    console.log(rows);
  }
});
*/

var sql = 'DELETE FROM topic WHERE id=?';
var params = [6];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  } else{
    console.log(rows);
  }
})

conn.end();
