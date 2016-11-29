'use strict';

const express     = require('express');
const router      = express.Router();

const controllers = require('./controllers');

router.get('/sign-in',    controllers.sessions['new']);
router.post('/sign-in',   controllers.sessions.create);
router.get('/dashboard',  controllers.requireSignIn, controllers.dashboards.show);

module.exports = router;

