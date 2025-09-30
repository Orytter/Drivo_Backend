"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = require("../db/database");
const validContactTypes = ['Customer', 'Dealer'];
const Contact = _database.sequelize2.define('Contact', {
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
    // validate: {
    //   isIn: {
    //     args: [validContactTypes],
    //     msg: 'Invalid Contact Type',
    //   },
    // },
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
    // validate: {
    //   isEmail: {
    //     msg: 'Invalid email address',
    //   },
    // },
  },
  phoneNo: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
    // validate: {
    //   is: {
    //     args: /^[0-9]+$/,
    //     msg: 'Invalid phone number',
    //   },
    // },
  },
  is_deleted: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});
var _default = exports.default = Contact;