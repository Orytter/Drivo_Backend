"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = require("../db/database");
// Make sure to adjust the path based on your project structure

const ZohoDealerContactRequest = _database.sequelize2.define('ZohoContactForm', {
  zohoId: {
    type: _sequelize.DataTypes.STRING,
    // Change the data type based on the actual type in Zoho
    allowNull: true // Allow null if Zoho response is not available
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  postCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  Car_Configuration_Details: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  read: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false // Default value is set to false (0)
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
});
var _default = exports.default = ZohoDealerContactRequest;