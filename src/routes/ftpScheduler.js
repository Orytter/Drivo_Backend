import express from "express";
import { fetchActiveDatabases, fetchInactiveDatabases, forceUpdate, getSchedule, listFolders, manualUpdate, setSchedule } from "../controller/ftpScheduler/ftpScheduler.js";

const router = express.Router();










router.post('/setSchedule', setSchedule);
router.get('/getSchedule', getSchedule);
router.post('/forceUpdate', forceUpdate);
router.post('/manualUpdate', manualUpdate);
router.get('/fetchInactive', fetchInactiveDatabases);
router.get('/getActiveDatabase', fetchActiveDatabases);
router.get('/fetchPaths', listFolders);



export default router









