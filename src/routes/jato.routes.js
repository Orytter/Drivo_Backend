import express from "express";
import { bulkUpdateChartPositions, bulkUpdateFavoritePositions, updateChartPosition } from "../controller/admin/adminController";
import { filterCars, getCarAllTrimLevels, getCarBodyType, getCarBrandsInfo, getCarColorandPrice, getCarColorwithPrice, getCarFuelTypes, getCarMinMaxPrice, getCarModelBasedOnBrand, getCarModelInfo, getCarOptions, getCarTypes, getOptionBuildRules, getPresentPageData, saveFavorite, saveSelectedVersionsInCharts } from "../controller/Jato/jatoController";
import { getDealByNameFromZohoCRM, saveContactData } from "../controller/zoho_CRM/zohoController";
import upload from "../utils/multer"

const router = express.Router();

router.post('/filterCars', filterCars);
router.get('/carOptions', getCarOptions);
router.get('/getCarBrandsInfo', getCarBrandsInfo);
router.get('/car-models', getCarModelBasedOnBrand);
router.get('/car-price-min-max', getCarMinMaxPrice);
router.get('/car-body-types', getCarBodyType);
router.get('/car-fuel-types', getCarFuelTypes);
router.get('/getCarModelInfo', getCarModelInfo);
router.post('/saveSelectedVersionsInCharts', saveSelectedVersionsInCharts);
router.post('/saveSelectedVersionsInFavourites', saveFavorite);
router.get('/getCarTrimLevels', getCarAllTrimLevels);
// router.get('/getCarColorandPrice', getCarColorandPrice);
router.get('/getCarColorandPrice', getCarColorwithPrice);
router.get('/getOptionBuildRules', getOptionBuildRules);
router.post('/updateChartPosition', bulkUpdateChartPositions);
router.post('/updateFavoritePosition', bulkUpdateFavoritePositions);
router.get('/getPresentPage', getPresentPageData)
router.post('/saveZohoContact', upload.single("file"), saveContactData);
router.get('/getDealDetailsBasedOnId', getDealByNameFromZohoCRM);

export default router