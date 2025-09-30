import axios from 'axios';
import ZohoCredential from '../../models/zohoCredentials'
import statusCode from "../../utils/statusCode.utils";
import messages from "../../utils/message.utils";
import ZohoDealer from '../../models/zohoDealer';
import ZohoDealerContactRequest from '../../models/zohoContactRequests';
import { sendToZohoWithoutAwait } from '../../utils/zoho_Middleware';
import { sendToZohoWithoutAwaitContactRequest } from '../../utils/zoho_ContactRequest';
import ClientZohoForm from '../../models/clientZohoForm';
import ClientDealForm from '../../models/clientDealForm';
import FAQ from '../../models/faq'
import News from '../../models/news'
import { Op } from 'sequelize';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import createDeal from '../../utils/zohoDealFunction';
import { setLanguage } from "../../utils/common";

// export const zohoDealerSendData = async (req, res) => {
//     try {
//         console.log(req)
//       // Fetch Zoho token from the database (assuming you have a row in the table)
//       const zohoCredential = await ZohoCredential.findOne();

//       console.log("dddddddd",zohoCredential)

//       if (!zohoCredential) {
//         return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//       }

//       // Assuming that the data you want to send is in req.body
//       let data = JSON.stringify({
//         "data": [
//           {
//             "Name": req.body.Name,
//             "Brands": req.body.Brands,
//             "Post_Code": req.body.Post_Code,
//             "Cvr_Number": req.body.Cvr_Number,
//             "Email": req.body.Email
//           }
//         ]
//       });



//       const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://www.zohoapis.in/crm/v2/Dealers_Requests',
//         headers: { 
//           'Authorization': `Zoho-oauthtoken ${zohoCredential.dataValues.refreshToken}`, 
//           'Content-Type': 'application/json',
//         },
//         data: data
//       };

//       // Make the request to Zoho API
//       const response = await axios.request(config);

//       // Send the Zoho API response back to the client
//       res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true,data: response.data });
//     } catch (error) {
//       console.error(error.message);
//       res.status(statusCode.INTERNAL_SERVER_ERROR).json({  message: messages.INTERNAL_SERVER_ERROR  });
//     }
// }



// export const zohoDealerSendData = async (req, res) => {
//     try {
//         // Fetch Zoho token from the database
//         const zohoCredential = await ZohoCredential.findOne();

//         if (!zohoCredential) {
//             return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//         }

//         // Assuming that the data you want to send is in req.body
//         const data = {
//             data: [
//                 {
//                     Multi_Line_1: req.body.Multi_Line_1,   //Brands
//                     Name: req.body.Name,           //Company Name
//                     Post_Code: req.body.Post_Code,
//                     Cvr_Number: req.body.Cvr_Number,
//                     Email: req.body.Email,
//                 },
//             ],
//         };

//         // Use the middleware to send data to Zoho without awaiting the response
//         sendToZohoWithoutAwait(zohoCredential, data);

//         // Save the data to your local database
//         await ZohoDealer.create({
//             Multi_Line_1: req.body.Multi_Line_1,   //Brands
//             Name: req.body.Name,           //Company Name
//             Post_Code: req.body.Post_Code,
//             Cvr_Number: req.body.Cvr_Number,
//             Email: req.body.Email,
//         });

//         // Respond immediately to the client
//         res.status(statusCode.SUCCESS_CODE).json({ success: true, message: 'Data saved to the local database.' });
//     } catch (error) {
//         console.error(error.message);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
//     }
// }


export const zohoDealerSendData = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    // Set CreatedAt to the current date and time in local time zone
    const createdAt = Date.now();

    // Assuming that the data you want to send is in req.body
    const data = {
      data: [
        {
          Multi_Line_1: req.body.Multi_Line_1,   //Brands
          Name: req.body.Name,           //Company Name
          Post_Code: req.body.Post_Code,
          Cvr_Number: req.body.Cvr_Number,
          Email: req.body.Email,
        },
      ],
    };

    // Use the middleware to send data to Zoho and get the response
    const zohoResponse = await sendToZohoWithoutAwait(zohoCredential, data);

    // Save the data to your local database, including Zoho response details
    const savedData = await ZohoDealer.create({
      Multi_Line_1: req.body.Multi_Line_1,   //Brands
      Name: req.body.Name,           //Company Name
      Post_Code: req.body.Post_Code,
      Cvr_Number: req.body.Cvr_Number,
      Email: req.body.Email,
      zohoId: zohoResponse.data[0].details.id, // Assuming the Zoho response structure
      createdAt: createdAt, // Set the createdAt field to the current date and time
    });

    // Respond immediately to the client
    res.status(statusCode.SUCCESS_CODE).json({ success: true, message: 'Data saved to the local database.', savedData });
  } catch (error) {
    console.error(error.message);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
  }
};

