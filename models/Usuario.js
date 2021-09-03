class Usuario {
    constructor(username, nombre, apellido, email, password, tp_usuario) {
        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.tp_usuario = tp_usuario;
    }
}

module.exports = Usuario;