import  { DataTypes } from 'sequelize';
import  { sequelize2 } from '../db/database.js';


const validFaqTypes = ['FAQ Dealer', 'FAQ Get Started', 'FAQ Car Purchase', 'FAQ Practical Info', 'FAQ Basic','Contact Us']; 


const FAQ = sequelize2.define('FAQ', {
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isIn: {
          args: [validFaqTypes],
          msg: 'Invalid FAQ',
        },
      },
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
});

module.exports = FAQ;