const router = require("express").Router();
const {
    crearHistoria,
    obtenerHistoria,
    obtenerHistorias,
    modificarHistoria,
    eliminarHistoria,
    obtenerHistoriasLimitadas
} = require('../controllers/historias');
const auth = require('./auth');
router.get('/', obtenerHistorias);
router.get('/:n', obtenerHistoriasLimitadas); 
router.get('/:titulo', obtenerHistoria);
router.post('/', crearHistoria);
router.put('/:id', auth.requerido,modificarHistoria);
router.delete('/:id', auth.requerido,eliminarHistoria);

module.exports = router;