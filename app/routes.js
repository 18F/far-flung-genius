'use strict';

const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');

const controllers = require('./controllers');

router.post('/regs', bodyParser.json(), controllers.regs.create);

module.exports = router;

