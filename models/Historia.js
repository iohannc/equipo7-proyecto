const crypto = require('crypto');                             
//Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          
//Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;                   
// ???? es un misterio que resolveremos en la última sesión

// Usuario.js
const mongoose = require("mongoose"); //Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.

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
