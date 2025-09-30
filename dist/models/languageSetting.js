"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const LanguageSettings = _database.sequelizeTwo.define('LanguageSettings', {
  englishEnabled: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },
  danishEnabled: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  },
  dropdownVisible: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});
module.exports = LanguageSettings;