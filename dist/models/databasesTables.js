"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = require("../db/database");
// Adjust the path to your Sequelize instance

const DatabasesTable = _database.sequelizeTwo.define("DatabasesTable", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Database_Name: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "DatabasesTable",
  // Explicit table name
  timestamps: false // Disable createdAt and updatedAt for this table
});
var _default = exports.default = DatabasesTable;