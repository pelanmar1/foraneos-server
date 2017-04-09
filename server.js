/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var express = require('express');
var app = express();
var routerForaneos= require('./api/routes/router_foraneos.js');
var routerDirecciones=require('./api/routes/router_direcciones.js');
var iniDB =require('./config/iniDB.js');
var debugLog = require('debug-log');
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
    //connectToDB();
    resp.send('Hello');
});

app.listen(process.env.PORT || 8000);

