const router = require('express').Router();
const {
    crearHistoria,
    obtenerHistorias,
    modificarHistoria,
    eliminarHistoria
} = require('../controllers/mascotas');

router.get('/', obtenerHistorias);
router.post('/', crearHistoria);
router.put('/:id', modificarHistoria);
router.delete('/:id', eliminarHistoria);

module.exports = router;