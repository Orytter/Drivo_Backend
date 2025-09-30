"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const Charts = _database.sequelize2.define('Charts', {
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
    allowNull: false
  },
  version: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  color: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  type: {
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
}, {
  hooks: {
    beforeCreate: async (chart, options) => {
      // Find the maximum position value and increment it by 1
      const maxPosition = (await Charts.max('position', {
        where: {
          type: chart.type
        }
      })) || 0;
      chart.position = maxPosition + 1;
    }
  }
});
module.exports = Charts;