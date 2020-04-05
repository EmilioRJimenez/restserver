const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {verifyToken, verifyRole} = require('../middlewares/middlewares');
const _ = require('underscore');

const Usuario = require('../models/usuario');


router.get('/', verifyToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email estado role')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
        if(!err){
            Usuario.countDocuments({estado: true}, (err, cantidad) => {
                if(err) throw err;

                res.json({
                    ok:true,
                    usuarios,
                    cantidad
                });
            })
        }else{
            res.status(400).json({
                ok: false,
                error: err
            });
        }
    });
});

router.post('/', [verifyToken, verifyRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

     usuario.save()
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        res.json(err);
    });
});

router.put('/:id', [verifyToken, verifyRole], (req, res) => {


    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body,  {new: true, runValidators: true}, (err, user) => {
        if(!err){
            res.json({
                ok: true,
                user
            });
        }else{
            res.status(400).json({
                ok: false,
                error: err
            });
        }
    });
    
});

router.delete('/:id', [verifyToken, verifyRole], (req, res) => {


    let id  = req.params.id;

    let estado = req.body.estado || false;

   Usuario.findByIdAndUpdate(id, {
       estado
   }, {new: true}, (err, user) => {
       if(err){
        res.status(400).json({
            ok: false,
            error: err
        });
       }else{
        res.json({
            ok:true,
            user
        });
       }

   })
});



module.exports = router;