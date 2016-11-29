'use strict';

const express     = require('express');
const router      = express.Router();

const controllers = require('./controllers');

router.get('/sign-in',    controllers.sessions['new']);
router.get('/sign-out',   controllers.sessions['delete']);
router.post('/sessions',  controllers.sessions.create);
router.get('/dashboard',  controllers.requireSignIn, controllers.dashboards.show);

module.exports = router;

