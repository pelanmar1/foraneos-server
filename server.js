/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var express = require('express');
var app = express();

var routerForaneos= require('./api/routes/router_foraneos.js');
var routerDirecciones=require('./api/routes/router_direcciones.js');
var iniDB =require('./iniDB.js');
var db = iniDB.db;



app.use('/foraneos',routerForaneos.routerForaneos);
app.use('/direcciones',routerDirecciones.routerDirecciones);



function connectToDB() {
    db.sequelize
        .authenticate()
        .then(function (err) {
            console.log('Se estableció la conexión con la base de datos exitosamente.');
        }, function (err) {
            console.log('No se logró establecer la conexión con la base de datos:', err);
        });
}

app.get('/', function (req,resp) {
    resp.send('Hello');
});

var port = process.env.PORT || 3000;
console.log(process.env.PORT);
app.listen(port, function() {
    console.log("App is running on port " + port);
});


