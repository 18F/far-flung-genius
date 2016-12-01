'use strict';

const nodemailer    = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const options = {
  host                : '18f.gsa.gov',
  secure              : true,
  port                : 465,
  auth                : {
    user              : process.env.EMAIL_USER,
    pass              : process.env.EMAIL_PASS
  },
  ignoreTLS           : false,
  debug               : process.env.NODE_ENV === 'development',
  pool                : true,
  maxConnections      : 5
};

module.exports = {
  options: options,
  mailer: function() {
    return nodemailer.createTransport(smtpTransport(options));
  }
};

