// // zohoMiddleware.js
import axios from 'axios';

// export const sendToZohoWithoutAwaitContactRequest = (zohoCredential, data) => {
//     const config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos',
//       headers: {
//         'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
//         'Content-Type': 'application/json',
//         'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
//       },
//       data: JSON.stringify(data),
//     };
  
//     // Send the request without awaiting the response
//     axios.request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

export const sendToZohoWithoutAwaitContactRequest = async (zohoCredential, data) => {
  try {
      const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://www.zohoapis.in/crm/v2/Contacts_Forms_Drivos',
          headers: {
              'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
              'Content-Type': 'application/json',
              'Cookie': '34561a6e49=11a117f0827ade7c0ecb0d48e69beb75; 941ef25d4b=00ba5752c799bdaa8d1313ffff13d1f0; JSESSIONID=3FCCA9E9AE85E1B738F487CDBA25CBE2; _zcsr_tmp=d3557ecc-bcd3-409f-aeeb-639fc168de65; crmcsr=d3557ecc-bcd3-409f-aeeb-639fc168de65',
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