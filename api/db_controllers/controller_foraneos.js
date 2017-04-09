/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var db = require('../../iniDB.js').db;

module.exports = {
    insertForaneo:function(foraneo) {
        db.Foraneos.create(foraneo).then(function (foraneo) {
            return foraneo.id;
        });
    },
    getForaneos:function(callback) {
        db.Foraneos.findAll().then(function (foraneos) {
            if(!foraneos || foraneos.length === 0)
                return callback('No hay ningún foráneo registrado.');
            else
                return callback(null,foraneos);
        });
    },
    getForaneo:function (id,callback) {
        db.Foraneos.findAll({
            where:{id:id}
        }).then(function (foraneo) {
            if(!foraneo || foraneo.length === 0)
                return callback('No se encontró al foráneo ingresado.');
            else
                return callback(null,foraneo);
        });
    }
};

