"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const ZohoDealer = _database.sequelize2.define('ZohoDealer', {
  Multi_Line_1: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Post_Code: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Cvr_Number: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  zohoId: {
    type: _sequelize.DataTypes.STRING,
    // Change the data type based on the actual type in Zoho
    allowNull: true // Allow null if Zoho response is not available
  },
  read: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Default value is set to false (0)
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Dealer' // Default value is set to 'Dealer'
  }
});
module.exports = ZohoDealer;