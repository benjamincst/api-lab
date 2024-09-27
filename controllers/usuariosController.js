const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/usuariosModel');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    try {

        let { correo, clave, isAdmin } = req.body

        let usuario = await Usuarios.findOne( { where: { correo } } )
        
        if(usuario){
            return res.status(409).json({
                msg: "La cuenta ya existe."
            })
        }

        const salt = bcrypt.genSaltSync();
        clave = bcrypt.hashSync(clave, salt);

        usuario = await Usuarios.create({
            correo,
            clave,
            isAdmin
        });

        return res.status(201).json({
            msg: "Se ha creado el usuario exitosamente."
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
    }

}

const loginUsuario = async (req, res = response) => {

    try {

        const { correo, clave } = req.body;

        const usuario = await Usuarios.findOne({ where: { correo } })

        if(!usuario){
            return res.status(404).json({
                msg: 'Correo y/o contraseña incorrecto'
            })
        }

        const validarClave = bcrypt.compareSync(clave, usuario.clave);

        if (!validarClave) {
            return res.status(401).json({
                msg: 'Correo y/o contraseña incorrecto'
            });
        }

        const token = await generarJWT( usuario.correo, usuario.isAdmin );

        res.json({
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
    }

}

const editarUsuario = async (req, res = response) => {

    try {

        const { u_id, correo, clave, isAdmin } = req.body;

        let usuario = await Usuarios.findOne( { where: { u_id }, raw: true } )
        if(!usuario){
            return res.status(404).json({
                msg: "No se ha encontrado el usuario."
            })
        }
        usuario = await Usuarios.findByPk(u_id)
        usuario.correo = correo
        usuario.clave = clave
        usuario.isAdmin = isAdmin
        usuario.save()

        return res.status(200).json({
            msg: "Se ha editado el usuario correctamente."
        })
        
    } catch (error) {
        
    }
}

const checkToken = async (req, res = response) => {

    try {

        return res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false
        })
        
    }
}

const obtenerUsuarios = async (req, res = response) => {

    try {

        const usuarios = await Usuarios.findAll({raw: true})

        if(usuarios.lenght < 1){
            return res.status(404).json({
                msg: "No se han encontrado usuarios."
            })
        }

        return res.status(200).json({
            usuarios
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
    }
}

const borrarUsuario = async (req, res = response) => {

    try {

        const { u_id } = req.params

        let usuario = await Usuarios.findOne( { where: { u_id } } )
        if(!usuario){
            return res.status(404).json({
                msg: "No se ha encontrado el usuario."
            })
        }
        usuario = await Usuarios.findByPk(u_id)
        usuario.destroy()

        return res.status(200).json({
            msg: "Se ha eliminado el usuario correctamente."
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ha ocurrido un error."
        })
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    editarUsuario,
    checkToken,
    obtenerUsuarios,
    borrarUsuario
}