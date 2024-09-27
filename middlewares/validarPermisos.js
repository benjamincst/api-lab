const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarPermisos = (req, res = response, next) => {
    
    try {

        if(!req.isAdmin){
            return res.status(401).json({
                msg: "No tiene permisos para realizar la acción."
            })
        }
        
    } catch (error) {

        return res.status(500).json({
            msg: "Ha ocurrido un error."
        });
    }

    next();

}

module.exports = {
    validarPermisos
}