var mysql = require('mysql');

require('dotenv').config()

// var conn = mysql.createConnection({
//     host: process.env.DB_host,
//     user: process.env.DB_user,
//     password: process.env.DB_password,
//     database: process.env.DB_Name,
// });

var conn = mysql.createConnection({
    connectionLimit: 100,
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_Name,
    port: process.env.DB_port
 });


var db = conn.connect((err)=>{

    if(err){
        throw err;
    }
    console.log("Db connected!");
});


module.exports = conn;