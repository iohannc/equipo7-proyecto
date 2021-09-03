const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la Biblioteca del Terror');
});

router.use('/historias', require('./historias'));
router.use('/usuarios', require('./usuarios'));

module.exports = router;