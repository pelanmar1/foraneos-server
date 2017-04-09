/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var express = require('express');
var routerForaneos = express.Router();
var fc = require('../db_controllers/controller_foraneos.js');
var bodyParser =require('body-parser');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

routerForaneos.post('/',function (req,res) {
    if (!req.body) return res.sendStatus(400);
    var foraneo = parseForaneo(req);
    fc.insertForaneo(foraneo);
    res.send('Alta exitosa.');

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


function parseForaneo(req) {
    var user = {
        nombre:req.body.nombre,
        apellido: req.body.apellido,
        cu:req.body.cu,
        fNacimiento:req.body.fNacimiento,
        carrera: req.body.carrera,
        semsetre: req.body.semestre,
        email:req.body.email,
        celular: req.body.celular,
        ciudad_origen: req.body.ciudad_origen,
        estado_origen:req.body.estado_origen
    };
    return user;
}


module.exports.routerForaneos = routerForaneos;