import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';


const ZohoCredential = sequelizeTwo.define('ZohoCredential', {
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  export default ZohoCredential;