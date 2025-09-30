"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadAndExtractAndUpdate = downloadAndExtractAndUpdate;
var _sequelize = require("sequelize");
var _unzipper = _interopRequireDefault(require("unzipper"));
var _fs = _interopRequireDefault(require("fs"));
var _ssh2SftpClient = _interopRequireDefault(require("ssh2-sftp-client"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Database connections using Sequelize
const sequelizeDBV1 = new _sequelize.Sequelize('DRIVO_DBV3', 'drivodb', 'smaarst@a20299', {
  host: '18.184.209.15',
  dialect: 'mysql',
  port: 3306
});
const sequelizeDBV2 = new _sequelize.Sequelize('DRIVO_DBV4', 'drivodb', 'smaarst@a20299', {
  host: '18.184.209.15',
  dialect: 'mysql',
  port: 3306
});
const sequelizeDrivoTest = new _sequelize.Sequelize('drivotest', 'drivodb', 'smaarst@a20299', {
  host: '18.184.209.15',
  dialect: 'mysql',
  port: 3306
});

// Function to update default.json with the new database name
async function updateDatabaseConfig(newDatabaseName) {
  const configPath = _path.default.join(__dirname, '../../../config/production.json');
  try {
    const config = JSON.parse(_fs.default.readFileSync(configPath, 'utf8'));
    config.Database.database = newDatabaseName;
    _fs.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Configuration updated with new database: ${newDatabaseName}`);
  } catch (error) {
    console.error('Error updating database configuration:', error);
  }
}

// Reload Sequelize instance with new configuration
function reloadSequelize() {
  const config = require('../../../config/production.json').Database;
  return new _sequelize.Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dbProvider,
    port: config.port
  });
}

// Helper function to fetch deactivated database
async function getDeactivatedDatabase() {
  const [result] = await sequelizeDrivoTest.query(`SELECT * FROM DatabasesTable WHERE status = 0 LIMIT 1`);
  if (result.length === 0) throw new Error('No deactivated database found.');
  return result[0];
}

// Check the last update time in DatabaseLogs for the specific database
async function getLastUpdateTime(databaseId) {
  const [result] = await sequelizeDrivoTest.query(`SELECT * FROM DatabaseLogs WHERE database_id = ${databaseId} ORDER BY updatedAt DESC LIMIT 1`);
  return result.length > 0 ? new Date(result[0].updatedAt) : null;
}

// Toggle database statuses
async function toggleDatabaseStatuses(db_id) {
  await sequelizeDrivoTest.query(`UPDATE DatabasesTable SET status = IF(id = '${db_id}', 1, 0)`);
  console.log(`Database statuses updated: ${db_id} is now active.`);
}

// Function to test the connection
async function testConnection(sequelizeInstance) {
  try {
    await sequelizeInstance.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Test connections for both databases
testConnection(sequelizeDBV1);
testConnection(sequelizeDBV2);

// SFTP configuration
const sftpConfig = {
  host: 'carspecs.transfer.jato.com',
  port: 22,
  username: 'dk.drivo',
  password: 'Heat.Wav3'
};

// Helper function to create unique filenames
const getUniqueFilename = prefix => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '_');
  return `${prefix}_${timestamp}.zip`;
};

// Define paths
const zipFileName = getUniqueFilename('database');
const downloadPath = _path.default.join(__dirname, '../../../../../../var/Drivo_Backend/public/assets/downloadsftptest', zipFileName);
const extractPath = _path.default.join(__dirname, '../../../../../../var/Drivo_Backend/public/assets/downloadsftptest', zipFileName.replace('.zip', ''));

// Function to fetch the latest ZIP file from SFTP
async function getLatestZipFile(sftp) {
  const remoteDir = '/CURRENT/DATABASES/TEXTFILESUTF8/SSCDK';
  const fileList = await sftp.list(remoteDir);
  const zipFiles = fileList.filter(file => file.name.endsWith('.zip'));
  if (zipFiles.length === 0) throw new Error('No ZIP files found in the directory.');
  const latestZipFile = zipFiles.sort((a, b) => b.modifyTime - a.modifyTime)[0];
  return {
    path: _path.default.join(remoteDir, latestZipFile.name),
    modifyTime: latestZipFile.modifyTime
  };
}

// Download ZIP file from SFTP
async function downloadZipFromSFTP(zipFilePath) {
  const sftp = new _ssh2SftpClient.default();
  try {
    await sftp.connect(sftpConfig);
    console.log('Connected to SFTP server.');
    console.log(`Starting download of database ZIP file: ${zipFileName}`);
    await sftp.get(zipFilePath, downloadPath); // Using zipFilePath directly
    console.log(`File downloaded to: ${downloadPath}`);
  } catch (error) {
    console.error('Error during SFTP download:', error);
  } finally {
    sftp.end();
    console.log('SFTP connection closed.');
  }
}

// Recursively set permissions for a folder and its contents
function setPermissionsRecursively(directoryPath) {
  try {
    // Change permissions for the directory itself
    _fs.default.chmodSync(directoryPath, 0o777); // Full access for all users

    // Read contents of the directory
    const files = _fs.default.readdirSync(directoryPath);

    // Loop through each file and set permissions
    files.forEach(file => {
      const filePath = _path.default.join(directoryPath, file);
      const stats = _fs.default.statSync(filePath);
      if (stats.isDirectory()) {
        // Recursive call for subdirectories
        setPermissionsRecursively(filePath);
      } else {
        // Set permissions for files
        _fs.default.chmodSync(filePath, 0o777); // Read/write for all users
      }
    });
  } catch (error) {
    console.error('Error setting permissions:', error);
  }
}

// Extract the ZIP file
async function extractZipFile() {
  try {
    _fs.default.mkdirSync(extractPath, {
      recursive: true
    });
    await _fs.default.createReadStream(downloadPath).pipe(_unzipper.default.Extract({
      path: extractPath
    })).promise();
    console.log('File extraction completed.');
    // Set permissions for the extracted folder and its contents
    setPermissionsRecursively(extractPath);
    console.log(`Permissions set for folder: ${extractPath}`);
  } catch (error) {
    console.error('Error during file extraction:', error);
  }
}

// Function to run SQL scripts
async function runSQLScript(sequelizeInstance, script) {
  try {
    await sequelizeInstance.query(script);
    console.log('SQL script executed successfully.');
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}

// Schema creation script

let schemaCreationScript = 'CALL CreateTablesAndConstraints();';

// Load data script

console.log("extractedPath", extractPath);

// let tempPath="/var/www/html/Drivo_Backend/public/assets/downloads/database_2024_11_19T11_15_26_786Z";

// let loadDataScript = [
//   `LOAD DATA INFILE "${extractPath}/SSCDK_version_utf8.txt" IGNORE INTO TABLE version IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_option_list_utf8.txt" IGNORE INTO TABLE option_list IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_equipment_utf8.txt" IGNORE INTO TABLE equipment IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_version_utf8.txt" IGNORE INTO TABLE version IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_equipment_utf8.txt" IGNORE INTO TABLE equipment IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_option_list_utf8.txt" IGNORE INTO TABLE option_list IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_option_build_utf8.txt" IGNORE INTO TABLE option_build IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_option_name_utf8.txt" IGNORE INTO TABLE option_name IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_option_text_utf8.txt" IGNORE INTO TABLE option_text IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_schema_info_utf8.txt" IGNORE INTO TABLE schema_info IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_schema_text_utf8.txt" IGNORE INTO TABLE schema_text IGNORE 1 LINES;`,
//   `LOAD DATA INFILE "${extractPath}/SSCDK_standard_text_utf8.txt" IGNORE INTO TABLE standard_text IGNORE 1 LINES;`
// ];
let CapacityTableCreationScript = 'CALL CreateAndPopulateCapacity();';
let IndexingCreationScript = 'CALL CreateIndexes();';

// Sequential database update function
async function updateDatabase(dbChoice, manualExtractPath = null) {
  try {
    // Default to DBV2 if no valid dbChoice is provided
    const sequelizeInstance = dbChoice === 'DRIVO_DBV3' ? sequelizeDBV1 : sequelizeDBV2;
    console.log(`Starting database update for ${dbChoice}...`);
    // Call the stored procedure to truncate tables
    // console.log(`Calling the truncate stored procedure for ${dbChoice}...`);
    await sequelizeInstance.query('CALL TruncateAllTables();');
    console.log(`All tables truncated successfully for ${dbChoice}.`);
    await runSQLScript(sequelizeInstance, schemaCreationScript);

    // Step 3: Define the data loading path
    const dataPath = manualExtractPath || extractPath;

    // Step 4: Build the `LOAD DATA INFILE` scripts dynamically
    const loadDataScript = [`LOAD DATA INFILE "${dataPath}/SSCDK_version_utf8.txt" IGNORE INTO TABLE version IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_equipment_utf8.txt" IGNORE INTO TABLE equipment IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_option_list_utf8.txt" IGNORE INTO TABLE option_list IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_option_build_utf8.txt" IGNORE INTO TABLE option_build IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_option_name_utf8.txt" IGNORE INTO TABLE option_name IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_option_text_utf8.txt" IGNORE INTO TABLE option_text IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_schema_info_utf8.txt" IGNORE INTO TABLE schema_info IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_schema_text_utf8.txt" IGNORE INTO TABLE schema_text IGNORE 1 LINES;`, `LOAD DATA INFILE "${dataPath}/SSCDK_standard_text_utf8.txt" IGNORE INTO TABLE standard_text IGNORE 1 LINES;`];
    for (let ls of loadDataScript) {
      await runSQLScript(sequelizeInstance, ls);
    }
    await runSQLScript(sequelizeInstance, CapacityTableCreationScript);
    await runSQLScript(sequelizeInstance, IndexingCreationScript);
    // await runSQLScript(sequelizeInstance, loadDataScript);
    console.log(`${dbChoice} updated successfully.`);
  } catch (error) {
    console.error(`Error during ${dbChoice} update:`, error);
  }
}

// Main function to execute download, extract, and update with dynamic DB selection
async function downloadAndExtractAndUpdate(dbChoice, isManualUpdate = false, manualExtractPath = null) {
  let sequelizeInstance; // Declare the variable here
  const sftp = new _ssh2SftpClient.default();
  try {
    let deactivatedDb;
    let lastUpdateTime;
    if (isManualUpdate) {
      // Manual update logic: Ensure dbChoice and manualExtractPath are provided
      if (!dbChoice || !manualExtractPath) {
        throw new Error('For manual update, both dbChoice and manualExtractPath are required.');
      }

      // Find the database entry by dbChoice
      const [result] = await sequelizeDrivoTest.query(`SELECT * FROM DatabasesTable WHERE Database_Name = '${dbChoice}' LIMIT 1`);
      if (result.length === 0) throw new Error(`Database ${dbChoice} not found.`);
      deactivatedDb = result[0];

      // Proceed with manual update using the provided manualExtractPath
      console.log(`Starting manual update for database: ${dbChoice}`);
      await updateDatabase(deactivatedDb.Database_Name, manualExtractPath);
      await toggleDatabaseStatuses(deactivatedDb.id);

      // Update default.json and reload Sequelize
      await updateDatabaseConfig(deactivatedDb.Database_Name);
      sequelizeInstance = reloadSequelize();

      // Log the update in DatabaseLogs
      await sequelizeDrivoTest.query(`INSERT INTO DatabaseLogs (database_id, path, updatedAt) VALUES (${deactivatedDb.id}, '${manualExtractPath}', NOW())`);
      console.log('Manual database update logged successfully.');
      return; // Exit the function after completing the manual update
    }

    // Scheduled or force update logic
    const isForceUpdate = !!dbChoice;
    if (isForceUpdate) {
      // Force update logic: Find the database entry by dbChoice
      const [result] = await sequelizeDrivoTest.query(`SELECT * FROM DatabasesTable WHERE Database_Name = '${dbChoice}' LIMIT 1`);
      if (result.length === 0) throw new Error(`Database ${dbChoice} not found.`);
      deactivatedDb = result[0];

      // Get the last update time for the specified database
      lastUpdateTime = await getLastUpdateTime(deactivatedDb.id);
    } else {
      // Default logic: Get the deactivated database
      deactivatedDb = await getDeactivatedDatabase();
      lastUpdateTime = await getLastUpdateTime(deactivatedDb.id);
    }
    await sftp.connect(sftpConfig);
    const {
      path: zipFilePath,
      modifyTime
    } = await getLatestZipFile(sftp);

    // Skip the "no updates available" check for force update
    if (!isForceUpdate && lastUpdateTime && modifyTime <= lastUpdateTime) {
      console.log('No new updates available.');
      return;
    }
    await downloadZipFromSFTP(zipFilePath, downloadPath);
    await extractZipFile(downloadPath, extractPath);
    await updateDatabase(deactivatedDb.Database_Name);
    await toggleDatabaseStatuses(deactivatedDb.id);

    // Update default.json and reload Sequelize
    await updateDatabaseConfig(deactivatedDb.Database_Name);
    sequelizeInstance = reloadSequelize();

    // Log the update in DatabaseLogs
    await sequelizeDrivoTest.query(`INSERT INTO DatabaseLogs (database_id, path, updatedAt) VALUES (${deactivatedDb.id}, '${zipFilePath}', NOW())`);
    console.log('Database update logged successfully.');
  } catch (error) {
    console.error('Error during download, extraction, or database update:', error);
  } finally {
    sftp.end();
  }
}