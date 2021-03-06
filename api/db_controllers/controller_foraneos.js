/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

var db = require('../../iniDB.js').db;

module.exports = {
    insertForaneoAndAddress(fno,adds){
        db.Direcciones.create(adds).then(function(d){
            fno.direccion_id = d.id;
            db.Foraneos.create(fno).then(function(f){
                return 'Foraneo registrado exitosamente.';
            });
        }).catch(function (err) {
            return err;
          });;
    },
    deleteForaneoAndAddress(cu){
        db.Foraneos.destroy({where:{cu:cu}}).then(function(rowDeleted){
            if(rowDeleted === 1){
                    return "Foraneo con c.u. : "+cu+' ha sido eliminado exitosamente.';
            }
        }).catch(function (err) {
                    return err;
          });;
    },
    insertForaneo:function(foraneo) {
        db.Foraneos.create(foraneo).then(function (foraneo) {
            return foraneo.id;
        });
    },
    getForaneos:function(callback) {
        db.Foraneos.findAll({where:{fecha_de_eliminacion:null}}).then(function (foraneos) {
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
    },
    getForaneo:function (email,callback) {
        db.Foraneos.findAll({
            where:{email:email}
        }).then(function (foraneo) {
            if(!foraneo || foraneo.length === 0)
                return callback('El correo ingresado no se encuentra registrado en la base de datos.');
            else
                return callback(null,foraneo);
        });

    }

};

