const mongoose = require("mongoose");

const HistoriaSchema = new mongoose.Schema(
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

HistoriaSchema.methods.publicData = () => {
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

mongoose.model("Historia",HistoriaSchema);
