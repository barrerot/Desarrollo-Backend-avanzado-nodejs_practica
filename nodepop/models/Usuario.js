const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// creamos esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true},
  password: String
});

// método estático que hace un hash de una password
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
}

// método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password)
}

// método para enviar emails al usuario
usuarioSchema.methods.sendEmail = async function(asunto, cuerpo) {
  // crear un transport
  const transport = await emailTransportConfigure();

  // enviar email
  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    // text: --> para emails con texto plano
    html: cuerpo
  });
  console.log(`URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`);
  return result;
}

// método para pedir a otro servicio que envie un email (RabbitMQ)


// creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exportamos el modelo
module.exports = Usuario;