const Historia = require("../models/Historia");
const Usuario = require("../models/Usuario");

/* CRUD */

function crearUsuario(req, res) {
    let { username, nombre, apellido, email, administrador, password } = req.body;
    let usuario = new Usuario(
        username,
        nombre,
        apellido,
        email,
        password,
        administrador
    );

    res.send(usuario);
}

function obtenerUsuarios(req, res) {
    let usuario1 = new Usuario(
        "creepyNight",
        "Alex",
        "Schultz",
        "asht@mail.com",
        "contrasena",
        1
    );
    let usuario2 = new Usuario(
        'kygo',
        'Kyrre',
        'Gørvell-Dahll',
        'kygo@gmail.com',
        "mimamameama",
        0
    );
    let usuario3 = new Usuario(
        'Pink',
        'Alecia Beth',
        'Moore',
        'alecia.moore@gmail.com',
        "pinkpink",
        0
    );

    res.send([usuario1, usuario2, usuario3]);
}

function modificarUsuario(req, res) {
    let usuario1 = new Usuario(
        "noSleep",
        "Carla",
        "Cloud",
        "ccloudq@mail.com",
        "password",
        0
    );
    let modificaciones = req.body;
    usuario1 = {...usuario1, ...modificaciones };
    res.status(200).send(usuario1);
}

function eliminarUsuario(req, res) {
    // Hace falta solucionar lo del id
    // en base de datos
    res.status(200).send(`El usuario ${req.params.id} ha sido eliminado`);
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario
}