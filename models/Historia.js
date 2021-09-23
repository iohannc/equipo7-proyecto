class Historia {
    constructor(titulo, texto, id_usuario, tags, tematica, ficcion) {
        this.titulo = titulo;
        this.texto = texto;
        this.id_usuario = id_usuario;
        this.tags = tags;
        this.tematica = tematica;
        this.ficcion = ficcion;
    }
}

module.exports = Historia;

const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      unique: true, //este campo no se puede repetir
      required: [true, "no puede estar vacío"],
      index: true,
    },
    tags: {
      type: Array
    },
    id_usuario: { type: String, required: true },
    texto: String,
    tematica: String,
    ficcion: Boolean,
    url_origen: Boolean,
  },
  { collection: "historias", timestamps: true }
);

UsuarioSchema.methods.publicData = () => {
  return {
    id: this._id,
    titulo: this.titulo,
    tags: this.tags,
    id_usuario: this.id_usuario,
    texto: this.texto,
    tematica: this.tematica,
    ficcion: this.ficcion,
    url_origen: this.url_origen
  };
};

mongoose.model("Usuario", UsuarioSchema);
