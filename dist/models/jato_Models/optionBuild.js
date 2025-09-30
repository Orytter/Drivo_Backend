"use strict";

const sequelize = require('sequelize');
const OptionBuild = sequelize.define('optionBuild', {
  vehicleId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  optionId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  ruleType: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  condition: {
    type: sequelize.TEXT
  },
  optionRule: {
    type: sequelize.TEXT
  },
  id_902: {
    type: sequelize.FLOAT
  },
  id_903: {
    type: sequelize.FLOAT
  }
  // ... Add remaining id fields
});

// Add association to OptionBuild model
OptionBuild.belongsTo(OptionList, {
  foreignKey: {
    name: 'vehicleId',
    name: 'optionId'
  },
  onDelete: 'CASCADE'
});
module.exports = OptionBuild;