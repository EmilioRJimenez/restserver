const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
require('../config/config');

const Usuario = require('../models/usuario');


router.post('/', (req,res) => {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, user) => {
        if(err){
            res.status(500).json({
                ok: false,
                error: err
            });
        }

        if(!user){
           return res.status(400).json({
                ok: false,
                error:{
                    message: '[Usuario] o contraseña incorrectos'
                }
            });
        }
    
        if(!bcrypt.compareSync( body.password, user.password )){
               return res.status(400).json({
                    ok: false,
                    error: {
                    message: 'Usuario o [contraseña] incorrectos'
                }
            });
        }
            if(user.estado === false){
                    res.status(401).json({
                    ok: false,
                    error: {
                    message: 'Usuario no tiene permiso para iniciar sesión'
                }
            });
        }else{

            let token = jwt.sign({
                usuario: user
            }, process.env.SEED, { expiresIn: process.env.CAD });

            res.json({
                ok: true,
                user,
                token
            });
        }
    });
});


module.exports = router;