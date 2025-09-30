import { DataTypes } from "sequelize";
import { sequelize2 } from "../db/database.js"; // Adjust the path to your Sequelize instance
import DatabasesTable from "./databasesTables.js"; // Path to the related model

const DatabaseLogs = sequelize2.define(
  "DatabaseLogs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    database_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DatabasesTable,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false, // Ensure this column is required
      defaultValue: sequelize2.literal("CURRENT_TIMESTAMP"), // Use CURRENT_TIMESTAMP at the database level
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize2.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"), // Automatically update on changes
    },
  },
  {
    tableName: "DatabaseLogs", // Explicit table name
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

DatabaseLogs.belongsTo(DatabasesTable, {
  foreignKey: "database_id",
  as: "database", // Alias for relation
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default DatabaseLogs;
