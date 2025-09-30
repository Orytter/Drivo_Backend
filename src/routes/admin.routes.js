import express from "express";
import { addBrandLogo, adminSignIn, createChartCategoryName, createContact, createFAQ, createFavorite, createNews, deleteChart, deleteContactById, deleteFAQ, deleteFavorite, deleteLanguageSettings, deleteNews, forgotPasswordLink, getAdminUserInfo, getAllBrandLogo, getAllChartCategoryNames, getAllCharts,  getAllContacts, getAllFAQ, getAllFavorites, getAllNews, getBrandLogoById, getChartById, getChartsByType, getContactById, getFAQByType, getFAQDetailsById, getFavoriteById, getLanguageSettings, getNewsById, getNewsByType, resetPassword, updateChart, updateChartCategoryName, updateContactById, updateFAQ, updateFavorite, updateLanguageSettings, updateNews, updateUserInfoAndImage } from "../controller/admin/adminController.js";
import { authenticationToken } from "../middleware/auth.js";
import upload from "../utils/multer.js"

const router = express.Router();


router.use("/admin",authenticationToken)


router.post("/adminSignIN" ,adminSignIn);
router.post("/forgotPasswordLink",forgotPasswordLink);
router.post("/reset-password", resetPassword);
router.post("/admin/createNews" ,createNews);
router.get("/admin/getAllNewsByType" ,getNewsByType);
router.get("/admin/getAllNews" ,getAllNews);
router.get("/admin/getNewsById/:id" ,getNewsById);
router.put("/admin/updateNews",updateNews);
router.put("/admin/updateFAQ",updateFAQ);
router.delete('/admin/deleteNews/:id', deleteNews);
router.post("/admin/createFAQ",createFAQ);
router.get("/admin/getByTypeFAQ",getFAQByType);
router.get("/admin/getALLFAQ",getAllFAQ);
router.get("/admin/getFaqDetailById/:id",getFAQDetailsById);
router.delete('/admin/deleteFAQ/:id',deleteFAQ);
router.post('/admin/createContact',createContact);
router.get('/admin/getContact',getAllContacts);
router.get('/admin/getContactById/:id',getContactById);
router.delete('/admin/deleteContact/:id',deleteContactById);
router.put('/admin/updateContactById/:id',updateContactById);
// router.post('/admin/createFavourite',createFavorite);
router.get("/admin/getFavourite/:id" ,getFavoriteById);
router.get("/admin/getAllFavorites" ,getAllFavorites);
router.put("/admin/updateFavourite/:id",updateFavorite);
router.delete("/admin/deleteFavourite/:id",deleteFavorite);
router.get("/admin/getAdminUser",getAdminUserInfo);
router.post("/admin/updateAdminProfile",upload.single('image'),updateUserInfoAndImage);



// router.post('/admin/charts', createChart);
router.get('/admin/chartsType', getChartsByType);
router.get('/admin/charts', getAllCharts);
// router.get('/getAllChartsForPositions', getAllChartsForPositions);
router.get('/admin/charts/:id', getChartById);
router.delete('/admin/charts/:id', deleteChart);
router.put('/admin/charts/:id', updateChart);
router.post("/admin/updatebrandLogo",upload.single('image'),addBrandLogo);
router.get("/admin/getBrandLogo", getBrandLogoById);
router.get("/admin/getAllBrandLogo", getAllBrandLogo);


router.get('/language-settings', getLanguageSettings);
router.put('/language-settings', updateLanguageSettings);
router.delete('/language-settings/:id', deleteLanguageSettings);



router.put('/chart-category-names', updateChartCategoryName);
router.post('/chart-category-names', createChartCategoryName);
router.get('/getALL-chart-category-names', getAllChartCategoryNames);










export default router