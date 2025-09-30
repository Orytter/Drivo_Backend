"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
const DealerContactForm = _database.sequelizeTwo.define('DealerContactForm', {
  dealerMail: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  cvrNumber: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  postCode: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  carBrands: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});
module.exports = DealerContactForm;