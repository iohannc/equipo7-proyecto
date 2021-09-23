

// Usuario.js
const mongoose = require("mongoose"); //Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.

const HistoriaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "no puede estar vacío"],
      index: true,
    },
    tags: String,
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    texto: String,
    tematica: String,
    ficcion: Boolean,
    url_origen: String,
  },
  { collection: "historias", timestamps: true }
);
HistoriaSchema.plugin(uniqueValidator, { message: "Ya existe" });
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
