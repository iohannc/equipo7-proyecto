const router = require('express').Router();
const {
    crearHistoria,
    obtenerHistoria,
    obtenerHistorias,
    modificarHistoria,
    eliminarHistoria
} = require('../controllers/historias');
const auth = require('./auth');
router.get('/', obtenerHistoria);
router.get('/:titulo', obtenerHistorias);
router.post('/', crearHistoria);
router.put('/:id', auth.requerido,modificarHistoria);
router.delete('/:id', auth.requerido,eliminarHistoria);

router.get('/', auth.requerido, obtenerUsuario)
router.get('/:id', auth.requerido, obtenerUsuarios);
router.post('/', crearUsuario)
router.post('/entrar', iniciarSesion)
router.put('/:id', auth.requerido, modificarUsuario)
router.delete('/:id', auth.requerido, eliminarUsuario)
module.exports = router;