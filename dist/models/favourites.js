"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = require("../db/database");
const Favorite = _database.sequelize2.define('Favorite', {
  brand: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  bodyType: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  version: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  priceRange: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 0
  },
  trim: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  is_deleted: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});
var _default = exports.default = Favorite;