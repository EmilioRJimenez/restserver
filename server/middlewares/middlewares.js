const jwt = require('jsonwebtoken');
require('../config/config');


let verifyToken = (req, res, next) => {
    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
           return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.usuario;
        next();
    })

}

let verifyRole = (req, res, next) => {
    
    let ROLE = req.user.role;

    if(ROLE !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            error: {
                message: 'No cuenta con autorización para realizar esta acción'
            }
        });
    }

    next();
}

module.exports = {
    verifyToken,
    verifyRole
}