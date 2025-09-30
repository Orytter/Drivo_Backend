import express from "express";
import { createDealerContactForm, getAllCharts, getAllChartsByType, getAllContactsFrontend, getAllFavorites, getChart } from "../controller/drivo/drivoController";
import { allnotificationRecord, changeStatusToReadandGetResponse, deleteContactsFormsDrivosFromZohoCRM, deleteDealerRequestFromZohoCRM, getAllFAQ, getAllNews, getContactsFormsDrivosByIdFromZohoCRM, getContactsFormsDrivosFromZohoCRM, getCountOfContactsFormsDrivosFromZohoCRM, getCountOfDealersRequestsFromZohoCRM, getDealerRequestByIdFromZohoCRM, getDealerRequestFromZohoCRM, getFAQByType, getLatestNewsByType, getNewsByType, notificationRecord, TotalnotificationRecord, updateContactsFormsDrivosInZohoCRM, updateDealerRequestInZohoCRM, zohoDealerContactRequestSendData, zohoDealerSendData } from "../controller/zoho_CRM/zohoController";


const router = express.Router();






router.post('/dealer-contact-form', createDealerContactForm);
// router.get('/getChartData', getChart);
router.get('/contactFrontend',getAllContactsFrontend);





router.post('/zoho-dealer-send-data',zohoDealerSendData);
router.get('/zoho-dealer-get-data' ,getDealerRequestFromZohoCRM);
router.delete('/delete-dealer-request',deleteDealerRequestFromZohoCRM);
router.put('/update-dealer/:id', updateDealerRequestInZohoCRM);
router.get('/get-dealer/:id', getDealerRequestByIdFromZohoCRM);


///////////////////////////////////////////
router.post('/zoho-Contact-Request-send-data',zohoDealerContactRequestSendData);
router.get('/get-contacts-forms-drivos', getContactsFormsDrivosFromZohoCRM);
router.delete('/delete-contacts-forms-drivos', deleteContactsFormsDrivosFromZohoCRM);
router.put('/update-contacts-forms-drivos/:id', updateContactsFormsDrivosInZohoCRM);
router.get('/get-contacts-forms-drivos/:id', getContactsFormsDrivosByIdFromZohoCRM);
router.get('/get-count-of-contacts-forms-drivos', getCountOfContactsFormsDrivosFromZohoCRM);
router.get('/get-count-of-dealers-requests', getCountOfDealersRequestsFromZohoCRM);


router.get('/getNotificationOfRequestslimit',notificationRecord)
router.get('/getTotalnotificationRecord',TotalnotificationRecord)
router.get('/changeStatusToReadandGetResponse',changeStatusToReadandGetResponse)
router.get('/allnotificationRecord',allnotificationRecord)

router.get("/getByTypeFAQFrontend",getFAQByType);
router.get("/getAllNewsByTypeFrontend" ,getNewsByType);
router.get("/getAllFAQFrontend",getAllFAQ);
router.get("/getAllNewsFrontend",getAllNews);
router.get("/getFirstFiveLatestNews",getLatestNewsByType);

//////////////////////////New////////////////////////////////////////////// Due to Authentication
router.get('/getAllchartsFrontend', getAllCharts);
router.get('/getAllchartsFrontendByType', getAllChartsByType);
router.get("/getAllFavoritesFrontend" , getAllFavorites);

export default router