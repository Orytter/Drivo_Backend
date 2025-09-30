// zohoMiddleware.js
const axios = require('axios');

// Middleware function to send data to Zoho CRM without awaiting the response
const sendToZohoWithoutAwait = async (zohoCredential, data) => {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.zohoapis.in/crm/v2/Dealers_Requests',
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.dataValues.refreshToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

     // Send the request and return the response data
      const response = await axios.request(config);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling function
  }
};

module.exports = {
  sendToZohoWithoutAwait,
};