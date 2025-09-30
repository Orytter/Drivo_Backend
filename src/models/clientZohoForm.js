import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database';

const clientZohoForm = sequelize2.define('clientZohoForm', {
    Last_Name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  Contact_Type: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Date_Created: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Fornavn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Efternavn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Mailing_Zip: {
    type: DataTypes.STRING,
    allowNull: true
  },
  latestUserID: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  recordId:{
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = clientZohoForm;
