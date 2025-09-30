import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database.js';

const ClientDealForm = sequelize2.define('ClientDealForm', {
  Deal_Name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  JATO_vehicle_ID: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Date_Created: {
    type: DataTypes.STRING,
    allowNull: true
  },
  User_ID: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Stage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  URL: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Add_campaign: {
    type: DataTypes.STRING,
    allowNull: true
  },
  File: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Make: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Model: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Version: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Product: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Vehicle_Type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Base_Price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Base_Price_Delivered: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Options_Price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Total_Price_Delivered: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Configuration: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  latestUserID: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  Contact_Name: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = ClientDealForm;
