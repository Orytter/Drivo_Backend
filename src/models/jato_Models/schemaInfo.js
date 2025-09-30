const sequelize = require('sequelize');
 
const SchemaInfo = sequelize.define('schemaInfo', {
  schemaId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  parentSchemaId: {
    type: sequelize.INTEGER,
  },
  locationSchemaId: {
    type: sequelize.INTEGER,
  },
  scaleOfData: {
    type: sequelize.SMALLINT,
  },
  dataType: {
    type: sequelize.SMALLINT,
  },
});
 
module.exports = SchemaInfo;