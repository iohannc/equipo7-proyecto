const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const passport = require("passport");

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
// function obtenerUsuario(req, res, next) {                              //Obteniendo usuario desde MongoDB.
//   var id = req.params.id;
//   Usuario.findById(id||req.usuario.id, (err, user) => {
//     if (!user || err) {
//       return res.sendStatus(401)
//     }
//     return res.send(user.publicData());
//   }).catch(next);
// }
function obtenerUsuario(req, res, next) {
  // //Obteniendo usuario desde MongoDB.
  var id = req.params.id;
  // Usuario.findOne(req.params.id)
  // .then((us) => {
  //   if (!us) return res.sendStatus(401);
  //   return res.send(us.publicData())
  // }).catch(next);
  Usuario.find({ _id: id }, (err, user) => {
    if (!user || err) {
      return res.sendStatus(401);
    }
    user[0].hash = "";
    user[0].salt = "";
    return res.send(user);
  }).catch(next);
}

function obtenerUsuarios(req, res, next) {
  Usuario.find({}, function (err, docs) {
    if (!docs || err) {
      return res.sendStatus(401);
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
      return res.sendStatus(401);
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
      if (!us) return res.sendStatus(404);
      const nuevaInfo = req.body;
      const nuevaInfoKeys = Object.keys(nuevaInfo);
      for (let i = 0; i < nuevaInfoKeys.length; i++) {
        if (typeof us[nuevaInfoKeys[i]] !== "undefined") {
          console.log(us[nuevaInfoKeys[i]]);
          us[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
        } else continue;
      }
      us.save()
        .then((updated) => res.status(201).json(updated.publicData()))
        .catch(next);
    })
    .catch(next);
}

function eliminarUsuario(req, res, next) {
  Usuario.findOneAndDelete({ _id: req.params.id })
    .then((r) => res.status(200).send("El usuario ha sido eliminado"))
    .catch(next);
}
function iniciarSesion(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "no puede estar vacío" } });
  }

  if (!req.body.password) {
    return res
      .status(422)
      .json({ errors: { password: "no puede estar vacío" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        user.token = user.generarJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
}
// function cifrarcontraseña(req, res, next) {
//   Usuario.updateMany({},
//     {contraseña:"loquesea"}, function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Updated Docs : ", docs);
//     }
// });
// }
module.exports = {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarios,
  obtenerUsuariosLimitados,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
};
