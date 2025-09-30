"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _drivoController = require("../controller/drivo/drivoController");
var _zohoController = require("../controller/zoho_CRM/zohoController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post('/dealer-contact-form', _drivoController.createDealerContactForm);
// router.get('/getChartData', getChart);
router.get('/contactFrontend', _drivoController.getAllContactsFrontend);
router.post('/zoho-dealer-send-data', _zohoController.zohoDealerSendData);
router.get('/zoho-dealer-get-data', _zohoController.getDealerRequestFromZohoCRM);
router.delete('/delete-dealer-request', _zohoController.deleteDealerRequestFromZohoCRM);
router.put('/update-dealer/:id', _zohoController.updateDealerRequestInZohoCRM);
router.get('/get-dealer/:id', _zohoController.getDealerRequestByIdFromZohoCRM);

///////////////////////////////////////////
router.post('/zoho-Contact-Request-send-data', _zohoController.zohoDealerContactRequestSendData);
router.get('/get-contacts-forms-drivos', _zohoController.getContactsFormsDrivosFromZohoCRM);
router.delete('/delete-contacts-forms-drivos', _zohoController.deleteContactsFormsDrivosFromZohoCRM);
router.put('/update-contacts-forms-drivos/:id', _zohoController.updateContactsFormsDrivosInZohoCRM);
router.get('/get-contacts-forms-drivos/:id', _zohoController.getContactsFormsDrivosByIdFromZohoCRM);
router.get('/get-count-of-contacts-forms-drivos', _zohoController.getCountOfContactsFormsDrivosFromZohoCRM);
router.get('/get-count-of-dealers-requests', _zohoController.getCountOfDealersRequestsFromZohoCRM);
router.get('/getNotificationOfRequestslimit', _zohoController.notificationRecord);
router.get('/getTotalnotificationRecord', _zohoController.TotalnotificationRecord);
router.get('/changeStatusToReadandGetResponse', _zohoController.changeStatusToReadandGetResponse);
router.get('/allnotificationRecord', _zohoController.allnotificationRecord);
router.get("/getByTypeFAQFrontend", _zohoController.getFAQByType);
router.get("/getAllNewsByTypeFrontend", _zohoController.getNewsByType);
router.get("/getAllFAQFrontend", _zohoController.getAllFAQ);
router.get("/getAllNewsFrontend", _zohoController.getAllNews);
router.get("/getFirstFiveLatestNews", _zohoController.getLatestNewsByType);

//////////////////////////New////////////////////////////////////////////// Due to Authentication
router.get('/getAllchartsFrontend', _drivoController.getAllCharts);
router.get('/getAllchartsFrontendByType', _drivoController.getAllChartsByType);
router.get("/getAllFavoritesFrontend", _drivoController.getAllFavorites);
var _default = exports.default = router;