"use strict";

var _config = _interopRequireDefault(require("config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = _config.default.get("JwtCredentials");
function authenticationToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      auth: false,
      message: 'Failed to authenticate'
    });
  }
  const token = authHeader.substring(7); // Remove 'Bearer ' from the beginning

  if (!token) return res.status(401).json({
    error: 'Unauthorized'
  });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({
      error: 'Forbidden'
    });
    req.user = user;
    console.log(user);
    next();
  });
}
module.exports = {
  authenticationToken
};