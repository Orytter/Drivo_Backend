"use strict";

const sequelize = require('sequelize');
const OptionList = sequelize.define('optionList', {
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
  optionType: {
    type: sequelize.STRING(10),
    allowNull: false
  },
  optionCode: {
    type: sequelize.STRING(255)
  },
  manufName: {
    type: sequelize.STRING(255),
    allowNull: false
  }
  // ... Add remaining id fields
});

// Add association to OptionList model
OptionList.belongsTo(Version, {
  foreignKey: 'vehicleId',
  onDelete: 'CASCADE'
});
module.exports = OptionList;