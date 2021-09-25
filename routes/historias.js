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
router.get('/limite/:n', obtenerHistoriasLimitadas); 
router.get('/:titulo', obtenerHistoria);
router.post('/', auth.requerido, crearHistoria);
router.put('/:id', auth.requerido, modificarHistoria);
router.delete('/:id', auth.requerido,eliminarHistoria);

module.exports = router;