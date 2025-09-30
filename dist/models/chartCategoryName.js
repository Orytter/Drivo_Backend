"use strict";

var _sequelize = require("sequelize");
var _database = require("../db/database");
// Define the model
const Character = _database.sequelize2.define('ChartCategoryName', {
  charName: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
});

// Export the model
module.exports = Character;