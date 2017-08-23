var express = require('express');
var routerLogin = express.Router();
var fc = require('../db_controllers/controller_foraneos.js');
var bodyParser =require('body-parser');
var bcrypt = require('bcrypt');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

routerLogin.post('/',function (req,res) {
    if (!req.body) return res.sendStatus(400);
    var email = req.body.email;
    var pass = req.body.pass;
    var msg = "";
    
    fc.getForaneo(email,function(err,results){
        if (err){
            res.send(err);
        }else{
            if(results.length>0){
                var foraneo = results[0]
                var hash = foraneo.pass;
                if(bcrypt.compareSync(pass,hash)){
                    res.send('Bienvenido '+foraneo.nombre);
    
                }else{
                    res.send('Contrasena incorrecta.')
                }
            }else{
                res.send('El correo ingresado no se encuentra registrado en la base de datos.');
            }    
        }
        
    });

});

module.exports.routerLogin = routerLogin;