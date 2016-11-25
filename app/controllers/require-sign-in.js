'use strict';

module.exports = function(req, res, next) {
  if (authorized(req.session)) { return next(); }
  res.redirect('/sign-in');
};

function authorized(session) {
  if (!session) { return false; }
  if (!session.user_id) { return false; }
  return true;
}