// export const zohoDealerContactRequestSendData = async (req, res) => {
//     try {
//         // Fetch Zoho token from the database
//         const zohoCredential = await ZohoCredential.findOne();

//         if (!zohoCredential) {
//             return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//         }

//         // Set CreatedAt to the current date and time
//         const createdAt = new Date();

//         // Assuming that the data you want to send is in req.body
//         const dataToSendToZoho = {
//             data: [
//                 {
//                     Name: req.body.Name,
//                     Post_Code: req.body.Post_Code,
//                     Email: req.body.Email,
//                     Phone_Number: req.body.Phone_Number,
//                     Status: "new",
//                     Type: "Configured Car",
//                     CreatedAt: createdAt.toISOString(),
//                     Car_Configuration_Details: "Toyota ka full specification"
//                 },
//             ],
//         };

//         // Send data to Zoho without awaiting the response
//         sendToZohoWithoutAwaitContactRequest(zohoCredential, dataToSendToZoho);

//         // Save the data to your local MySQL database
//         await ZohoDealerContactRequest.create({
//             name: req.body.Name,
//             postCode: req.body.Post_Code,
//             email: req.body.Email,
//             phoneNumber: req.body.Phone_Number,
//             status: "new",
//             type: "Configured Car",
//             createdAt: createdAt.toISOString(),
//             Car_Configuration_Details: "Toyota ka full specification"
//         });

//         // Respond immediately to the client
//         res.status(statusCode.SUCCESS_CODE).json({ success: true, message: 'Data saved to the local database and sent to Zoho CRM.' });
//     } catch (error) {
//         console.error(error.message);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
//     }
// };


// // Function to send data to Zoho CRM without awaiting the response
// function sendToZohoWithoutAwait(zohoCredential, data) {
//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://www.zohoapis.in/crm/v2/Dealers_Requests',
//       headers: {
//         'Authorization': `Zoho-oauthtoken ${zohoCredential.dataValues.refreshToken}`,
//         'Content-Type': 'application/json',
//       },
//       data: JSON.stringify(data),
//     };

//     // Make the request to Zoho API without awaiting the response
//     axios.request(config)
//       .then((response) => {
//         // Log or handle the Zoho CRM API response if needed
//         console.log('Zoho CRM API response:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error sending data to Zoho CRM:', error.message);
//         // Implement error handling or logging here
//       });
//   }


// export const getDealerRequestFromZohoCRM = async (req, res) => {
//     try {
//         // Fetch Zoho token from the database
//         const zohoCredential = await ZohoCredential.findOne();

//         if (!zohoCredential) {
//             return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//         }

//         const config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: 'https://www.zohoapis.in/crm/v2/Dealers_Requests',
//             headers: {
//                 'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
//                 'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=552712AE8DF885CB683D201D093549AE; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
//             },
//         };

//         // Make the request to Zoho API
//         const response = await axios.request(config);

//         // Send the Zoho API response back to the client
//         res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
//     } catch (error) {
//         console.error(error);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
//     }
// }


// export const getDealerRequestFromZohoCRM = async (req, res) => {
//     try {
//         // Fetch Zoho token from the database
//         const zohoCredential = await ZohoCredential.findOne();

//         if (!zohoCredential) {
//             return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//         }

//         // Extract the search word from the query parameters
//         const searchWord = req.query.word;

//         let apiUrl = 'https://www.zohoapis.in/crm/v2/Dealers_Requests';

//         // If search word is provided, include it in the API endpoint
//         if (searchWord) {
//             apiUrl += `/search?word=${encodeURIComponent(searchWord)}`;
//         }

//         const config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: apiUrl,
//             headers: {
//                 'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
//                 'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=552712AE8DF885CB683D201D093549AE; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
//             },
//         };

//         // Make the request to Zoho API
//         const response = await axios.request(config);


//         // Send the Zoho API response back to the client
//         res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
//     } catch (error) {
//         console.error(error);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
//     }
// }


