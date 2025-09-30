import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database.js';


const ZohoCredential = sequelize2.define('ZohoCredential', {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  module.exports = ZohoCredential;