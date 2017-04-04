/**
 * Created by Pedro Lanzagorta M on 1/22/2017.
 */
var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    host:'alphabd.crnoftqctjtr.us-west-2.rds.amazonaws.com',
    user:'necaxa',
    password:'generalmostaza',
    database:'AlphaBD'
});

connection.connect(function (error) {
    if(error){
        console.log(error);
    }else{
        console.log('Connected');
    }
});


app.get('/', function (req,resp) {
    resp.send('Hello');
});
app.get('/aplicantes',function (req,resp) {
    connection.query("SELECT * FROM Foraneo;",function (error,rows,fields) {
        if(error){
            console.log('Error in query');
        }else{
            resp.send(rows);
        }
    });
});
app.listen(process.env.PORT || 8000);