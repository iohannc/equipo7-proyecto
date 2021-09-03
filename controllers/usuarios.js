const Usuario = require("../models/Usuario");

/* CRUD */

function crearUsuario(req, res){
    let { userName, nombre, apellido, email, tp_usuario, password } =  req.body; 
    let usuario = new Usuario(
        userName,
        nombre,
        apellido,
        email,
        password,
        tp_usuario
    );

    res.send(usuario);
}

function obtenerUsuario(req, res){
    let usuario1 = new Usuario(
        "creepyNight",
        "Alex",
        "Schultz",
        "asht@mail.com",
        "contrasena",
        0
    );
    req.send(usuario1);
}

function modificarUsuario(req, res){
    let usuario1 = new Usuario(
        "noSleep",
        "Carla",
        "Cloud",
        "ccloudq@mail.com",
        "password",
        1
    );
    let modificiaciones = req.body;
    modficiaciones = {...usuario1, ...modificiaciones};
    res.send(modficiaciones);
}

function eliminarUsuario(req, res){
    res.status(200).send(`El usuario ${req.userName} ha sido eliminado`);
}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    modificarUsuario,
    eliminarUsuario
}