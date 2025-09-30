import  { DataTypes } from 'sequelize';
import  { sequelize2 } from '../db/database';



const DealerContactForm = sequelize2.define('DealerContactForm', {
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

module.exports = DealerContactForm;