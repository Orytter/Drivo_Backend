import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database.js';

const ZohoDealer = sequelize2.define('ZohoDealer', {
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

module.exports = ZohoDealer;