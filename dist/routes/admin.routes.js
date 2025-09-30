"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = require("../controller/admin/adminController");
var _auth = require("../middleware/auth");
var _multer = _interopRequireDefault(require("../utils/multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.use("/admin", _auth.authenticationToken);
router.post("/adminSignIN", _adminController.adminSignIn);
router.post("/forgotPasswordLink", _adminController.forgotPasswordLink);
router.post("/reset-password", _adminController.resetPassword);
router.post("/admin/createNews", _adminController.createNews);
router.get("/admin/getAllNewsByType", _adminController.getNewsByType);
router.get("/admin/getAllNews", _adminController.getAllNews);
router.get("/admin/getNewsById/:id", _adminController.getNewsById);
router.put("/admin/updateNews", _adminController.updateNews);
router.put("/admin/updateFAQ", _adminController.updateFAQ);
router.delete('/admin/deleteNews/:id', _adminController.deleteNews);
router.post("/admin/createFAQ", _adminController.createFAQ);
router.get("/admin/getByTypeFAQ", _adminController.getFAQByType);
router.get("/admin/getALLFAQ", _adminController.getAllFAQ);
router.get("/admin/getFaqDetailById/:id", _adminController.getFAQDetailsById);
router.delete('/admin/deleteFAQ/:id', _adminController.deleteFAQ);
router.post('/admin/createContact', _adminController.createContact);
router.get('/admin/getContact', _adminController.getAllContacts);
router.get('/admin/getContactById/:id', _adminController.getContactById);
router.delete('/admin/deleteContact/:id', _adminController.deleteContactById);
router.put('/admin/updateContactById/:id', _adminController.updateContactById);
// router.post('/admin/createFavourite',createFavorite);
router.get("/admin/getFavourite/:id", _adminController.getFavoriteById);
router.get("/admin/getAllFavorites", _adminController.getAllFavorites);
router.put("/admin/updateFavourite/:id", _adminController.updateFavorite);
router.delete("/admin/deleteFavourite/:id", _adminController.deleteFavorite);
router.get("/admin/getAdminUser", _adminController.getAdminUserInfo);
router.post("/admin/updateAdminProfile", _multer.default.single('image'), _adminController.updateUserInfoAndImage);

// router.post('/admin/charts', createChart);
router.get('/admin/chartsType', _adminController.getChartsByType);
router.get('/admin/charts', _adminController.getAllCharts);
// router.get('/getAllChartsForPositions', getAllChartsForPositions);
router.get('/admin/charts/:id', _adminController.getChartById);
router.delete('/admin/charts/:id', _adminController.deleteChart);
router.put('/admin/charts/:id', _adminController.updateChart);
router.post("/admin/updatebrandLogo", _multer.default.single('image'), _adminController.addBrandLogo);
router.get("/admin/getBrandLogo", _adminController.getBrandLogoById);
router.get("/admin/getAllBrandLogo", _adminController.getAllBrandLogo);
router.get('/language-settings', _adminController.getLanguageSettings);
router.put('/language-settings', _adminController.updateLanguageSettings);
router.delete('/language-settings/:id', _adminController.deleteLanguageSettings);
router.put('/chart-category-names', _adminController.updateChartCategoryName);
router.post('/chart-category-names', _adminController.createChartCategoryName);
router.get('/getALL-chart-category-names', _adminController.getAllChartCategoryNames);
var _default = exports.default = router;