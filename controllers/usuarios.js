const { json } = require('body-parser');
const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");

/* CRUD */

function crearUsuario(req, res, next) {
    const nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.save()
    .then(us => res.status(200).send(us))
    .catch(next);
}

function obtenerUsuario(req, res, next) {
    Usuario.findById(req.params.id)
    .then(us => res.send(us))
    .catch(next);
}

function obtenerUsuarios(req, res, next) {
    Usuario.find()
    .then(uss => res.status(200).send(uss))
    .catch(next);
}
function modificarUsuario(req, res, next) {
    Usuario.findById(req.params.id)
    .then(us => {
        if(!us) return res.sendStatus(404);
        const nuevaInfo = req.body;
        const nuevaInfoKeys = Object.keys(nuevaInfo);
        for (let i = 0; i < nuevaInfoKeys.length; i++) {
            if(typeof us[nuevaInfoKeys[i]] !== "undefined"){
                console.log(us[nuevaInfoKeys[i]]);
                us[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
            } else continue;
        }
        us.save()
        .then(updated => res.status(201).json(updated.publicData()))
        .catch(next);
    })
    .catch(next);
}

function eliminarUsuario(req, res, next) {
    Usuario.findOneAndDelete({_id:req.params.id})
    .then(r => res.status(200).send('El usuario ha sido eliminado'))
    .catch(next);
}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario
}