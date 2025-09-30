import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database.js';


const Charts = sequelize2.define('Charts', {
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bodyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  trim:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  hooks: {
    beforeCreate: async (chart, options) => {
      // Find the maximum position value and increment it by 1
      const maxPosition = await Charts.max('position', { where: { type: chart.type } }) || 0;
      chart.position = maxPosition + 1;
    },
  },
});

module.exports = Charts;
