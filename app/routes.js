'use strict';

const express     = require('express');
const router      = express.Router();
//const bodyParser  = require('body-parser');

const controllers = require('./controllers');

router.get('/sign-in',    controllers.sessions['new']);
router.get('/dashboard',  controllers.requireSignIn, controllers.dashboards.show);

module.exports = router;

