'use strict';

const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require('./lib/i18nConfigure');
const LangController = require('./controllers/LangController');
const LoginController = require('./controllers/LoginController');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');



const { isAPI } = require('./lib/utils');
require('./models'); // Connect DB & register models

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Global Template variables
 */
app.locals.title = 'NodePop';

/**
 * Middlewares
 * Cada petición será evaluada por ellos
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Website routes
 */
const langController = new LangController();
const loginController = new LoginController();
app.use(i18n.init);
app.use('/', require('./routes/anuncios'));
app.use('/anuncios', require('./routes/anuncios'));
app.get('/change-locale/:locale', langController.changeLocale);

/**
 * API v1 routes
 */
app.use('/apiv1/anuncios', jwtAuthMiddleware, require('./routes/apiv1/anuncios'));
 
app.post('/api/login', loginController.postJWT);

/**
 * Error handlers
 */
// catch 404 and forward to error handler
app.use( (req, res, next) => next(createError(404)) );

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ?
      { message: 'not valid', errors: err.mapped()}
      : `not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  // establezco el status a la respuesta
  err.status = err.status || 500;
  res.status(err.status);

  // si es un 500 lo pinto en el log
  if (err.status && err.status >= 500) console.error(err);
  
  // si es una petición al API respondo JSON:

  if (isAPI(req)) {
    res.json({ error: err.message });
    return;
  }

  // ...y si no respondo con HTML:

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

module.exports = app;
