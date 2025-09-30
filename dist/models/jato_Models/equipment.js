"use strict";

const sequelize = require('sequelize');
const Equipment = sequelize.define('equipment', {
  vehicleId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  schemaId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  optionId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  recordId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  location: {
    type: sequelize.STRING(50)
  },
  dataValue: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  condition: {
    type: sequelize.TEXT
  }
});

// Add association to Equipment model
Equipment.belongsTo(Version, {
  foreignKey: 'vehicleId',
  onDelete: 'CASCADE'
});
module.exports = Equipment;