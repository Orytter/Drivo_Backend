// dealService.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import ClientDealForm from '../models/clientDealForm'; // Adjust the path as needed
import config from "config";

const { frontendUrl } = config.get("frontendUrl");

console.log(frontendUrl)

 
const createDeal = async (
  latestUserID,
  contactId,
  Date_Created,
  zohoCredential,    
  Make,
  Model,
  Version,
  Vehicle_Type,
  Base_Price,
  Base_Price_Delivered,
  Options_Price,
  Total_Price_Delivered,
  Configuration,
  vehicleId,
  stage,
  req
  ) => {
  // Fetch the latest deal record
  const DealformRecord = await ClientDealForm.findOne({
    order: [['createdAt', 'DESC']]
  });
 
  // Generate a new Deal ID
  let DeallatestUserID = '000000';
  if (DealformRecord) {
    DeallatestUserID = (parseInt(DealformRecord.latestUserID, 10) + 1).toString().padStart(6, '0');
  } else {
    DeallatestUserID = '000001';
  }
 
  // Prepare deal data for local database
  console.log("latestUserID", latestUserID)
  const dealDataLocal = {
    Deal_Name: DeallatestUserID,
    JATO_vehicle_ID: vehicleId,
    Date_Created: Date_Created,
    User_ID: latestUserID,
    Stage: stage,
    URL: `http://Drivo.dk/user-configured-result?Deal_ID=${DeallatestUserID}`,
    Add_campaign: 'https://google.com',
    Make: Make,
    Model: Model,
    Version: Version,
    Product_number: 'est',
    Vehicle_Type: Vehicle_Type,
    // Base_Price: Number(Base_Price),
    Product : `${Make}+${Model}+${Version}`,
    Base_Price_Delivered: Number(Base_Price),
    Options_Price: Number(Options_Price),
    Total_Price_Delivered: Number(Total_Price_Delivered),
    Configuration: Configuration,
    latestUserID: DeallatestUserID,
    Contact_Name  : contactId
 
  };
 
  // Save the deal data locally
  await ClientDealForm.create(dealDataLocal);
 
  // Send the deal data to Zoho CRM
  const dealResponse =  await axios.post('https://www.zohoapis.eu/crm/v2/Deals', {
    data: [dealDataLocal]
  }, {
    headers: {
      'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
      'Content-Type': 'application/json'
    }
  });
 
  console.log('dealResponse he ye',dealResponse.data.data)
 
  // Check if the deal was created successfully
  if (dealResponse.data && dealResponse.data.data && dealResponse.data.data[0].status === 'success') {
    const dealId = dealResponse.data.data[0].details.id;
 
    // Handle file upload
    const filePath = path.join(__dirname, `../../${req.file.path}`);
    console.log("filePath1212",filePath)
    const fileContent = fs.createReadStream(filePath);

    // Get the file name
    const fileName = `${DeallatestUserID}_${Make}+${Model}+${Version}.pdf`;
 
    let data = new FormData();
    data.append('content', fileContent);
    data.append('filename', fileName);
    data.append('parent_id', '0mmh9c9f627058aa44b64a1da709bc95f3b5a'); // Update with actual parent_id

 
    let config = {
      url: `https://www.zohoapis.eu/workdrive/api/v1/upload`,
      method: 'post',
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoCredential.refreshToken}`,
        'Content-Type': 'multipart/form-data'
      },
      data: data,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };
 
   const pdfResult = await axios.post(config.url, data, {
      headers: config.headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }).then((fileUploadResponse) => {
      if (data) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File successfully uploaded and deleted locally.');
          }
        });
      } else {
        console.error('File upload failed:', fileUploadResponse.data);
      }
    });
 
 
    // if (fileUploadResponse.data.data[0].code === 'SUCCESS') {
    //   fs.unlink(filePath, (err) => {
    //     if (err) console.log(err);
    //   });
    // }
 
    return {
      dealData: dealResponse.data.data[0],
      // fileUploadData: fileUploadResponse.data
    };
  } else {
    console.log(console.error)
    throw new Error('Failed to create deal');
  }
};
 
module.exports = createDeal;