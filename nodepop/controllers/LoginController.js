const jwt = require('jsonwebtoken');
const Anuncio = require('../models/Anuncio');
const Usuario = require('../models/Usuario');

class LoginController {

  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  

  

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || !(await usuario.comparePassword(password)) ) {
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // si existe y la contraseña coincide --> devuelvo un JWT
      const tokenJWT = await jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
      });
      res.json({ jwt: tokenJWT });

    } catch (err) {
      next(err);
    }

  }


}

module.exports = LoginController;