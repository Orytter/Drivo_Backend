const sequelize = require('sequelize');
 
const StandardText = sequelize.define('standardText', {
  vehicleId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  schemaId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  languageId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: sequelize.TEXT,
  },
});
 
// Add association to StandardText model
StandardText.belongsTo(Version, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
 
module.exports = StandardText;