
import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database.js';

// Define the model
const Character = sequelize2.define('ChartCategoryName', {
  charName: {
    type: DataTypes.STRING, 
    allowNull: false
  },
});

// Export the model
module.exports = Character;
