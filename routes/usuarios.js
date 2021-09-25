const router = require("express").Router();

const {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    obtenerUsuariosLimitados,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion
} = require("../controllers/usuarios");
const auth = require('./auth');

router.get('/:id', auth.requerido, obtenerUsuario);
router.get('/', auth.requerido, obtenerUsuarios);
router.get('/limite/:n', auth.requerido, obtenerUsuariosLimitados);
router.post('/', crearUsuario)
router.post('/entrar', iniciarSesion)
router.put('/:id', auth.requerido, modificarUsuario)
router.delete('/:id', auth.requerido, eliminarUsuario)
module.exports = router;