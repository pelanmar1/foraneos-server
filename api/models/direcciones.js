/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Direcciones = sequelize.define("Direcciones", {
        calle: {type:DataTypes.STRING,allowNull: false},
        num:{type:DataTypes.INTEGER,allowNull:false},
        colonia: {type:DataTypes.STRING,allowNull: false},
        cp: {type: DataTypes.STRING,allowNull: false},
        ciudad: {type: DataTypes.STRING,allowNull: false},
        estado: {type: DataTypes.STRING,allowNull: false},
        deleg_municip: {type: DataTypes.STRING,allowNull: true},
        latitud: {type: DataTypes.DOUBLE,allowNull: true},
        longitud: {type: DataTypes.DOUBLE   ,allowNull: true}
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        updatedAt: 'ultima_actualizacion',
        createdAt: 'fecha_de_creacion',
        deletedAt:'fecha_de_eliminacion',
        classMethods: {
            associate: function(models) {
                Direcciones.hasMany(models.Foraneos, { foreignKey: 'direccion_id'})
            }
        }
    });
    return Direcciones;
};