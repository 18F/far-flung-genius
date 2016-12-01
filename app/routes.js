'use strict';

const express     = require('express');
const router      = express.Router();

const controllers = require('./controllers');

router.get('/sign-in',    controllers.sessions['new']);
router.get('/sign-up',    controllers.users['new']);
router.post('/sessions',  controllers.sessions.create);
router.get('/sign-out',   controllers.sessions['delete']);

router.get('/reset-password', controllers.resetPassword['new']);

router.get('/dashboard',  controllers.requireSignIn, controllers.dashboards.show);

module.exports = router;