export const zohoDealerContactRequestSendData = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    // Set CreatedAt to the current date and time in local time zone
    const createdAt = Date.now();
    // const formattedDate


    // Assuming that the data you want to send is in req.body
    const dataToSendToZoho = {
      data: [
        {
          Name: req.body.Name,
          Post_Code: req.body.Post_Code,
          Email: req.body.Email,
          Phone_Number: req.body.Phone_Number,
          Status: "new",
          Type: "Configured Car",
          CreatedAt: createdAt, // Use formatted local time for display
          Car_Configuration_Details: "Toyota ka full specification"
        },
      ],
    };

    // Send data to Zoho
    const zohoResponse = await sendToZohoWithoutAwaitContactRequest(zohoCredential, dataToSendToZoho);

    // Save the data to your local MySQL database, including Zoho response details
    const savedData = await ZohoDealerContactRequest.create({
      name: req.body.Name,
      postCode: req.body.Post_Code,
      email: req.body.Email,
      phoneNumber: req.body.Phone_Number,
      status: "new",
      type: "Configured Car",
      createdAt: createdAt, // Store raw Date object in the database
      Car_Configuration_Details: "Toyota ka full specification",
      zohoId: zohoResponse.data[0].details.id, // Assuming the Zoho response structure
    });

    // Respond immediately to the client
    res.status(statusCode.SUCCESS_CODE).json({ success: true, message: 'Data saved to the local database and sent to Zoho CRM.', savedData });
  } catch (error) {
    console.error(error.message);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messages.INTERNAL_SERVER_ERROR });
  }
};


