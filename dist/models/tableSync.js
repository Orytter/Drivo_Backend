"use strict";

var _news = _interopRequireDefault(require("./news"));
var _adminUser = _interopRequireDefault(require("./adminUser"));
var _faq = _interopRequireDefault(require("./faq"));
var _contactRequest = _interopRequireDefault(require("./contactRequest"));
var _contact = _interopRequireDefault(require("./contact"));
var _favourites = _interopRequireDefault(require("./favourites"));
var _zohoCredentials = _interopRequireDefault(require("./zohoCredentials"));
var _zohoDealer = _interopRequireDefault(require("./zohoDealer"));
var _zohoContactRequests = _interopRequireDefault(require("./zohoContactRequests"));
var _chart = _interopRequireDefault(require("./chart"));
var _brandLogo = _interopRequireDefault(require("./brandLogo"));
var _languageSetting = _interopRequireDefault(require("./languageSetting"));
var _chartCategoryName = _interopRequireDefault(require("./chartCategoryName"));
var _clientZohoForm = _interopRequireDefault(require("./clientZohoForm"));
var _clientDealForm = _interopRequireDefault(require("./clientDealForm"));
var _ftpUpdateSchedule = _interopRequireDefault(require("./ftpUpdateSchedule"));
var _databasesTables = _interopRequireDefault(require("./databasesTables"));
var _databaseLogs = _interopRequireDefault(require("./databaseLogs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(async () => {
  // await news.sync({ force: false, alter:true });
  await _news.default.sync({
    force: false
  });
  await _adminUser.default.sync({
    force: false
  });
  await _faq.default.sync({
    force: false
  });
  await _contactRequest.default.sync({
    force: false
  });
  await _contact.default.sync({
    force: false
  });
  await _favourites.default.sync({
    force: false
  });
  await _zohoCredentials.default.sync({
    force: false
  });
  await _zohoDealer.default.sync({
    force: false
  });
  await _zohoContactRequests.default.sync({
    force: false
  });
  await _chart.default.sync({
    force: false
  });
  await _brandLogo.default.sync({
    force: false
  });
  await _languageSetting.default.sync({
    force: false
  });
  await _chartCategoryName.default.sync({
    force: false
  });
  await _clientZohoForm.default.sync({
    force: false
  });
  await _clientDealForm.default.sync({
    force: false
  });
  await _ftpUpdateSchedule.default.sync({
    force: false
  });
  await _databasesTables.default.sync({
    force: false
  });
  await _databaseLogs.default.sync({
    force: false
  });
})();