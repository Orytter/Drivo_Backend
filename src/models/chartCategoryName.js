
import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

// Define the model
const Character = sequelizeTwo.define('ChartCategoryName', {
  charName: {
    type: DataTypes.STRING, 
    allowNull: false
  },
});

// Export the model
export default Character;
