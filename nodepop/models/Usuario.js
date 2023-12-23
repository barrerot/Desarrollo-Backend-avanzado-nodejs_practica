const mongoose = require('mongoose');
// creamos esquema
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true},
    password: String
  });
  // creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);
// exportamos el modelo
module.exports = Usuario;