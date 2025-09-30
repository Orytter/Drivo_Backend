const sequelize = require('sequelize');
 
const OptionName = sequelize.define('optionName', {
  vehicleId: {
    type: sequelize.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  languageId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  optionId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  manufName: {
    type: sequelize.STRING(255),
    allowNull: false,
  },
});
 
// Add association to OptionName model
OptionName.belongsTo(OptionList, { foreignKey: { name: 'vehicleId', name: 'optionId' }, onDelete: 'CASCADE' });
 
module.exports = OptionName;