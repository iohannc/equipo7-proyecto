const { json } = require("body-parser");
const mongoose = require("mongoose");
const Historia = mongoose.model("Historia");

// CRUD
function crearHistoria(req, res) {
  const body = req.body;
  const historia = new Historia(body);
  historia
    .save()
    .then(historia2 => {
      //Guardando nuevo usuario en MongoDB.
      return res.status(201).json(historia);
    }).catch()
}
function obtenerHistoria(req, res) {
  var id = req.params.titulo;
  Historia.find({ _id: id }, (err, user) => {
    if (!user || err) {
      return res.sendStatus(401);
    }
    return res.send(user);
  });
}
function obtenerHistorias(req, res) {
  Historia.find({}, function (err, docs) {
    if (!docs || err) {
      return res.sendStatus(401);
    }
    let array = [];
    for (let i = 0; i < docs.length; i++) {
      array.push(docs[i]);
    }
    return res.status(200).send(array);
  });
}

function obtenerHistoriasLimitadas(req, res) {
  Historia.find({},function (err, docs) {
    if (!docs || err) {
      return res.sendStatus(401);
    }}).limit(parseInt(req.params.n)).then(docs=>{
      let array = [];
      for (let i = 0; i < docs.length; i++) {
        array.push(docs[i]);
      }
    return res.status(200).send(array);
    });
}

function modificarHistoria(req, res,next) {
  Historia.findById(req.params.id)
    .then((his) => {
      if (!his) return res.sendStatus(404);
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

function eliminarHistoria(req, res) {
  Historia.findOneAndDelete({ _id: req.params.id })
    .then((r) => res.status(200).send("La historia ha sido eliminada"))
    
}

module.exports = {
  crearHistoria,
  obtenerHistoria,
  obtenerHistorias,
  modificarHistoria,
  eliminarHistoria,
  obtenerHistoriasLimitadas,
};