export const notificationRecord = async (req, res) => {
  try {
    // Fetch notifications from ZohoDealerContactRequest table
    const zohoContactNotifications = await ZohoDealerContactRequest.findAll({
      where: {
        read: 0,
      },
      limit: 5,
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      attributes: ['name', 'createdAt', 'type', 'zohoId'],
    });

    // Fetch notifications from ZohoDealer table
    const zohoDealerNotifications = await ZohoDealer.findAll({
      where: {
        read: 0,
      },
      limit: 5,
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      attributes: ['Multi_Line_1', 'createdAt', 'type', 'zohoId'],
    });

    // Combine results from both tables
    const combinedNotifications = [...zohoContactNotifications, ...zohoDealerNotifications];

    // Sort the combined notifications by createdAt in descending order
    const sortedNotifications = combinedNotifications.sort((a, b) => b.createdAt - a.createdAt);

    // Send the response to the client
    res.json({ data: sortedNotifications });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const allnotificationRecord = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default page is 1
    const perPage = req.query.perPage || 10; // Default records per page is 10

    // Fetch total count of unread notifications from ZohoDealerContactRequest table
    const totalContactCount = await ZohoDealerContactRequest.count({
      where: {
        read: 0,
      },
    });

    // Fetch total count of unread notifications from ZohoDealer table
    const totalDealerCount = await ZohoDealer.count({
      where: {
        read: 0,
      },
    });

    // Fetch all unread notifications from ZohoDealerContactRequest table
    const zohoContactNotifications = await ZohoDealerContactRequest.findAll({
      where: {
        read: 0,
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      attributes: ['name', 'createdAt', 'type', 'zohoId'],
    });

    // Fetch all unread notifications from ZohoDealer table
    const zohoDealerNotifications = await ZohoDealer.findAll({
      where: {
        read: 0,
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      attributes: ['Multi_Line_1', 'createdAt', 'type', 'zohoId'],
    });

    // Combine results from both tables
    const combinedNotifications = [...zohoContactNotifications, ...zohoDealerNotifications];

    // Sort the combined notifications by createdAt in descending order
    const sortedNotifications = combinedNotifications.sort((a, b) => b.createdAt - a.createdAt);

    // Calculate the total count
    const totalCount = totalContactCount + totalDealerCount;

    // Calculate the offset based on the page number and records per page
    const offset = (page - 1) * perPage;

    // Apply pagination
    const paginatedNotifications = sortedNotifications.slice(offset, offset + perPage);

    // Send the response to the client with pagination and total count information
    res.json({
      total: totalCount,
      page: page,
      perPage: perPage,
      data: paginatedNotifications,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const TotalnotificationRecord = async (req, res) => {
  try {
    // Fetch count of notifications from ZohoDealerContactRequest table where read is 0
    const contactCount = await ZohoDealerContactRequest.count({
      where: {
        read: 0,
      },
    });

    // Fetch count of notifications from ZohoDealer table where read is 0
    const dealerCount = await ZohoDealer.count({
      where: {
        read: 0,
      },
    });

    // Calculate the total count
    const totalCount = contactCount + dealerCount;

    // Send the response to the client
    res.json({ totalCount });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const changeStatusToReadandGetResponse = async (req, res) => {
  try {
    const { type, zohoId } = req.query;

    let model;
    let readStatus;
    let responseData;

    if (type === 'Dealer') {
      model = ZohoDealer;
      readStatus = await ZohoDealer.findOne({
        where: { zohoId },
        attributes: ['read'],
      });
    } else if (type === 'Configured Car') {
      model = ZohoDealerContactRequest;
      readStatus = await ZohoDealerContactRequest.findOne({
        where: { zohoId },
        attributes: ['read'],
      });
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    if (!readStatus) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Update the read status to 1
    await model.update({ read: 1 }, { where: { zohoId } });

    // Retrieve the updated data
    responseData = await model.findOne({ where: { zohoId } });

    res.json(responseData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




export const getDealerRequestFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    // Extract the search word and per_page parameter from the query parameters
    const searchWord = req.query.word;
    const perPage = req.query.per_page || 5; // Set a default value for per_page (2 in this case)
    const page = req.query.page || 1; // Set a default value for page (1 in this case)

    let apiUrl = 'https://www.zohoapis.in/crm/v2/Dealers_Requests';

    // If search word is provided, include it in the API endpoint
    if (searchWord) {
      apiUrl += `/search?word=${encodeURIComponent(searchWord)}`;
    }

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl,
      params: {
        page: page,
        per_page: perPage,
        sort_order: "desc",
        sort_by: "Created_Time"
      },
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=552712AE8DF885CB683D201D093549AE; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


export const getDealerRequestByIdFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    const dealerRequestId = req.params.id; // Assuming the route parameter is the dealer request ID

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.zohoapis.in/crm/v2/Dealers_Requests/${dealerRequestId}`,
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


//   export const getContactsFormsDrivosFromZohoCRM = async (req, res) => {
//     try {
//         // Fetch Zoho token from the database
//         const zohoCredential = await ZohoCredential.findOne();

//         if (!zohoCredential) {
//             return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//         }

//         const config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: 'https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos',
//             headers: {
//                 'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
//                 'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
//             },
//         };

//         // Make the request to Zoho API
//         const response = await axios.request(config);

//         // Send the Zoho API response back to the client
//         res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
//     } catch (error) {
//         console.error(error);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
//     }
// };





// export const getContactsFormsDrivosFromZohoCRM = async (req, res) => {
//     try {
//         // Fetch Zoho token from the database
//         const zohoCredential = await ZohoCredential.findOne();

//         if (!zohoCredential) {
//             return res.status(400).json({ error: 'Zoho credentials not found in the database' });
//         }

//         // Extract the search word from the query parameters
//         const searchWord = req.query.word;

//         let apiUrl = 'https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos';

//         // If search word is provided, include it in the API endpoint
//         if (searchWord) {
//             apiUrl += `/search?word=${encodeURIComponent(searchWord)}`;
//         }

//         const config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: apiUrl,
//             headers: {
//                 'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
//                 'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
//             },
//         };

//         // Make the request to Zoho API
//         const response = await axios.request(config);

//         // Send the Zoho API response back to the client
//         res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
//     } catch (error) {
//         console.error(error);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
//     }
// };


export const getContactsFormsDrivosFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    // Extract query parameters
    const searchWord = req.query.word;
    const perPage = req.query.per_page || 9; // Set a default value for per_page (2 in this case)
    const page = req.query.page || 1; // Set a default value for page (1 in this case)

    let apiUrl = `https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos`;

    // If search word is provided, include it in the API endpoint
    if (searchWord) {
      apiUrl += `/search?word=${encodeURIComponent(searchWord)}`;
    }

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl,
      params: {
        page: page,
        per_page: perPage,
      },
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

export const getContactsFormsDrivosByIdFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    const recordId = req.params.id; // Assuming the route parameter is the record ID

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos/${recordId}`, // Updated path
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};



export const deleteDealerRequestFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    let idArray;

    // Check if 'ids' is provided in query parameters
    if (req.query.ids) {
      if (Array.isArray(req.query.ids)) {
        // If 'ids' is an array, join them into a comma-separated string
        idArray = req.query.ids.join(',');
      } else {
        // If 'ids' is a single value, use it directly
        idArray = req.query.ids;
      }
    } else {
      return res.status(400).json({ error: 'Parameter "ids" is required for deletion' });
    }

    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'https://www.zohoapis.in/crm/v2/Dealers_Requests',
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=552712AE8DF885CB683D201D093549AE; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Add query parameters for the multiple records to delete
    config.url += `?ids=${idArray}`;

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
}


export const deleteContactsFormsDrivosFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    let idArray;

    // Check if 'ids' is provided in query parameters
    if (req.query.ids) {
      if (Array.isArray(req.query.ids)) {
        // If 'ids' is an array, join them into a comma-separated string
        idArray = req.query.ids.join(',');
      } else {
        // If 'ids' is a single value, use it directly
        idArray = req.query.ids;
      }
    } else {
      return res.status(400).json({ error: 'Parameter "ids" is required for deletion' });
    }

    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos', // Updated path
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=552712AE8DF885CB683D201D093549AE; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Add query parameters for the multiple records to delete
    config.url += `?ids=${idArray}`;

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};




export const updateDealerRequestInZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    const dealerRequestId = req.params.id; // Assuming the route parameter is the dealer request ID

    const requestData = {
      data: [req.body], // Wrapping the provided fields in an array inside the 'data' property
    };

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://www.zohoapis.in/crm/v2/Dealers_Requests/${dealerRequestId}`,
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Content-Type': 'application/json',
        // Add other headers if needed
      },
      data: requestData,
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


export const updateContactsFormsDrivosInZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    const recordId = req.params.id; // Assuming the route parameter is the record ID

    const requestData = {
      data: [req.body], // Wrapping the provided fields in an array inside the 'data' property
    };

    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos/${recordId}`, // Updated path
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Content-Type': 'application/json',
        // Add other headers if needed
      },
      data: requestData,
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

export const getCountOfContactsFormsDrivosFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    const searchWord = req.query.word;
    let apiUrl = 'https://www.zohoapis.in/crm/v2.1/Contacts_Forms_Drivos/actions/count';

    if (searchWord) {
      apiUrl += `?word=${encodeURIComponent(searchWord)}`;
    }

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl,
      // url: 'https://www.zohoapis.in/crm/v2.1/Contacts_Forms_Drivos/actions/count',
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=7ACD2C70FAAA8F4FC235F3FEDA4127E2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


export const getCountOfDealersRequestsFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    const searchWord = req.query.word;
    let apiUrl = 'https://www.zohoapis.in/crm/v2.1/Dealers_Requests/actions/count';

    if (searchWord) {
      apiUrl += `?word=${encodeURIComponent(searchWord)}`;
    }


    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl,
      // url: 'https://www.zohoapis.in/crm/v2.1/Dealers_Requests/actions/count',
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=7ACD2C70FAAA8F4FC235F3FEDA4127E2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Send the Zoho API response back to the client
    res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


export const getFAQByType = async (req, res) => {

  const ITEMS_PER_PAGE = 4;
  const requestedType = req.query.type;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const { count, rows } = await FAQ.findAndCountAll({
      where: {
        typeName: requestedType,
        is_deleted: false,
      },
      offset,
      limit: ITEMS_PER_PAGE,
      order: [['createdAt', 'DESC']]
    });

    if (count === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: `${messages.NO_FAQ_FOUND_FOR_TYPE} ${requestedType}` });
    }

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    res.status(200).json({
      faqList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }

};

export const getNewsByType = async (req, res) => {

  const ITEMS_PER_PAGE = 10;
  const requestedType = req.query.type;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const { count, rows } = await News.findAndCountAll({
      where: {
        type: requestedType,
        is_deleted: false,
      },
      offset,
      limit: ITEMS_PER_PAGE,
      order: [['createdAt', 'DESC']]
    });

    if (count === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: `${messages.NO_NEWS_FOUND} ${requestedType}` });
    }

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    res.status(statusCode.SUCCESS_CODE).json({
      success: true,
      newsList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

export const getAllFAQ = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const searchTerm = req.query.searchTerm || '';
  try {
    const { count, rows } = await FAQ.findAndCountAll({
      where: {
        is_deleted: false,
        [Op.or]: [
          { typeName: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
      order: [['createdAt', 'DESC']]
    });

    if (count === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: `${messages.NO_FAQ_FOUND_FOR_TYPE}` });
    }

    res.status(statusCode.SUCCESS_CODE).json({
      faqList: rows,
      currentPage: page,
      totalItems: count,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

export const getAllNews = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit);
  const searchTerm = req.query.searchTerm || '';
  let query = {
    where: {
      is_deleted: false,
      [Op.or]: [
        { type: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    order: [['createdAt', 'DESC']],
  };

  // ✅ only add limit if provided
  if (limit) {
    query.limit = limit;
  }

  try {
    const { count, rows } = await News.findAndCountAll(query);

    if (count === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: `${messages.NO_NEWS_FOUND} ${requestedType}` });
    }
    console.log("rows:", rows.length);
    res.status(statusCode.SUCCESS_CODE).json({
      newsList: rows,
      currentPage: page,
      totalItems: count,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


export const getLatestNewsByType = async (req, res) => {
  const { type, excludeId } = req.query;

  try {
    // Fetch the first five latest news items of the specified type, excluding the provided ID
    const { count, rows } = await News.findAndCountAll({
      where: {
        is_deleted: false,
        id: { [Op.ne]: excludeId }, // Exclude the news item with the provided ID
        type: { [Op.like]: `%${type}%` } // Match the news type
      },
      order: [['createdAt', 'DESC']],
      limit: 5 // Limit the result to the first five items
    });

    if (count === 0) {
      return res.status(statusCode.NOT_FOUND).json({ message: `${messages.NO_NEWS_FOUND} ${type}` });
    }

    res.status(statusCode.SUCCESS_CODE).json({
      newsList: rows,
      totalItems: count
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};


//Function to generate a ramdom userId

const generateNextUserID = async (body) => {
  try {
    console.log(body)

    return latestUserID;
  } catch (error) {
    throw error;
  }
};


// Assuming you have a function to fetch layouts
const fetchLayouts = async () => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();
    const response = await axios.get('https://www.zohoapis.eu/crm/v2/settings/layouts', {
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        'module': 'Contacts'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching layouts:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const saveContactData = async (req, res) => {
  let language = setLanguage(req.query);
  console.log(req.query)
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();
    const {
      formType,
      Contact_Type,
      Date_Created,
      Fornavn,
      Efternavn,
      Email,
      Mobile,
      Mailing_Zip,
      Make,
      Model,
      Version,
      Vehicle_Type,
      Base_Price,
      Base_Price_Delivered,
      Options_Price,
      Total_Price_Delivered,
      Configuration,
      vehicleId
    } = req.body;
    const stage = req.query.stage;
    console.log("req.body at saveContactDat: ", req.body)

    let layoutId;
    let availableLayouts = await fetchLayouts();
    let clientLayoutId = '';

    availableLayouts?.layouts.forEach((item) => {
      if (item.name === 'Drivo Client form') {
        clientLayoutId = item.id;
      }
    });

    if (formType !== 'client') {
      return res.status(400).json({ error: 'Invalid form type' });
    }

    const formRecord = await ClientZohoForm.findOne({
      order: [['createdAt', 'DESC']]
    });

    let latestUserID = '000000';
    if (formRecord) {
      latestUserID = (parseInt(formRecord.latestUserID, 10) + 1).toString().padStart(6, '0');
    } else {
      latestUserID = '000001';
    }

    // const formattedDate = moment(Date_Created, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // Ensure Total_Price_Delivered is equal to Base_Price if Options_Price is 0
    const finalTotalPriceDelivered = Options_Price == 0 ? Base_Price : Total_Price_Delivered;

    const contactData = {
      Contact_Type: Contact_Type,
      Last_Name: latestUserID,
      Date_Created: Date_Created,
      Fornavn: Fornavn,
      Efternavn: Efternavn,
      Email: Email,
      Mobile: Mobile,
      Mailing_Zip: Mailing_Zip,
      latestUserID: latestUserID
    };

    const apiUrl = 'https://www.zohoapis.eu/crm/v2/Contacts/search';

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl,
      params: {
        criteria: `(Email:equals:${Email})`
      },
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`, // Make sure the token is correctly fetched
        'Content-Type': 'application/json'
      },
    };
    let userInfo
    // Make the request to Zoho API
    try {
      userInfo = await axios.request(config);
      console.log("Zoho User Info:", userInfo.data.data[0].id);
    } catch (error) {
      console.error("Zoho CRM Search Error:", error.response?.data || error.message);
    }

    // console.log("userInfo from Zoho CRM:", userInfo);
    if (userInfo.data?.data && userInfo.data?.data[0]?.Email) {
      // Update existing user in the database
      await ClientZohoForm.update({
        Fornavn: Fornavn,
        Efternavn: Efternavn,
        Mobile: Mobile,
        Mailing_Zip: Mailing_Zip
      }, {
        where: { Email: Email }
      });

      // Update existing user in Zoho CRM
      const updateData = {
        // Assuming you have stored Zoho CRM ID in userInfo
        Fornavn: Fornavn,
        Efternavn: Efternavn,
        Mobile: Mobile,
        Mailing_Zip: Mailing_Zip

      };

      const updateResponse = await axios.put(`https://www.zohoapis.eu/crm/v2/Contacts/${userInfo.data.data[0]?.id}`,
        {
          data: [updateData]
        }, {
        headers: {
          'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("updateResponse", updateResponse.data.data)

      if (updateResponse) {
        createDeal(
          userInfo.Last_Name,
          updateResponse.data?.data[0]?.details?.id,
          Date_Created,
          zohoCredential,
          Make,
          Model,
          Version,
          Vehicle_Type,
          Base_Price,
          Base_Price_Delivered,
          Options_Price,
          finalTotalPriceDelivered,
          Configuration,
          vehicleId,
          stage,
          req
        );
      }

    } else {
      console.log("INSIDE ELSE", contactData)


      contactData.Contact_Type = [contactData.Contact_Type]

      axios.post('https://www.zohoapis.eu/crm/v2/Contacts', {
        data: [contactData]
      }, {
        headers: {
          'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
          'Content-Type': 'application/json'
        },
        params: {
          layout_id: clientLayoutId
        }
      }).then(async response => {
        contactData.Contact_Type = Contact_Type;
        contactData.recordId = response.data?.data[0]?.details?.id
        let myname = await ClientZohoForm.create(contactData);
        console.log("myname: ", myname)
        createDeal(
          latestUserID,
          response.data?.data[0]?.details?.id,
          Date_Created,
          zohoCredential,
          Make,
          Model,
          Version,
          Vehicle_Type,
          Base_Price,
          Base_Price_Delivered,
          Options_Price,
          finalTotalPriceDelivered,
          Configuration,
          vehicleId,
          stage,
          req
        );
      });
    }
    if (Fornavn && Efternavn && Mobile) {
      return res.status(201).json({
        message: { message: messages[language].CONTACT_AND_DEAL_CREATED_SUCCESSFULLY }
      });
    } else {
      return res.status(201).json({
        message: { message: messages[language].CONTACT_CREATED_WITH_EMAIL_ONLY }
      });
    }
  } catch (error) {
    console.error(`Error saving client contact data:`, error);
    return res.status(500).json({ error: messages[language].INTERNAL_SERVER_ERROR, details: error.message });
  }
};

export const getDealByNameFromZohoCRM = async (req, res) => {
  try {
    // Fetch Zoho token from the database
    const zohoCredential = await ZohoCredential.findOne();

    if (!zohoCredential) {
      return res.status(400).json({ error: 'Zoho credentials not found in the database' });
    }

    // Extract the Deal_Name from the query parameters
    const dealName = req.query.Deal_Name;

    if (!dealName) {
      return res.status(400).json({ error: 'Deal_Name parameter is required' });
    }

    const apiUrl = 'https://www.zohoapis.eu/crm/v2/Deals/search';

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: apiUrl,
      params: {
        criteria: `(Deal_Name:equals:${encodeURIComponent(dealName)})`
      },
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`, // Make sure the token is correctly fetched
        'Content-Type': 'application/json'
      },
    };

    // Make the request to Zoho API
    const response = await axios.request(config);

    // Check if the response contains data
    if (response.data && response.data.data && response.data.data.length > 0) {
      res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: response.data });
    } else {
      res.status(statusCode.SUCCESS_CODE).json({ isSuccess: true, data: [], message: 'No records found' });
    }
  } catch (error) {
    console.error(error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR, error: error.message });
  }
};





