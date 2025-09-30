import  { DataTypes } from 'sequelize';
import  { sequelizeTwo } from '../db/database.js';


const validFaqTypes = ['FAQ Dealer', 'FAQ Get Started', 'FAQ Car Purchase', 'FAQ Practical Info', 'FAQ Basic','Contact Us']; 


const FAQ = sequelizeTwo.define('FAQ', {
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

export default FAQ;