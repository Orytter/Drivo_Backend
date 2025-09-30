"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ftpScheduler = require("../controller/ftpScheduler/ftpScheduler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post('/setSchedule', _ftpScheduler.setSchedule);
router.get('/getSchedule', _ftpScheduler.getSchedule);
router.post('/forceUpdate', _ftpScheduler.forceUpdate);
router.post('/manualUpdate', _ftpScheduler.manualUpdate);
router.get('/fetchInactive', _ftpScheduler.fetchInactiveDatabases);
router.get('/getActiveDatabase', _ftpScheduler.fetchActiveDatabases);
router.get('/fetchPaths', _ftpScheduler.listFolders);
var _default = exports.default = router;