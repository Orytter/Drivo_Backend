import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js'; // Make sure to adjust the path based on your project structure

const ZohoDealerContactRequest = sequelizeTwo.define('ZohoContactForm', {
  zohoId: {
    type: DataTypes.STRING, // Change the data type based on the actual type in Zoho
    allowNull: true, // Allow null if Zoho response is not available
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Car_Configuration_Details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Default value is set to false (0)
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default ZohoDealerContactRequest;