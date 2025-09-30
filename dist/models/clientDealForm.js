"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const ClientDealForm = _database.sequelize2.define('ClientDealForm', {
  Deal_Name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  JATO_vehicle_ID: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Date_Created: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  User_ID: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Stage: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  URL: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Add_campaign: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  File: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Make: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Model: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Version: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Product: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Vehicle_Type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  Base_Price: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  Base_Price_Delivered: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  Options_Price: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  Total_Price_Delivered: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  Configuration: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  latestUserID: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  Contact_Name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
});
module.exports = ClientDealForm;