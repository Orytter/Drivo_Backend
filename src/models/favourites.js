import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database';

const Favorite = sequelize2.define('Favorite', {
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
    allowNull: true, 
  },
  version: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  priceRange: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
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
});

export default Favorite;
