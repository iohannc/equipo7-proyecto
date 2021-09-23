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

module.exports = router;