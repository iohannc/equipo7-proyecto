const router = require("express").Router();

const {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion
} = require("../controllers/usuarios");
const auth = require('./auth');
router.get('/', auth.requerido, obtenerUsuario)
router.get('/:id', auth.requerido, obtenerUsuarios);
router.post('/', crearUsuario)
router.post('/entrar', iniciarSesion)
router.put('/:id', auth.requerido, modificarUsuario)
router.delete('/:id', auth.requerido, eliminarUsuario)
module.exports = router;