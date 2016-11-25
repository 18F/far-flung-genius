'use strict';

const superagent  = require('superagent');
const port        = 3434;
const app         = require('../../app');

module.exports = {
  port: port,
  startServer: startServer,
  stopServer: stopServer,
  get: get
};

function startServer(done) {
  let server = app.listen(port, () => {
    module.exports.server = server;
    done();
  });
}

function stopServer(done) {
  module.exports.server.close(done);
}

function get(path, callback) {
  superagent
    .get('http://localhost:' + port + path)
    .end(callback);
}
