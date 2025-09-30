"use strict";

var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// const path = require('path');

const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = "public/assets/img/";
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// Create the multer instance with the configured storage
const upload = (0, _multer.default)({
  storage: storage
});
module.exports = upload;