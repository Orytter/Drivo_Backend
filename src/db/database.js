import config from "config";
import { Sequelize } from "sequelize";

// Get database configuration from config
const { dbProvider, host, user, password, database, port } = config.get("Database");
const { dbProvider2, host2, user2, password2, databaseftp, port2 } = config.get("Database2");

// First Database connection
const sequelize = new Sequelize(database, user, password, {
  dialect: dbProvider,
  port: port,
  host: host,
  dialectOptions: {
    connectTimeout: 6000000, // Increase the timeout value as needed
  },
  logging: false
});

// Second Database connection (use different variable for the second database)
const sequelizeTwo = new Sequelize(databaseftp, user2, password2, {
  dialect: dbProvider2,
  port: port2,
  host: host2,
  dialectOptions: {
    connectTimeout: 6000000, // Increase the timeout value as needed
  },
  logging: false
});


// Authenticate first database
sequelize
  .authenticate()
  .then(() => {
    console.log("DB 1 connected");
  })
  .catch((error) => {
    console.log("DB 1 connection error:", error.message);
  });

// Authenticate second database
sequelizeTwo
  .authenticate()
  .then(() => {
    console.log("DB 2 connected");
  })
  .catch((error) => {
    console.log("DB 2 connection error:", error.message);
  });

  export { sequelize, sequelizeTwo };
