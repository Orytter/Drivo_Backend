import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

const ZohoDealer = sequelizeTwo.define('ZohoDealer', {
  Multi_Line_1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Post_Code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cvr_Number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  zohoId: {
    type: DataTypes.STRING, // Change the data type based on the actual type in Zoho
    allowNull: true, // Allow null if Zoho response is not available
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default value is set to false (0)
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Dealer', // Default value is set to 'Dealer'
  }
});

export default ZohoDealer;