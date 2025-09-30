"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const validNewsTypes = ['main News head', 'News of the week', 'News', 'Award winning', 'News from FDM'];
const News = _database.sequelize2.define('News', {
  brand: {
    type: _sequelize.DataTypes.STRING
  },
  model: {
    type: _sequelize.DataTypes.STRING
  },
  bodyType: {
    type: _sequelize.DataTypes.STRING
  },
  version: {
    type: _sequelize.DataTypes.STRING
  },
  color: {
    type: _sequelize.DataTypes.STRING
  },
  image: {
    type: _sequelize.DataTypes.TEXT
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [validNewsTypes],
        msg: 'Invalid news type'
      }
    }
  },
  title: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  shortDescription: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  newsSource: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
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
module.exports = News;