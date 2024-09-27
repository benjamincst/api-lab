const { Router } = require('express');
const { createItem, editItem, deleteItem, getItem, getItems } = require('../controllers/itemController');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.post('/createItem', validarJWT , createItem)
router.put('/editItem', validarJWT , editItem)
router.delete('/deleteItem/:item_id', validarJWT , deleteItem)
router.get('/getItem/:item_id' , getItem)
router.get('/getItems' , getItems)

module.exports = router;