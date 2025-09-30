
import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database';

const brandLogo = sequelize2.define('brandLogo', {
  
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  schema_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: null
  },
}, {
  timestamps: true
});

module.exports = brandLogo;