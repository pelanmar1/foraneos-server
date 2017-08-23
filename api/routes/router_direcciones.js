/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var express = require('express');
var routerDirecciones = express.Router();
var dc = require('../db_controllers/controller_direcciones.js');


routerDirecciones.post('/',function (req,res) {
    if (!req.body) return res.sendStatus(400);    
    var direccion = parseDireccion(req);
    dc.insertDireccion(direccion);
    res.send('Alta exitosa.')

});


routerDirecciones.get('/',function (req,res) {
    var direcciones = dc.getDirecciones(function (err, direcciones) {
        if(err)
            res.send(err);
        else
            res.send(direcciones);
    });


});

routerDirecciones.get('/:id',function (req,res) {
    if(req.params.id) {
        var direccion = dc.getDireccion(req.params.id, function (err, direccion) {
            if (err)
                res.send(err);
            else
                res.send(direccion);
        })
    }
});


function parseDireccion(req) {
    var direccion = {
        calle: req.body.calle,
        num:req.body.num,
        colonia: req.body.colonia,
        cp: req.body.cp,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        deleg_municip: req.body.deleg_municip,
        latitud: req.body.latitud,
        longitud: req.body.longitud
    }

    return direccion;
}



module.exports.routerDirecciones = routerDirecciones;