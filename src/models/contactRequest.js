import  { DataTypes } from 'sequelize';
import  { sequelizeTwo } from '../db/database.js';



const DealerContactForm = sequelizeTwo.define('DealerContactForm', {
    dealerMail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvrNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carBrands: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  export default DealerContactForm;