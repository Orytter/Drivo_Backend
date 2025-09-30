"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const validFaqTypes = ['FAQ Dealer', 'FAQ Get Started', 'FAQ Car Purchase', 'FAQ Practical Info', 'FAQ Basic', 'Contact Us'];
const FAQ = _database.sequelizeTwo.define('FAQ', {
  typeName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [validFaqTypes],
        msg: 'Invalid FAQ'
      }
    }
  },
  question: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  answer: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: true
  },
  is_deleted: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});
module.exports = FAQ;