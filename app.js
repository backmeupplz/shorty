const express = require('express');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '/.env'),
});
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const i18n = require("i18n-express");

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;
fs.readdirSync(path.join(__dirname, '/models')).forEach((filename) => {
  require(path.join(__dirname, '/models/', filename));
});

const index = require('./routes/index');
const address = require('./routes/address');

const app = express();

/* View engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ['en', 'ru'],
}));

app.use('/', index);
app.use('/address/', address);

/* Error handlers */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
