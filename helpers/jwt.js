const jwt = require('jsonwebtoken');

const generarJWT = (correo,isAdmin) => {

    return new Promise( (resolve, reject) => {

        const payload = { correo, isAdmin };

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, (err,token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );
        })

    } )

}


module.exports = {
    generarJWT
}