const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Historia = mongoose.model("Historia");
const Usuario = mongoose.model("Usuario");

// CRUD
function crearHistoria(req, res, next) {
  const body = req.body;
  const token = req.headers.authorization.split(" ");
  const jwt_payload = jwt.decode(token[1]);
  const historia = new Historia(body);
  historia["id_usuario"] = jwt_payload.id;
  historia
    .save()
    .then(() => {
      return res.status(201).json(historia);
    })
    .catch(next);
}
function obtenerHistoria(req, res, next) {
  const titulo = req.params.titulo;
  const re = new RegExp(`${titulo}`, "i");
  Historia.find({ titulo: re }, (err, historia) => {
    if (!historia || err) {
      return res.sendStatus(404);
    }
    return res.send(historia);
  }).catch(next);
}
function obtenerHistorias(req, res, next) {
  Historia.find({}, function (err, docs) {
    if (!docs || err) {
      return res.sendStatus(404);
    }
    let array = [];
    for (let i = 0; i < docs.length; i++) {
      array.push(docs[i]);
    }
    return res.status(200).send(array);
  }).catch(next);
}

function obtenerHistoriasLimitadas(req, res, next) {
  Historia.find({}, function (err, docs) {
    if (!docs || err) return res.sendStatus(404);
  })
    .limit(parseInt(req.params.n))
    .then((docs) => {
      let array = [];
      for (let i = 0; i < docs.length; i++) {
        array.push(docs[i]);
      }
      return res.status(200).send(array);
    })
    .catch(next);
}

function buscarPorAtributo(req, res, next) {
    Historia.find(req.query, function(err, docs){
        if (!docs || err) return res.sendStatus(404);
    })
    .then(historias => res.status(200).send(historias))
    .catch(next);
}

function buscarAtributo(req, res, next) {
    const projection = {_id: 0};
    for (let attr in req.query) {
        projection[req.query[attr]] = 1
    }
    Historia.aggregate([{
        $project: {
            ...projection
        }
    }])
    .then(docs => res.status(200).send(docs))
    .catch(next);
}

function modificarHistoria(req, res, next) {
  Historia.findById(req.params.id)
    .then((historia) => {
      if (!historia) return res.sendStatus(404);
      const token = req.headers.authorization.split(" ");
      const jwt_payload = jwt.decode(token[1]);
      const nuevaInfo = req.body;
      if (
        jwt_payload._id == historia.id_usuario ||
        Usuario.findById(jwt_payload.id).then((admin) => admin.administrador)
      ) {
        const nuevaInfoKeys = Object.keys(nuevaInfo);
        for (let i = 0; i < nuevaInfoKeys.length; i++) {
          if (typeof historia[nuevaInfoKeys[i]] !== "undefined") {
            historia[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
          } else continue;
        }
      } else
        return res
          .status(401)
          .send("No tienes permiso para modificar este objeto.");
      historia
        .save()
        .then((his) => res.status(201).send(his))
        .catch(next);
    })
    .catch(next);
}

function eliminarHistoria(req, res, next) {
  Historia.findById(req.params.id)
    .then((historia) => {
      const token = req.headers.authorization.split(" ");
      const jwt_payload = jwt.decode(token[1]);
      if (
        jwt_payload._id == historia.id_usuario ||
        Usuario.findById(jwt_payload.id).then((admin) => admin.administrador)
      ) {
        Historia.findOneAndDelete({ _id: req.params.id })
          .then(() => res.status(200).send("La historia ha sido eliminada"))
          .catch(next);
      } else
        return res
          .status(401)
          .send("No tienes permiso para eliminar este objeto.");
    })
    .catch(next);
}

module.exports = {
  crearHistoria,
  obtenerHistoria,
  obtenerHistorias,
  modificarHistoria,
  eliminarHistoria,
  obtenerHistoriasLimitadas,
  buscarPorAtributo,
  buscarAtributo
};
