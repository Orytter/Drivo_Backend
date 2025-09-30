"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const brandLogo = _database.sequelizeTwo.define('brandLogo', {
  brand: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  schema_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: null
  }
}, {
  timestamps: true
});
module.exports = brandLogo;