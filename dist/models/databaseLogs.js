"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = require("../db/database");
var _databasesTables = _interopRequireDefault(require("./databasesTables"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Adjust the path to your Sequelize instance
// Path to the related model

const DatabaseLogs = _database.sequelize2.define("DatabaseLogs", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  database_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: _databasesTables.default,
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  path: {
    type: _sequelize.DataTypes.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false,
    // Ensure this column is required
    defaultValue: _database.sequelize2.literal("CURRENT_TIMESTAMP") // Use CURRENT_TIMESTAMP at the database level
  },
  updatedAt: {
    type: _sequelize.DataTypes.DATE,
    allowNull: true,
    defaultValue: _database.sequelize2.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") // Automatically update on changes
  }
}, {
  tableName: "DatabaseLogs",
  // Explicit table name
  timestamps: true // Automatically adds createdAt and updatedAt fields
});
DatabaseLogs.belongsTo(_databasesTables.default, {
  foreignKey: "database_id",
  as: "database",
  // Alias for relation
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
var _default = exports.default = DatabaseLogs;