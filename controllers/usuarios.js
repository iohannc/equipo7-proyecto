const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const passport = require("passport");
const jwt = require("jsonwebtoken");

/* CRUD */

function crearUsuario(req, res, next) {
  const body = req.body,
    password = body.password;
  delete body.password;
  const usuario = new Usuario(body);
  usuario.crearPassword(password);
  usuario
    .save()
    .then((user) => {
      //Guardando nuevo usuario en MongoDB.
      return res.status(201).json(user.toAuthJSON());
    })
    .catch(next);
}
function obtenerUsuario(req, res, next) {
  // //Obteniendo usuario desde MongoDB.
  var id = req.params.id;
  Usuario.find({ _id: id }, (err, user) => {
    if (!user || err) {
      return res
        .status(404)
        .json({ errors: { mensaje: "No se encontró ningún usuario." } });
    }
    // No pudimos solucionar el problema con el método publicData()
    user[0].hash = "";
    user[0].salt = "";
    return res.send(user);
  }).catch((err) => res.send(err));
}

function obtenerUsuarios(req, res, next) {
  Usuario.find({}, function (err, docs) {
    if (!docs || err) {
      return res
        .status(404)
        .json({ errors: { mensaje: "No se encontró ningún usuario." } });
    }
    let array = [];
    for (let i = 0; i < docs.length; i++) {
      docs[i].hash = "";
      docs[i].salt = "";
      array.push(docs[i]);
    }
    return res.status(200).send(array);
  }).catch(next);
}

function obtenerUsuariosLimitados(req, res) {
  Usuario.find({}, function (err, docs) {
    if (!docs || err) {
      return res
        .status(404)
        .json({ errors: { mensaje: "No se encontró ningún usuario." } });
    }
  })
    .limit(parseInt(req.params.n))
    .then((docs) => {
      let array = [];
      for (let i = 0; i < docs.length; i++) {
        docs[i].hash = "";
        docs[i].salt = "";
        array.push(docs[i]);
      }
      return res.status(200).send(array);
    });
}

function modificarUsuario(req, res, next) {
  Usuario.findById(req.params.id)
    .then((us) => {
      if (!us) {
        return res
          .status(404)
          .json({ errors: { mensaje: "No se encontró ningún usuario." } });
      }
      if (
        jwt_payload._id == req.params.id ||
        Usuario.findById(jwt_payload.id).then((admin) => admin.administrador)
      ) {
        const nuevaInfo = req.body;
        const nuevaInfoKeys = Object.keys(nuevaInfo);
        for (let i = 0; i < nuevaInfoKeys.length; i++) {
          if (typeof us[nuevaInfoKeys[i]] !== "undefined") {
            us[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
          } else continue;
        }
      } else
        res
          .status(401)
          .json({
            errors: { mensaje: "No tienes permiso para eliminar este objeto." },
          });
      us.save()
        .then(() => res.status(201).json({mensaje: "Modificación exitosa"}))
        .catch(next);
    })
    .catch(next);
}

function eliminarUsuario(req, res, next) {
  const token = req.headers.authorization.split(" ");
  const jwt_payload = jwt.decode(token[1]);
  if (
    jwt_payload._id == req.params.id ||
    Usuario.findById(jwt_payload.id).then((admin) => admin.administrador)
  ) {
    Usuario.findOneAndDelete({ _id: req.params.id })
      .then((r) => res.status(200).send({mensaje: "El usuario ha sido eliminado"}))
      .catch(next);
  } else
    res
      .status(401)
      .json({
        errors: { mensaje: "No tienes permiso para eliminar este objeto." },
      });
}

function iniciarSesion(req, res, next) {

  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "no puede estar vacío" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "no puede estar vacío" } });
  }


  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generarJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
}

module.exports = {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarios,
  obtenerUsuariosLimitados,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
};
