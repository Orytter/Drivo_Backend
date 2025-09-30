import axios from 'axios';
import config from "config";
import ZohoCredential from "../../models/zohoCredentials.js";

import cron from "node-cron";

// console.log(config.get("smtp"))

const { refresh_token } = config.get("zoho_Credentials");

// console.log(refresh_token)

const zohoAccessTokenFunction = () => {
  const zohoConfig = {
    grant_type: 'authorization_code',
    code: '1000.5815922dddc8f2312509fc6ada17d1b4.651c397dc81a263964018c6b114fcfe1',
    client_id: '1000.EHQLBZ49XM1MADF2H1FRFMU9VCA0CQ',
    redirect_uri: 'http://www.google.com',
    client_secret: '56a172c342dc757d4b0a5a6aeef89988258861e0a4'
  };

  // Define the API endpoint and other configurations
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://accounts.zoho.eu/oauth/v2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // Adjust the content type based on your API requirements
      // Other headers if needed
    },
    params: {
      grant_type: zohoConfig.grant_type,
      code: zohoConfig.code,
      client_id: zohoConfig.client_id,
      redirect_uri: zohoConfig.redirect_uri,
      client_secret: zohoConfig.client_secret,
    },
  };

  // Make the API request
  axios.request(config)
    .then((response) => {
      // Handle the successful response
      console.log('Response:', JSON.stringify(response.data));
    })
    .catch((error) => {
      // Handle errors
      console.error('Error:', error.message);
      if (error.response) {
        // The request was made, but the server responded with a status code outside of the 2xx range
        console.error('Status Code:', error.response.status);
        console.error('Response Data:', JSON.stringify(error.response.data));
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    });
};

zohoAccessTokenFunction();



///////////////////////////////////////////////////////////////////////////////////////


const zoho_refresh_token = () =>{

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://accounts.zoho.eu/oauth/v2/token',
        headers: { 
          'Cookie': '6e73717622=94da0c17b67b4320ada519c299270f95; JSESSIONID=2A934B26DD8B26E580C17BDD8DCC4986; _zcsr_tmp=913e8544-766d-4a0f-93df-48812e2080ea; iamcsr=913e8544-766d-4a0f-93df-48812e2080ea'
        },
        params: {
          grant_type: 'refresh_token',
          refresh_token: '1000.468dafa4e12cd60b58a1dddbbabd0059.79b60a5a95a132a9a32f894188a40521',
          client_id: '1000.EHQLBZ49XM1MADF2H1FRFMU9VCA0CQ',
          client_secret: '56a172c342dc757d4b0a5a6aeef89988258861e0a4',
        },
      };
      
      axios.request(config)
      .then(async (response) => {
        console.log("ding he ye ", response.data.access_token);  /// yha a rha he access token 
        const access_token = response.data.access_token;
        // await ZohoCredential.upsert({ refreshToken: access_token });
            // Use update to update the existing record
            const updatedRowsCount = await ZohoCredential.update(
                { refreshToken: access_token },
                { where: { id: 1 } }
              );
              

      if (updatedRowsCount[0] === 0) {
        // Handle case where no rows were updated (refreshToken not found)
        console.log('No record found to update');
      } else {
        console.log('Record updated successfully');
      }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

}




// Define the cron job to run every 50 minutes
cron.schedule('*/30 * * * *', async () => {
    try {
      const refreshedAccessToken = await zoho_refresh_token();
      // Use the refreshedAccessToken in other APIs as needed
      console.log('New Access Token:', refreshedAccessToken);
    } catch (error) {
      // Handle errors if needed
      console.error('Cron Job Error:', error);
    }
  });



  const zohoCRM_AUTH_APIS = {
    zohoAccessTokenFunction,
    zoho_refresh_token
  };
  
  export default zohoCRM_AUTH_APIS;
  


