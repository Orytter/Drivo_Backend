import { DataTypes } from "sequelize";
import { sequelize2 } from "../db/database.js"; // Adjust the path to your Sequelize instance

const DatabasesTable = sequelize2.define("DatabasesTable", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Database_Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "DatabasesTable", // Explicit table name
  timestamps: false,          // Disable createdAt and updatedAt for this table
});

export default DatabasesTable;
