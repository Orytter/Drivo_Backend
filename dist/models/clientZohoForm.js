"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const clientZohoForm = _database.sequelize2.define('clientZohoForm', {
  Last_Name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  Contact_Type: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  Date_Created: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true
  },
  Fornavn: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Efternavn: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Mobile: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Mailing_Zip: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  latestUserID: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  recordId: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
});
module.exports = clientZohoForm;