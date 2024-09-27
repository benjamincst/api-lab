const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { createSoftware, editSoftware, deleteSoftware, getSoftware, getSoftwares } = require("../controllers/softwareController");

const router = Router();

router.post('/createSoftware', validarJWT, createSoftware)
router.put('/editSoftware', validarJWT, editSoftware)
router.delete('/deleteSoftware/:software_id', validarJWT, deleteSoftware)
router.get('/getSoftware/:software_id', getSoftware)
router.get('/getSoftwares', getSoftwares)

module.exports = router;