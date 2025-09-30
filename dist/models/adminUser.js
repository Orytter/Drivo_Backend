"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const adminUser = _database.sequelizeTwo.define('adminUser', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _sequelize.DataTypes.INTEGER
  },
  firstName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: null
  },
  resetToken: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: null
  },
  resetTokenExpiresAt: {
    type: _sequelize.DataTypes.DATE,
    defaultValue: null
  }
}, {
  timestamps: true
});
module.exports = adminUser;