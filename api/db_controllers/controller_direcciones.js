/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var db = require('../../config/iniDB.js').db;


module.exports = {
    insertDireccion:function (direccion) {
        db.Direcciones.create(direccion).then(function (direccion) {
            return direccion.id;
        });
    },
    getDirecciones:function (callback) {
        db.Direcciones.findAll().then(function (direcciones) {
            if(!direcciones || direcciones.length === 0){
                return callback("No hay ninguna dirección registrada.");
            }
            else
                return callback(null,direcciones);
        });
    },
    getDireccion:function(id,callback){
        db.Direcciones.findAll({
            where:{id:id}
        }).then(function (direccion) {
            if(!direccion || direccion.length === 0)
                return callback('No se encontró la dirección ingresada.');
            else
                return callback(null,direccion);
        });
    }
};
