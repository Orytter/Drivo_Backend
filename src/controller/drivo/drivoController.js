import DealerContactForm from '../../models/contactRequest';
import statusCode from "../../utils/statusCode.utils";
import messages from "../../utils/message.utils";
import Contact  from '../../models/contact';
import Charts from '../../models/chart'
import Favorite from '../../models/favourites';
import { setLanguage } from "../../utils/common";
import { Op } from 'sequelize';


// const setLanguage=(query)=>
// {
// let { language } = query;
// if(!language) {
//   return '24'
// }
// return language
// }




export const createDealerContactForm = async (req, res) => {
  let language = setLanguage(req.query);
    try {
      const { dealerMail, companyName, cvrNumber, postCode, carBrands } = req.body;
  
      // Create the dealer contact form request
      await DealerContactForm.create({
        dealerMail,
        companyName,
        cvrNumber,
        postCode,
        carBrands,
      });
  
      res.status(statusCode.CREATE_SUCCESS_CODE).json({ message: messages[language].DEALER_CONTACT_FORM_SUBMIT });
    } catch (error) {
      console.error(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR });
    }
  };

//   export const getChart = async (req, res) => {
//     let language = setLanguage(req.query);
//     try {
//         const categories = [
//             {
//                 category: 'Best-selling cars in Denmark',
//                 data: [
//                     { carType: 'Sedan', carname: 'Toyota Camry', position: 1, price: 25000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Honda CR-V', position: 2, price: 30000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hatchback', carname: 'Ford Focus', position: 3, price: 20000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Truck', carname: 'Chevrolet Silverado', position: 4, price: 35000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Sedan', carname: 'Toyota Camry', position: 5, price: 25000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Honda CR-V', position: 6, price: 30000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hatchback', carname: 'Ford Focus', position: 7, price: 20000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Truck', carname: 'Chevrolet Silverado', position: 8, price: 35000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hatchback', carname: 'Ford Focus', position: 9, price: 20000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Truck', carname: 'Chevrolet Silverado', position: 10, price: 35000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' }
//                 ]
//             },
//             {
//                 category: 'Trending at Drivo',
//                 data: [
//                     { carType: 'Electric', carname: 'Tesla Model 3', position: 1, price: 50000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Ford Mustang Mach-E', position: 2, price: 45000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hybrid', carname: 'Toyota RAV4 Hybrid', position: 3, price: 32000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Volkswagen ID.4', position: 4, price: 42000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Electric', carname: 'Tesla Model 3', position: 5, price: 50000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Ford Mustang Mach-E', position: 6, price: 45000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hybrid', carname: 'Toyota RAV4 Hybrid', position: 7, price: 32000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Volkswagen ID.4', position: 8, price: 42000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hybrid', carname: 'Toyota RAV4 Hybrid', position: 9, price: 32000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Volkswagen ID.4', position: 10, price: 42000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' }
//                 ]
//             },
//             {
//                 category: 'News in Denmark',
//                 data: [
//                     { carType: 'Luxury', carname: 'Mercedes-Benz S-Class', position: 1, price: 85000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Convertible', carname: 'Mazda MX-5', position: 2, price: 28000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Sports', carname: 'Chevrolet Corvette', position: 3, price: 65000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Honda Civic', position: 4, price: 22000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Luxury', carname: 'Mercedes-Benz S-Class', position: 5, price: 85000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Convertible', carname: 'Mazda MX-5', position: 6, price: 28000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Sports', carname: 'Chevrolet Corvette', position: 7, price: 65000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Honda Civic', position: 8, price: 22000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Sports', carname: 'Chevrolet Corvette', position: 9, price: 65000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Honda Civic', position: 10, price: 22000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' }
//                 ]
//             },
//             {
//                 category: 'Biggest savings',
//                 data: [
//                     { carType: 'Compact', carname: 'Kia Forte', position: 1, price: 18000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Sedan', carname: 'Nissan Sentra', position: 2, price: 20000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hatchback', carname: 'Hyundai Veloster', position: 3, price: 19000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Mitsubishi Outlander', position: 4, price: 25000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Compact', carname: 'Kia Forte', position: 5, price: 18000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Sedan', carname: 'Nissan Sentra', position: 6, price: 20000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier/9368/1697532960290/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hatchback', carname: 'Hyundai Veloster', position: 7, price: 19000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Mitsubishi Outlander', position: 8, price: 25000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'Hatchback', carname: 'Hyundai Veloster', position: 9, price: 19000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tiago/10657/1690023230928/front-left-side-47.jpg?tr=w-664' },
//                     { carType: 'SUV', carname: 'Mitsubishi Outlander', position: 10, price: 25000, imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664' }
//                 ]
//             }
//         ];

