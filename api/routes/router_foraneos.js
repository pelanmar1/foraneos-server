/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var express = require('express');
var routerForaneos = express.Router();
var fc = require('../db_controllers/controller_foraneos.js');
var bodyParser =require('body-parser');
var bcrypt = require('bcrypt');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

routerForaneos.post('/',function (req,res) {
    if (!req.body) return res.sendStatus(400);
    var foraneo = parseForaneo(req);
    console.log('Agregando: '+JSON.stringify(foraneo));
    fc.insertForaneo(foraneo);
    res.send('Alta exitosa.');

});

routerForaneos.post('/add',function(req,res){
    if (!req.body) return res.sendStatus(400);
    var foraneo = parseForaneo(req.body.foraneo);
    var direccion = req.body.direccion;
    var f = fc.insertForaneoAndAddress(foraneo,direccion);
    res.send(f);    
});

routerForaneos.get('/',function (req,res) {
    var foraneos = fc.getForaneos(function (err,foraneos) {
        if(err)
            res.send(err);
        else
            res.send(foraneos);
    });

});

routerForaneos.get('/:id',function (req,res) {
    if(req.params.id) {
        var foraneo = fc.getForaneo(req.params.id, function (err, foraneo) {
            if (err)
                res.send(err);
            else
                res.send(foraneo);
        })
    }
});

routerForaneos.delete('/:cu',function(req,res){
    if(req.params.cu){
        var del = fc.deleteForaneoAndAddress(req.params.cu);
        res.send(del);
    }
});



function parseForaneo(foraneo) {
    var dia = foraneo.fecha_nac;
    var mes = foraneo.month_birth;
    var an = foraneo.year_birth;
    var fn = joinBirthDate(dia,mes,an);
    var user = {
        nombre:foraneo.nombre,
        apellido: foraneo.apellido,
        cu:foraneo.cu,
        fNacimiento:fn,
        carrera: foraneo.carrera,
        semestre: foraneo.semestre,
        email:foraneo.mail,
        emailItam:foraneo.mailitam,
        pass:foraneo.pass,
        celular: foraneo.phone,
        ciudad_origen: foraneo.ciudad_origen,
        estado_origen:foraneo.estado_origen
    };
    return user;
}

function joinBirthDate(day,month,year){
    var date = Date([month,day,year].join('-'));
    return date;
}


module.exports.routerForaneos = routerForaneos;