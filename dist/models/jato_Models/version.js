"use strict";

var _sequelize = require("sequelize");
const sequelize = require('sequelize');
const Version = sequelize.define('version', {
  vehicleId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    allowNull: false
  },
  id_101: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_102: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_104: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_120: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_103: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_113: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_106: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_108: {
    type: _sequelize.DataTypes.STRING(4),
    allowNull: true
  },
  id_109: {
    type: _sequelize.DataTypes.STRING(3),
    allowNull: true
  },
  id_107: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_26801: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_117: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_111: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_128: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_112: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_129: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_130: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_302: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_131: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_403: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_402: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_404: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_405: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_114: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_602: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_605: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_603: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_606: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_604: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_607: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_608: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_609: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_6502: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_20602: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_7403: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_15303: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_15304: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_8702: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_7502: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_702: {
    type: _sequelize.DataTypes.STRING(2),
    allowNull: true
  },
  id_901: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_931: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_951: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_902: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_903: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_904: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_905: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_906: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_132: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_110: {
    type: _sequelize.DataTypes.STRING(3),
    allowNull: true
  },
  id_115: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_125: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_116: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_502: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_121: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_122: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_123: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_28101: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_28001: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_301: {
    type: _sequelize.DataTypes.STRING(1),
    allowNull: true
  },
  id_303: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_304: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_316: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_318: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_319: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_317: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_305: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_306: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_307: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_308: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_309: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_310: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_311: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_312: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_313: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  id_314: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_315: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_100901: {
    type: _sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  id_100902: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_100903: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_100904: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_100905: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_100906: {
    type: _sequelize.DataTypes.FLOAT,
    allowNull: true
  },
  id_174: {
    type: _sequelize.DataTypes.STRING(4),
    allowNull: true
  },
  id_176: {
    type: _sequelize.DataTypes.STRING(4),
    allowNull: true
  }
  // ... Add remaining id fields from the schema
  // ... Modify data types if necessary based on your data
});
module.exports = Version;