"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = require("../controller/admin/adminController");
var _jatoController = require("../controller/Jato/jatoController");
var _zohoController = require("../controller/zoho_CRM/zohoController");
var _multer = _interopRequireDefault(require("../utils/multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post('/filterCars', _jatoController.filterCars);
router.get('/carOptions', _jatoController.getCarOptions);
router.get('/getCarBrandsInfo', _jatoController.getCarBrandsInfo);
router.get('/car-models', _jatoController.getCarModelBasedOnBrand);
router.get('/car-price-min-max', _jatoController.getCarMinMaxPrice);
router.get('/car-body-types', _jatoController.getCarBodyType);
router.get('/car-fuel-types', _jatoController.getCarFuelTypes);
router.get('/getCarModelInfo', _jatoController.getCarModelInfo);
router.post('/saveSelectedVersionsInCharts', _jatoController.saveSelectedVersionsInCharts);
router.post('/saveSelectedVersionsInFavourites', _jatoController.saveFavorite);
router.get('/getCarTrimLevels', _jatoController.getCarAllTrimLevels);
// router.get('/getCarColorandPrice', getCarColorandPrice);
router.get('/getCarColorandPrice', _jatoController.getCarColorwithPrice);
router.get('/getOptionBuildRules', _jatoController.getOptionBuildRules);
router.post('/updateChartPosition', _adminController.bulkUpdateChartPositions);
router.post('/updateFavoritePosition', _adminController.bulkUpdateFavoritePositions);
router.get('/getPresentPage', _jatoController.getPresentPageData);
router.post('/saveZohoContact', _multer.default.single("file"), _zohoController.saveContactData);
router.get('/getDealDetailsBasedOnId', _zohoController.getDealByNameFromZohoCRM);
var _default = exports.default = router;