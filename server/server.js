/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var express = require('express');
var app = express();
var routerForaneos= require('../api/routes/router_foraneos.js');
var routerDirecciones=require('../api/routes/router_direcciones.js');
var iniDB =require('../config/iniDB.js');
var db = iniDB.db;

db.sequelize
    .authenticate()
    .then(function (err) {
        console.log('Se estableció la conexión con la base de datos exitosamente.');
    }, function (err) {
        console.log('No se logró establecer la conexión con la base de datos:', err);
    });
app.use('/foraneos',routerForaneos.routerForaneos);
app.use('/direcciones',routerDirecciones.routerDirecciones);

app.get('/', function (req,resp) {
    resp.send('Hello');
});

app.listen(process.env.PORT || 8000);

