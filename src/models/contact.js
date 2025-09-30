import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

const validContactTypes = ['Customer', 'Dealer'];

const Contact = sequelizeTwo.define('Contact', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   isIn: {
    //     args: [validContactTypes],
    //     msg: 'Invalid Contact Type',
    //   },
    // },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   isEmail: {
    //     msg: 'Invalid email address',
    //   },
    // },
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: {
    //     args: /^[0-9]+$/,
    //     msg: 'Invalid phone number',
    //   },
    // },
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  }
});

export default Contact;
