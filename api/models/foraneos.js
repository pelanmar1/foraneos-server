/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */
"use strict";
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var Foraneos = sequelize.define("Foraneos", {
        nombre: {type:DataTypes.STRING,allowNull: false},
        apellido: {type:DataTypes.STRING,allowNull: false},
        cu: {type: DataTypes.INTEGER,allowNull: false,unique: true},
        fNacimiento:{type:DataTypes.DATE,allowNull: false},
        carrera: {type: DataTypes.STRING,allowNull: false},
        semestre: {type: DataTypes.INTEGER},
        email: {type: DataTypes.STRING,allowNull: false,unique:true},
        pass:{type:DataTypes.STRING,allowNull:false},
        emailItam:{type: DataTypes.STRING,allowNull: false,unique:true},
        celular: {type: DataTypes.STRING,allowNull: false},
        ciudad_origen: {type: DataTypes.STRING},
        estado_origen: {type: DataTypes.STRING}
        },{
        freezeTableName: true,
        underscored: true,
        updatedAt: 'ultima_actualizacion',
        createdAt: 'fecha_de_creacion',
        deletedAt:'fecha_de_eliminacion',
        paranoid: false,
        classMethods: {
            associate: function(models) {
                Foraneos.belongsTo(models.Direcciones, { foreignKey: 'direccion_id',onDelete:'cascade'})
            },
            validPassword: function(password,passwrd,done,user){
                bcrypt.compareSync(password,passwrd,function(err,isMatch){
                    if(err){
                        console.log(err);
                    }
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false);
                    }
                        });

            }
        }
        }

        );
        Foraneos.hook('beforeCreate',function(usuario,cb){
            var hash = bcrypt.hashSync(usuario.pass,10);
            usuario.pass = hash;

        });       
    return Foraneos;
};