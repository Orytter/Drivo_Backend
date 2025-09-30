"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = require("../db/database");
const UpdateSchedule = _database.sequelize2.define('UpdateSchedule', {
  dayOfWeek: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
    },
    comment: 'Day of the week for the scheduled update'
  },
  timeSlot: {
    type: _sequelize.DataTypes.TIME,
    allowNull: false,
    comment: 'Time of day for the scheduled update in HH:MM:SS format'
  },
  isActive: {
    type: _sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Indicates if the schedule is currently active'
  }
});
var _default = exports.default = UpdateSchedule;