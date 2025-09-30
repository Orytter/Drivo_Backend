const sequelize = require('sequelize');
import { DataTypes } from 'sequelize';
 
const Version = sequelize.define('version', {
  vehicleId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  id_101: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_102: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_104: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_120: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_103: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_113: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_106: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_108: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  id_109: {
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  id_107: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_26801: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_117: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_111: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_128: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_112: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_129: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_130: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_302: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_131: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_403: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_402: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_404: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_405: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_114: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_602: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_605: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_603: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_606: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_604: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_607: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_608: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_609: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_6502: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_20602: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_7403: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_15303: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_15304: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_8702: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_7502: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_702: {
    type: DataTypes.STRING(2),
    allowNull: true,
  },
  id_901: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_931: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_951: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_902: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_903: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_904: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_905: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_906: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_132: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_110: {
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  id_115: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_125: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_116: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_502: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_121: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_122: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_123: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_28101: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_28001: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_301: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  id_303: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_304: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_316: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_318: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_319: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_317: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_305: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_306: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_307: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_308: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_309: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_310: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_311: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_312: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_313: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_314: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_315: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_100901: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_100902: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_100903: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_100904: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_100905: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_100906: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  id_174: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  id_176: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  // ... Add remaining id fields from the schema
  // ... Modify data types if necessary based on your data
 
});
 
module.exports = Version;