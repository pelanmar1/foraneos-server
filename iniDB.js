/**
 * Created by Pedro Lanzagorta M on 4/6/2017.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var dotenv = require('dotenv');
dotenv.load();

var db = {};

if(process.env.DB_URL)
    var sequelize = new Sequelize(process.env.DB_URL);

fs
    .readdirSync(__dirname + "/api/models/")
    .filter(function (file) {
        return (file.indexOf(".") !== 0);
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, "/api/models/", file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
    //db[modelName].sync({force: true});
});


function syncModels(db) {
    Object.keys(db).forEach(function (modelName) {
        db[modelName].sync({force: true});
    });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports.syncModels = syncModels;
module.exports.db = db;