//         res.status(statusCode.SUCCESS_CODE).json(categories);
//     } catch (error) {
//         console.error(error);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR });
//     }
// };

export const getAllContactsFrontend = async (req, res) => {
  let language = setLanguage(req.query);
    try {
      const contacts = await Contact.findAll({
        where: {
          is_deleted: false,
        },
      });
      res.status(statusCode.SUCCESS_CODE).json({ success: true, data: contacts });
    } catch (error) {
      console.error(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR });
    }
  };


  // export const getAllCharts = async (req, res) => {
  //   let language = setLanguage(req.query);
  //   // const ITEMS_PER_PAGE = 10;
  //   const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  //   const searchTerm = req.query.searchTerm || '';
  
  //   try {
  //     // const offset = (page - 1) * ITEMS_PER_PAGE;
  
  //     const { count, rows } = await Charts.findAndCountAll({
  //       where: {
  //         is_deleted: false,
  //         [Op.or]: [
  //           { type: { [Op.like]: `%${searchTerm}%` } },
  //         ],
  //       },
  //       // offset,
  //       // limit: ITEMS_PER_PAGE,
  //     });
  
  //     if (count === 0) {
  //       return res.status(statusCode.NOT_FOUND).json({ message: `${messages[language].NO_CHARTS_FOUND}` });
  //     }
  
  //     // const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  
  //     res.status(statusCode.SUCCESS_CODE).json({
  //       success: true,
  //       chartsList: rows,
  //       // totalPages,
  //       currentPage: page,
  //       // itemsPerPage: ITEMS_PER_PAGE,
  //       totalItems: count,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR });
  //   }
  // };


  // for homepage 
  export const getAllCharts = async (req, res) => {
    const language = setLanguage(req.query);
    const chartNames = req.query.chartNames || '';
    console.log('Received chartNames:', chartNames); // Debug log
    
    const namesArray = chartNames.split(',').map((name) => name.trim());
    console.log('Parsed namesArray:', namesArray); // Debug log
    
    if (namesArray.length === 0) {
      return res.status(statusCode.ERROR_CODE).json({
        success: false,
        message: messages[language].NO_CHARTS_NAME_PROVIDED,
      });
    }
  
    try {
      const { count, rows } = await Charts.findAndCountAll({
        where: {
          is_deleted: false,
          type: {
            [Op.in]: namesArray, // Ensure proper match
          },
        },
      });
  
      console.log('Retrieved rows:', rows); // Debug log
  
      if (count === 0) {
        return res.status(statusCode.NOT_FOUND).json({
          success: false,
          message: `${messages[language].NO_CHARTS_FOUND}`,
        });
      }
  
      return res.status(statusCode.SUCCESS_CODE).json({
        success: true,
        chartsList: rows,
        totalItems: count,
      });
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: messages[language].INTERNAL_SERVER_ERROR,
      });
    }
  };
  

  export const getAllChartsByType = async (req, res) => {
    let language = setLanguage(req.query);
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const filterType = req.query.type
  
    try {
      const whereClause = {
        is_deleted: false,
        type: filterType,
      };
  
      const { count, rows } = await Charts.findAndCountAll({
        where: whereClause,
        order: [['type', 'asc']], // Order by 'type' in ascending order
      });
  
      if (count === 0) {
        return res.status(statusCode.NOT_FOUND).json({ message: `${messages[language].NO_CHARTS_FOUND}` });
      }
  
      res.status(statusCode.SUCCESS_CODE).json({
        success: true,
        chartsList: rows,
        currentPage: page,
        totalItems: count,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages[language].INTERNAL_SERVER_ERROR });
    }
  };
  


  export const getAllFavorites = async (req, res) => {
    let language = setLanguage(req.query);
    try {
      const favorites = await Favorite.findAll({
        where: {
          is_deleted: false,
        },
        order: [['createdAt', 'DESC']], // Order by createdAt in descending order
        limit: 5, // Limit the results to 5
      });
  
      if (favorites.length === 0) {
        return res.status(statusCode.NOT_FOUND).json({ success: false, message: messages[language].NO_FAVORITES_FOUND });
      }
  
      res.status(statusCode.SUCCESS_CODE).json({ success: true, favorites });
    } catch (error) {
      console.error(error);
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messages[language].INTERNAL_SERVER_ERROR });
    }
  };








