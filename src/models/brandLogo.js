
import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

const brandLogo = sequelizeTwo.define('brandLogo', {
  
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

export default brandLogo;