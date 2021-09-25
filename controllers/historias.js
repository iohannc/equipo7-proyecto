const { json } = require("body-parser");
const mongoose = require("mongoose");
const Historia = mongoose.model("Historia");

// CRUD
function crearHistoria(req, res,next) {
  const body = req.body;
  const historia = new Historia(body);
  historia
    .save()
    .then( () => {
      return res.status(201).json(historia);
    }).catch(next)
}
function obtenerHistoria(req, res,next) {
  const titulo = req.params.titulo;
  const re = new RegExp(`${titulo}`, 'i')
  Historia.findOne({ titulo : re}, (err, historia) => {
    if (!historia || err) {
      return res.sendStatus(401);
    }
    return res.send(historia);
  }).catch(next);
}
function obtenerHistorias(req, res,next) {
  Historia.find({}, function (err, docs) {
    if (!docs || err) {
      return res.sendStatus(401);
    }
    let array = [];
    for (let i = 0; i < docs.length; i++) {
      array.push(docs[i]);
    }
    return res.status(200).send(array);
  }).catch(next);
}

function obtenerHistoriasLimitadas(req, res,next) {
  Historia.find({},function (err, docs) {
    if (!docs || err) {
      return res.sendStatus(401);
    }}).limit(parseInt(req.params.n)).then(docs=>{
      let array = [];
      for (let i = 0; i < docs.length; i++) {
        array.push(docs[i]);
      }
    return res.status(200).send(array);
    }).catch(next);
}

function modificarHistoria(req, res,next) {
  Historia.findById(req.params.id)
    .then((historia) => {
      if (!historia) return res.sendStatus(404);
      const nuevaInfo = req.body;
      const nuevaInfoKeys = Object.keys(nuevaInfo);
      for (let i = 0; i < nuevaInfoKeys.length; i++) {
        if (typeof his[nuevaInfoKeys[i]] !== "undefined") {
          console.log(his[nuevaInfoKeys[i]]);
          his[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
        } else continue;
      }
      his.save()
        .then((updated) => res.status(201).json(his)).catch(next)
    }).catch(next)
    
}

function eliminarHistoria(req, res,next) {
  Historia.findOneAndDelete({ _id: req.params.id })
    .then( () => res.status(200).send("La historia ha sido eliminada")).catch(next);
}

module.exports = {
  crearHistoria,
  obtenerHistoria,
  obtenerHistorias,
  modificarHistoria,
  eliminarHistoria,
  obtenerHistoriasLimitadas,
};
