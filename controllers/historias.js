const Historia = require("../models/Historia");

// CRUD
function crearHistoria(req, res) {
  const body = req.body
  const historia = new Historia(body)
  historia.save().then(his => {                                         //Guardando nuevo usuario en MongoDB.
    return res.status(201).json(updated.publicData())
  }).catch(next)
}
function obtenerHistoria(req, res) {
  Historia.find(req.params.titulo)
  .then(uss => res.status(200).send(uss))
  .catch(next);
}
function obtenerHistorias(req, res) {
  Historia.find()
    .then((uss) => res.status(200).send(uss))
    .catch(next);
}

function modificarHistoria(req, res) {
  Historia.findById(req.params.id)
  .then(his => {
      if(!his) return res.sendStatus(404);
      const nuevaInfo = req.body;
      const nuevaInfoKeys = Object.keys(nuevaInfo);
      for (let i = 0; i < nuevaInfoKeys.length; i++) {
          if(typeof his[nuevaInfoKeys[i]] !== "undefined"){
              console.log(his[nuevaInfoKeys[i]]);
              his[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
          } else continue;
      }
      us.save()
      .then(updated => res.status(201).json(updated.publicData()))
      .catch(next);
  })
  .catch(next);
}

function eliminarHistoria(req, res) {
  Historia.findOneAndDelete({_id:req.params.id})
  .then(r => res.status(200).send('La historia ha sido eliminada'))
  .catch(next);
}

module.exports = {
    crearHistoria,
    obtenerHistoria,
    obtenerHistorias,
    modificarHistoria,
    eliminarHistoria
}
