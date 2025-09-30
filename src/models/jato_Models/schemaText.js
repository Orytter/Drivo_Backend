const sequelize = require('sequelize');
 
const SchemaText = sequelize.define('schemaText', {
  languageId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  schemaId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  dataValue: {
    type: sequelize.STRING(255),
  },
  abbrText: {
    type: sequelize.STRING(255),
  },
  fullText: {
    type: sequelize.STRING(255),
  },
});
 
// Add association to SchemaText model
SchemaText.belongsTo(SchemaInfo, { foreignKey: 'schemaId' });
 
module.exports = SchemaText;