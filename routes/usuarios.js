const router = require("express").Router();

const {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario
} = require("../controllers/usuarios");

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', modificarUsuario); // Hace falta solucionar lo del id
router.delete('/:id', eliminarUsuario);

module.exports = router;