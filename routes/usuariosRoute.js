const { Router } = require('express');
const { crearUsuario, loginUsuario, editarUsuario, checkToken, obtenerUsuarios, borrarUsuario } = require('../controllers/usuariosController');
const { validarJWT } = require('../middlewares/validarJWT');
const { validarPermisos } = require('../middlewares/validarPermisos');

const router = Router();

router.post('/crearUsuario', crearUsuario)
router.post('/loginUsuario', loginUsuario)
router.put('/editarUsuario', validarJWT, validarPermisos ,editarUsuario)
router.get('/checkToken', validarJWT, checkToken)
router.get('/obtenerUsuarios', validarJWT, obtenerUsuarios)
router.delete('/borrarUsuario/:u_id', validarJWT, borrarUsuario)

module.exports = router;