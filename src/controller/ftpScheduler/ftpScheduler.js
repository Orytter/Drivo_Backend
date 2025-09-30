// scheduleJob.js
import cron from 'node-cron';
import { downloadAndExtractAndUpdate } from '../JatoFtp/jatoftp'; // Update this with the correct path to your main function
// Import necessary modules
import  UpdateSchedule  from '../../models/ftpUpdateSchedule';
import DatabasesTable from '../../models/databasesTables';
import statusCode from "../../utils/statusCode.utils";
import messages from "../../utils/message.utils";
import { setLanguage } from "../../utils/common";
import fs from 'fs';
import path from 'path';

export const listFolders = async (req, res) => {
  let language = setLanguage(req.query); // Set the language based on query parameters
  const baseDir = path.join(__dirname, '../../../../../../var/Drivo_Backend/public/assets/downloadsftptest'); // Define the base directory

  try {
    // Read the contents of the directory
    const contents = fs.readdirSync(baseDir, { withFileTypes: true });

    // Filter only folders and construct their full paths
    const folders = contents
      .filter(dirent => dirent.isDirectory()) // Check if it's a folder
      .map(dirent => path.join(baseDir, dirent.name)); // Construct the folder path

    if (folders.length === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: messages[language].NO_FOLDERS_FOUND });
    }

    res.status(statusCode.SUCCESS_CODE).json({ folders });

  } catch (error) {
    console.error('Error listing folders:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR, error });
  }
};

// API to fetch inactive databases
export const fetchInactiveDatabases = async (req, res) => {
  let language = setLanguage(req.query); // Set the language based on query parameters
  
  try {
    // Query the database for all records where the status field is 0 (inactive)
    const inactiveDatabases = await DatabasesTable.findAll({
      where: {
        status: 0 // Looking for databases where the status is inactive (0)
      },
      attributes: ['Database_Name'], // Only return the 'Database_Name' field
    });

    if (inactiveDatabases.length === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: messages[language].NO_INACTIVE_DB });
    }

    // Map the inactive databases to just the names
    const databaseNames = inactiveDatabases.map(db => db.Database_Name);

    console.log(databaseNames);

    res.status(statusCode.SUCCESS_CODE).json({ databases: databaseNames });

  } catch (error) {
    console.error('Error fetching inactive databases:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR, error });
  }
};
// API to fetch active databases
export const fetchActiveDatabases = async (req, res) => {
  let language = setLanguage(req.query); // Set the language based on query parameters
  
  try {
    // Query the database for all records where the status field is 1 (active)
    const activeDatabases = await DatabasesTable.findAll({
      where: {
        status: 1 // Looking for databases where the status is active (1)
      },
      attributes: ['Database_Name'], // Only return the 'Database_Name' field
    });

    if (activeDatabases.length === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: messages[language].NO_ACTIVE_DB });
    }

    // Map the active databases to just the names
    const databaseNames = activeDatabases.map(db => db.Database_Name);

    console.log(databaseNames);

    res.status(statusCode.SUCCESS_CODE).json({ databases: databaseNames });

  } catch (error) {
    console.error('Error fetching active databases:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR, error });
  }
};

// API to get all schedules
export const getSchedule = async (req, res) => {
  try {
    // Fetch all records from the UpdateSchedule table
    const schedules = await UpdateSchedule.findAll();

    console.log("Schedule",schedules)

    if (schedules.length === 0) {
      return res.status(200).json({ message: 'No schedules found.', schedules: [] });
    }

    res.status(200).json({ message: 'Schedules fetched successfully.', schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};


export const setSchedule = async (req, res) => {
  const { daysOfWeek, timeSlot } = req.body; // `daysOfWeek` is an array of selected days
  const language = setLanguage(req.query);

  try {
    // Delete all existing records before creating new ones
    await UpdateSchedule.destroy({ where: {} });

    // Create new records for the provided days and time
    const schedules = daysOfWeek.map((day) => ({
      dayOfWeek: day,
      timeSlot: timeSlot,
    }));

    const createdSchedules = await UpdateSchedule.bulkCreate(schedules);

    res.status(statusCode.SUCCESS_CODE).json({
      message: messages[language].SCHEDULE_SET_SUCCESS,
      schedules: createdSchedules,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: messages[language].INTERNAL_SERVER_ERROR,
      error,
    });
  }
};


export const forceUpdate = async (req, res) => {
  let language = setLanguage(req.query); // Set the language based on query parameters
  const { dbChoice } = req.body;

  if (!dbChoice) {
    return res
      .status(statusCode.ERROR_CODE)
      .json({ message: messages[language].DB_CHOICE_REQUIRED });
  }

  try {
    console.log(`Force update initiated for database: ${dbChoice}`);
    await downloadAndExtractAndUpdate(dbChoice);

    res
      .status(statusCode.SUCCESS_CODE)
      .json({ message: messages[language].FORCE_UPDATE_SUCCESS });
  } catch (error) {
    console.error('Error during force update:', error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: messages[language].INTERNAL_SERVER_ERROR, error });
  }
};

export const manualUpdate = async (req, res) => {
  let language = setLanguage(req.query); // Set the language based on query parameters
  const { dbChoice, manualExtractPath } = req.body;

  // Validate required parameters
  if (!dbChoice) {
    return res
      .status(statusCode.ERROR_CODE)
      .json({ message: messages[language].DB_CHOICE_REQUIRED });
  }

  if (!manualExtractPath) {
    return res
      .status(statusCode.ERROR_CODE)
      .json({ message: messages[language].EXTRACT_PATH_REQUIRED });
  }

  try {
    console.log(`Manual update initiated for database: ${dbChoice}`);
    console.log(`Using manual extract path: ${manualExtractPath}`);

    // Call the downloadAndExtractAndUpdate function with isManualUpdate set to true
    await downloadAndExtractAndUpdate(dbChoice, true, manualExtractPath);

    res
      .status(statusCode.SUCCESS_CODE)
      .json({ message: messages[language].MANUAL_UPDATE_SUCCESS });
  } catch (error) {
    console.error('Error during manual update:', error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ message: messages[language].INTERNAL_SERVER_ERROR, error });
  }
};





async function checkAndRunJob() {
  try {
    const now = new Date();

    // Get current day of the week (e.g., Monday, Tuesday)
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Get the current time in HH:MM format in CET time zone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Copenhagen',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    const currentTime = formatter.format(now); // e.g., "05:40"

    // Fetch schedules matching the current day
    const matchingSchedules = await UpdateSchedule.findAll({
      where: { dayOfWeek: currentDay }
    });

    if (!matchingSchedules || matchingSchedules.length === 0) {
      console.log(`No schedules found for ${currentDay}`);
      return;
    }

    // Iterate over matching schedules to check for a time match
    for (const schedule of matchingSchedules) {
      const scheduledTime = schedule.timeSlot.split(':').slice(0, 2).join(':'); // Ensure HH:MM format
      if (currentTime === scheduledTime) {
        console.log(`Running scheduled job for: Day - ${currentDay}, Time - ${scheduledTime}`);
        await downloadAndExtractAndUpdate(); // Perform your task
      }
    }
  } catch (error) {
    console.error('Error checking or running scheduled job:', error);
  }
}


// Run the check every minute to see if it matches the scheduled time
cron.schedule('* * * * *', checkAndRunJob);
