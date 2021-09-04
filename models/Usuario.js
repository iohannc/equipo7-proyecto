class Usuario {
    constructor(username, nombre, apellido, email, password, administrador) {
        this.username = username;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.administrador = administrador;
    }
}

module.exports = Usuario;