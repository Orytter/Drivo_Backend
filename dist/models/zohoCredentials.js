"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const ZohoCredential = _database.sequelizeTwo.define('ZohoCredential', {
  refreshToken: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
});
module.exports = ZohoCredential;