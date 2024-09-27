const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: "El usuario no se encuentra autenticado"
        });
    }
    
    try {

        const {id, correo, isAdmin} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.correo = correo;
        req.isAdmin = isAdmin
        
    } catch (error) {

        return res.status(401).json({
            msg: "Token no valido"
        });
    }

    next();

}

module.exports = {
    validarJWT
}