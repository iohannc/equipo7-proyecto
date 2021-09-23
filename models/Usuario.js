// class Usuario {
//     constructor(username, nombre, apellido, email, password, administrador) {
//         this.username = username;
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.email = email;
//         this.password = password;
//         this.administrador = administrador;
//     }
// }

// module.exports = Usuario;

const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },
    email: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,
    },
    nombre: { type: String, required: true },
    apellido: { type: String},
    email: String,
    password: String,
    administrador: Boolean,
  },
  { collection: "usuarios", timestamps: true }
);

UsuarioSchema.methods.publicData = () => {
  return {
    id: this._id,
    username: this.username,
    nombre: this.nombre,
    apellido: this.apellido,
    email: this.email,
    administrador: this.administrador,
  };
};

mongoose.model("Usuario", UsuarioSchema);
