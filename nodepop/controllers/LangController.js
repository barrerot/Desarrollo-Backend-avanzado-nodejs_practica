class LangController {
  changeLocale(req, res, next) {
    const locale = req.params.locale;

    // poner una cookie con el nuevo idioma
    res.cookie('nodepop-locale', locale, {
      maxAge: 1000 * 60 * 60 * 24 * 30 // 30 días
    })

    // responder con una redirección a la misma página de la que venía
    res.redirect(req.get('referer'));
  }
}

module.exports = LangController;