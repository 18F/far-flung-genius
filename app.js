'use strict';

const environmentSetup  = require('./app/config/environment-setup');
                          environmentSetup.load();

const path              = require('path');
const appDir            = path.resolve(__dirname + '/app');

const express           = require('express');
const expressWinston    = require('express-winston');
const loggingConfig     = require('./app/config/logging');
const helmet            = require('helmet');
const session           = require('client-sessions');
const sessionConfig     = require('./app/config/session');

const routes            = require(appDir + '/routes');

const notFound          = require(appDir + '/controllers/not-found');
const error             = require(appDir + '/controllers/error');

const app               = express();

app.use(express.static(appDir + '/public'));
app.use(helmet());
app.use(session(sessionConfig));
app.use(expressWinston.logger(loggingConfig()));

app.use('/', routes);

app.use(notFound);
app.use(error);

module.exports = app;
