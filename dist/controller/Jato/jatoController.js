"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveSelectedVersionsInCharts = exports.saveFavorite = exports.getPresentPageData = exports.getOptionBuildRules = exports.getCarOptions = exports.getCarModelInfo = exports.getCarModelBasedOnBrand = exports.getCarMinMaxPrice = exports.getCarFuelTypes = exports.getCarColorwithPrice = exports.getCarBrandsInfo = exports.getCarBodyType = exports.getCarAllTrimLevels = exports.filterCars = void 0;
var _database = require("../../db/database");
var _chart = _interopRequireDefault(require("../../models/chart"));
var _favourites = _interopRequireDefault(require("../../models/favourites"));
var _message = _interopRequireDefault(require("../../utils/message.utils"));
var _common = require("../../utils/common");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// const setLanguage=(query)=>
// {
// let { language } = query;
// if(!language) {
//   return '24'
// }
// return language
// }

// export const filterCars = async (req, res) => {
//   try {
//     const filters = req.body;

//     console.log("Payload==>", filters);

//     // Build the base query
//     let query = `SELECT  COUNT(*) OVER () AS total_rows, `;

//     if (filters.brand) {
//       query += `A.data_value AS brand,`;
//     }

//     // CONDTION TO GET FIELDS BASED ON PAYPLOAD OBJECT
//     if (filters?.model?.field) {
//       query += `B.data_value AS model, `;
//     }

//     if (filters?.price?.field) {
//       query += `C.data_value AS basePrice, `;
//     }

//     if (filters?.bodyType?.field) {
//       query += `D.data_value AS bodyType, `;
//     }

//     if (filters?.fuelType?.field) {
//       query += `E.data_value AS fuelType, `;
//     }

//     if (filters?.transmissionType?.field) {
//       query += `F.data_value AS transmissionType, `;
//     }

//     if (filters?.carRange?.field) {
//       query += `G.data_value AS carRange, `;
//     }

//     // if (filters?.hybridType?.field) {
//     //   query += `H.data_value AS hybridType, `;
//     // }

//     query += `A.vehicle_id FROM equipment as A `;

//     // CONDTION TO JOIN TABLE BASED ON PAYPLOAD OBJECT
//     if (filters?.model?.field) {
//       query += `INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = 129 `;
//     }

//     if (filters?.price?.field) {
//       query += `INNER JOIN equipment as C ON A.vehicle_id = C.vehicle_id AND C.schema_id = 902 `;
//     }

//     if (filters?.bodyType?.field) {
//       query += `INNER JOIN equipment as D ON A.vehicle_id = D.vehicle_id AND D.schema_id = 606 `;
//     }

//     if (filters?.fuelType?.field) {
//       query += `INNER JOIN equipment as E ON A.vehicle_id = E.vehicle_id AND E.schema_id = 8702 `;
//     }

//     if (filters?.transmissionType?.field) {
//       query += `INNER JOIN equipment as F ON A.vehicle_id = F.vehicle_id AND F.schema_id = 20602 `;
//     }

//     if (filters?.carRange?.field) {
//       query += `INNER JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
//     }

//     // if (filters?.hybridType?.field) {
//     //   query += `INNER JOIN equipment as H ON A.vehicle_id = H.vehicle_id AND H.schema_id = 62903 `;
//     // }

//     // WHERE CONDTION BASED ON PAYPLOAD OBJECT
//     query += ` WHERE A.schema_id = 128 `;

//     // Check and add conditions for each filter parameter
//     // if (filters.maker) {
//     //   query += `A.data_value = ? AND `;
//     //   values.push(filters.maker);
//     // }

//     if (filters?.brand?.value && filters?.brand?.field) {
//       query += `AND A.data_value = '${filters.brand.value}' `;
//     }

//     if (filters?.model?.value && filters?.model?.field) {
//       query += `AND B.data_value = '${filters.model.value}' `;
//     }

//     if (filters?.price?.max && filters?.price?.min && filters?.price?.field) {
//       query += `AND C.data_value >= ${filters.price.min} AND C.data_value <= ${filters.price.max} `;
//     }

//     if (filters?.bodyType?.value && filters?.bodyType?.field) {
//       query += `AND D.data_value = '${filters.bodyType.value}' `;
//     }

//     if (filters?.fuelType?.value && filters?.fuelType?.value.length  && filters?.fuelType?.field) {
//       // Create a comma-separated string of values for the IN clause
//       const inClause = filters.fuelType.value
//         .map((value) => `'${value}'`)
//         .join(",");
//       query += `AND E.data_value IN (${inClause}) `;
//     }

//     if (filters?.transmissionType?.value && filters?.transmissionType?.field) {
//       query += `AND F.data_value = '${filters.transmissionType.value}' `;
//     }

//     if (filters?.carRange?.value && filters?.carRange?.field) {
//       query += `AND G.data_value >= ${filters.carRange.value} `;
//     }

//     console.log("FinalQuery==>", query);

//     const result = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     const total = result?.length ? result[0]?.total_rows : 0;
//     res.status(200).json({ status: true, total, data: result, query });
//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };

// export const filterCars = async (req, res) => {
//   try {
//     const filters = req.body;

//     console.log("Payload==>", filters);

//     // Build the base query
//     let query = `SELECT  COUNT(*) OVER () AS total_rows, `;

//     // if (filters.brand) {
//     query += `A.data_value AS brand,`;
//     // }

//     // CONDTION TO GET FIELDS BASED ON PAYPLOAD OBJECT
//     // if (filters?.model?.field) {
//     query += `B.data_value AS model, `;
//     // }

//     // if (filters?.price?.field) {
//     query += `MIN(CAST(C.data_value AS DECIMAL(10, 2))) AS min, `;
//     // }

//     if (filters?.bodyType?.field) {
//       query += `D.data_value AS bodyType, `;
//     }

//     if (
//       filters?.fuelType?.field &&
//       (filters?.fuelType?.value.includes("D") ||
//         filters?.fuelType?.value.includes("P"))
//     ) {
//       query += `E.data_value AS fuelType, `;
//     }

//     if (
//       filters?.fuelType?.field &&
//       (filters?.fuelType?.value.includes("H") ||
//         filters?.fuelType?.value.includes("E"))
//     ) {
//       query += `he.data_value AS hybridElectric, `;
//     }

//     if (filters?.transmissionType?.field) {
//       query += `F.data_value AS transmissionType, `;
//     }

//     if (filters?.carRange?.field) {
//       query += `G.data_value AS carRange, `;
//     }

//     if (filters?.hybridType?.field) {
//       query += `he.data_value AS hybridType, `;
//     }

//     query += `A.vehicle_id FROM equipment as A `;

//     // CONDTION TO JOIN TABLE BASED ON PAYPLOAD OBJECT
//     // if (filters?.model?.field) {
//     query += `INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = 129 `;
//     // }

//     // if (filters?.price?.field) {
//     query += `INNER JOIN equipment as C ON A.vehicle_id = C.vehicle_id AND C.schema_id = 902 `;
//     // }

//     if (filters?.bodyType?.field) {
//       query += `INNER JOIN equipment as D ON A.vehicle_id = D.vehicle_id AND D.schema_id = 606 `;
//     }

//     // filters for body type
//     if (
//       filters?.fuelType?.field &&
//       (filters?.fuelType?.value.includes("D") ||
//         filters?.fuelType?.value.includes("P"))
//     ) {
//       query += `INNER JOIN equipment as E ON A.vehicle_id = E.vehicle_id AND E.schema_id = 8702 `;
//     }

//     if (
//       filters?.fuelType?.field &&
//       (filters?.fuelType?.value.includes("H") ||
//         filters?.fuelType?.value.includes("E"))
//     ) {
//       query += `INNER JOIN equipment as he ON A.vehicle_id = he.vehicle_id AND he.schema_id = 48602 `;
//     }

//     // filters for transmission type
//     if (filters?.transmissionType?.field) {
//       query += `INNER JOIN equipment as F ON A.vehicle_id = F.vehicle_id AND F.schema_id = 20602 `;
//     }

//     if (filters?.carRange?.field) {
//       if(filters?.fuelType?.value.includes("P") || filters?.fuelType?.value.includes("D")||filters?.fuelType?.value.includes("H")){
//         query += `LEFT JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
//       }else{
//         query += `INNER JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
//       }

//     }

//     // if (filters?.hybridType?.field) {
//     //   query += `INNER JOIN equipment as H ON A.vehicle_id = H.vehicle_id AND H.schema_id = 62903 `;
//     // }

//     // WHERE CONDTION BASED ON PAYPLOAD OBJECT
//     query += ` WHERE A.schema_id = 128 `;

//     if (filters?.brand?.value?.length && filters?.brand?.field ) {
//       const inClause = filters?.brand?.value.map((value) => `'${value}'`).join(",");

//       query += `AND A.data_value IN (${inClause}) `;

//     }

//     if (filters?.model?.value && filters?.model?.field) {
//       query += `AND B.data_value = '${filters.model.value}' `;
//     }

//     if (filters?.price?.field && (filters?.price?.min || filters?.price?.max)) {
//       if (filters?.price?.min && filters?.price?.max)
//         query += `AND C.data_value >= ${filters.price.min} AND C.data_value <= ${filters.price.max} `;
//       else if (filters?.price?.max)
//         query += `AND C.data_value <= ${filters.price.max} `;
//       else query += `AND C.data_value >= ${filters.price.min} `;
//     }

//     if (filters?.bodyType?.value?.length && filters?.bodyType?.field) {
//       const inClause = filters.bodyType.value
//         .map((value) => `'${value}'`)
//         .join(",");
//       query += `AND D.data_value IN (${inClause}) `;
//       // query += `AND D.data_value = '${filters.bodyType.value}' `;
//     }

//     if (
//       filters?.fuelType?.value &&
//       filters?.fuelType?.value.length &&
//       filters?.fuelType?.field &&
//       (filters?.fuelType?.value.includes("D") ||
//         filters?.fuelType?.value.includes("P"))
//     ) {
//       // const petrol = ("F", "L", "P", "U");
//       // const diesel = ("2", "B", "D");
//       // const both = ("F", "L", "P", "U", "2", "B", "D");

//       const selectedFuelTypes = filters?.fuelType?.value || [];
//       let type = [];
//       if (selectedFuelTypes.includes("D") && selectedFuelTypes.includes("P")) {
//         type.push("F", "L", "P", "U", "2", "B", "D");
//       } else if (selectedFuelTypes.includes("P")) {
//         type.push("F", "L", "P", "U");
//       } else {
//         type.push("2", "B", "D");
//       }

//       if (selectedFuelTypes.includes("E")) {
//         type.push("E");
//       }

//       const inClause = type.map((value) => `'${value}'`).join(",");

//       query += `AND E.data_value IN (${inClause}) `;
//     }

//     // Filter for  electic and hybrid types
//     if (
//       filters?.fuelType?.field &&
//       (filters?.fuelType?.value.includes("H") ||
//         filters?.fuelType?.value.includes("E"))
//     ) {
//       // const FullHybrid = "H";
//       // const PluginHybrid = "P";
//       // const Electric = "E";
//       // const Hybrids = ("E", "F", "H", "M", "O", "P", "R");

//       if (
//         filters?.fuelType?.value.includes("H") &&
//         filters?.fuelType?.value.includes("E")
//       ) {
//         let type = [];
//         if (
//           filters?.hybridType.value.includes("PH") &&
//           filters?.hybridType.value.includes("FH")
//         ) {
//           type.push("H", "P");
//         } else if (filters?.hybridType.value.includes("PH")) {
//           type.push("P");
//         } else if (filters?.hybridType.value.includes("FH")) {
//           type.push("H");
//         } else {
//           type.push("H", "M", "P");
//         }

//         if (filters?.fuelType.value.includes("E")) {
//           type.push("E","R","F");
//         }

//         if (filters?.fuelType.value.includes("P") ||filters?.fuelType.value.includes("D")) {
//           type.push("C");
//         }

//         const inClause = type.map((value) => `'${value}'`).join(",");

//         query += `AND he.data_value IN (${inClause}) `;
//       } else if (filters?.fuelType?.value.includes("E")) {
//         query += `AND he.data_value ='E' `;
//       } else if (filters?.fuelType?.value.includes("H")) {
//         let type = [];
//         if (
//           filters?.hybridType.value.includes("PH") &&
//           filters?.hybridType.value.includes("FH")
//         ) {
//           type.push("P", "H");
//         } else if (filters?.hybridType.value.includes("PH")) {
//           type.push("P");
//         } else if (filters?.hybridType.value.includes("FH")) {
//           type.push("H");
//         } else {
//           type.push( "H", "M", "P");
//         }
//         if (filters?.fuelType.value.includes("E")) {
//           type.push("E","R","F");
//         }
//          if (filters?.fuelType.value.includes("P") ||filters?.fuelType.value.includes("D")) {
//           type.push("C");
//         }
//         const inClause = type.map((value) => `'${value}'`).join(",");

//         query += `AND he.data_value IN (${inClause}) `;
//       }
//     }

//     if (filters?.transmissionType?.value?.length && filters?.transmissionType?.field) {
//       // query += `AND F.data_value = '${filters.transmissionType.value}' `;
//       const inClause = filters.transmissionType.value
//         .map((value) => `'${value}'`)
//         .join(",");
//       query += `AND F.data_value IN (${inClause}) `;
//     }

//     if (filters?.carRange?.value && filters?.carRange?.field) {
//       query += `AND G.data_value >= ${filters.carRange.value} `;
//     }

//     query += ` group by B.data_value,D.data_value`;
//     // console.log("FinalQuery==>", query);

//     const result = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     const total = result?.length ? result[0]?.total_rows : 0;
//     res.status(200).json({ status: true, total, data: result, query });
//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };

// export const filterCars = async (req, res) => {
//   try {
//     const filters = req.body;
//     const offset = req.query?.offset ? req.query?.offset : 0;
//     const limit = req.query?.limit ? req.query?.limit : 10;

//     //   console.log("Payload==>", req.query);
//     //  return res.status(200).json({query:req.query})

//     // Build the base query
//     let query = `SELECT  COUNT(*) OVER () AS total_rows, `;

//     // if (filters.brand) {
//     query += `A.data_value AS brand,`;
//     // }

//     // CONDTION TO GET FIELDS BASED ON PAYPLOAD OBJECT
//     // if (filters?.model?.field) {
//     query += `B.data_value AS model, `;
//     // }

//     // if (filters?.price?.field) {
//     query += `MIN(CAST(C.data_value AS DECIMAL(10, 2))) AS min, `;
//     // }

//     query += `D.data_value AS bodyType, `;

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))
//     ) {
//       query += `E.data_value AS fuelType, `;
//     }

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
//     ) {
//       query += `he.data_value AS hybridElectric, `;
//     }

//     if (filters?.transmissionType) {
//       query += `F.data_value AS transmissionType, `;
//     }

//     if (filters?.carRange) {
//       query += `G.data_value AS carRange, `;
//     }

//     if (filters?.hybridType) {
//       query += `he.data_value AS hybridType, `;
//     }

//     query += `A.vehicle_id FROM equipment as A `;

//     // CONDTION TO JOIN TABLE BASED ON PAYPLOAD OBJECT
//     // if (filters?.model?.field) {
//     query += `INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = 129 `;
//     // }

//     // if (filters?.price?.field) {
//     query += `INNER JOIN equipment as C ON A.vehicle_id = C.vehicle_id AND C.schema_id = 902 `;
//     // }

//     query += `INNER JOIN equipment as D ON A.vehicle_id = D.vehicle_id AND D.schema_id = 606 `;

//     // filters for body type
//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))
//     ) {
//       query += `INNER JOIN equipment as E ON A.vehicle_id = E.vehicle_id AND E.schema_id = 8702 `;
//     }

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
//     ) {
//       query += `INNER JOIN equipment as he ON A.vehicle_id = he.vehicle_id AND he.schema_id = 48602 `;
//     }

//     // filters for transmission type
//     if (filters?.transmissionType) {
//       query += `INNER JOIN equipment as F ON A.vehicle_id = F.vehicle_id AND F.schema_id = 20602 `;
//     }

//     if (filters?.carRange) {
//       if (
//         filters?.fuelType?.includes("P") ||
//         filters?.fuelType?.includes("D") ||
//         filters?.fuelType?.includes("H")
//       ) {
//         query += `LEFT JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
//       } else {
//         query += `INNER JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
//       }
//     }

//     // WHERE CONDTION BASED ON PAYPLOAD OBJECT
//     query += ` WHERE A.schema_id = 128 `;

//     if (filters?.brand?.length) {
//       const inClause = filters?.brand?.map((value) => `'${value}'`).join(",");

//       query += `AND A.data_value IN (${inClause}) `;
//     }

//     if (filters?.model) {
//       query += `AND B.data_value = '${filters.model}' `;
//     }

//     if (filters?.price?.min || filters?.price?.max) {
//       if (filters?.price?.min && filters?.price?.max)
//         query += `AND C.data_value >= ${filters.price.min} AND C.data_value <= ${filters.price.max} `;
//       else if (filters?.price?.max)
//         query += `AND C.data_value <= ${filters.price.max} `;
//       else query += `AND C.data_value >= ${filters.price.min} `;
//     }

//     if (filters?.bodyType?.length) {
//       if(filters.bodyType.includes('Others')){

//       }else{
//         const inClause = filters.bodyType.map((value) => `'${value}'`).join(",");
//         query += `AND D.data_value IN (${inClause}) `;
//       }

//       // query += `AND D.data_value = '${filters.bodyType.value}' `;
//     }

//     if (
//       filters?.fuelType &&
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("D") ||
//         filters?.fuelType?.includes("P"))
//     ) {

//       const selectedFuelTypes = filters?.fuelType || [];
//       let type = [];
//       if (selectedFuelTypes.includes("D") && selectedFuelTypes.includes("P")) {
//         type.push("F", "L", "P", "U", "2", "B", "D");
//       } else if (selectedFuelTypes.includes("P")) {
//         type.push("F", "L", "P", "U");
//       } else {
//         type.push("2", "B", "D");
//       }

//       if (selectedFuelTypes.includes("E")) {
//         type.push("E");
//       }

//       const inClause = type.map((value) => `'${value}'`).join(",");

//       query += `AND E.data_value IN (${inClause}) `;
//     }

//     // Filter for  electic and hybrid types
//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
//     ) {

//       if (
//         filters?.fuelType?.includes("H") &&
//         filters?.fuelType?.includes("E")
//       ) {
//         let type = [];
//         if (
//           filters?.hybridType?.includes("PH") &&
//           filters?.hybridType?.includes("FH")
//         ) {
//           type.push("H", "P");
//         } else if (filters?.hybridType?.includes("PH")) {
//           type.push("P");
//         } else if (filters?.hybridType?.includes("FH")) {
//           type.push("H");
//         } else {
//           type.push("H", "M", "P");
//         }

//         if (filters?.fuelType?.includes("E")) {
//           type.push("E", "R", "F");
//         }

//         if (
//           filters?.fuelType?.includes("P") ||
//           filters?.fuelType?.includes("D")
//         ) {
//           type.push("C");
//         }

//         const inClause = type.map((value) => `'${value}'`).join(",");

//         query += `AND he.data_value IN (${inClause}) `;

//       } else if (filters?.fuelType?.includes("E")) {
//         query += `AND he.data_value ='E' `;
//       } else if (filters?.fuelType?.includes("H")) {
//         let type = [];
//         if (
//           filters?.hybridType?.includes("PH") &&
//           filters?.hybridType?.includes("FH")
//         ) {
//           type.push("P", "H");
//         } else if (filters?.hybridType?.includes("PH")) {
//           type.push("P");
//         } else if (filters?.hybridType?.includes("FH")) {
//           type.push("H");
//         } else {
//           type.push("H", "M", "P");
//         }
//         if (filters?.fuelType?.includes("E")) {
//           type.push("E", "R", "F");
//         }
//         if (
//           filters?.fuelType?.includes("P") ||
//           filters?.fuelType?.includes("D")
//         ) {
//           type.push("C");
//         }
//         const inClause = type.map((value) => `'${value}'`).join(",");

//         query += `AND he.data_value IN (${inClause}) `;
//       }

//     }

//     if (filters?.transmissionType?.length) {
//       // query += `AND F.data_value = '${filters.transmissionType.value}' `;
//       const inClause = filters.transmissionType
//         .map((value) => `'${value}'`)
//         .join(",");
//       query += `AND F.data_value IN (${inClause}) `;
//     }

//     if (filters?.carRange) {
//       query += `AND G.data_value >= ${filters.carRange} `;
//     }

//     query += ` group by B.data_value,D.data_value`;
//     // console.log("FinalQuery==>", query);

//     const result = await sequelize.query(
//       query + ` LIMIT ${limit} OFFSET ${offset}`,
//       {
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );

//     // Fetch the total count separately
//     const totalResult = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     const total = result?.length ? totalResult[0]?.total_rows : 0;
//     // const total = result?.length ? result[0]?.total_rows : 0;
//     res.status(200).json({ status: true, total, data: result, query });
//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };

// export const filterCars = async (req, res) => {
//   try {
//     const filters = req.body;
//     const limit = req.query?.limit || 12;
//     const page = req.query?.page || 1;
//     const offset = (page - 1) * limit;    
//     const sort = req.query?.sort || 1;

//     // conditions for top speed, horse power, mileage, driving wheel, trailterhitch
//     const addEquipmentCondition = (schemaId, dataValue, field) => {
//       if (dataValue && (dataValue.min || dataValue.max)) {
//         query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId} `;
//         if (dataValue.min) query += `AND data_value >= ${dataValue.min} `;
//         if (dataValue.max) query += `AND  data_value <= ${dataValue.max} `;
//         query += `)`;
//       } else {

//         if (schemaId == 6502 && dataValue) {
//           query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
//           if (filters?.drivingWheel)
//             query += `and data_value = '${dataValue}' `;
//           query += `)`;
//         }  

//         // if (schemaId == 1604 && dataValue?.length) {
//         //   query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;

//         //   if (dataValue?.includes("E","R","F")) {
//         //       query += ` AND data_value IN ('E', 'R', 'F')`;
//         //   } else if (dataValue?.includes("E")) {
//         //       query += ` AND data_value IN ('E')`;
//         //   } else if (dataValue?.includes("R")) {
//         //       query += ` AND data_value IN ('R')`;
//         //   } else if (dataValue?.includes("F")) {
//         //     query +=   ` AND data_value IN ('F')`;
//         //   }

//         //   query += `)`;
//         // }

//         if( schemaId == 22807  && dataValue) {
//           query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
//           if (dataValue=="Y")   query += `and data_value = '${dataValue}' `;
//           else query += `and data_value != 'Y' `;

//           query += `)`;
//         }

//         if( schemaId == 9003  && dataValue) {
//           query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
//           if (dataValue=="Y")   query += `and data_value = '${dataValue}' `;
//           else query += `and data_value != 'Y' `;

//           query += `)`;
//         }

//         if( schemaId == 4101  && dataValue) {
//           query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
//           if (dataValue=="Y")   query += `and data_value = 'S' `;
//           else query += `and data_value != 'S' `;

//           query += `)`;
//         }

//         if (schemaId == 17402 && dataValue?.length) {
//         query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}`;

//         if (dataValue.includes("L") && dataValue.includes("S")) {
//         query += ` AND data_value IN ('L', 'P', 'Y', 'S', 'A')`;
//         } else {
//         if (dataValue.includes("L")) {
//             query += ` AND data_value IN ('L', 'P', 'Y')`;
//         }
//         if (dataValue.includes("S")) {
//             query += ` AND data_value IN ('S', 'A')`;
//         }
//         }

//        query += `)`;
//         }

//       //   if(schemaId == 702 && dataValue && (dataValue.min || dataValue.max)) {
//       //     query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId} AND option_id = 0 `;         
//       //     if (dataValue.min) query += `AND data_value >= ${dataValue.min} `;
//       //     if (dataValue.max) query += `AND  data_value <= ${dataValue.max} `;
//       //     query += `)`;   
//       //  }

//       if (schemaId == 35601 && dataValue) {
//         query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}`;
//         if (dataValue === "Y") {
//             query += ` AND data_value IN ('S')`;
//         }
//         query += `)`;
//     }

//     if (schemaId == 21009 && dataValue) {
//       query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
//       if (dataValue == "A") query += `and data_value = 'A' `;
//       else if (dataValue == "S") query += `and data_value = 'S' `;
//       else if (dataValue == "M") query += `and data_value = '-' `;
//       query += `)`;
//     }

//     if (schemaId == 23502 && dataValue) {
//       const years = parseInt(dataValue); // Convert dataValue to integer for years
//       const months = years * 12; // Convert years to months

//       query += ` AND A.vehicle_id IN (
//         SELECT vehicle_id
//         FROM equipment
//         WHERE schema_id=${schemaId}
//         AND CAST(data_value AS SIGNED) >= ${months}
//       )`;
//     }

//     if (schemaId == 44001 && dataValue) {
//       query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId} AND data_value IN ('B', 'O', 'P', 'S')`;
//       query += `)`;
//      }

//      if (schemaId == 4503 && dataValue) {
//       query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
//       if (dataValue == "AS") query += `and data_value = 'Y' `;
//       if (dataValue == "S") query += `and data_value   = '-' `;
//       query += `)`;
//     }

//     if (schemaId == 60302 && dataValue) {
//       const level = parseInt(dataValue); // Convert dataValue to integer for levels

//       // Define the data_value corresponding to each level
//       const levelDataValues = {
//         0: 'S',
//         1: 'S',
//         2: 'F',
//         3: 3,
//         4: 4,
//         5: 5,
//       };

//       // Build the condition to fetch results for the given level and all levels above
//       const condition = Array.from({ length: 6 - level }, (_, i) => `data_value = '${levelDataValues[level + i]}'`).join(' OR ');

//       if (condition) {
//         query += ` AND A.vehicle_id IN (
//           SELECT vehicle_id
//           FROM equipment
//           WHERE schema_id = ${schemaId}
//           AND (${condition})
//         )`;
//       }
//     }

//       }
//     };

//     const addInClause = (field, values) => {
//       if (values?.length) {
//         const inClause = values.map((value) => `'${value}'`).join(",");
//         query += `AND ${field} IN (${inClause}) `;
//       }
//     };

//     let query = `SELECT COUNT(*) OVER () AS total_rows, A.data_value AS brand, B.data_value AS model,
//       MIN(CAST(C.data_value AS DECIMAL(10, 2))) AS min, D.data_value AS bodyType,`;

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))
//     ) {
//       query += `E.data_value AS fuelType, `;
//     }

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
//     ) {
//       query += `he.data_value AS hybridElectric, `;
//     }

//     if (filters?.transmissionType?.length) {
//       query += `F.data_value AS transmissionType, `;
//     }

//     if (filters?.carRange) {
//       query += `G.data_value AS carRange, `;
//     }

//     if (filters?.hybridType?.length) {
//       query += `he.data_value AS hybridType, `;
//     }

//     query += `A.vehicle_id FROM equipment as A
//       INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = 129
//       INNER JOIN equipment as C ON A.vehicle_id = C.vehicle_id AND C.schema_id = 902
//       INNER JOIN equipment as D ON A.vehicle_id = D.vehicle_id AND D.schema_id = 606 `;

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))
//     ) {
//       query += `INNER JOIN equipment as E ON A.vehicle_id = E.vehicle_id AND E.schema_id = 8702 `;
//     }

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
//     ) {
//       query += `INNER JOIN equipment as he ON A.vehicle_id = he.vehicle_id AND he.schema_id = 48602 `;
//     }

//     if (filters?.transmissionType?.length) {
//       query += `INNER JOIN equipment as F ON A.vehicle_id = F.vehicle_id AND F.schema_id = 20602 `;
//     }

//     if (filters?.carRange) {
//       query +=
//         filters?.fuelType?.includes("P") ||
//         filters?.fuelType?.includes("D") ||
//         filters?.fuelType?.includes("H")
//           ? `LEFT JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `
//           : `INNER JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
//     }

//     query += `WHERE A.schema_id = 128 `;

//     addInClause("A.data_value", filters?.brand);
//     addInClause("B.data_value", filters?.model);

//     if (filters?.price?.min || filters?.price?.max) {
//       console.log("firstprice")
//       if (filters?.price?.min && filters?.price?.max) {
//         query += `AND C.data_value >= ${filters?.price?.min} AND C.data_value <= ${filters.price.max} `;
//       } else if (filters?.price?.max) {
//         query += `AND C.data_value <= ${filters?.price?.max} `;
//       } else {
//         query += `AND C.data_value >= ${filters?.price?.min} `;
//       }
//     }

//     addInClause("D.data_value", filters?.bodyType);

//     if (
//       filters?.fuelType &&
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))
//     ) {
//       const selectedFuelTypes = filters?.fuelType || [];
//       let type = [];
//       if (selectedFuelTypes.includes("D") && selectedFuelTypes.includes("P")) {
//         type.push("F", "L", "P", "U", "2", "B", "D");
//       } else if (selectedFuelTypes.includes("P")) {
//         type.push("F", "L", "P", "U");
//       } else {
//         type.push("2", "B", "D");
//       }

//       if (selectedFuelTypes.includes("E")) {
//         type.push("E");
//       }

//       const inClause = type.map((value) => `'${value}'`).join(",");
//       query += `AND E.data_value IN (${inClause}) `;
//     }

//     if (
//       filters?.fuelType?.length &&
//       (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
//     ) {
//       if (
//         filters?.fuelType?.includes("H") &&
//         filters?.fuelType?.includes("E")
//       ) {
//         let type = [];
//         if (
//           filters?.hybridType?.includes("PH") &&
//           filters?.hybridType?.includes("FH")
//         ) {
//           console.log("hybridType",hybridType)
//           type.push("H", "M", "P");
//         } else if (filters?.hybridType?.includes("PH")) {
//           type.push("P");
//         } else if (filters?.hybridType?.includes("FH")) {
//           type.push("H", "M");
//         } else {
//           type.push("H", "M", "P");
//         }

//         if (filters?.fuelType?.includes("E")) {
//           type.push("E", "R", "F"); //isme se 2 htane he jo pure electric ke alawa he BEV wale pure he --hamne R and F hta diya
//         }

//         if (
//           filters?.fuelType?.includes("P") ||
//           filters?.fuelType?.includes("D")
//         ) {
//           type.push("C");
//         }

//         const inClause = type.map((value) => `'${value}'`).join(",");
//         query += `AND he.data_value IN (${inClause}) `;
//       } else if (filters?.fuelType?.includes("E")) {
//         query += `AND he.data_value ='E' `;
//       } else if (filters?.fuelType?.includes("H")) {
//         let type = [];
//         if (
//           filters?.hybridType?.includes("PH") &&
//           filters?.hybridType?.includes("FH")
//         ) {
//           type.push("P", "H");
//         } else if (filters?.hybridType?.includes("PH")) {
//           type.push("P");
//         } else if (filters?.hybridType?.includes("FH")) {
//           type.push("H");
//         } else {
//           type.push("H", "M", "P");
//         }
//         if (filters?.fuelType?.includes("E")) {
//           type.push("E", "R", "F");    //isme se 2 htane he jo pure electric ke alawa he BEV wale pure he --hamne R and F hta diya
//         }
//         if (
//           filters?.fuelType?.includes("P") ||
//           filters?.fuelType?.includes("D")
//         ) {
//           type.push("C");
//         }
//         const inClause = type.map((value) => `'${value}'`).join(",");
//         query += `AND he.data_value IN (${inClause}) `;
//       }
//     }

//     addInClause("F.data_value", filters?.transmissionType);

//     if (filters?.carRange) {
//       query += `AND G.data_value >= ${filters?.carRange} `;
//     }

//     if (filters?.standardEquipment?.length) {
//       const standardEquipment = filters?.standardEquipment;
//       query += `AND A.vehicle_id IN (`;

//       const conditions = standardEquipment.map((schemaId) => {
//         let condition = "S";
//         if (["1602", "59802", "21504"].includes(schemaId)) {
//           condition = "Y";
//         }
//         return `SELECT vehicle_id FROM equipment WHERE data_value = '${condition}' AND schema_id = ${schemaId}`;
//       });

//       query += conditions.join(" INTERSECT ");

//       query += `) `;
//     }

//     if (filters?.trunkSpace) {
//       query += `AND A.vehicle_id IN (SELECT vehicle_id FROM capacity WHERE data_value > '${filters?.trunkSpace}') `;
//     }

//     if (filters?.acceleration?.min && filters?.acceleration?.max) {
//       query += ` AND A.vehicle_id IN (
//         SELECT vehicle_id
//         FROM equipment
//         WHERE schema_id=13503 `;

//         if (filters?.acceleration?.max < 15.0) {
//           query += `AND data_value >= ${filters.acceleration.min} AND data_value <= ${filters.acceleration.max} `;
//         }
//         else if (filters?.acceleration?.max == 15.0) {
//           query += `AND data_value >= ${filters.acceleration.min} `;
//         }
//         query += `)`;
//     }

//     if (filters?.noOfSeats?.min && filters?.noOfSeats?.max) {
//       query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=702 AND option_id = 0 `;
//       query += `AND data_value >= ${filters.noOfSeats.min} AND data_value <= ${filters.noOfSeats.max} `;
//       query += `)`;
//     }

//     if (filters?.horsePower?.min && filters?.horsePower?.max) {
//       query += ` AND A.vehicle_id IN (
//         SELECT vehicle_id
//         FROM equipment
//         WHERE schema_id=15304 `;

//         // Case 1: Between 100 min and 500 max data_value
//         if (filters?.horsePower?.min > 100 && filters?.horsePower?.max < 500) {
//           console.log("hp btw 100 and 500")
//           query += `AND data_value >= ${filters?.horsePower.min} AND data_value <= ${filters?.horsePower.max} `;
//         }

//         // Case 2: From 100 min value to below 500 max data_value
//         else if (filters?.horsePower?.min == 100 && filters?.horsePower?.max < 500) {
//           console.log("hp = 100")
//           query += `AND data_value <= ${filters?.horsePower.max} `;
//         }

//         // Case 3: Min value after 100 and max value is exactly 500
//         else if (filters?.horsePower?.max == 500 && filters?.horsePower?.min > 100) {
//           console.log("hp=500")
//           query += `AND data_value >= ${filters?.horsePower.min} `;
//         }

//         // Case 4: Min data_value of 100 and max data_value of 500
//         else if (filters?.horsePower?.min == 100 && filters?.horsePower?.max == 500) {
//           query += `AND (data_value <= ${filters?.horsePower.max} OR data_value = ${filters?.horsePower.max} OR data_value > ${filters?.horsePower.max}) `;
//         }

//         query += `)`;
//     }

//     if (filters?.topSpeed?.min && filters?.topSpeed?.max) {
//       query += ` AND A.vehicle_id IN (
//         SELECT vehicle_id
//         FROM equipment
//         WHERE schema_id=13502 `;

//         if (filters?.topSpeed?.max < 300) {
//           query += `AND data_value >= ${filters?.topSpeed.min} AND data_value <= ${filters?.topSpeed.max} `;
//         }
//         else if (filters?.topSpeed?.max == 300) {
//           query += `AND data_value >= ${filters?.topSpeed.min} `;
//         }
//         query += `)`;
//     }

//     if (filters?.mileage?.min && filters?.mileage?.max) {
//       query += ` AND A.vehicle_id IN (
//         SELECT vehicle_id
//         FROM equipment
//         WHERE schema_id=42008 `;

//         // Case 1: Between 5 min and 30 max data_value
//         if (filters?.mileage?.min > 5 && filters?.mileage?.max < 30) {
//           console.log("hp btw 100 and 500")
//           query += `AND data_value >= ${filters.mileage.min} AND data_value <= ${filters.mileage.max} `;
//         }

//         // Case 2: From 5 min value to below 30 max data_value
//         else if (filters?.mileage?.min == 5 && filters?.mileage?.max < 30) {
//           console.log("hp = 100")
//           query += `AND data_value <= ${filters.mileage.max} `;
//         }

//         // Case 3: Min value after 30 and max value is exactly 5
//         else if (filters?.mileage?.max == 30 && filters?.mileage?.min > 5) {
//           console.log("hp=500")
//           query += `AND data_value >= ${filters.mileage.min} `;
//         }

//         // Case 4: Min data_value of 5 and max data_value of 30
//         else if (filters?.mileage?.min == 5 && filters?.mileage?.max == 30) {
//           query += `AND (data_value <= ${filters.mileage.max} OR data_value = ${filters.mileage.max} OR data_value > ${filters.mileage.max}) `;
//         }

//         query += `)`;
//     }

//     // addEquipmentCondition(13503, filters?.acceleration, "data_value");    //Priyanshu Pandey//
//     addEquipmentCondition(42119, filters?.ncapStars, "data_value");    //Priyanshu Pandey//
//     addEquipmentCondition(22807, filters?.rainSensor, "data_value");    //Priyanshu Pandey//
//     // addEquipmentCondition(702, filters?.noOfSeats, "data_value");    //Priyanshu Pandey//
//     addEquipmentCondition(35601, filters?.isofixChildSafety, "data_value");    //Priyanshu Pandey//
//     addEquipmentCondition(9003, filters?.headUpDisplay, "data_value");    //Priyanshu Pandey//
//     addEquipmentCondition(4101, filters?.trunkElectricClose, "data_value");    //Priyanshu Pandey//   Doubt
//     addEquipmentCondition(17402, filters?.upholestreryMaterial, "data_value");    //Priyanshu Pandey//   Doubt
//     addEquipmentCondition(4503, filters?.cruiseControl, "data_value"); //Priyanshu Pandey
//     addEquipmentCondition(23502, filters?.warranty, "data_value"); //Priyanshu Pandey
//     addEquipmentCondition(44001, filters?.antiCollision, "data_value"); //Priyanshu Pandey
//     addEquipmentCondition(21009, filters?.airConditioning, "data_value"); //Priyanshu Pandey
//     // addEquipmentCondition(13502, filters?.topSpeed, "data_value");
//     // addEquipmentCondition(15304, filters?.horsePower, "data_value");
//     // addEquipmentCondition(42008, filters?.mileage, "data_value");
//     addEquipmentCondition(6502, filters?.drivingWheel, "data_value");
//     addEquipmentCondition(1604,  filters?.trailterhitch, "data_value"); //Priyanshu Pandey
//     addEquipmentCondition(60302, filters?.autonomousLevel, "data_value"); //Priyanshu Pandey

//     //Priyanshu Pandey
//     if (filters?.wirelessCapbility?.includes("CP") && filters?.wirelessCapbility?.includes("SB") ) {
//       const intersectQuery = `(SELECT vehicle_id FROM equipment WHERE schema_id = 44803 AND data_value = 'Y' INTERSECT SELECT vehicle_id FROM equipment WHERE schema_id = 44804 AND data_value = 'Y')`;
//       query += ` AND A.vehicle_id IN ${intersectQuery}`;
//   } else if (filters?.wirelessCapbility?.includes("CP")) {
//       query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 44803 AND data_value = 'Y')`;
//   } else if (filters?.wirelessCapbility?.includes("SB")) {
//       query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 44804 AND data_value = 'Y')`;
//   }

//   //Priyanshu Pandey
//   if (filters?.massageSeats?.includes("F") && filters?.massageSeats?.includes("R")) {
//     const intersectQuery = `(SELECT vehicle_id FROM equipment WHERE schema_id = 17818 AND data_value = 'Y' INTERSECT SELECT vehicle_id FROM equipment WHERE schema_id = 17929 AND data_value = 'Y')`;
//     query += ` AND A.vehicle_id IN ${intersectQuery}`;
//   } else if (filters?.massageSeats?.includes("F")) {
//     query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 17818 AND data_value = 'Y')`;
//   } else if (filters?.massageSeats?.includes("R")) {
//     query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 17929 AND data_value = 'Y')`;
//   }

//   // Priyanshu Pandey
//   const selectedOptions = filters?.parkingAssistance || [];
//   if (selectedOptions?.length > 0) {
//     const optionConditions = selectedOptions?.map((option) => {
//       if (option === 'PAC') {
//         return `SELECT vehicle_id FROM equipment WHERE schema_id = 5603 AND data_value IN ('A', 'C') `;
//       } else if (option === 'PAA') {
//         return `SELECT vehicle_id FROM equipment WHERE schema_id = 49403 `;
//       } else if (option.startsWith('PAS')) {
//         const dataValue = option.charAt(3);
//         return `SELECT vehicle_id FROM equipment WHERE schema_id = 5602 AND data_value = '${dataValue}'`;
//       }
//     });

//     query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
//     console.log("query at parking: ", query);
//   }

//     // Priyanshu Pandey
//   const selectedHeatingOptions = filters?.heatingOptions || [];
//     if (selectedHeatingOptions?.length > 0) {
//       const optionConditions = selectedHeatingOptions.map((option) => {
//         if (option === 'SW') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 18409 AND data_value = 'Y'`;
//         } else if (option === 'DM') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 21605 AND data_value = 'Y'`;
//         } else if (option === 'FS') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 17811 AND data_value = 'Y'`;
//         } else if (option === 'RS') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 17909 AND data_value = 'Y'`;
//         }
//       });

//       query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
//     }

//      //Priyanshu Pandey

//         const selectedtrailterhitch = filters?.trailterhitch || [];
//         if (selectedtrailterhitch?.length > 0) {
//           const optionConditions = selectedtrailterhitch.map((option) => {
//             if (option === 'E') {
//               return `SELECT vehicle_id FROM equipment WHERE schema_id = 1604 AND data_value = 'E'`;
//             } else if (option === 'R') {
//               return `SELECT vehicle_id FROM equipment WHERE schema_id = 1604 AND data_value = 'R'`;
//             } else if (option === 'F') {
//               return `SELECT vehicle_id FROM equipment WHERE schema_id = 1604 AND data_value = 'F'`;
//             }
//           });

//           query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
//         }

//         //Priyanshu Pandey
//     //AdA is Android Auto
//     //AdW is Android Wireless
//     //AC is Apple carplay
//     //AW is Apple wireless
//     // O is other
//     const selectedMobileIntegration = filters?.mobileIntegration || [];
//     if (selectedMobileIntegration?.length > 0) {
//       const optionConditions = selectedMobileIntegration?.map((option) => {
//         if (option === 'AdA') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 59803 AND data_value = 'Y' `;
//         } else if (option === 'AdW') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 59817 AND data_value = 'Y' `;
//         } else if (option === 'AC') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 59802 AND data_value = 'Y' `;
//         } else if (option === 'AW') {
//           return `SELECT vehicle_id FROM equipment WHERE schema_id = 59816 AND data_value = 'Y' `;
//         } else if (option === 'O') {
//           return `SELECT vehicle_id FROM equipment WHERE (schema_id, data_value) IN ((59807, 'Y'), (59806, 'Y'), (59805, 'Y')) `;
//         }
//       });

//       query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
//       console.log("query at parking: ", query);
//     }

//     query += `GROUP BY B.data_value, D.data_value `; //Removed Vehichle id from here so that in Group Brand and Model in mastersite should not come with repeated bodyType --, A.vehicle_id

//     if (sort == 1) {
//       query += `ORDER BY MIN(CAST(C.data_value AS DECIMAL(10, 2))) `;
//     } else if (sort == 2) {
//       query += `ORDER BY MAX(CAST(C.data_value AS DECIMAL(10, 2))) DESC `;
//     } else {
//       query += `ORDER BY A.DATA_VALUE, B.DATA_VALUE `;
//     }

//     console.log("FinalQuery==>", sort, query);

//     // Fetch the total count separately
//     const [result, totalResult] = await Promise.all([
//       sequelize.query(query + ` LIMIT ${limit} OFFSET ${offset}`, {
//         type: sequelize.QueryTypes.SELECT,
//       }),
//       sequelize.query(query, { type: sequelize.QueryTypes.SELECT }),
//     ]);

//     const total = result?.length ? totalResult[0]?.total_rows : 0;
//     const totalPage = Math.floor(total / limit) + (total % limit !== 0 ? 1 : 0);

//     res.status(200).json({ status: true, total, totalPage, limit, page,  data: result, query });
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ status: false, error });
//   }
// };

const filterCars = async (req, res) => {
  try {
    const filters = req.body;
    const limit = req.query?.limit || 12;
    const page = req.query?.page || 1;
    const offset = (page - 1) * limit;
    const sort = req.query?.sort || 1;

    //For language we have add this
    let language = (0, _common.setLanguage)(req.query);
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };
    const modelSchemaMap = {
      "19": "112",
      // language_id : schema_id
      "24": "129"
    };

    // conditions for top speed, horse power, mileage, driving wheel, trailterhitch
    const addEquipmentCondition = (schemaId, dataValue, field) => {
      if (dataValue && (dataValue.min || dataValue.max)) {
        query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId} `;
        if (dataValue.min) query += `AND data_value >= ${dataValue.min} `;
        if (dataValue.max) query += `AND  data_value <= ${dataValue.max} `;
        query += `)`;
      } else {
        if (schemaId == 6502 && dataValue) {
          query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
          if (filters?.drivingWheel) query += `and data_value = '${dataValue}' `;
          query += `)`;
        }

        // if (schemaId == 1604 && dataValue?.length) {
        //   query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;

        //   if (dataValue?.includes("E","R","F")) {
        //       query += ` AND data_value IN ('E', 'R', 'F')`;
        //   } else if (dataValue?.includes("E")) {
        //       query += ` AND data_value IN ('E')`;
        //   } else if (dataValue?.includes("R")) {
        //       query += ` AND data_value IN ('R')`;
        //   } else if (dataValue?.includes("F")) {
        //     query +=   ` AND data_value IN ('F')`;
        //   }

        //   query += `)`;
        // }

        if (schemaId == 22807 && dataValue) {
          query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
          if (dataValue == "Y") query += `and data_value = '${dataValue}' `;else query += `and data_value != 'Y' `;
          query += `)`;
        }
        if (schemaId == 9003 && dataValue) {
          query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
          if (dataValue == "Y" || dataValue == "P" || dataValue == "W") {
            query += `and data_value IN ('Y', 'P', 'W') `;
          } else {
            // Exclude 'Y', 'P', and 'W'
            query += `and data_value NOT IN ('Y', 'P', 'W') `;
          }
          query += `)`;
        }
        if (schemaId == 4101 && dataValue) {
          query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
          if (dataValue == "Y") query += `and data_value = 'S' `;else query += `and data_value != 'S' `;
          query += `)`;
        }
        if (schemaId == 17402 && dataValue?.length) {
          query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}`;
          if (dataValue.includes("L") && dataValue.includes("S")) {
            query += ` AND data_value IN ('L', 'P', 'Y', 'S', 'A')`;
          } else {
            if (dataValue.includes("L")) {
              query += ` AND data_value IN ('L', 'P', 'Y')`;
            }
            if (dataValue.includes("S")) {
              query += ` AND data_value IN ('S', 'A')`;
            }
          }
          query += `)`;
        }

        //   if(schemaId == 702 && dataValue && (dataValue.min || dataValue.max)) {
        //     query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId} AND option_id = 0 `;         
        //     if (dataValue.min) query += `AND data_value >= ${dataValue.min} `;
        //     if (dataValue.max) query += `AND  data_value <= ${dataValue.max} `;
        //     query += `)`;   
        //  }

        if (schemaId == 35601 && dataValue) {
          query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}`;
          if (dataValue === "Y") {
            query += ` AND data_value IN ('S')`;
          }
          query += `)`;
        }
        if (schemaId == 21009 && dataValue) {
          query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
          if (dataValue == "A") query += `and data_value = 'A' `;else if (dataValue == "S") query += `and data_value = 'S' `;else if (dataValue == "M") query += `and data_value = '-' `;
          query += `)`;
        }
        if (schemaId == 23502 && dataValue) {
          const years = parseInt(dataValue); // Convert dataValue to integer for years
          const months = years * 12; // Convert years to months

          query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id=${schemaId}
        AND CAST(data_value AS SIGNED) >= ${months}
      )`;
        }
        if (schemaId == 44001 && dataValue) {
          query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId} AND data_value IN ('B', 'O', 'P', 'S')`;
          query += `)`;
        }
        if (schemaId == 4503 && dataValue) {
          query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=${schemaId}  `;
          if (dataValue == "AS") query += `and data_value = 'Y' `;
          if (dataValue == "S") query += `and data_value   = '-' `;
          query += `)`;
        }
        if (schemaId == 60302 && dataValue) {
          const level = parseInt(dataValue); // Convert dataValue to integer for levels

          // Define the data_value corresponding to each level
          const levelDataValues = {
            0: 'S',
            1: 'S',
            2: 'F',
            3: 3,
            4: 4,
            5: 5
          };

          // Build the condition to fetch results for the given level and all levels above
          const condition = Array.from({
            length: 6 - level
          }, (_, i) => `data_value = '${levelDataValues[level + i]}'`).join(' OR ');
          if (condition) {
            query += ` AND A.vehicle_id IN (
          SELECT vehicle_id
          FROM equipment
          WHERE schema_id = ${schemaId}
          AND (${condition})
        )`;
          }
        }

        // if (schemaId == 52901 && dataValue) {
        //   if (dataValue == "Y") query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id = 52902 && 52903 && 52904 && 52905 && 52906  `;
        //   query += `)`;
        // }

        if (schemaId == 52901 && dataValue) {
          if (dataValue == "Y") {
            query += `
                    AND A.vehicle_id IN (
                    SELECT vehicle_id 
                    FROM equipment
                    WHERE schema_id IN (52902, 52903, 52904, 52905, 52906)
                    GROUP BY vehicle_id
                    HAVING COUNT(DISTINCT schema_id) = 5 
                    AND COUNT(CASE WHEN data_value = 'Y' THEN 1 END) = 5
            )
            `;
          }
        }

        // if (schemaId == 60301 && dataValue) {
        //   if (dataValue == "Y") query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id = 60303 && 60304 && 60301 && 60307 && 60311  `;
        //   query += `)`;
        // }

        if (schemaId == 60301 && dataValue) {
          if (dataValue == "Y") {
            query += `
                  AND A.vehicle_id IN (
                      SELECT vehicle_id
                      FROM equipment
                      WHERE schema_id IN (60303, 60304, 60307, 60311)
                      GROUP BY vehicle_id
                      HAVING COUNT(DISTINCT schema_id) = 4 
                      AND COUNT(CASE WHEN data_value = 'Y' THEN 1 END) = 4
                  )
              `;
          }
        }

        /// orignal

        if (schemaId == 21001 && dataValue) {
          query += ` AND A.vehicle_id IN (
            SELECT e1.vehicle_id 
            FROM equipment AS e1 
            JOIN equipment AS e2 
            ON e1.vehicle_id = e2.vehicle_id 
            WHERE (e1.schema_id = 21007 AND e1.data_value >= 2)  -- At least 2 zones controlled
            AND (e2.schema_id = 21006 AND e2.data_value = 'Y')   -- Rear outlet
        `;
          query += `)`;
        }

        //   if (schemaId == 21001 && dataValue) {
        //     query += ` AND A.vehicle_id IN (
        //         SELECT e1.vehicle_id 
        //         FROM equipment AS e1 
        //         JOIN equipment AS e2 ON e1.vehicle_id = e2.vehicle_id 
        //         JOIN equipment AS e3 ON e1.vehicle_id = e3.vehicle_id 
        //         WHERE (e1.schema_id = 21007 AND e1.data_value >= 2)  -- At least 2 zones controlled
        //         AND (e2.schema_id = 21006 AND e2.data_value = 'Y')   -- Rear outlet
        //         AND (e3.schema_id = 21008 AND e3.data_value = 'Y')   -- Humidity sensor
        //     )`;
        // }

        if (schemaId == 15601 && dataValue) {
          if (dataValue == "Y") query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id = 15603   `;
          query += `)`;
        }
      }
    };
    const addInClause = (field, values) => {
      if (values?.length) {
        const inClause = values.map(value => `'${value}'`).join(",");
        query += `AND ${field} IN (${inClause}) `;
      }
    };
    let query = `SELECT COUNT(*) OVER () AS total_rows, A.data_value AS brand, B.data_value AS model,
    MIN(CAST(C.data_value AS DECIMAL(10, 2))) AS min, D.data_value AS bodyType, MY.data_value AS modelYear, BS.data_value AS bodySize,  BT.full_text AS full_body_type, MG.data_value AS modelGeneration, T.data_value AS trim, MR.data_value AS modelRange, DI.data_value As Date_Introduced, `;
    if (filters?.fuelType?.length && (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))) {
      query += `E.data_value AS fuelType, `;
    }
    if (filters?.fuelType?.length && (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))) {
      query += `he.data_value AS hybridElectric, `;
    }
    if (filters?.transmissionType?.length) {
      query += `F.data_value AS transmissionType, `;
    }
    if (filters?.carRange) {
      query += `G.data_value AS carRange, `;
    }
    if (filters?.hybridType?.length) {
      query += `he.data_value AS hybridType, `;
    }
    query += `A.vehicle_id FROM equipment as A
      INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = ${modelSchemaMap[language]}
      INNER JOIN equipment as C ON A.vehicle_id = C.vehicle_id AND C.schema_id = 906
      INNER JOIN equipment as D ON A.vehicle_id = D.vehicle_id AND D.schema_id = 606
      INNER JOIN equipment as MY ON A.vehicle_id = MY.vehicle_id AND MY.schema_id = 108  
      INNER JOIN equipment as BS ON A.vehicle_id = BS.vehicle_id AND BS.schema_id = 605 
      INNER JOIN equipment as MG ON A.vehicle_id = MG.vehicle_id AND MG.schema_id = 307 
      INNER JOIN equipment as T ON A.vehicle_id = T.vehicle_id AND T.schema_id = 404
      INNER JOIN equipment AS MR ON A.vehicle_id = MR.vehicle_id AND MR.schema_id = 131
      INNER JOIN equipment AS DI ON A.vehicle_id = DI.vehicle_id AND DI.schema_id = 42908
      LEFT JOIN schema_text as BT ON D.schema_id = BT.schema_id AND BT.schema_id = 606 and D.data_value=BT.data_value `;
    if (filters?.fuelType?.length && (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))) {
      query += `INNER JOIN equipment as E ON A.vehicle_id = E.vehicle_id AND E.schema_id = 8702 `;
    }
    if (filters?.fuelType?.length && (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))) {
      query += `INNER JOIN equipment as he ON A.vehicle_id = he.vehicle_id AND he.schema_id = 48602 `;
    }
    if (filters?.transmissionType?.length) {
      query += `INNER JOIN equipment as F ON A.vehicle_id = F.vehicle_id AND F.schema_id = 20602 `;
    }
    if (filters?.carRange) {
      query += filters?.fuelType?.includes("P") || filters?.fuelType?.includes("D") || filters?.fuelType?.includes("H") ? `LEFT JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 ` : `INNER JOIN equipment as G ON A.vehicle_id = G.vehicle_id AND G.schema_id = 62903 `;
    }
    query += `WHERE A.schema_id =  ${brandSchemaMap[language]} `;
    addInClause("A.data_value", filters?.brand);
    addInClause("B.data_value", filters?.model);
    if (filters?.price?.min || filters?.price?.max) {
      console.log("firstprice");
      if (filters?.price?.min && filters?.price?.max) {
        query += `AND C.data_value >= ${filters?.price?.min} AND C.data_value <= ${filters.price.max} `;
      } else if (filters?.price?.max) {
        query += `AND C.data_value <= ${filters?.price?.max} `;
      } else {
        query += `AND C.data_value >= ${filters?.price?.min} `;
      }
    }
    addInClause("D.data_value", filters?.bodyType);

    // if (
    //   filters?.fuelType &&
    //   filters?.fuelType?.length &&
    //   (filters?.fuelType?.includes("D") || filters?.fuelType?.includes("P"))
    // ) {
    //   const selectedFuelTypes = filters?.fuelType || [];
    //   let type = [];
    //   if (selectedFuelTypes.includes("D") && selectedFuelTypes.includes("P")) {
    //     type.push("F", "L", "P", "U", "2", "B", "D");
    //   } else if (selectedFuelTypes.includes("P")) {
    //     type.push("F", "L", "P", "U");
    //   } else {
    //     type.push("2", "B", "D");
    //   }

    //   if (selectedFuelTypes.includes("E")) {
    //     type.push("E");
    //   }

    //   const inClause = type.map((value) => `'${value}'`).join(",");
    //   query += `AND E.data_value IN (${inClause}) `;
    // }

    // if (
    //   filters?.fuelType?.length &&
    //   (filters?.fuelType?.includes("H") || filters?.fuelType?.includes("E"))
    // ) {
    //   if (
    //     filters?.fuelType?.includes("H") &&
    //     filters?.fuelType?.includes("E")
    //   ) {
    //     let type = [];
    //     if (
    //       filters?.hybridType?.includes("PH") &&
    //       filters?.hybridType?.includes("FH")
    //     ) {
    //       console.log("hybridType",hybridType)
    //       type.push("H", "M", "P");
    //     } else if (filters?.hybridType?.includes("PH")) {
    //       type.push("P");
    //     } else if (filters?.hybridType?.includes("FH")) {
    //       type.push("H", "M");
    //     } else {
    //       type.push("H", "M", "P");
    //     }

    //     if (filters?.fuelType?.includes("E")) {
    //       type.push("E", "R", "F"); //isme se 2 htane he jo pure electric ke alawa he BEV wale pure he --hamne R and F hta diya
    //     }

    //     if (
    //       filters?.fuelType?.includes("P") ||
    //       filters?.fuelType?.includes("D")
    //     ) {
    //       type.push("C");
    //     }

    //     const inClause = type.map((value) => `'${value}'`).join(",");
    //     query += `AND he.data_value IN (${inClause}) `;
    //   } else if (filters?.fuelType?.includes("E")) {
    //     query += `AND he.data_value ='E' `;
    //   } else if (filters?.fuelType?.includes("H")) {
    //     let type = [];
    //     if (
    //       filters?.hybridType?.includes("PH") &&
    //       filters?.hybridType?.includes("FH")
    //     ) {
    //       type.push("P", "H");
    //     } else if (filters?.hybridType?.includes("PH")) {
    //       type.push("P");
    //     } else if (filters?.hybridType?.includes("FH")) {
    //       type.push("H");
    //     } else {
    //       type.push("H", "M", "P");
    //     }
    //     if (filters?.fuelType?.includes("E")) {
    //       type.push("E", "R", "F");    //isme se 2 htane he jo pure electric ke alawa he BEV wale pure he --hamne R and F hta diya
    //     }
    //     if (
    //       filters?.fuelType?.includes("P") ||
    //       filters?.fuelType?.includes("D")
    //     ) {
    //       type.push("C");
    //     }
    //     const inClause = type.map((value) => `'${value}'`).join(",");
    //     query += `AND he.data_value IN (${inClause}) `;
    //   }
    // }

    addInClause("F.data_value", filters?.transmissionType);
    if (filters?.carRange) {
      query += `AND G.data_value >= ${filters?.carRange} `;
    }
    if (filters?.standardEquipment?.length) {
      const standardEquipment = filters?.standardEquipment;
      query += `AND A.vehicle_id IN (`;
      const conditions = standardEquipment.map(schemaId => {
        let condition = "S";
        if (["1602", "59802", "21504"].includes(schemaId)) {
          condition = "Y";
        }
        return `SELECT vehicle_id FROM equipment WHERE data_value = '${condition}' AND schema_id = ${schemaId}`;
      });
      query += conditions.join(" INTERSECT ");
      query += `) `;
    }

    // if (filters?.trunkSpace) {
    //   query += `AND A.vehicle_id IN (SELECT vehicle_id FROM capacity WHERE data_value > '${filters?.trunkSpace}') `;
    // }

    if (filters?.trunkSpace?.min && filters?.trunkSpace?.max) {
      console.log("trunk");
      query += `AND A.vehicle_id IN (SELECT vehicle_id FROM capacity WHERE data_value >= ${filters?.trunkSpace?.min} AND data_value <= ${filters?.trunkSpace?.max}) `;
    }
    if (filters?.acceleration?.min && filters?.acceleration?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id=13503 `;
      if (filters?.acceleration?.max < 15.0) {
        query += `AND data_value >= ${filters.acceleration.min} AND data_value <= ${filters.acceleration.max} `;
      } else if (filters?.acceleration?.max == 15.0) {
        query += `AND data_value >= ${filters.acceleration.min} `;
      }
      query += `)`;
    }
    if (filters?.noOfSeats?.min && filters?.noOfSeats?.max) {
      query += ` AND A.vehicle_id IN ( SELECT vehicle_id FROM equipment WHERE schema_id=702 AND option_id = 0 `;
      query += `AND data_value >= ${filters.noOfSeats.min} AND data_value <= ${filters.noOfSeats.max} `;
      query += `)`;
    }
    if (filters?.horsePower?.min && filters?.horsePower?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id=15304 `;

      // Case 1: Between 100 min and 500 max data_value
      if (filters?.horsePower?.min > 100 && filters?.horsePower?.max < 500) {
        console.log("hp btw 100 and 500");
        query += `AND data_value >= ${filters?.horsePower.min} AND data_value <= ${filters?.horsePower.max} `;
      }

      // Case 2: From 100 min value to below 500 max data_value
      else if (filters?.horsePower?.min == 100 && filters?.horsePower?.max < 500) {
        console.log("hp = 100");
        query += `AND data_value <= ${filters?.horsePower.max} `;
      }

      // Case 3: Min value after 100 and max value is exactly 500
      else if (filters?.horsePower?.max == 500 && filters?.horsePower?.min > 100) {
        console.log("hp=500");
        query += `AND data_value >= ${filters?.horsePower.min} `;
      }

      // Case 4: Min data_value of 100 and max data_value of 500
      else if (filters?.horsePower?.min == 100 && filters?.horsePower?.max == 500) {
        query += `AND (data_value <= ${filters?.horsePower.max} OR data_value = ${filters?.horsePower.max} OR data_value > ${filters?.horsePower.max}) `;
      }
      query += `)`;
    }
    if (filters?.topSpeed?.min && filters?.topSpeed?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id=13502 `;
      if (filters?.topSpeed?.max < 300) {
        query += `AND data_value >= ${filters?.topSpeed.min} AND data_value <= ${filters?.topSpeed.max} `;
      } else if (filters?.topSpeed?.max == 300) {
        query += `AND data_value >= ${filters?.topSpeed.min} `;
      }
      query += `)`;
    }
    if (filters?.mileage?.min) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id=42008 `;

      // Case 1: Between 5 min and 30 max data_value
      if (filters?.mileage?.min > 5) {
        query += `AND data_value >= ${filters.mileage.min}`;
      } else if (filters?.mileage?.min == 5) {
        console.log("hp = 100");
        query += `AND data_value <= ${filters.mileage.min} AND data_value > ${filters.mileage.min} `;
      }
      query += `)`;
    }
    if (filters?.electricMileage?.min) {
      const minelectricMileage = (1 / (filters?.electricMileage?.min / 1000)).toFixed(1);
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 62803 AND option_id = 0 AND record_id = 0 `;
      if (minelectricMileage < 500) {
        query += `AND data_value <= ${minelectricMileage}`;
      } else if (minelectricMileage == 500) {
        query += `AND (data_value <= ${minelectricMileage} OR data_value > ${minelectricMileage})`;
      }
      query += `)`;
    }
    if (filters?.chargeDuration?.max) {
      const maxChargeDurationInHours = (filters?.chargeDuration?.max / 60).toFixed(2);
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 53403 AND option_id = 0 AND record_id = 0 `;

      // Case 1: Between 20 minute which is 0.33 hour to 120 minute which is 2 hour
      if (maxChargeDurationInHours > 0.16 && maxChargeDurationInHours < 1) {
        console.log("chargeDur between 0.33 and 2");
        query += `AND data_value >= 0.16 AND data_value <= ${maxChargeDurationInHours} `;
      }

      // Case 2: From 20 minute which is 0.33 hour to below 120 minute which is 2 hour
      else if (maxChargeDurationInHours == 0.16) {
        console.log("chargeDur == 0.33");
        query += `AND data_value <= ${maxChargeDurationInHours} `;
      }

      // Case 3: Min value after 20 minute which is 0.33 hour and max value is exactly 120 minute which is 2 hour
      else if (maxChargeDurationInHours == 1) {
        console.log("chargeDur == 2");
        query += `AND data_value >= 0.16`;
      }
      query += `)`;
    }
    if (filters?.noOfDoors?.min && filters?.noOfDoors?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 605 `;
      query += `AND data_value >= ${filters?.noOfDoors?.min} AND data_value <= ${filters?.noOfDoors?.max} `;
      query += `)`;
    }
    if (filters?.maxTrailerWeightWithoutBrakes?.min && filters?.maxTrailerWeightWithoutBrakes?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 24106 `;
      query += `AND data_value >= ${filters?.maxTrailerWeightWithoutBrakes?.min} AND data_value <= ${filters?.maxTrailerWeightWithoutBrakes?.max} `;
      query += `)`;
    }
    if (filters?.maxTrailerWeightWithBrakes?.min && filters?.maxTrailerWeightWithBrakes?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 24105 `;
      query += `AND data_value >= ${filters?.maxTrailerWeightWithBrakes?.min} AND data_value <= ${filters?.maxTrailerWeightWithBrakes?.max} `;
      query += `)`;
    }
    if (filters?.co2EmissionPerKilometer?.min && filters?.co2EmissionPerKilometer?.max) {
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 7603 `;
      if (filters?.co2EmissionPerKilometer?.min >= 0 && filters?.co2EmissionPerKilometer?.max < 150) {
        console.log("chargeDur between 0.33 and 2");
        query += `AND data_value >= ${filters?.co2EmissionPerKilometer?.min} AND data_value <= ${filters?.co2EmissionPerKilometer?.max} `;
      } else if (filters?.co2EmissionPerKilometer?.min >= 0 && filters?.co2EmissionPerKilometer?.max == 150) {
        query += `AND data_value >= ${filters?.co2EmissionPerKilometer?.min}  AND (data_value <= ${filters?.co2EmissionPerKilometer?.max} OR data_value > ${filters?.co2EmissionPerKilometer?.max}) `;
      }
      query += `)`;
    }
    if (filters?.co2OwnershipCost?.min && filters?.co2OwnershipCost?.max) {
      const minco2OwnershipCost = (filters?.chargeDuration?.min / 6).toFixed(2);
      query += ` AND A.vehicle_id IN (
        SELECT vehicle_id
        FROM equipment
        WHERE schema_id = 45408 `;
      if (minco2OwnershipCost > 50) {
        query += `AND data_value >= ${minco2OwnershipCost} `;
      } else if (minco2OwnershipCost == 50) {
        query += `AND (data_value <= ${minco2OwnershipCost} OR data_value > ${minco2OwnershipCost} `;
      }
      query += `)`;
    }

    // addEquipmentCondition(13503, filters?.acceleration, "data_value");    //Priyanshu Pandey//
    addEquipmentCondition(42119, filters?.ncapStars, "data_value"); //Priyanshu Pandey//
    addEquipmentCondition(22807, filters?.rainSensor, "data_value"); //Priyanshu Pandey//
    // addEquipmentCondition(702, filters?.noOfSeats, "data_value");    //Priyanshu Pandey//
    addEquipmentCondition(35601, filters?.isofixChildSafety, "data_value"); //Priyanshu Pandey//
    addEquipmentCondition(9003, filters?.headUpDisplay, "data_value"); //Priyanshu Pandey//
    addEquipmentCondition(4101, filters?.trunkElectricClose, "data_value"); //Priyanshu Pandey//   Doubt
    addEquipmentCondition(17402, filters?.upholestreryMaterial, "data_value"); //Priyanshu Pandey//   Doubt
    addEquipmentCondition(4503, filters?.cruiseControl, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(23502, filters?.warranty, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(44001, filters?.antiCollision, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(21009, filters?.airConditioning, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(52901, filters?.advanceDrivingMode, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(60301, filters?.advanceDrivingAssistance, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(21001, filters?.advancedAirConditioning, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(15601, filters?.sunRoof, "data_value"); //Priyanshu Pandey
    // addEquipmentCondition(13502, filters?.topSpeed, "data_value");
    // addEquipmentCondition(15304, filters?.horsePower, "data_value");
    // addEquipmentCondition(42008, filters?.mileage, "data_value");
    addEquipmentCondition(6502, filters?.drivingWheel, "data_value");
    addEquipmentCondition(1604, filters?.trailterhitch, "data_value"); //Priyanshu Pandey
    addEquipmentCondition(60302, filters?.autonomousLevel, "data_value"); //Priyanshu Pandey

    //Priyanshu Pandey
    if (filters?.wirelessCapbility?.includes("CP") && filters?.wirelessCapbility?.includes("SB")) {
      const intersectQuery = `(SELECT vehicle_id FROM equipment WHERE schema_id = 44803 AND data_value = 'Y' INTERSECT SELECT vehicle_id FROM equipment WHERE schema_id = 44804 AND data_value = 'Y')`;
      query += ` AND A.vehicle_id IN ${intersectQuery}`;
    } else if (filters?.wirelessCapbility?.includes("CP")) {
      query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 44803 AND data_value = 'Y')`;
    } else if (filters?.wirelessCapbility?.includes("SB")) {
      query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 44804 AND data_value = 'Y')`;
    }

    //Priyanshu Pandey
    if (filters?.massageSeats?.includes("F") && filters?.massageSeats?.includes("R")) {
      const intersectQuery = `(SELECT vehicle_id FROM equipment WHERE schema_id = 17818 AND data_value = 'Y' INTERSECT SELECT vehicle_id FROM equipment WHERE schema_id = 17929 AND data_value = 'Y')`;
      query += ` AND A.vehicle_id IN ${intersectQuery}`;
    } else if (filters?.massageSeats?.includes("F")) {
      query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 17818 AND data_value = 'Y')`;
    } else if (filters?.massageSeats?.includes("R")) {
      query += ` AND A.vehicle_id IN (SELECT vehicle_id FROM equipment WHERE schema_id = 17929 AND data_value = 'Y')`;
    }

    //Fuel Type and Hybrid Type New 

    const selectedFuelTypes = filters?.fuelType || [];
    if (selectedFuelTypes?.length > 0) {
      const fuelTypeConditions = selectedFuelTypes?.map(fuelType => {
        if (fuelType === 'P') {
          return `SELECT vehicle_id FROM equipment AS E WHERE schema_id = 8702 AND E.data_value IN ('F', 'L', 'P', 'U')`;
        } else if (fuelType === 'D') {
          return `SELECT vehicle_id FROM equipment AS E WHERE schema_id = 8702 AND E.data_value IN ('2', 'B', 'D')`;
        } else if (fuelType === 'O') {
          return `SELECT vehicle_id FROM equipment AS E WHERE schema_id = 8702 AND E.data_value IN ('1', '3', 'A', 'C', 'F', 'G', 'H', 'M', 'N', 'R', 'T')`;
        } else if (fuelType === 'H') {
          let type = [];
          if (filters?.hybridType?.includes("PH") && filters?.hybridType?.includes("FH")) {
            type.push("P", "H", "M");
          } else if (filters?.hybridType?.includes("PH")) {
            type.push("P");
          } else if (filters?.hybridType?.includes("FH")) {
            type.push("H", "M");
          } else {
            type.push("H", "M", "P");
          }
          const inClause = type.map(value => `'${value}'`).join(",");
          return `SELECT vehicle_id FROM equipment AS he WHERE schema_id = 48602 AND he.data_value IN (${inClause})`;
        } else if (fuelType === 'E') {
          return `SELECT vehicle_id FROM equipment AS he WHERE schema_id = 48602 AND he.data_value IN ('E')`;
        }
      });
      query += ` AND A.vehicle_id IN (${fuelTypeConditions.join(' UNION ')})`;
      console.log("query for fuelType: ", query);
    }

    // Priyanshu Pandey
    const selectedOptions = filters?.parkingAssistance || [];
    if (selectedOptions?.length > 0) {
      const optionConditions = selectedOptions?.map(option => {
        if (option === 'PAC') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 5603 AND data_value IN ('A', 'C') `;
        } else if (option === 'PAA') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 49403 `;
        } else if (option.startsWith('PAS')) {
          const dataValue = option.charAt(3);
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 5602 AND data_value = '${dataValue}'`;
        }
      });
      query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
      console.log("query at parking: ", query);
    }

    // Priyanshu Pandey
    const selectedHeatingOptions = filters?.heatingOptions || [];
    if (selectedHeatingOptions?.length > 0) {
      const optionConditions = selectedHeatingOptions.map(option => {
        if (option === 'SW') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 18409 AND data_value = 'Y'`;
        } else if (option === 'DM') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 21605 AND data_value = 'Y'`;
        } else if (option === 'FS') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 17811 AND data_value = 'Y'`;
        } else if (option === 'RS') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 17909 AND data_value = 'Y'`;
        }
      });
      query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
    }

    //Priyanshu Pandey

    const selectedtrailterhitch = filters?.trailterhitch || [];
    if (selectedtrailterhitch?.length > 0) {
      const optionConditions = selectedtrailterhitch.map(option => {
        if (option === 'E') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 1604 AND data_value = 'E'`;
        } else if (option === 'R') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 1604 AND data_value = 'R'`;
        } else if (option === 'F') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 1604 AND data_value = 'F'`;
        }
      });
      query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
    }

    //Priyanshu Pandey
    //AdA is Android Auto
    //AdW is Android Wireless
    //AC is Apple carplay
    //AW is Apple wireless
    // O is other
    const selectedMobileIntegration = filters?.mobileIntegration || [];
    if (selectedMobileIntegration?.length > 0) {
      const optionConditions = selectedMobileIntegration?.map(option => {
        if (option === 'AdA') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 59803 AND data_value = 'Y' `;
        } else if (option === 'AdW') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 59817 AND data_value = 'Y' `;
        } else if (option === 'AC') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 59802 AND data_value = 'Y' `;
        } else if (option === 'AW') {
          return `SELECT vehicle_id FROM equipment WHERE schema_id = 59816 AND data_value = 'Y' `;
        } else if (option === 'O') {
          return `SELECT vehicle_id FROM equipment WHERE (schema_id, data_value) IN ((59807, 'Y'), (59806, 'Y'), (59805, 'Y')) `;
        }
      });
      query += ` AND A.vehicle_id IN (${optionConditions.join(' INTERSECT ')})`;
      console.log("query at parking: ", query);
    }
    query += `GROUP BY A.data_value, B.data_value, D.data_value, MY.data_value, BS.data_value `; //Removed Vehichle id from here so that in Group Brand and Model in mastersite should not come with repeated bodyType --, A.vehicle_id

    if (sort == 1) {
      query += `ORDER BY MIN(CAST(C.data_value AS DECIMAL(10, 2))) ASC `;
    } else if (sort == 2) {
      query += `ORDER BY MIN(CAST(C.data_value AS DECIMAL(10, 2))) DESC `;
    } else if (sort == 4) {
      query += `ORDER BY Date_Introduced DESC `;
    } else {
      query += `ORDER BY A.DATA_VALUE, B.DATA_VALUE `;
    }
    console.log("FinalQuery==>", sort, query);

    // Fetch the total count separately
    const [result, totalResult] = await Promise.all([_database.sequelize.query(query + ` LIMIT ${limit} OFFSET ${offset}`, {
      type: _database.sequelize.QueryTypes.SELECT
    }), _database.sequelize.query(query, {
      type: _database.sequelize.QueryTypes.SELECT
    })]);
    const total = result?.length ? totalResult[0]?.total_rows : 0;
    const totalPage = Math.floor(total / limit) + (total % limit !== 0 ? 1 : 0);
    res.status(200).json({
      status: true,
      total,
      totalPage,
      limit,
      page,
      data: result,
      query
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error
    });
  }
};
exports.filterCars = filterCars;
const getCarOptions = async (req, res) => {
  try {
    let language = (0, _common.setLanguage)(req.query);
    // Use Promise.all to run queries concurrently
    const [brand, fuelType, priceRange, bodyType, transmissionType] = await Promise.all([
    // Insert a new user

    // Select all brands
    _database.sequelize.query('select data_value as value from equipment where schema_id = 128 group by data_value', {
      type: _database.sequelize.QueryTypes.SELECT
    }),
    // Select all fuel Type
    _database.sequelize.query(`SELECT data_value as code ,TRIM(TRAILING "\r" FROM full_text) as value FROM schema_text WHERE schema_id=8702 and data_value!="" and data_value!="?" and language_id=${language} `, {
      type: _database.sequelize.QueryTypes.SELECT
    }), _database.sequelize.query('SELECT MIN(CAST(data_value AS DECIMAL(10, 2))) AS min, MAX(CAST(data_value AS DECIMAL(10, 2))) AS max FROM equipment WHERE schema_id = 906', {
      type: _database.sequelize.QueryTypes.SELECT
    }), _database.sequelize.query(`SELECT data_value as code ,TRIM(TRAILING "\r" FROM full_text) as value FROM schema_text WHERE schema_id=606 and data_value!="" and data_value!="?" and language_id=${language}`, {
      type: _database.sequelize.QueryTypes.SELECT
    }), _database.sequelize.query(`SELECT data_value as code ,TRIM(TRAILING "\r" FROM full_text)  as value FROM schema_text WHERE schema_id=20602 and data_value!="" and data_value!="?" and language_id=${language} `, {
      type: _database.sequelize.QueryTypes.SELECT
    })]);
    const standardEquipment = {
      Aircondition: 'Air conditioning',
      GPSNavigation: 'GPS navigation',
      ParkingSensor: 'Parking sensor',
      LeatherSeats: 'Leather seats',
      AppleCarPlay: 'Apple CarPlay'
    };
    const hybridType = {
      FullHybrid: 'Full hybrid',
      Plugin: 'Plug-in hybrid'
    };
    const carRange = {
      200: 'Minimum 200 Kilometers',
      300: 'Minimum 300 Kilometers',
      450: 'Minimum 450 Kilometers'
    };
    res.status(200).json({
      status: true,
      data: {
        brand,
        fuelType,
        priceRange,
        bodyType,
        transmissionType,
        standardEquipment,
        hybridType,
        carRange
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error
    });
  }
};

// Brand with Electric and Hybrid Type
// export const getCarBrandsInfo = async (req, res) => {
//   try {
//     const language = req.query.language;

//     const carDetails = await sequelize.query(`
//       SELECT e.data_value AS brand, 
//              MAX(fue.data_value = 'E') AS electric, 
//              MAX(hy.data_value != '') AS hybrid
//       FROM equipment AS e
//       LEFT JOIN equipment AS fue ON e.vehicle_id = fue.vehicle_id AND fue.schema_id = 8702
//       LEFT JOIN equipment AS hy ON e.vehicle_id = hy.vehicle_id AND hy.schema_id = 51802
//       WHERE e.schema_id = 128
//       GROUP BY e.data_value
//     `, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     res.status(200).json({ status: true, data: carDetails });

//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };

// export const getCarBrandsInfo = async (req, res) => {
//   try {
//     let { language } = req.query;
//     if (!language) {
//       language = '24'
//     }
//     const brandSchemaMap = {
//       "19": "111",  // language_id : schema_id
//       "24": "128"
//     };
//     let total;
//     let carDetails;
//     let query;
//     carDetails = await sequelize.query(
//       query = `SELECT e.data_value AS brand, 
//                  MAX(fue.data_value = 'E') AS electric, 
//                  MAX(hy.data_value != '') AS hybrid
//                  FROM equipment AS e
//                  LEFT JOIN equipment AS fue ON e.vehicle_id = fue.vehicle_id AND fue.schema_id = 8702
//                  LEFT JOIN equipment AS hy ON e.vehicle_id = hy.vehicle_id AND hy.schema_id = 51802 
//                  WHERE e.schema_id = ${brandSchemaMap[language]}
//                  GROUP BY e.data_value`
//       , {
//         type: sequelize.QueryTypes.SELECT,
//       });

//     total = carDetails.length;
//     res.status(200).json({ status: true, totalBrand: total, data: carDetails });
//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };

// export const getCarBrandsInfo = async (req, res) => {
//   try {
//     let { language } = req.query;

//     if (!language) {
//       language = '19'
//     }
//     const brandSchemaMap = {
//       "19": "111",  // language_id : schema_id
//       "24": "128"
//     };
//     let total;
//     let carDetails;
//     let query;
//     carDetails = await sequelize.query(
//       query = `SELECT
//       e.data_value AS brand,
//       MAX(fue.data_value = 'E') AS electric,
//       MAX(hy.data_value != '') AS hybrid,
//       bl.imageUrl AS brandLogo
//       FROM equipment AS e
//       LEFT JOIN equipment AS fue ON e.vehicle_id = fue.vehicle_id AND fue.schema_id = 8702
//       LEFT JOIN equipment AS hy ON e.vehicle_id = hy.vehicle_id AND hy.schema_id = 51802
//       LEFT JOIN brandLogos AS bl ON e.data_value = bl.brand COLLATE utf8mb4_bin
//       WHERE e.schema_id =  ${brandSchemaMap[language]}
//       GROUP BY e.data_value, bl.imageUrl`
//       , {
//         type: sequelize.QueryTypes.SELECT,
//       });

//     total = carDetails.length;
//     res.status(200).json({ status: true, totalBrand: total, data: carDetails });
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ status: false, error });
//   }
// };
exports.getCarOptions = getCarOptions;
const getCarBrandsInfo = async (req, res) => {
  try {
    let {
      language
    } = req.query;
    if (!language) {
      language = '19';
    }
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };

    // Fetch car details from the first database (sequelize)
    const carDetails = await _database.sequelize.query(`SELECT
      e.data_value AS brand,
      MAX(fue.data_value = 'E') AS electric,
      MAX(hy.data_value IN ('H','M', 'P')) AS hybrid
      FROM equipment AS e
      LEFT JOIN equipment AS fue ON e.vehicle_id = fue.vehicle_id AND fue.schema_id = 8702
      LEFT JOIN equipment AS hy ON e.vehicle_id = hy.vehicle_id AND hy.schema_id = 48602
      WHERE e.schema_id = ${brandSchemaMap[language]}
      GROUP BY e.data_value`, {
      type: _database.sequelize.QueryTypes.SELECT
    });

    // Fetch brand logos from the second database (sequelize2)
    const brandLogos = await _database.sequelize2.query(`SELECT brand, imageUrl FROM brandLogos`, {
      type: _database.sequelize2.QueryTypes.SELECT
    });

    // Merge the results
    const mergedData = carDetails.map(car => {
      const logoEntry = brandLogos.find(logo => logo.brand === car.brand);
      return _objectSpread(_objectSpread({}, car), {}, {
        brandLogo: logoEntry ? logoEntry.imageUrl : null
      });
    });
    const total = mergedData.length;
    res.status(200).json({
      status: true,
      totalBrand: total,
      data: mergedData
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      error
    });
  }
};

// export const getCarBrandsInfo = async (req, res) => {
//   try {
//     let { language } = req.query;

//     if (!language) {
//       language = '19';
//     }

//     const brandSchemaMap = {
//       "19": "111",  // language_id : schema_id
//       "24": "128"
//     };

//     let total;
//     let carDetails;
//     let query;

//     carDetails = await sequelize.query(
//       query = `SELECT
//       e.data_value AS brand,
//       MAX(fue.data_value = 'E') AS electric,
//       MAX(hy.data_value IN ('H','M', 'P')) AS hybrid,
//       fue.data_value AS fuelType,
//       hy.data_value AS hybridType,
//       bl.imageUrl AS brandLogo
//       FROM equipment AS e
//       LEFT JOIN equipment AS fue ON e.vehicle_id = fue.vehicle_id AND fue.schema_id = 8702
//       LEFT JOIN equipment AS hy ON e.vehicle_id = hy.vehicle_id AND hy.schema_id = 48602
//       LEFT JOIN brandLogos AS bl ON e.data_value = bl.brand COLLATE utf8mb4_bin
//       WHERE e.schema_id = ${brandSchemaMap[language]}
//       GROUP BY e.data_value, bl.imageUrl, fue.data_value, hy.data_value`
//       , {
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );

//     total = carDetails.length;
//     res.status(200).json({ status: true, totalBrand: total, data: carDetails });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ status: false, error });
//   }
// };

// export const getCarModelBasedOnBrand = async (req, res) => {
//   try {
//     const brandName = req.query.brand; // Assuming the brand is passed as a query parameter

//     const carModels = await sequelize.query(`
//     SELECT DISTINCT A.data_value AS brand, B.data_value AS model,bt.data_value as bodyTypeCode,st.full_text as bodyType , CASE WHEN ht.data_value = 'E' THEN 'E' WHEN ht.data_value = 'C' THEN 'O' ELSE 'H' END AS fuelType FROM equipment as A INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = 129 left JOIN equipment as bt ON A.vehicle_id = bt.vehicle_id AND bt.schema_id = 606 left JOIN schema_text as st ON bt.schema_id = st.schema_id AND st.schema_id = 606 and bt.data_value=st.data_value left JOIN equipment as ht ON A.vehicle_id = ht.vehicle_id AND ht.schema_id = 48602 WHERE A.schema_id = 128 AND A.data_value = :brand and st.language_id=24
//     `, {
//       replacements: { brand: brandName }, // Parameterized query to avoid SQL injection
//       type: sequelize.QueryTypes.SELECT,
//     });

//     res.status(200).json({ status: true, data: carModels });

//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };
exports.getCarBrandsInfo = getCarBrandsInfo;
const getCarModelBasedOnBrand = async (req, res) => {
  try {
    const {
      brand
    } = req.query;
    let language = (0, _common.setLanguage)(req.query);
    console.log("query: ", req.query);
    let totalResult;
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };
    const modelSchemaMap = {
      "19": "112",
      // language_id : schema_id
      "24": "129"
    };
    const carModels = await _database.sequelize.query(`
    SELECT DISTINCT A.data_value AS brand, 
    B.data_value AS model,
    bt.data_value as bodyTypeCode,
    st.full_text as bodyType , 
    CASE 
        WHEN ht.data_value = 'E' THEN 'E' 
        WHEN ht.data_value = 'C' THEN 'O' 
        ELSE 'H' END AS fuelType FROM equipment as A 
        INNER JOIN equipment as B ON A.vehicle_id = B.vehicle_id AND B.schema_id = ${modelSchemaMap[language]} 
        left JOIN equipment as bt ON A.vehicle_id = bt.vehicle_id AND bt.schema_id = 606 
        left JOIN schema_text as st ON bt.schema_id = st.schema_id AND st.schema_id = 606 and bt.data_value=st.data_value 
        left JOIN equipment as ht ON A.vehicle_id = ht.vehicle_id AND ht.schema_id = 8702 WHERE A.schema_id = ${brandSchemaMap[language]} AND A.data_value = :brand and st.language_id=${language}
    `, {
      replacements: {
        brand: brand
      },
      // Parameterized query to avoid SQL injection
      type: _database.sequelize.QueryTypes.SELECT
    });

    ///8/nov
    //   const carModels = await sequelize.query(`
    //     SELECT DISTINCT 
    //         A.vehicle_id AS vehicle_id,
    //         A.data_value AS brand, 
    //         B.data_value AS model,
    //         bt.data_value AS bodyTypeCode,
    //         st.full_text AS bodyType, 
    //         CASE 
    //             WHEN ht.data_value = 'E' THEN 'E' 
    //             WHEN ht.data_value = 'C' THEN 'O' 
    //             ELSE 'H' 
    //         END AS fuelType, 
    //         MIN(C.data_value) AS min,
    //         MY.data_value AS modelYear,
    //         BS.data_value AS bodySize,
    //         MG.data_value AS modelGeneration,
    //         T.data_value AS trim,
    //         MR.data_value AS modelRange,
    //         DI.data_value AS Date_Introduced
    //     FROM equipment AS A 
    //     INNER JOIN equipment AS B 
    //         ON A.vehicle_id = B.vehicle_id 
    //         AND B.schema_id = ${modelSchemaMap[language]} 
    //     LEFT JOIN equipment AS bt 
    //         ON A.vehicle_id = bt.vehicle_id 
    //         AND bt.schema_id = 606 
    //     LEFT JOIN schema_text AS st 
    //         ON bt.schema_id = st.schema_id 
    //         AND st.schema_id = 606 
    //         AND bt.data_value = st.data_value 
    //     LEFT JOIN equipment AS ht 
    //         ON A.vehicle_id = ht.vehicle_id 
    //         AND ht.schema_id = 8702 
    //     INNER JOIN equipment AS C 
    //         ON A.vehicle_id = C.vehicle_id 
    //         AND C.schema_id = 906
    //     LEFT JOIN equipment AS MY 
    //         ON A.vehicle_id = MY.vehicle_id 
    //         AND MY.schema_id = 108  
    //     LEFT JOIN equipment AS BS 
    //         ON A.vehicle_id = BS.vehicle_id 
    //         AND BS.schema_id = 605 
    //     LEFT JOIN equipment AS MG 
    //         ON A.vehicle_id = MG.vehicle_id 
    //         AND MG.schema_id = 307 
    //     LEFT JOIN equipment AS T 
    //         ON A.vehicle_id = T.vehicle_id 
    //         AND T.schema_id = 404 
    //     LEFT JOIN equipment AS MR 
    //         ON A.vehicle_id = MR.vehicle_id 
    //         AND MR.schema_id = 131 
    //     LEFT JOIN equipment AS DI 
    //         ON A.vehicle_id = DI.vehicle_id 
    //         AND DI.schema_id = 42908 
    //     WHERE 
    //         A.schema_id = ${brandSchemaMap[language]} 
    //         AND A.data_value = :brand 
    //         AND st.language_id = ${language}
    //     GROUP BY A.vehicle_id, A.data_value, B.data_value, bt.data_value, st.full_text, ht.data_value, MY.data_value, BS.data_value, MG.data_value, T.data_value, MR.data_value, DI.data_value
    // `, {
    //     replacements: { brand: brand }, // Parameterized query to avoid SQL injection
    //     type: sequelize.QueryTypes.SELECT,
    // });

    totalResult = carModels.length;
    res.status(200).json({
      status: true,
      totalResult: totalResult,
      data: carModels
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error
    });
  }
};
exports.getCarModelBasedOnBrand = getCarModelBasedOnBrand;
const getCarMinMaxPrice = async (req, res) => {
  try {
    let language = (0, _common.setLanguage)(req.query);
    const result = await _database.sequelize.query('SELECT MIN(CAST(data_value AS DECIMAL(10, 2))) AS min, MAX(CAST(data_value AS DECIMAL(10, 2))) AS max FROM equipment WHERE schema_id = 906', {
      type: _database.sequelize.QueryTypes.SELECT
    });
    const {
      min,
      max
    } = result[0];
    res.status(200).json({
      status: true,
      message: _message.default[language].CAR_PRICE_RANGE,
      data: {
        min,
        max
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};
exports.getCarMinMaxPrice = getCarMinMaxPrice;
const getCarBodyType = async (req, res) => {
  try {
    let language = (0, _common.setLanguage)(req.query);
    const bodyTypes = await _database.sequelize.query(`
      SELECT data_value as code, TRIM(TRAILING "\r" FROM full_text) as value
      FROM schema_text
      WHERE schema_id = 606
        AND data_value != ""
        AND data_value != "?"
        AND language_id = ${language}
    `, {
      type: _database.sequelize.QueryTypes.SELECT
    });
    const totalCount = bodyTypes.length;
    res.status(200).json({
      status: true,
      message: _message.default[language].BODY_TYPE_RETRIEVED_SUCCESS,
      totalCount: totalCount,
      data: bodyTypes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};
exports.getCarBodyType = getCarBodyType;
const getCarFuelTypes = async (req, res) => {
  try {
    let language = (0, _common.setLanguage)(req.query);
    const fuelTypes = await _database.sequelize.query(`
      SELECT data_value as code, TRIM(TRAILING "\r" FROM full_text) as value
      FROM schema_text
      WHERE schema_id = 8702
        AND data_value != ""
        AND data_value != "?"
        AND language_id = ${language}
    `, {
      type: _database.sequelize.QueryTypes.SELECT
    });
    res.status(200).json({
      status: true,
      message: _message.default[language].CAR_FUEL_TYPE_RETRIEVED_SUCCESS,
      data: fuelTypes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};

// export const getCarAllTrimLevels = async (req, res) => {
//   try {
//     const { brand, model, bodyType } = req.query;

//     const sqlQuery = `
//     SELECT DISTINCT
//     e.vehicle_id,
//     e.data_value AS brand,
//     b.data_value AS model,
//     bt.data_value AS bodyTypeShort,
//     TRIM(TRAILING "\r" FROM schema_body.full_text) as bodyType,
//     tl.data_value AS trimLevel,
//     v.data_value AS version,
//     p.data_value AS price,
//     TRIM(TRAILING "\r" FROM schema_fuel.full_text) as fuelType,
//     TRIM(TRAILING "\r" FROM schema_train.full_text) as trainType,
//     TRIM(TRAILING "\r" FROM gear.full_text) as gearType,
//     hp.data_value AS horsepower,
//     tt_model_year.data_value AS modelYear,
//     CASE 
//         WHEN mileage.schema_id = 62803 THEN mileage.data_value
//         WHEN mileage.schema_id = 42008 THEN mileage.data_value
//     END AS mileage
// FROM
//     equipment AS e
//     INNER JOIN equipment AS b ON e.vehicle_id = b.vehicle_id AND b.schema_id = 129
//     INNER JOIN equipment AS bt ON e.vehicle_id = bt.vehicle_id AND bt.schema_id = 606
//     INNER JOIN schema_text AS schema_body ON bt.schema_id = schema_body.schema_id AND bt.data_value = schema_body.data_value AND schema_body.language_id = 19
//     INNER JOIN equipment AS tl ON e.vehicle_id = tl.vehicle_id AND tl.schema_id = 402
//     INNER JOIN equipment AS v ON e.vehicle_id = v.vehicle_id AND v.schema_id = 131
//     INNER JOIN equipment AS p ON e.vehicle_id = p.vehicle_id AND p.schema_id = 906
//     INNER JOIN equipment AS ft ON e.vehicle_id = ft.vehicle_id AND ft.schema_id = 8702
//     INNER JOIN schema_text AS schema_fuel ON ft.schema_id = schema_fuel.schema_id AND ft.data_value = schema_fuel.data_value AND schema_fuel.language_id = 19
//     INNER JOIN equipment AS tt ON e.vehicle_id = tt.vehicle_id AND tt.schema_id = 20602
//     INNER JOIN schema_text AS gear ON tt.schema_id = gear.schema_id AND tt.data_value = gear.data_value AND gear.language_id = 19
//     INNER JOIN equipment AS ht ON e.vehicle_id = ht.vehicle_id AND ht.schema_id = 48602
//     INNER JOIN schema_text AS schema_train ON ht.schema_id = schema_train.schema_id AND ht.data_value = schema_train.data_value AND schema_train.language_id = 19
//     INNER JOIN equipment AS hp ON e.vehicle_id = hp.vehicle_id AND hp.schema_id = 15304
//     INNER JOIN equipment AS tt_model_year ON e.vehicle_id = tt_model_year.vehicle_id AND tt_model_year.schema_id = 400108
//     INNER JOIN equipment AS mileage ON e.vehicle_id = mileage.vehicle_id AND (mileage.schema_id = 62803 OR mileage.schema_id = 42008)
// WHERE
//     e.schema_id = 128
//     AND e.data_value = :brand
//     AND b.data_value = :model
//     AND bt.data_value = :bodyType;
//     `;

//     console.log('Generated SQL Query:', sqlQuery);

//     const trimLevels = await sequelize.query(sqlQuery, {
//       replacements: { brand, model, bodyType },
//       type: sequelize.QueryTypes.SELECT,
//     });

//     res.status(200).json({
//       status: true,
//       message: 'Car Trim Levels retrieved successfully',
//       data: trimLevels,
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({
//       status: false,
//       message: 'Error retrieving car Trim Levels',
//       data: null,
//     });
//   }
// };

//////////////////////////////Charts/////////////////////////////////////////////////////
exports.getCarFuelTypes = getCarFuelTypes;
const getCarAllTrimLevels = async (req, res) => {
  try {
    const {
      brand,
      model,
      bodyType
    } = req.query;
    let language = (0, _common.setLanguage)(req.query);
    console.log("query: ", req.query);
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };
    const modelSchemaMap = {
      "19": "112",
      // language_id : schema_id
      "24": "129"
    };
    const versionSchemaMap = {
      "19": "302",
      // language_id : schema_id
      "24": "131"
    };
    const trimLevelSchemaMap = {
      "19": "404",
      // language_id : schema_id
      "24": "402"
    };
    if (!brand || !model || !bodyType) {
      return res.status(401).json({
        status: false,
        message: _message.default[language].MISSING_FIELD
      });
    }
    const trimLevels = await _database.sequelize.query(`
    SELECT DISTINCT
    e.vehicle_id,
    e.data_value AS brand,
    b.data_value AS model,
    bt.data_value AS bodyTypeShort,
    my.data_value AS modelYear,
    BS.data_value AS bodySize,
    TRIM(TRAILING "\r" FROM schema_body.full_text) as bodyType,
    CASE 
    WHEN tl.data_value = '-' THEN 'Standard'
    ELSE tl.data_value
    END AS trimLevel,
    v.data_value AS version,
    r.data_value AS carRange,
    p.data_value AS price,
    TRIM(TRAILING "\r" FROM schema_fuel.full_text) as fuelType,
    TRIM(TRAILING "\r" FROM schema_train.full_text) as trainType,
    TRIM(TRAILING "\r" FROM gear.full_text) as gearType,
    hp.data_value AS horsepower,
    tt_model_year.data_value AS modelYear,
    CASE 
    WHEN mileage_62803.schema_id = 62803 THEN mileage_62803.data_value
    ELSE NULL
    END AS electricalMileage,
    CASE 
    WHEN mileage_42008.schema_id = 42008 THEN mileage_42008.data_value
    ELSE NULL
    END AS mileage

FROM
    equipment AS e
    INNER JOIN equipment AS b ON e.vehicle_id = b.vehicle_id AND b.schema_id = ${modelSchemaMap[language]}
    INNER JOIN equipment AS bt ON e.vehicle_id = bt.vehicle_id AND bt.schema_id = 606
    INNER JOIN equipment AS my ON e.vehicle_id = my.vehicle_id AND my.schema_id = 108
    INNER JOIN equipment as BS ON e.vehicle_id = BS.vehicle_id AND BS.schema_id = 605 
    INNER JOIN schema_text AS schema_body ON bt.schema_id = schema_body.schema_id AND bt.data_value = schema_body.data_value AND schema_body.language_id = ${language}
    INNER JOIN equipment AS tl ON e.vehicle_id = tl.vehicle_id AND tl.schema_id = ${trimLevelSchemaMap[language]}
    INNER JOIN equipment AS v ON e.vehicle_id = v.vehicle_id AND v.schema_id = ${versionSchemaMap[language]}
    INNER JOIN equipment AS p ON e.vehicle_id = p.vehicle_id AND p.schema_id = 906
    INNER JOIN equipment AS ft ON e.vehicle_id = ft.vehicle_id AND ft.schema_id = 8702
    INNER JOIN schema_text AS schema_fuel ON ft.schema_id = schema_fuel.schema_id AND ft.data_value = schema_fuel.data_value AND schema_fuel.language_id = ${language}
    INNER JOIN equipment AS tt ON e.vehicle_id = tt.vehicle_id AND tt.schema_id = 20602
    INNER JOIN schema_text AS gear ON tt.schema_id = gear.schema_id AND tt.data_value = gear.data_value AND gear.language_id = ${language}
    INNER JOIN equipment AS ht ON e.vehicle_id = ht.vehicle_id AND ht.schema_id = 48602
    INNER JOIN schema_text AS schema_train ON ht.schema_id = schema_train.schema_id AND ht.data_value = schema_train.data_value AND schema_train.language_id = ${language}
    INNER JOIN equipment AS hp ON e.vehicle_id = hp.vehicle_id AND hp.schema_id = 15304
    INNER JOIN equipment AS tt_model_year ON e.vehicle_id = tt_model_year.vehicle_id AND tt_model_year.schema_id = 400108
    LEFT JOIN equipment AS mileage_62803 ON e.vehicle_id = mileage_62803.vehicle_id AND mileage_62803.schema_id = 62803
    LEFT JOIN equipment AS mileage_42008 ON e.vehicle_id = mileage_42008.vehicle_id AND mileage_42008.schema_id = 42008
    LEFT JOIN equipment AS r ON e.vehicle_id = r.vehicle_id AND r.schema_id = 62903
WHERE
    e.schema_id = ${brandSchemaMap[language]}
    AND e.data_value = :brand
    AND b.data_value = :model
    AND bt.data_value = :bodyType
    GROUP BY
    v.data_value,
    schema_fuel.full_text,
    gear.full_text
    ORDER BY CAST(p.data_value AS FLOAT) asc;
    `, {
      replacements: {
        brand,
        model,
        bodyType
      },
      type: _database.sequelize.QueryTypes.SELECT
    });
    const totalResult = trimLevels.length;
    res.status(200).json({
      status: true,
      message: _message.default[language].CAR_TRIM_LEVEL_SUCCESS,
      totalResult: totalResult,
      data: trimLevels
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};
exports.getCarAllTrimLevels = getCarAllTrimLevels;
const getCarModelInfo = async (req, res) => {
  try {
    const brandName = req.query.brand;
    const modelName = req.query.model;
    let language = (0, _common.setLanguage)(req.query);
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };
    const modelSchemaMap = {
      "19": "112",
      // language_id : schema_id
      "24": "129"
    };
    const versionSchemaMap = {
      "19": "302",
      // language_id : schema_id
      "24": "131"
    };
    const carModels = await _database.sequelize.query(`
    SELECT 
        DISTINCT e.vehicle_id,
        e.data_value AS brand,
        b.data_value AS model,
        bt.data_value AS bodyType,
        v.data_value AS version,
        p.data_value AS price,
        tl.data_value AS trimLevel

    FROM
        equipment AS e
        INNER JOIN equipment AS b ON e.vehicle_id = b.vehicle_id AND b.schema_id = ${modelSchemaMap[language]}
        INNER JOIN equipment AS bt ON e.vehicle_id = bt.vehicle_id AND bt.schema_id = 606
        INNER JOIN equipment AS v ON e.vehicle_id = v.vehicle_id AND v.schema_id = ${versionSchemaMap[language]}
        INNER JOIN equipment AS p ON e.vehicle_id = p.vehicle_id AND p.schema_id = 906
        INNER JOIN equipment AS tl ON e.vehicle_id = tl.vehicle_id AND tl.schema_id = 402
    WHERE
        e.schema_id = ${brandSchemaMap[language]}
        AND e.data_value = :brand
        AND b.data_value = :model
    `, {
      replacements: {
        brand: brandName,
        model: modelName
      },
      type: _database.sequelize.QueryTypes.SELECT
    });
    const totalCount = carModels.length;
    res.status(200).json({
      status: true,
      totalCount: totalCount,
      data: carModels
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error
    });
  }
};

// export const saveSelectedVersionsInCharts = async (req, res) => {
//   try {
//     const brandName = req.body.brand;
//     const modelName = req.body.model;
//     const selectedVersions = req.body.selectedVersions;

//     // Validate that selectedVersions is an array
//     if (!Array.isArray(selectedVersions)) {
//       return res.status(400).json({ status: false, error: 'Invalid selectedVersions format' });
//     }

//     // Save the selected versions into the Charts table
//     for (const version of selectedVersions) {
//       await Charts.create({
//         brand: brandName,
//         model: modelName,
//         bodyType: version.bodyType, // Assuming bodyType is part of version data
//         version: version.version,
//         price: version.price,
//         type: 'Best-selling cars in Denmark', // Specify the chart type
//         is_deleted: false,
//       });
//     }

//     res.status(200).json({ status: true, message: 'Selected versions saved successfully' });

//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };

// export const saveSelectedVersionsInCharts = async (req, res) => {
//   try {
//     const selectedVersions = req.body;

//     // Validate that selectedVersions is an array
//     if (!Array.isArray(selectedVersions)) {
//       return res.status(400).json({ status: false, error: 'Invalid selectedVersions format' });
//     }

//     // Save the selected versions into the Charts table
//     for (const version of selectedVersions) {
//        await Charts.create({
//         brand: version.brand,
//         model: version.model,
//         bodyType: version.bodyType, // Assuming bodyType is part of version data
//         version: version.version,
//         price: version.price,
//         type: version.type, 
//         is_deleted: false,
//       });
//     }

//     res.status(200).json({ status: true, message: 'Selected versions saved successfully' });

//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };
exports.getCarModelInfo = getCarModelInfo;
const saveSelectedVersionsInCharts = async (req, res) => {
  try {
    let language = (0, _common.setLanguage)(req.query);
    const {
      brand,
      model,
      bodyType,
      version,
      price,
      colorName,
      type,
      trimLevel
    } = req.body;

    // Check the total count of records with is_deleted = false for the given type in Charts table
    const totalCount = await _chart.default.count({
      where: {
        type,
        is_deleted: false
      }
    });
    if (totalCount >= 10) {
      return res.status(200).json({
        status: false,
        totalCount: totalCount,
        error: `Maximum 10 records can be created in Charts for type ${type}`
      });
    }

    // Save the selected version into the Charts table
    await _chart.default.create({
      brand,
      model,
      bodyType,
      version,
      price,
      color: colorName,
      type,
      trim: trimLevel,
      is_deleted: false
    });
    res.status(200).json({
      status: true,
      message: _message.default[language].VERSION_SAVED_SUCCESS
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

// export const saveFavorite = async (req, res) => {
//   try {
//     const brandName = req.body.brand;
//     const modelName = req.body.model;
//     const bodyType = req.body.bodyType;
//     const version = req.body.version;
//     const priceRange = req.body.priceRange;

//     // Save the favorite into the Favorites table
//     await Favorite.create({
//       brand: brandName,
//       model: modelName,
//       bodyType: bodyType,
//       version: version,
//       priceRange: priceRange,
//       isDeleted: false,
//     });

//     res.status(200).json({ status: true, message: 'Favorite saved successfully' });

//   } catch (error) {
//     res.status(500).json({ status: false, error });
//   }
// };
exports.saveSelectedVersionsInCharts = saveSelectedVersionsInCharts;
const saveFavorite = async (req, res) => {
  try {
    let language = (0, _common.setLanguage)(req.query);
    const {
      brand,
      model,
      bodyType,
      version,
      price,
      colorName,
      trimLevel
    } = req.body;

    // Check the total count of records with is_deleted = false in Favorites table
    const totalCount = await _favourites.default.count({
      where: {
        is_deleted: false
      }
    });

    // OLDER
    // if (totalCount >= 5) {
    //   return res.status(200).json({ status: false,totalCount: totalCount, error: 'Maximum 5 favorites can be saved' });
    // }

    // New Nov 27 latest car bug 538

    if (totalCount >= 5) {
      // Find and delete the oldest favorite
      const oldestFavorite = await _favourites.default.findOne({
        where: {
          is_deleted: false
        },
        order: [['createdAt', 'ASC']] // Find the oldest entry
      });
      if (oldestFavorite) {
        await oldestFavorite.update({
          is_deleted: true
        }); // Mark it as deleted
      }
    }

    // Save the favorite into the Favorites table
    await _favourites.default.create({
      brand,
      model,
      bodyType,
      version,
      priceRange: price,
      color: colorName,
      trim: trimLevel,
      is_deleted: false
    });
    res.status(200).json({
      status: true,
      message: _message.default[language].FAVOURITE_SAVED_SUCCESS
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

// export const getCarColorandPrice = async (req, res) => {
//   try {
//     const { vehicle_id } = req.query;

//     if (!vehicle_id) {
//       return res.status(400).json({
//         status: false,
//         message: 'Vehicle ID is required in the query parameters',
//         data: null,
//       });
//     }

//     const [resultSets] = await sequelize.query(`
//       SELECT
//         o.vehicle_id,
//         o.option_id,
//         ol.id_902 as colorPrice,
//         TRIM(TRAILING "\r" FROM op.manuf_name) AS colorName,
//         o.option_type
//       FROM
//         \`option_list\` AS o
//         JOIN equipment AS e ON o.vehicle_id = e.vehicle_id AND o.option_id = e.option_id
//         JOIN option_name AS op ON e.vehicle_id = op.vehicle_id AND e.option_id = op.option_id
//         LEFT JOIN option_list AS ol ON e.vehicle_id = ol.vehicle_id AND e.option_id = ol.option_id
//       WHERE
//         o.vehicle_id = ${vehicle_id}
//         AND o.option_type = 'C'
//         AND e.schema_id = 31101
//         AND op.language_id = 19
//       GROUP BY
//         o.vehicle_id,
//         o.option_id,
//         ol.id_902,
//         TRIM(TRAILING "\r" FROM op.manuf_name),
//         o.option_type
//     `);

//     // Merge the result sets into a single array
//     const uniqueOptions = resultSets.reduce((acc, resultSet) => {
//       return acc.concat(resultSet);
//     }, []);

//     res.json({
//       status: true,
//       message: 'Options retrieved successfully',
//       data: uniqueOptions,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: 'Error retrieving options',
//       data: null,
//     });
//   }
// };

// export const getCarColorandPrice = async (req, res) => {
//   try {
//     const { vehicle_id } = req.query;
//     let { language } = req.query;
//     if (!language) {
//       language = '24'
//     }
//     if (!vehicle_id) {
//       return res.status(400).json({
//         status: false,
//         message: 'Vehicle ID and Language ID are required in the query parameters',
//         data: null,
//       });
//     }

//     let query;

//     if (language === '19') {
//       // Use option_name table
//       query = `
//         SELECT
//           o.vehicle_id,
//           o.option_id,
//           ol.id_902 as colorPrice,
//           TRIM(TRAILING "\r" FROM op.manuf_name) AS colorName,
//           o.option_type
//         FROM
//           option_name AS op
//           JOIN equipment AS e ON op.vehicle_id = e.vehicle_id AND op.option_id = e.option_id
//           JOIN option_list AS o ON e.vehicle_id = o.vehicle_id AND e.option_id = o.option_id
//           LEFT JOIN option_list AS ol ON e.vehicle_id = ol.vehicle_id AND e.option_id = ol.option_id
//         WHERE
//           op.vehicle_id = ${vehicle_id}
//           AND o.option_type = 'C'
//           AND e.schema_id = 31101
//           AND op.language_id = 19
//         GROUP BY
//           o.vehicle_id,
//           o.option_id,
//           ol.id_902,
//           TRIM(TRAILING "\r" FROM op.manuf_name),
//           o.option_type;
//       `;
//     } else if (language === '24') {
//       // Use option_list table
//       query = `
//         SELECT
//           o.vehicle_id,
//           o.option_id,
//           ol.id_902 as colorPrice,
//           TRIM(TRAILING "\r" FROM o.manuf_name) AS colorName,
//           o.option_type
//         FROM
//           option_list AS o
//           JOIN equipment AS e ON o.vehicle_id = e.vehicle_id AND o.option_id = e.option_id
//           LEFT JOIN option_list AS ol ON e.vehicle_id = ol.vehicle_id AND e.option_id = ol.option_id
//         WHERE
//           o.vehicle_id = ${vehicle_id}
//           AND o.option_type = 'C'
//           AND e.schema_id = 31101
//         GROUP BY
//           o.vehicle_id,
//           o.option_id,
//           ol.id_902,
//           TRIM(TRAILING "\r" FROM o.manuf_name),
//           o.option_type;
//       `;
//     } 

//     // Execute the query
//     const [resultSets] = await sequelize.query(query);

//     // Merge the result sets into a single array
//     const uniqueOptions = resultSets.reduce((acc, resultSet) => {
//       return acc.concat(resultSet);
//     }, []);
//     const totalCount = uniqueOptions.length;
//     res.json({
//       status: true,
//       message: 'Options retrieved successfully',
//       totalCount: totalCount,
//       data: uniqueOptions,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: 'Error retrieving options',
//       data: null,
//     });
//   }
// };
exports.saveFavorite = saveFavorite;
const getCarColorwithPrice = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  if (!language) {
    language = '24';
  }
  try {
    const {
      vehicle_id
    } = req.query;
    if (!vehicle_id) {
      return res.status(400).json({
        status: false,
        message: _message.default[language].VEHICLE_ID_AND_Language_ID_ERROR,
        data: null
      });
    }

    // Use option_name table
    const [resultSets] = await _database.sequelize.query(`
      SELECT 
      pc.option_id AS 'ColourOptionID',
      LOWER(pc.option_code) AS 'ColourOptionCode',
      CASE 
      WHEN ${language} = 19 THEN TRIM(TRAILING '\r' FROM o.manuf_name)
          ELSE pc.manuf_name 
      END AS 'ColourOptionName',
      r.option_rule AS 'ColourRequires',
      pto.option_id AS 'PaintTypeOptionID',
      CASE WHEN pto.data_value IS NULL THEN pts.data_value ELSE pto.data_value END AS 'PaintTypeCode',
      CASE WHEN pto.data_value IS NULL THEN COALESCE(ptns.full_text, ptno.full_text) ELSE COALESCE(ptns.full_text, ptno.full_text) END AS 'PaintTypeName',
      CASE WHEN pto.data_value IS NULL THEN 0 ELSE COALESCE(ptp.id_902, 0) END AS 'Price'
  FROM 
      option_list AS pc -- Paint Colour
      JOIN equipment AS ct -- Colour Type (interior vs exterior)
          ON ct.vehicle_id = pc.vehicle_id AND ct.option_id = pc.option_id AND ct.schema_id = 31101
      LEFT JOIN option_build AS r -- Requirements (of the paint colour)
          ON r.vehicle_id = pc.vehicle_id AND r.option_id = pc.option_id AND r.rule_type = 100006
      LEFT JOIN equipment AS pto -- Paint Type (Optional)
          ON pto.vehicle_id = pc.vehicle_id AND pto.schema_id = 15202 AND r.option_rule LIKE CONCAT('%{', CAST(pto.option_id AS CHAR) COLLATE utf8mb4_general_ci, '}%')
      LEFT JOIN equipment AS pts -- Paint Type (Standard)
          ON pts.vehicle_id = pc.vehicle_id AND pts.schema_id = 15202 AND pts.option_id = 0
      LEFT JOIN schema_text AS ptno -- Paint Type Name (Optional)
          ON ptno.schema_id = 15202 AND ptno.data_value = pto.data_value AND ptno.language_id = ${language} 
      LEFT JOIN schema_text AS ptns -- Paint Type Name (Standard)
          ON ptns.schema_id = 15202 AND ptns.data_value = pts.data_value AND ptns.language_id = ${language} 
      LEFT JOIN option_list AS ptp -- Paint Type Price
          ON ptp.option_id = pto.option_id AND ptp.vehicle_id = pto.vehicle_id
      LEFT JOIN option_name AS o -- Optional JOIN for language_id
          ON o.language_id = 19 AND o.vehicle_id = pc.vehicle_id AND o.option_id = pc.option_id
  WHERE 
      pc.option_type = 'c' AND pc.vehicle_id = ${vehicle_id};
      `);
    console.log("resultSets: ", resultSets);
    const totalCount = resultSets.length;
    res.json({
      status: true,
      message: _message.default[language].OPTIONS_RETRIEVED_SUCCESS,
      totalCount: totalCount,
      data: resultSets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};

// export const getPresentPageData = async (req, res) => {
//   let language = setLanguage(req.query);
//   try {
//     const { vehicle_id } = req.query;
//     if (!vehicle_id) {
//       return res.status(400).json({
//         status: false,
//         message: messages[language].VEHICLE_ID_AND_Language_ID_ERROR,
//         data: null,
//       });
//     }

//     // let Basic_Vehicle_Information;
//     // let Advanced_Features_and_Technology;
//     // let Autonomous_Driving_Features;
//     // let Performance;

//     let data=await Promise.all(
//       [
//       // Basic_Vehicle_Information =await 
//          sequelize.query(`
//           SELECT DISTINCT
//         e.vehicle_id,
//         l.data_value AS length,
//         w.data_value AS width,
//         h.data_value AS height,
//         wb.data_value AS wheel_base,
//         gc.data_value AS ground_clearance,
//         mtw.data_value AS max_trailer_weight_without_brakes,
//         mtwb.data_value AS max_trailer_weight_with_brakes,
//         ms.data_value AS maximum_speed,
//         mp.data_value AS maximum_power_hp,
//         rpm.data_value AS rpm_for_maximum_power,
//         torque.data_value AS maximum_torque_nm,
//         mileage_combustion.data_value AS mileage_per_liter_combustion_only,
//         mileage_electrical.data_value AS mileage_per_kwh_electrical_only,
//         vehicle_range_combustion.data_value AS vehicle_range_combustion,
//         vehicle_range_electrical_hybrid.data_value AS vehicle_range_electrical_hybrid,
//         doors.data_value AS local_number_of_doors,
//         seats.data_value AS number_of_seats,
//         cargo_space.data_value AS cargo_space,
//         frunk.data_value AS frunk,
//         mtwb_with_brakes.data_value AS max_trailer_weight_with_brakes,
//         ncap_stars.data_value AS ncap_stars,
//         kerb_weight.data_value AS weight_kerb,
//         max_total_weight.data_value AS max_total_weight,
//         power_combustion_engine.data_value AS power_combustion_engine,
//         torque_combustion_engine.data_value AS torque_combustion_engine,
//         CASE 
//               WHEN anti_collision_system.data_value IN ('B', 'O', 'P', 'S') THEN 'Yes' 
//               ELSE NULL 
//             END AS has_anti_collision_system,
//         max_charge_power.data_value AS max_charge_power_type3_ac_homebox,
//         max_charge_power_dc_fast_charge.data_value AS max_charge_power_dc_fast_charge
//     FROM
//         equipment AS e
//         LEFT JOIN equipment AS l ON e.vehicle_id = l.vehicle_id AND l.schema_id = 5802
//         LEFT JOIN equipment AS w ON e.vehicle_id = w.vehicle_id AND w.schema_id = 5816
//         LEFT JOIN equipment AS h ON e.vehicle_id = h.vehicle_id AND h.schema_id = 5804
//         LEFT JOIN equipment AS wb ON e.vehicle_id = wb.vehicle_id AND wb.schema_id = 5806
//         LEFT JOIN equipment AS gc ON e.vehicle_id = gc.vehicle_id AND gc.schema_id = 5805
//         LEFT JOIN equipment AS mtw ON e.vehicle_id = mtw.vehicle_id AND mtw.schema_id = 24106
//         LEFT JOIN equipment AS mtwb ON e.vehicle_id = mtwb.vehicle_id AND mtwb.schema_id = 24105
//         LEFT JOIN equipment AS ms ON e.vehicle_id = ms.vehicle_id AND ms.schema_id = 13502
//         LEFT JOIN equipment AS mp ON e.vehicle_id = mp.vehicle_id AND mp.schema_id = 15304
//         LEFT JOIN equipment AS rpm ON e.vehicle_id = rpm.vehicle_id AND rpm.schema_id = 15305
//         LEFT JOIN equipment AS torque ON e.vehicle_id = torque.vehicle_id AND torque.schema_id = 15307
//         LEFT JOIN equipment AS mileage_combustion ON e.vehicle_id = mileage_combustion.vehicle_id AND mileage_combustion.schema_id = 42008
//         LEFT JOIN equipment AS mileage_electrical ON e.vehicle_id = mileage_electrical.vehicle_id AND mileage_electrical.schema_id = 62803
//         LEFT JOIN equipment AS vehicle_range_combustion ON e.vehicle_id = vehicle_range_combustion.vehicle_id AND vehicle_range_combustion.schema_id = 42015
//         LEFT JOIN equipment AS vehicle_range_electrical_hybrid ON e.vehicle_id = vehicle_range_electrical_hybrid.vehicle_id AND vehicle_range_electrical_hybrid.schema_id = 62903
//         LEFT JOIN equipment AS doors ON e.vehicle_id = doors.vehicle_id AND doors.schema_id = 605
//         LEFT JOIN equipment AS seats ON e.vehicle_id = seats.vehicle_id AND seats.schema_id = 702
//         LEFT JOIN capacity AS cargo_space ON e.vehicle_id = cargo_space.vehicle_id
//         LEFT JOIN equipment AS frunk ON e.vehicle_id = frunk.vehicle_id AND frunk.schema_id = 6011 AND frunk.data_value > 0
//         LEFT JOIN equipment AS mtwb_with_brakes ON e.vehicle_id = mtwb_with_brakes.vehicle_id AND mtwb_with_brakes.schema_id = 24105
//         LEFT JOIN equipment AS ncap_stars ON e.vehicle_id = ncap_stars.vehicle_id AND ncap_stars.schema_id = 42119
//         LEFT JOIN equipment AS kerb_weight ON e.vehicle_id = kerb_weight.vehicle_id AND kerb_weight.schema_id = 24103
//         LEFT JOIN equipment AS max_total_weight ON e.vehicle_id = max_total_weight.vehicle_id AND max_total_weight.schema_id = 24102 
//         LEFT JOIN equipment AS power_combustion_engine ON e.vehicle_id = power_combustion_engine.vehicle_id AND power_combustion_engine.schema_id = 35303
//         LEFT JOIN equipment AS torque_combustion_engine ON e.vehicle_id = torque_combustion_engine.vehicle_id AND torque_combustion_engine.schema_id = 35305 
//         LEFT JOIN equipment AS anti_collision_system ON e.vehicle_id = anti_collision_system.vehicle_id AND anti_collision_system.schema_id = 44102
//         LEFT JOIN equipment AS max_charge_power ON e.vehicle_id = max_charge_power.vehicle_id AND max_charge_power.schema_id = 53408 AND max_charge_power.location = 'A' 
//         LEFT JOIN equipment AS max_charge_power_dc_fast_charge ON e.vehicle_id = max_charge_power_dc_fast_charge.vehicle_id AND max_charge_power_dc_fast_charge.schema_id = 53408 AND max_charge_power_dc_fast_charge.location = 'F'
//     WHERE
//         e.vehicle_id = ${vehicle_id};
//           `, {
//             replacements: { vehicle_id },
//             type: sequelize.QueryTypes.SELECT,
//           }),

//           // Advanced_Features_and_Technology = await 
//           sequelize.query(`
//           SELECT DISTINCT
//         e.vehicle_id,
//         CASE WHEN anti_collision_system.data_value IN ('B', 'O', 'P', 'S') THEN 'Yes' ELSE 'No' END AS has_anti_collision_system,
//         CASE WHEN isofix_installation.data_value = 'S' THEN 'Yes' ELSE 'No' END AS isofix_installation_for_child_safety_seats,
//         CASE WHEN rain_sensor.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS rain_sensor,
//         transmission.data_value AS transmission_type,
//         CASE 
//             WHEN advanced_air_conditioning.data_value = 'A' THEN 'Automatic'
//             WHEN advanced_air_conditioning.data_value = 'S' THEN 'Semi-Automatic'
//             WHEN advanced_air_conditioning.data_value = 'M' THEN 'Manual'
//             ELSE 'Not Specified'
//         END AS advanced_air_conditioning,
//         no_of_zones_controlled.data_value AS no_of_zones_controlled,
//         CASE WHEN humidity_sensor.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS humidity_sensor,
//         CASE WHEN rear_outlet.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS rear_outlet,
//         CASE WHEN sunroof.data_value = 'S' THEN 'Yes' ELSE 'No' END AS sunroof,
//         CASE WHEN active_lane_control.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS active_lane_control,
//         CASE WHEN highway_assist.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS highway_assist,
//         CASE WHEN lane_changing.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS lane_changing,
//         CASE WHEN overtaking.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS overtaking,
//         CASE WHEN android_auto.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS android_auto,
//         CASE WHEN android_wireless_connection.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS android_wireless_connection,
//         CASE WHEN apple_carplay.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS apple_carplay,
//         CASE WHEN apple_wireless_connection.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS apple_wireless_connection,
//         CASE WHEN other_mobile_systems_1.data_value = 'Y' AND other_mobile_systems_2.data_value = 'Y' AND other_mobile_systems_3.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS other_mobile_systems,
//         CASE WHEN stream_music_from_bluetooth_device.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS stream_music_from_bluetooth_device,
//         CASE WHEN connect_to_mobile_phone.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS connect_to_mobile_phone,
//         CASE WHEN steering_wheel.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS steering_wheel,
//         CASE WHEN door_mirrors.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS door_mirrors,
//         CASE WHEN front_seats.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS front_seats,
//         CASE WHEN rear_seats.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS rear_seats
//       FROM
//         equipment AS e
//         LEFT JOIN equipment AS anti_collision_system ON e.vehicle_id = anti_collision_system.vehicle_id AND anti_collision_system.schema_id = 44001
//         LEFT JOIN equipment AS isofix_installation ON e.vehicle_id = isofix_installation.vehicle_id AND isofix_installation.schema_id = 35601
//         LEFT JOIN equipment AS rain_sensor ON e.vehicle_id = rain_sensor.vehicle_id AND rain_sensor.schema_id = 22807
//         LEFT JOIN equipment AS transmission ON e.vehicle_id = transmission.vehicle_id AND transmission.schema_id = 20602
//         LEFT JOIN equipment AS advanced_air_conditioning ON e.vehicle_id = advanced_air_conditioning.vehicle_id AND advanced_air_conditioning.schema_id = 21009
//         LEFT JOIN equipment AS no_of_zones_controlled ON e.vehicle_id = no_of_zones_controlled.vehicle_id AND no_of_zones_controlled.schema_id = 21007
//         LEFT JOIN equipment AS humidity_sensor ON e.vehicle_id = humidity_sensor.vehicle_id AND humidity_sensor.schema_id = 21008
//         LEFT JOIN equipment AS rear_outlet ON e.vehicle_id = rear_outlet.vehicle_id AND rear_outlet.schema_id = 21006
//         LEFT JOIN equipment AS sunroof ON e.vehicle_id = sunroof.vehicle_id AND sunroof.schema_id = 15601
//         LEFT JOIN equipment AS active_lane_control ON e.vehicle_id = active_lane_control.vehicle_id AND active_lane_control.schema_id = 60307
//         LEFT JOIN equipment AS highway_assist ON e.vehicle_id = highway_assist.vehicle_id AND highway_assist.schema_id = 60311
//         LEFT JOIN equipment AS lane_changing ON e.vehicle_id = lane_changing.vehicle_id AND lane_changing.schema_id = 60304
//         LEFT JOIN equipment AS overtaking ON e.vehicle_id = overtaking.vehicle_id AND overtaking.schema_id = 60303
//         LEFT JOIN equipment AS android_auto ON e.vehicle_id = android_auto.vehicle_id AND android_auto.schema_id = 59803
//         LEFT JOIN equipment AS android_wireless_connection ON e.vehicle_id = android_wireless_connection.vehicle_id AND android_wireless_connection.schema_id = 59817
//         LEFT JOIN equipment AS apple_carplay ON e.vehicle_id = apple_carplay.vehicle_id AND apple_carplay.schema_id = 59802
//         LEFT JOIN equipment AS apple_wireless_connection ON e.vehicle_id = apple_wireless_connection.vehicle_id AND apple_wireless_connection.schema_id = 59816
//         LEFT JOIN equipment AS other_mobile_systems_1 ON e.vehicle_id = other_mobile_systems_1.vehicle_id AND other_mobile_systems_1.schema_id = 59807
//         LEFT JOIN equipment AS other_mobile_systems_2 ON e.vehicle_id = other_mobile_systems_2.vehicle_id AND other_mobile_systems_2.schema_id = 59806
//         LEFT JOIN equipment AS other_mobile_systems_3 ON e.vehicle_id = other_mobile_systems_3.vehicle_id AND other_mobile_systems_3.schema_id = 59805
//         LEFT JOIN equipment AS stream_music_from_bluetooth_device ON e.vehicle_id = stream_music_from_bluetooth_device.vehicle_id AND stream_music_from_bluetooth_device.schema_id = 44804
//         LEFT JOIN equipment AS connect_to_mobile_phone ON e.vehicle_id = connect_to_mobile_phone.vehicle_id AND connect_to_mobile_phone.schema_id = 44803
//         LEFT JOIN equipment AS steering_wheel ON e.vehicle_id = steering_wheel.vehicle_id AND steering_wheel.schema_id = 18409
//         LEFT JOIN equipment AS door_mirrors ON e.vehicle_id = door_mirrors.vehicle_id AND door_mirrors.schema_id = 21605
//         LEFT JOIN equipment AS front_seats ON e.vehicle_id = front_seats.vehicle_id AND front_seats.schema_id = 17811
//         LEFT JOIN equipment AS rear_seats ON e.vehicle_id = rear_seats.vehicle_id AND rear_seats.schema_id = 17909
//       WHERE
//         e.vehicle_id = ${vehicle_id};
//           `, {
//             replacements: { vehicle_id },
//             type: sequelize.QueryTypes.SELECT,
//           }),

//           // Autonomous_Driving_Features = await 
//           sequelize.query(`
//           SELECT DISTINCT
//         e.vehicle_id,
//         CASE 
//             WHEN autonomous_control.data_value = 'S' THEN '1'
//             WHEN autonomous_control.data_value = 'F' THEN '2'
//             WHEN autonomous_control.data_value = '3' THEN '3'
//             WHEN autonomous_control.data_value = '4' THEN '4'
//             WHEN autonomous_control.data_value = '5' THEN '5'
//             ELSE NULL
//         END AS level_of_autonomous_control,
//         CASE WHEN engine_mapping.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS engine_mapping,
//         CASE WHEN stability_control.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS stability_control,
//         CASE WHEN steering_advanced_mode.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS steering_advanced_mode,
//         CASE WHEN suspension.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS suspension,
//         CASE WHEN traction_control.data_value = 'Y' THEN 'Yes' ELSE 'No' END AS traction_control,
//         CASE WHEN cruise_control.data_value = 'Y' THEN 'Yes' ELSE NULL END AS cruise_control,
//         CASE WHEN trunk_electric_close.data_value IN ('B', 'O', 'P', 'S') THEN 'Yes' ELSE NULL END AS trunk_electric_close,
//         CASE WHEN head_up_display.data_value = 'Y' THEN 'Yes' ELSE NULL END AS head_up_display,
//         mc.data_value AS max_charge_power,
//         bt.data_value AS battery_type,
//         ubkwh.data_value AS usable_battery_kwh,
//         CASE WHEN leather.data_value IN ('L', 'P', 'Y') THEN 'Yes' ELSE NULL END AS leather,
//         CASE WHEN suede.data_value IN ('S', 'A') THEN 'Yes' ELSE NULL END AS suede,
//         CASE WHEN parking_sensor_front.data_value = 'F' THEN 'Yes' ELSE NULL END AS parking_sensor_front,
//         CASE WHEN parking_sensor_rear.data_value = 'R' THEN 'Yes' ELSE NULL END AS parking_sensor_rear,
//         CASE WHEN parking_sensor_side.data_value = 'S' THEN 'Yes' ELSE NULL END AS parking_sensor_side,
//         CASE WHEN parking_sensor_camera_based.data_value = 'C' THEN 'Yes' ELSE NULL END AS parking_sensor_camera_based,
//         CASE WHEN parking_assistance.data_value = 'F' THEN 'Yes' ELSE NULL END AS parking_assistance
//       FROM
//         equipment AS e
//         LEFT JOIN equipment AS autonomous_control ON e.vehicle_id = autonomous_control.vehicle_id AND autonomous_control.schema_id = 60302
//         LEFT JOIN equipment AS engine_mapping ON e.vehicle_id = engine_mapping.vehicle_id AND engine_mapping.schema_id = 52902
//         LEFT JOIN equipment AS stability_control ON e.vehicle_id = stability_control.vehicle_id AND stability_control.schema_id = 52905
//         LEFT JOIN equipment AS steering_advanced_mode ON e.vehicle_id = steering_advanced_mode.vehicle_id AND steering_advanced_mode.schema_id = 52903
//         LEFT JOIN equipment AS suspension ON e.vehicle_id = suspension.vehicle_id AND suspension.schema_id = 52904
//         LEFT JOIN equipment AS traction_control ON e.vehicle_id = traction_control.vehicle_id AND traction_control.schema_id = 52906
//         LEFT JOIN equipment AS cruise_control ON e.vehicle_id = cruise_control.vehicle_id AND cruise_control.schema_id = 4503
//         LEFT JOIN equipment AS trunk_electric_close ON e.vehicle_id = trunk_electric_close.vehicle_id AND trunk_electric_close.schema_id = 4101
//         LEFT JOIN equipment AS head_up_display ON e.vehicle_id = head_up_display.vehicle_id AND head_up_display.schema_id = 9003
//         LEFT JOIN equipment AS mc ON e.vehicle_id = mc.vehicle_id AND mc.schema_id = 53408
//         LEFT JOIN equipment AS bt ON e.vehicle_id = bt.vehicle_id AND bt.schema_id = 8302
//         LEFT JOIN equipment AS ubkwh ON e.vehicle_id = ubkwh.vehicle_id AND ubkwh.schema_id = 8333
//         LEFT JOIN equipment AS leather ON e.vehicle_id = leather.vehicle_id AND leather.schema_id = 17402
//         LEFT JOIN equipment AS suede ON e.vehicle_id = suede.vehicle_id AND suede.schema_id = 17402
//         LEFT JOIN equipment AS parking_sensor_front ON e.vehicle_id = parking_sensor_front.vehicle_id AND parking_sensor_front.schema_id = 5602
//         LEFT JOIN equipment AS parking_sensor_rear ON e.vehicle_id = parking_sensor_rear.vehicle_id AND parking_sensor_rear.schema_id = 5602
//         LEFT JOIN equipment AS parking_sensor_side ON e.vehicle_id = parking_sensor_side.vehicle_id AND parking_sensor_side.schema_id = 5602
//         LEFT JOIN equipment AS parking_sensor_camera_based ON e.vehicle_id = parking_sensor_camera_based.vehicle_id AND parking_sensor_camera_based.schema_id = 5603
//         LEFT JOIN equipment AS parking_assistance ON e.vehicle_id = parking_assistance.vehicle_id AND parking_assistance.schema_id = 49403
//       WHERE
//         e.vehicle_id = ${vehicle_id};
//           `, {
//             replacements: { vehicle_id },
//             type: sequelize.QueryTypes.SELECT,
//           }),

//           // Performance = await 
//           sequelize.query(`
//           SELECT DISTINCT
//         e.vehicle_id,
//         date_introduced.data_value AS date_introduced,
//         ms_electrical.data_value AS maximum_speed_on_electrical_power_only,
//         acc_0_100.data_value AS acceleration_0_100_kmh,
//         driven_wheels.data_value AS driven_wheels,
//         charge_time_10_to_80.data_value * 60 AS charge_time_10_to_80_minutes
//       FROM
//         equipment AS e
//         LEFT JOIN equipment AS date_introduced ON e.vehicle_id = date_introduced.vehicle_id AND date_introduced.schema_id = 42909
//         LEFT JOIN equipment AS ms_electrical ON e.vehicle_id = ms_electrical.vehicle_id AND ms_electrical.schema_id = 13507
//         LEFT JOIN equipment AS acc_0_100 ON e.vehicle_id = acc_0_100.vehicle_id AND acc_0_100.schema_id = 13503
//         LEFT JOIN equipment AS driven_wheels ON e.vehicle_id = driven_wheels.vehicle_id AND driven_wheels.schema_id = 6502
//         LEFT JOIN equipment AS charge_time_10_to_80 ON e.vehicle_id = charge_time_10_to_80.vehicle_id AND charge_time_10_to_80.schema_id = 53403 AND charge_time_10_to_80.option_id = 0 AND charge_time_10_to_80.record_id = 0
//       WHERE
//         e.vehicle_id = ${vehicle_id};

//           `, {
//             replacements: { vehicle_id },
//             type: sequelize.QueryTypes.SELECT,
//           })
//       ]
//     )
//     // const totalCount = resultSets.length;
//     res.json({
//       status: true,
//       message: messages[language].OPTIONS_RETRIEVED_SUCCESS,
//       // data: Basic_Vehicle_Information, Advanced_Features_and_Technology,Autonomous_Driving_Features,Performance,
//       data: {
//         Basic_Vehicle_Information: data[0],
//         Advanced_Features_and_Technology: data[1],
//         Autonomous_Driving_Features: data[2],
//         Performance: data[3]
//       }
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({
//       status: false,
//       message: messages[language].INTERNAL_SERVER_ERROR,
//       data: null,
//     });
//   }
// };

// export const getPresentPageData = async (req, res) => {
//   let language = setLanguage(req.query);
//   try {
//     const { vehicle_id } = req.query;
//     if (!vehicle_id) {
//       return res.status(400).json({
//         status: false,
//         message: messages[language].VEHICLE_ID_AND_Language_ID_ERROR,
//         data: null,
//       });
//     }

//     let data = await Promise.all([
//       // Performance
//       sequelize.query(`
//         SELECT DISTINCT
//           e.vehicle_id,
//           ms.data_value AS maximum_speed,
//           ms_electrical.data_value AS maximum_speed_on_electrical_power_only,
//           acc_0_100.data_value AS acceleration_0_100_kmh,
//           mp.data_value AS maximum_power_hp,
//           rpm.data_value AS rpm_for_maximum_power,
//           torque.data_value AS maximum_torque_nm,
//           power_combustion_engine.data_value AS power_combustion_engine,
//           torque_combustion_engine.data_value AS torque_combustion_engine,
//           driven_wheels.data_value AS driven_wheels,
//           mileage_combustion.data_value AS mileage_per_liter_combustion_only,
//           mileage_electrical.data_value AS mileage_per_kwh_electrical_only,
//           vehicle_range_combustion.data_value AS vehicle_range_combustion,
//           vehicle_range_electrical_hybrid.data_value AS vehicle_range_electrical_hybrid,
//           charge_time_10_to_80.data_value * 60 AS charge_time_10_to_80_minutes,
//           bt.data_value AS battery_type,
//           ubkwh.data_value AS usable_battery_kwh,
//           max_charge_power.data_value AS max_charge_power_type3_ac_homebox,
//           max_charge_power_dc_fast_charge.data_value AS max_charge_power_dc_fast_charge
//         FROM
//           equipment AS e
//           LEFT JOIN equipment AS ms ON e.vehicle_id = ms.vehicle_id AND ms.schema_id = 13502
//           LEFT JOIN equipment AS ms_electrical ON e.vehicle_id = ms_electrical.vehicle_id AND ms_electrical.schema_id = 13507
//           LEFT JOIN equipment AS acc_0_100 ON e.vehicle_id = acc_0_100.vehicle_id AND acc_0_100.schema_id = 13503
//           LEFT JOIN equipment AS mp ON e.vehicle_id = mp.vehicle_id AND mp.schema_id = 15304
//           LEFT JOIN equipment AS rpm ON e.vehicle_id = rpm.vehicle_id AND rpm.schema_id = 15305
//           LEFT JOIN equipment AS torque ON e.vehicle_id = torque.vehicle_id AND torque.schema_id = 15307
//           LEFT JOIN equipment AS power_combustion_engine ON e.vehicle_id = power_combustion_engine.vehicle_id AND power_combustion_engine.schema_id = 35303
//           LEFT JOIN equipment AS torque_combustion_engine ON e.vehicle_id = torque_combustion_engine.vehicle_id AND torque_combustion_engine.schema_id = 35305 
//           LEFT JOIN equipment AS driven_wheels ON e.vehicle_id = driven_wheels.vehicle_id AND driven_wheels.schema_id = 6502
//           LEFT JOIN equipment AS mileage_combustion ON e.vehicle_id = mileage_combustion.vehicle_id AND mileage_combustion.schema_id = 42008
//           LEFT JOIN equipment AS mileage_electrical ON e.vehicle_id = mileage_electrical.vehicle_id AND mileage_electrical.schema_id = 62803
//           LEFT JOIN equipment AS vehicle_range_combustion ON e.vehicle_id = vehicle_range_combustion.vehicle_id AND vehicle_range_combustion.schema_id = 42015
//           LEFT JOIN equipment AS vehicle_range_electrical_hybrid ON e.vehicle_id = vehicle_range_electrical_hybrid.vehicle_id AND vehicle_range_electrical_hybrid.schema_id = 62903
//           LEFT JOIN equipment AS charge_time_10_to_80 ON e.vehicle_id = charge_time_10_to_80.vehicle_id AND charge_time_10_to_80.schema_id = 53403 AND charge_time_10_to_80.option_id = 0 AND charge_time_10_to_80.record_id = 0
//           LEFT JOIN equipment AS bt ON e.vehicle_id = bt.vehicle_id AND bt.schema_id = 8302
//           LEFT JOIN equipment AS ubkwh ON e.vehicle_id = ubkwh.vehicle_id AND ubkwh.schema_id = 8333
//           LEFT JOIN equipment AS max_charge_power ON e.vehicle_id = max_charge_power.vehicle_id AND max_charge_power.schema_id = 53408 AND max_charge_power.location = 'A' 
//           LEFT JOIN equipment AS max_charge_power_dc_fast_charge ON e.vehicle_id = max_charge_power_dc_fast_charge.vehicle_id AND max_charge_power_dc_fast_charge.schema_id = 53408 AND max_charge_power_dc_fast_charge.location = 'F'
//         WHERE
//           e.vehicle_id = ${vehicle_id};
//       `, {
//         replacements: { vehicle_id },
//         type: sequelize.QueryTypes.SELECT,
//       }),

//       // Dimensions (size, space, weight)
//       sequelize.query(`
//         SELECT DISTINCT
//           e.vehicle_id,
//           l.data_value AS length,
//           w.data_value AS width,
//           h.data_value AS height,
//           wb.data_value AS wheel_base,
//           gc.data_value AS ground_clearance,
//           mtw.data_value AS max_trailer_weight_without_brakes,
//           mtwb.data_value AS max_trailer_weight_with_brakes,
//           doors.data_value AS local_number_of_doors,
//           seats.data_value AS number_of_seats,
//           cargo_space.data_value AS cargo_space,
//           frunk.data_value AS frunk
//         FROM
//           equipment AS e
//           LEFT JOIN equipment AS l ON e.vehicle_id = l.vehicle_id AND l.schema_id = 5802
//           LEFT JOIN equipment AS w ON e.vehicle_id = w.vehicle_id AND w.schema_id = 5816
//           LEFT JOIN equipment AS h ON e.vehicle_id = h.vehicle_id AND h.schema_id = 5804
//           LEFT JOIN equipment AS wb ON e.vehicle_id = wb.vehicle_id AND wb.schema_id = 5806
//           LEFT JOIN equipment AS gc ON e.vehicle_id = gc.vehicle_id AND gc.schema_id = 5805
//           LEFT JOIN equipment AS mtw ON e.vehicle_id = mtw.vehicle_id AND mtw.schema_id = 24106
//           LEFT JOIN equipment AS mtwb ON e.vehicle_id = mtwb.vehicle_id AND mtwb.schema_id = 24105
//           LEFT JOIN equipment AS vehicle_range_combustion ON e.vehicle_id = vehicle_range_combustion.vehicle_id AND vehicle_range_combustion.schema_id = 42015
//           LEFT JOIN equipment AS vehicle_range_electrical_hybrid ON e.vehicle_id = vehicle_range_electrical_hybrid.vehicle_id AND vehicle_range_electrical_hybrid.schema_id = 62903
//           LEFT JOIN equipment AS doors ON e.vehicle_id = doors.vehicle_id AND doors.schema_id = 605
//           LEFT JOIN equipment AS seats ON e.vehicle_id = seats.vehicle_id AND seats.schema_id = 702
//           LEFT JOIN capacity AS cargo_space ON e.vehicle_id = cargo_space.vehicle_id
//           LEFT JOIN equipment AS frunk ON e.vehicle_id = frunk.vehicle_id AND frunk.schema_id = 6011 AND frunk.data_value > 0
//         WHERE
//           e.vehicle_id = ${vehicle_id};
//       `, {
//         replacements: { vehicle_id },
//         type: sequelize.QueryTypes.SELECT,
//       }),

//       // Safety and Security
//       sequelize.query(`
//         SELECT DISTINCT
//           e.vehicle_id,
//           ncap_stars.data_value AS ncap_stars,
//           CASE WHEN isofix_installation.data_value = 'S' THEN 'Yes' END AS isofix_installation_for_child_safety_seats
//         FROM
//           equipment AS e
//           LEFT JOIN equipment AS ncap_stars ON e.vehicle_id = ncap_stars.vehicle_id AND ncap_stars.schema_id = 42119
//           LEFT JOIN equipment AS isofix_installation ON e.vehicle_id = isofix_installation.vehicle_id AND isofix_installation.schema_id = 35601
//         WHERE
//           e.vehicle_id = ${vehicle_id};
//       `, {
//         replacements: { vehicle_id },
//         type: sequelize.QueryTypes.SELECT,
//       }),

//       // Comfort
//       sequelize.query(`
//         SELECT DISTINCT
//           e.vehicle_id,
//           CASE WHEN rain_sensor.data_value = 'Y' THEN 'Yes' END AS rain_sensor,
//           transmission.data_value AS transmission_type,
//           CASE 
//             WHEN advanced_air_conditioning.data_value = 'A' THEN 'Automatic'
//             WHEN advanced_air_conditioning.data_value = 'S' THEN 'Semi-Automatic'
//             WHEN advanced_air_conditioning.data_value = 'M' THEN 'Manual'
//           END AS advanced_air_conditioning,
//           no_of_zones_controlled.data_value AS no_of_zones_controlled,
//           CASE WHEN humidity_sensor.data_value = 'Y' THEN 'Yes' END AS humidity_sensor,
//           CASE WHEN rear_outlet.data_value = 'Y' THEN 'Yes' END AS rear_outlet,
//           CASE WHEN sunroof.data_value = 'S' THEN 'Yes' END AS sunroof,
//           CASE WHEN cruise_control.data_value = 'Y' THEN 'Yes' END AS cruise_control,
//           CASE 
//             WHEN autonomous_control.data_value = 'S' THEN '1'
//             WHEN autonomous_control.data_value = 'F' THEN '2'
//             WHEN autonomous_control.data_value = '3' THEN '3'
//             WHEN autonomous_control.data_value = '4' THEN '4'
//             WHEN autonomous_control.data_value = '5' THEN '5'
//             ELSE NULL
//           END AS level_of_autonomous_control,
//           CASE WHEN active_lane_control.data_value = 'Y' THEN 'Yes' END AS active_lane_control,
//           CASE WHEN highway_assist.data_value = 'Y' THEN 'Yes' END AS highway_assist,
//           CASE WHEN lane_changing.data_value = 'Y' THEN 'Yes' END AS lane_changing,
//           CASE WHEN android_auto.data_value = 'Y' THEN 'Yes' END AS android_auto,
//           CASE WHEN android_wireless_connection.data_value = 'Y' THEN 'Yes' END AS android_wireless_connection,
//           CASE WHEN apple_carplay.data_value = 'Y' THEN 'Yes' END AS apple_carplay,
//           CASE WHEN apple_wireless_connection.data_value = 'Y' THEN 'Yes' END AS apple_wireless_connection,
//           CASE WHEN other_mobile_systems_1.data_value = 'Y' AND 
//                other_mobile_systems_2.data_value = 'Y' AND 
//                other_mobile_systems_3.data_value = 'Y' THEN 'Yes' END AS other_mobile_systems,
//           CASE WHEN stream_music_from_bluetooth_device.data_value = 'Y' THEN 'Yes' END AS stream_music_from_bluetooth_device,
//           CASE WHEN connect_to_mobile_phone.data_value = 'Y' THEN 'Yes' END AS connect_to_mobile_phone,
//           CASE WHEN engine_mapping.data_value = 'Y' THEN 'Yes' END AS engine_mapping,
//           CASE WHEN stability_control.data_value = 'Y' THEN 'Yes' END AS stability_control,
//           CASE WHEN steering_advanced_mode.data_value = 'Y' THEN 'Yes' END AS steering_advanced_mode,
//           CASE WHEN suspension.data_value = 'Y' THEN 'Yes' END AS suspension,
//           CASE WHEN traction_control.data_value = 'Y' THEN 'Yes' END AS traction_control,
//           CASE WHEN steering_wheel.data_value = 'Y' THEN 'Yes' END AS steering_wheel,
//           CASE WHEN door_mirrors.data_value = 'Y' THEN 'Yes' END AS door_mirrors,
//           CASE WHEN front_seats.data_value = 'Y' THEN 'Yes' END AS front_seats,
//           CASE WHEN rear_seats.data_value = 'Y' THEN 'Yes' END AS rear_seats,
//           CASE WHEN leather.data_value IN ('L', 'P', 'Y') THEN 'Yes' END AS leather,
//           CASE WHEN suede.data_value IN ('S', 'A') THEN 'Yes' END AS suede,
//           CASE WHEN parking_sensor_front.data_value = 'F' THEN 'Yes' END AS parking_sensor_front,
//           CASE WHEN parking_sensor_rear.data_value = 'R' THEN 'Yes' END AS parking_sensor_rear,
//           CASE WHEN parking_sensor_side.data_value = 'S' THEN 'Yes' END AS parking_sensor_side,
//           CASE WHEN parking_sensor_camera_based.data_value = 'C' THEN 'Yes' END AS parking_sensor_camera_based,
//           CASE WHEN parking_assistance.data_value = 'F' THEN 'Yes' END AS parking_assistance,
//           CASE WHEN trunk_electric_close.data_value IN ('B', 'O', 'P', 'S') THEN 'Yes' END AS trunk_electric_close,
//           CASE WHEN head_up_display.data_value = 'Y' THEN 'Yes' END AS head_up_display
//         FROM
//           equipment AS e
//           LEFT JOIN equipment AS rain_sensor ON e.vehicle_id = rain_sensor.vehicle_id AND rain_sensor.schema_id = 22807
//           LEFT JOIN equipment AS transmission ON e.vehicle_id = transmission.vehicle_id AND transmission.schema_id = 20602
//           LEFT JOIN equipment AS advanced_air_conditioning ON e.vehicle_id = advanced_air_conditioning.vehicle_id AND advanced_air_conditioning.schema_id = 21009
//           LEFT JOIN equipment AS no_of_zones_controlled ON e.vehicle_id = no_of_zones_controlled.vehicle_id AND no_of_zones_controlled.schema_id = 21007
//           LEFT JOIN equipment AS humidity_sensor ON e.vehicle_id = humidity_sensor.vehicle_id AND humidity_sensor.schema_id = 21008
//           LEFT JOIN equipment AS rear_outlet ON e.vehicle_id = rear_outlet.vehicle_id AND rear_outlet.schema_id = 21006
//           LEFT JOIN equipment AS sunroof ON e.vehicle_id = sunroof.vehicle_id AND sunroof.schema_id = 15601
//           LEFT JOIN equipment AS cruise_control ON e.vehicle_id = cruise_control.vehicle_id AND cruise_control.schema_id = 4503
//           LEFT JOIN equipment AS autonomous_control ON e.vehicle_id = autonomous_control.vehicle_id AND autonomous_control.schema_id = 60302
//           LEFT JOIN equipment AS active_lane_control ON e.vehicle_id = active_lane_control.vehicle_id AND active_lane_control.schema_id = 60307
//           LEFT JOIN equipment AS highway_assist ON e.vehicle_id = highway_assist.vehicle_id AND highway_assist.schema_id = 60311
//           LEFT JOIN equipment AS lane_changing ON e.vehicle_id = lane_changing.vehicle_id AND lane_changing.schema_id = 60304
//           LEFT JOIN equipment AS android_auto ON e.vehicle_id = android_auto.vehicle_id AND android_auto.schema_id = 59803
//           LEFT JOIN equipment AS android_wireless_connection ON e.vehicle_id = android_wireless_connection.vehicle_id AND android_wireless_connection.schema_id = 59817
//           LEFT JOIN equipment AS apple_carplay ON e.vehicle_id = apple_carplay.vehicle_id AND apple_carplay.schema_id = 59802
//           LEFT JOIN equipment AS apple_wireless_connection ON e.vehicle_id = apple_wireless_connection.vehicle_id AND apple_wireless_connection.schema_id = 59816
//           LEFT JOIN equipment AS other_mobile_systems_1 ON e.vehicle_id = other_mobile_systems_1.vehicle_id AND other_mobile_systems_1.schema_id = 59807
//           LEFT JOIN equipment AS other_mobile_systems_2 ON e.vehicle_id = other_mobile_systems_2.vehicle_id AND other_mobile_systems_2.schema_id = 59806
//           LEFT JOIN equipment AS other_mobile_systems_3 ON e.vehicle_id = other_mobile_systems_3.vehicle_id AND other_mobile_systems_3.schema_id = 59805
//           LEFT JOIN equipment AS stream_music_from_bluetooth_device ON e.vehicle_id = stream_music_from_bluetooth_device.vehicle_id AND stream_music_from_bluetooth_device.schema_id = 44804
//           LEFT JOIN equipment AS connect_to_mobile_phone ON e.vehicle_id = connect_to_mobile_phone.vehicle_id AND connect_to_mobile_phone.schema_id = 44803
//           LEFT JOIN equipment AS engine_mapping ON e.vehicle_id = engine_mapping.vehicle_id AND engine_mapping.schema_id = 52902
//           LEFT JOIN equipment AS stability_control ON e.vehicle_id = stability_control.vehicle_id AND stability_control.schema_id = 52905
//           LEFT JOIN equipment AS steering_advanced_mode ON e.vehicle_id = steering_advanced_mode.vehicle_id AND steering_advanced_mode.schema_id = 52903
//           LEFT JOIN equipment AS suspension ON e.vehicle_id = suspension.vehicle_id AND suspension.schema_id = 52904
//           LEFT JOIN equipment AS traction_control ON e.vehicle_id = traction_control.vehicle_id AND traction_control.schema_id = 52906
//           LEFT JOIN equipment AS steering_wheel ON e.vehicle_id = steering_wheel.vehicle_id AND steering_wheel.schema_id = 18409
//           LEFT JOIN equipment AS door_mirrors ON e.vehicle_id = door_mirrors.vehicle_id AND door_mirrors.schema_id = 21605
//           LEFT JOIN equipment AS front_seats ON e.vehicle_id = front_seats.vehicle_id AND front_seats.schema_id = 17811
//           LEFT JOIN equipment AS rear_seats ON e.vehicle_id = rear_seats.vehicle_id AND rear_seats.schema_id = 17909
//           LEFT JOIN equipment AS leather ON e.vehicle_id = leather.vehicle_id AND leather.schema_id = 17402
//           LEFT JOIN equipment AS suede ON e.vehicle_id = suede.vehicle_id AND suede.schema_id = 17402
//           LEFT JOIN equipment AS parking_sensor_front ON e.vehicle_id = parking_sensor_front.vehicle_id AND parking_sensor_front.schema_id = 5602
//           LEFT JOIN equipment AS parking_sensor_rear ON e.vehicle_id = parking_sensor_rear.vehicle_id AND parking_sensor_rear.schema_id = 5602
//           LEFT JOIN equipment AS parking_sensor_side ON e.vehicle_id = parking_sensor_side.vehicle_id AND parking_sensor_side.schema_id = 5602
//           LEFT JOIN equipment AS parking_sensor_camera_based ON e.vehicle_id = parking_sensor_camera_based.vehicle_id AND parking_sensor_camera_based.schema_id = 5603
//           LEFT JOIN equipment AS parking_assistance ON e.vehicle_id = parking_assistance.vehicle_id AND parking_assistance.schema_id = 49403
//           LEFT JOIN equipment AS trunk_electric_close ON e.vehicle_id = trunk_electric_close.vehicle_id AND trunk_electric_close.schema_id = 4101
//           LEFT JOIN equipment AS head_up_display ON e.vehicle_id = head_up_display.vehicle_id AND head_up_display.schema_id = 9003
//         WHERE
//           e.vehicle_id = ${vehicle_id};
//       `, {
//         replacements: { vehicle_id },
//         type: sequelize.QueryTypes.SELECT,
//       }),

//        // Overview of Car
//        sequelize.query(`
//        SELECT DISTINCT
//        e.vehicle_id,
//        date_introduced.data_value AS date_introduced,
//        TRIM(BOTH CHR(13) FROM powerTrain_name.full_text) AS powerTrain_name
// FROM
//       equipment AS e
// LEFT JOIN equipment AS date_introduced 
//      ON e.vehicle_id = date_introduced.vehicle_id 
//      AND date_introduced.schema_id = 42909
// LEFT JOIN equipment AS powerTrain
//      ON e.vehicle_id = powerTrain.vehicle_id 
//      AND powerTrain.schema_id = 8708
// LEFT JOIN schema_text AS powerTrain_name
//      ON  powerTrain.data_value = powerTrain_name.data_value
//      AND powerTrain_name.schema_id = 8708
//      AND powerTrain_name.language_id = ${language}
// WHERE
//     e.vehicle_id = ${vehicle_id};
//      `, {
//        replacements: { vehicle_id },
//        type: sequelize.QueryTypes.SELECT,
//      })

//     ]);

//     res.json({
//       status: true,
//       message: messages[language].OPTIONS_RETRIEVED_SUCCESS,
//       data: {
//         Performance: data[0],
//         Dimension: data[1],
//         SafetyAndSecurity: data[2],
//         Comfort: data[3],
//         OverviewOfCar: data[4]
//       }
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({
//       status: false,
//       message: messages[language].INTERNAL_SERVER_ERROR,
//       data: null,
//     });
//   }
// };

// Define schema IDs for various categories
// Define schema IDs for various categories
exports.getCarColorwithPrice = getCarColorwithPrice;
const schemaIds = {
  Performance: [13502, 13507, 13503, 13505, 15304, 15305, 15301, 15307, 35303, 35301, 35305, 6502, 42008, 62803, 42015, 62903, 53403, 8302, 8333, 53408, 8333],
  Dimension: [5802, 5816, 5804, 5806, 5805, 24106, 24105, 605, 702, 6010, 6011, 24103, 24102],
  SafetyAndSecurity: [42119, 35601, 44101],
  Overview_of_Car: [42908],
  Comfort: [22807, 1604, 20602, 21009, 21007, 21008, 21006, 15601, 4503, 60302, 60303, 60304, 60307, 60311, 59803, 59817, 59802, 59816, 59807, 59806, 59805, 44804, 44803, 52902, 52905, 52903, 52904, 52906, 18409, 21605, 17811, 17818, 17929, 17909, 17402, 5602, 5603, 49403, 4101, 9003, 70201]
};
const getPresentPageData = async (req, res) => {
  const language = (0, _common.setLanguage)(req.query);
  const {
    vehicle_id
  } = req.query;
  if (!vehicle_id) {
    return res.status(400).json({
      status: false,
      message: _message.default[language].VEHICLE_ID_AND_LANGUAGE_ID_ERROR,
      data: null
    });
  }
  try {
    // Retrieve data for the specific vehicle and given schema IDs
    const queryResult = await _database.sequelize.query(`
      SELECT *
      FROM
        equipment AS e
      WHERE
        e.vehicle_id = :vehicleId
        AND e.schema_id IN (:schemaIds)
      `, {
      replacements: {
        vehicleId: vehicle_id,
        schemaIds: schemaIds.Performance.concat(schemaIds.Dimension).concat(schemaIds.SafetyAndSecurity).concat(schemaIds.Overview_of_Car).concat(schemaIds.Comfort)
      },
      type: _database.sequelize.QueryTypes.SELECT
    });

    // New query to get powerTrain_name based on the vehicle_id
    const powerTrainResult = await _database.sequelize.query(
    // SELECT DISTINCT
    //   e.vehicle_id,
    //   TRIM(BOTH CHR(13) FROM powerTrain_name.full_text) AS powerTrain_name
    // FROM
    //   equipment AS e
    // LEFT JOIN equipment AS powerTrain
    //     ON e.vehicle_id = powerTrain.vehicle_id 
    //     AND powerTrain.schema_id = 8708
    // LEFT JOIN schema_text AS powerTrain_name
    //     ON  powerTrain.data_value = powerTrain_name.data_value
    //     AND powerTrain_name.schema_id = 8708
    //     AND powerTrain_name.language_id =  ${language}
    // WHERE
    //   e.vehicle_id = :vehicleId
    // `,

    //       `SELECT DISTINCT
    //     e.vehicle_id,
    //     COALESCE(
    //         (SELECT st.data_value 
    //          FROM schema_text st
    //          INNER JOIN equipment eq 
    //            ON st.data_value = eq.data_value 
    //           AND eq.schema_id = 8702
    //          WHERE eq.vehicle_id = e.vehicle_id
    //            AND st.schema_id = 8702
    //            AND st.language_id = ${language}
    //          LIMIT 1
    //         ),
    //         TRIM(BOTH CHR(13) FROM powerTrain_name.data_value)
    //     ) AS powerTrain_name,

    //     CASE 
    //         -- Diesel: schema 48602 = 'C' and 8702 = 'D'
    //         WHEN EXISTS (
    //             SELECT 1 FROM equipment e1 
    //             WHERE e1.vehicle_id = e.vehicle_id 
    //               AND e1.schema_id = 48602 
    //               AND e1.data_value = 'C'
    //         ) 
    //         AND EXISTS (
    //             SELECT 1 FROM equipment e2 
    //             WHERE e2.vehicle_id = e.vehicle_id 
    //               AND e2.schema_id = 8702 
    //               AND e2.data_value = 'D'
    //         ) 
    //         THEN 'Diesel'

    //         -- Benzin: schema 48602 = 'C' and 8702 = 'P'
    //         WHEN EXISTS (
    //             SELECT 1 FROM equipment e1 
    //             WHERE e1.vehicle_id = e.vehicle_id 
    //               AND e1.schema_id = 48602 
    //               AND e1.data_value = 'C'
    //         ) 
    //         AND EXISTS (
    //             SELECT 1 FROM equipment e2 
    //             WHERE e2.vehicle_id = e.vehicle_id 
    //               AND e2.schema_id = 8702 
    //               AND e2.data_value = 'P'
    //         ) 
    //         THEN 'Benzin'

    //         -- Electric: only schema 48602 = 'E'
    //         WHEN EXISTS (
    //             SELECT 1 FROM equipment e1 
    //             WHERE e1.vehicle_id = e.vehicle_id 
    //               AND e1.schema_id = 48602 
    //               AND e1.data_value = 'E'
    //         ) 
    //         THEN 'Electric'

    //         -- Fully Hybrid: schema 48602 has 'H' or 'M'
    //         WHEN EXISTS (
    //             SELECT 1 FROM equipment e1 
    //             WHERE e1.vehicle_id = e.vehicle_id 
    //               AND e1.schema_id = 48602 
    //               AND e1.data_value IN ('H', 'M')
    //         ) 
    //         THEN 'Fully Hybrid'

    //         -- Plug-in Hybrid: only schema 48602 = 'P'
    //         WHEN EXISTS (
    //             SELECT 1 FROM equipment e1 
    //             WHERE e1.vehicle_id = e.vehicle_id 
    //               AND e1.schema_id = 48602 
    //               AND e1.data_value = 'P'
    //         ) 
    //         THEN 'Plug-in Hybrid'

    //         -- Default case: Other
    //         ELSE 'Other'
    //     END AS powerTrain_name
    // FROM
    //     equipment AS e
    // LEFT JOIN equipment AS powerTrain
    //     ON e.vehicle_id = powerTrain.vehicle_id 
    //     AND powerTrain.schema_id = 48602
    // LEFT JOIN schema_text AS powerTrain_name
    //     ON powerTrain.data_value = powerTrain_name.data_value
    //     AND powerTrain_name.schema_id = 48602
    //     AND powerTrain_name.language_id = ${language}
    // WHERE
    //     e.vehicle_id = :vehicleId;
    // `,

    `SELECT DISTINCT
    e.vehicle_id,
    COALESCE(
        (SELECT st.data_value 
         FROM schema_text st
         INNER JOIN equipment eq 
           ON st.data_value = eq.data_value 
          AND eq.schema_id = 8702
         WHERE eq.vehicle_id = e.vehicle_id
           AND st.schema_id = 8702
           AND st.language_id = ${language}
         LIMIT 1
        ),
        TRIM(BOTH CHR(13) FROM powerTrain_name.data_value)
    ) AS powerTrain_name,

    CASE 
        -- Diesel: schema 48602 = 'C' and 8702 = 'D'
        WHEN EXISTS (
            SELECT 1 FROM equipment e1 
            WHERE e1.vehicle_id = e.vehicle_id 
              AND e1.schema_id = 48602 
              AND e1.data_value = 'C'
        ) 
        AND EXISTS (
            SELECT 1 FROM equipment e2 
            WHERE e2.vehicle_id = e.vehicle_id 
              AND e2.schema_id = 8702 
              AND e2.data_value = 'D'
        ) 
        THEN 'D'

        -- Benzin: schema 48602 = 'C' and 8702 = 'P'
        WHEN EXISTS (
            SELECT 1 FROM equipment e1 
            WHERE e1.vehicle_id = e.vehicle_id 
              AND e1.schema_id = 48602 
              AND e1.data_value = 'C'
        ) 
        AND EXISTS (
            SELECT 1 FROM equipment e2 
            WHERE e2.vehicle_id = e.vehicle_id 
              AND e2.schema_id = 8702 
              AND e2.data_value = 'P'
        ) 
        THEN 'P'

       

        -- Fully Hybrid: schema 48602 has 'H' or 'M'
        WHEN EXISTS (
            SELECT 1 FROM equipment e1 
            WHERE e1.vehicle_id = e.vehicle_id 
              AND e1.schema_id = 48602 
              AND e1.data_value IN ('H', 'M')
        ) 
        THEN 'H_M'

        -- Plug-in Hybrid: only schema 48602 = 'P'
        WHEN EXISTS (
            SELECT 1 FROM equipment e1 
            WHERE e1.vehicle_id = e.vehicle_id 
              AND e1.schema_id = 48602 
              AND e1.data_value = 'P'
        ) 
        THEN 'Plug_in'

         -- PHEV condition (both schema 8702 = 'E' and schema 48602 = 'P')
        WHEN EXISTS (
        SELECT 1 FROM equipment e1 
            WHERE e1.vehicle_id = e.vehicle_id 
              AND e1.schema_id = 48602 
              AND e1.data_value = 'P'
            
        ) 
        AND EXISTS (
            SELECT 1 FROM equipment e2 
            WHERE e2.vehicle_id = e.vehicle_id 
              AND e2.schema_id = 8702 
              AND e2.data_value = 'E'
        ) 
        THEN 'PHEV'


        -- Check for additional schema values
        WHEN EXISTS (
            SELECT 1 FROM equipment e2 
            WHERE e2.vehicle_id = e.vehicle_id 
              AND e2.schema_id = 8702 
              AND e2.data_value IN ('1', '2', '3', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'P', 'R', 'T', 'U')
        ) 
        THEN (
            SELECT 
                CASE e2.data_value
                    WHEN '1' THEN 'Etanol mix'
                    WHEN '2' THEN 'Biodiesel mix'
                    WHEN '3' THEN 'Metanol mix'
                    WHEN 'A' THEN 'Metanol'
                    WHEN 'B' THEN 'Biodiesel'
                    WHEN 'C' THEN 'Brændselscelle'
                    WHEN 'D' THEN 'D'
                    WHEN 'E' THEN 'E'
                    WHEN 'F' THEN 'E85'
                    WHEN 'G' THEN 'LPG'
                    WHEN 'H' THEN 'Hydrogen'
                    WHEN 'L' THEN 'Blyholdig'
                    WHEN 'M' THEN 'M85'
                    WHEN 'N' THEN 'CNG'
                    WHEN 'P' THEN 'premium'
                    WHEN 'R' THEN 'Komprimert luft'
                    WHEN 'T' THEN 'Ethanol'
                    WHEN 'U' THEN 'U'
                    ELSE 'Other'
                END
            FROM equipment e2
            WHERE e2.vehicle_id = e.vehicle_id 
              AND e2.schema_id = 8702 
            LIMIT 1
        )
        
        -- Default case: Other
        ELSE 'Other'
    END AS powerTrain_name
FROM
    equipment AS e
LEFT JOIN equipment AS powerTrain
    ON e.vehicle_id = powerTrain.vehicle_id 
    AND powerTrain.schema_id = 48602
LEFT JOIN schema_text AS powerTrain_name
    ON powerTrain.data_value = powerTrain_name.data_value
    AND powerTrain_name.schema_id = 48602
    AND powerTrain_name.language_id = ${language}
WHERE
    e.vehicle_id = :vehicleId;`, {
      replacements: {
        vehicleId: vehicle_id,
        language
      },
      type: _database.sequelize.QueryTypes.SELECT
    });

    // Retrieve cargo_space from the capacity table
    const cargoSpaceResult = await _database.sequelize.query(`
    SELECT data_value
    FROM
      capacity
    WHERE
      vehicle_id = :vehicleId
    `, {
      replacements: {
        vehicleId: vehicle_id
      },
      type: _database.sequelize.QueryTypes.SELECT
    });

    // Organize the data into a structured format based on schema groups
    let structuredData = {
      Performance: [{
        maximum_speed: null,
        maximum_speed_on_electrical_power_only: null,
        acceleration_0_100_kmh: null,
        acceleration_0_1000_m: null,
        maximum_power_hp: null,
        rpm_for_maximum_power: null,
        maximum_torque_nm: null,
        Torque_from_combustion_engine: null,
        Power_from_combustion_engine: null,
        power_combustion_engine: null,
        driven_wheels: null,
        mileage_per_liter_combustion_only: null,
        mileage_per_kwh_electrical_only: null,
        vehicle_range_combustion: null,
        vehicle_range_electrical_hybrid: null,
        charge_time_10_to_80_minutes: null,
        battery_type: null,
        usable_battery_kwh: null,
        max_charge_power_type3_ac_homebox: null,
        max_charge_power_dc_fast_charge: null
      }],
      Dimension: [{
        length: null,
        width: null,
        height: null,
        wheel_base: null,
        ground_clearance: null,
        max_trailer_weight_without_brakes: null,
        max_trailer_weight_with_brakes: null,
        local_number_of_doors: null,
        number_of_seats: null,
        frunk: null,
        cargo_space: null,
        kerb_weight_kg: null,
        Max_Total_Weight_Including_Trailer_and_Load: null
      }],
      SafetyAndSecurity: [{
        ncap_stars: null,
        isofix_installation_for_child_safety_seats: null,
        has_anti_collision_system: null
      }],
      // Add a new category for Safety and Security
      Overview_of_Car: [{
        Date_Introduced: null
      }],
      Comfort: [{
        rain_sensor: null,
        transmission_type: null,
        advanced_air_conditioning: null,
        no_of_zones_controlled: null,
        humidity_sensor: null,
        rear_outlet: null,
        sunroof: null,
        cruise_control: null,
        level_of_autonomous_control: null,
        active_lane_control: null,
        overtaking: null,
        highway_assist: null,
        lane_changing: null,
        android_auto: null,
        android_wireless_connection: null,
        apple_carplay: null,
        apple_wireless_connection: null,
        other_mobile_systems_1: null,
        other_mobile_systems_2: null,
        other_mobile_systems_3: null,
        stream_music_from_bluetooth_device: null,
        connect_to_mobile_phone: null,
        engine_mapping: null,
        stability_control: null,
        steering_advanced_mode: null,
        suspension: null,
        traction_control: null,
        steering_wheel: null,
        door_mirrors: null,
        front_seats: null,
        rear_seats: null,
        Advanced_Distance_and_Object_Sensing_Technology: null,
        Trailer_hitch: null,
        Massage_seats_front: null,
        Massage_seats_rear: null,
        upholestreryMaterial: null,
        head_up_display: null,
        parking_sensor_front: null,
        parking_sensor_rear: null,
        parking_sensor_side: null
      }]
    };
    const updatePerformanceFields = (el, targetObject) => {
      switch (el.schema_id) {
        case 13502:
          targetObject.maximum_speed = el.data_value || null;
          break;
        case 13507:
          targetObject.maximum_speed_on_electrical_power_only = el.data_value || null;
          break;
        case 13503:
          targetObject.acceleration_0_100_kmh = el.data_value || null;
          break;
        case 13505:
          targetObject.acceleration_0_1000_m = el.data_value || null;
          break;
        case 15304:
          targetObject.maximum_power_hp = el.data_value || null;
          break;
        case 15305:
          targetObject.rpm_for_maximum_power = el.data_value || null;
          break;
        case 15307:
          targetObject.maximum_torque_nm = el.data_value || null;
          break;
        case 35303:
          targetObject.power_combustion_engine = el.data_value || null;
          break;
        case 35305:
          targetObject.Torque_from_combustion_engine = el.data_value || null;
          break;
        case 6502:
          targetObject.driven_wheels = el.data_value || null;
          break;
        case 42008:
          targetObject.mileage_per_liter_combustion_only = el.data_value || null;
          break;
        case 62803:
          // Extract the mileage value from the data (in Wh/km)
          let mileage = el.data_value || null;
          if (mileage) {
            // Convert Wh/km to km/kWh
            let mileageInKmPerKwh = 1000 / mileage;

            // Limit to 2 decimal places
            targetObject.mileage_per_kwh_electrical_only = mileageInKmPerKwh.toFixed(2);
          } else {
            targetObject.mileage_per_kwh_electrical_only = null;
          }
          break;
        case 42015:
          targetObject.vehicle_range_combustion = el.data_value || null;
          break;
        case 62903:
          targetObject.vehicle_range_electrical_hybrid = el.data_value || null;
          break;
        case 53403:
          if (el.option_id === 0 && el.record_id === 0) {
            targetObject.charge_time_10_to_80_minutes = el.data_value || null;
          }
          break;
        case 8302:
          targetObject.battery_type = el.data_value || null;
          break;
        case 8333:
          targetObject.usable_battery_kwh = el.data_value || null;
          break;
        case 53408:
          if (el.location === 'A') {
            targetObject.max_charge_power_type3_ac_homebox = el.data_value || null;
          } else if (el.location === 'F') {
            targetObject.max_charge_power_dc_fast_charge = el.data_value || null;
          }
          break;
        default:
          // Do nothing if schema_id does not match any known case
          break;
      }
    };
    const updateDimensionFields = (el, targetObject) => {
      console.log("el", el);
      switch (el.schema_id) {
        case 5802:
          targetObject.length = el.data_value || null;
          break;
        case 5816:
          targetObject.width = el.data_value || null;
          break;
        case 5804:
          targetObject.height = el.data_value || null;
          break;
        case 5806:
          targetObject.wheel_base = el.data_value || null;
          break;
        case 5805:
          targetObject.ground_clearance = el.data_value || null;
          break;
        case 24106:
          targetObject.max_trailer_weight_without_brakes = el.data_value || null;
          break;
        case 24105:
          targetObject.max_trailer_weight_with_brakes = el.data_value || null;
          break;
        case 605:
          targetObject.local_number_of_doors = el.data_value || null;
          break;
        case 24103:
          if (el.option_id === 0 && el.record_id === 0) {
            targetObject.kerb_weight_kg = el.data_value || null;
          }
          break;
        case 24102:
          targetObject.Max_Total_Weight_Including_Trailer_and_Load = el.data_value || null;
          break;
        case 702:
          targetObject.number_of_seats = el.data_value || null;
          break;
        // case 6010:
        // if (el.data_value > 0) {
        // console.log("cargospace>>>", el.data_value);
        // targetObject.Cargo_Space = el.data_value || null;
        // }
        //  break;

        case 6011:
          if (el.data_value > 0) {
            console.log("elll>>>", el.data_value);
            targetObject.frunk = el.data_value || null;
            break;
          } else {
            return null; // If data_value isn't positive, return null
          }
        default:
          return null;
        // No matching schema_id
      }
    };

    // const updateSafetyField = (el,targetObject) => {
    //   switch (el.schema_id) {
    //     case 42119:
    //       targetObject.ncap_stars = el.data_value || null ;
    //       break; 
    //     case 35601:
    //       if (el.data_value === 'S') {
    //        targetObject.isofix_installation_for_child_safety_seats= 'Yes' || null ;
    //        break;
    //       }
    //       return null;

    //     default:
    //       return null; 
    //   }
    // };

    const updateSafetyField = (el, targetObject) => {
      switch (el.schema_id) {
        case 42119:
          targetObject.ncap_stars = el.data_value || null;
          break;
        case 35601:
          if (el.data_value === 'S') {
            targetObject.isofix_installation_for_child_safety_seats = 'Yes';
          } else {
            targetObject.isofix_installation_for_child_safety_seats = null;
          }
          break;
        case 44101:
          if (['B', 'O', 'P', 'S'].includes(el.data_value)) {
            targetObject.has_anti_collision_system = 'Yes';
          } else {
            targetObject.has_anti_collision_system = null;
          }
          break;
        default:
          return null;
      }
    };
    const updateOverviewOfCar = (el, targetObject) => {
      switch (el.schema_id) {
        case 42908:
          targetObject.Date_Introduced = el.data_value || null;
          break;
        default:
          break;
      }
    };
    const updateComfortField = (el, targetObject) => {
      switch (el.schema_id) {
        case 17818:
          targetObject.Massage_seats_front = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 17929:
          targetObject.Massage_seats_rear = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 22807:
          targetObject.rain_sensor = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 20602:
          targetObject.transmission_type = el.data_value || null;
          break;
        case 21009:
          let airConditioningType = 'Unknown';
          switch (el.data_value) {
            case 'A':
              airConditioningType = 'Automatic';
              break;
            case 'S':
              airConditioningType = 'Semi-Automatic';
              break;
            case 'M':
              airConditioningType = 'Manual';
              break;
            default:
              airConditioningType = null;
              break;
          }
          // targetObject.advanced_air_conditioning = airConditioningType;
          targetObject.airConditioningType = el.data_value;
          break;
        case 21007:
          targetObject.no_of_zones_controlled = el.data_value || null;
          break;
        case 21008:
          if (el.data_value === 'Y') {
            targetObject.humidity_sensor = 'Yes';
          } else {
            targetObject.humidity_sensor = null;
          }
          break;
        case 21006:
          if (el.data_value === 'Y') {
            targetObject.rear_outlet = 'Yes';
          } else {
            targetObject.rear_outlet = null;
          }
          break;
        case 1604:
          if (['E', 'F', 'R'].includes(el.data_value)) {
            targetObject.Trailer_hitch = 'Yes';
          } else {
            targetObject.Trailer_hitch = null;
          }
          break;
        case 15601:
          if (el.data_value === 'S') {
            targetObject.sunroof = 'Yes';
          } else {
            targetObject.sunroof = null;
          }
          break;
        case 4503:
          if (el.data_value === 'Y') {
            targetObject.cruise_control = 'Yes';
          } else {
            targetObject.cruise_control = null;
          }
          break;
        case 60302:
          let autonomousLevel = 'Unknown';
          switch (el.data_value) {
            case 'S':
              autonomousLevel = '1';
              break;
            case 'F':
              autonomousLevel = '2';
              break;
            case '3':
              autonomousLevel = '3';
              break;
            case '4':
              autonomousLevel = '4';
              break;
            case '5':
              autonomousLevel = '5';
              break;
            default:
              autonomousLevel = 'Unknown';
              break;
          }
          targetObject.level_of_autonomous_control = autonomousLevel;
          break;
        case 60303:
          targetObject.overtaking = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 60304:
          targetObject.lane_changing = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 60307:
          targetObject.active_lane_control = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 60311:
          targetObject.highway_assist = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 59803:
          targetObject.android_auto = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 59817:
          targetObject.android_wireless_connection = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 59802:
          targetObject.apple_carplay = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 59816:
          targetObject.apple_wireless_connection = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 59807:
          targetObject.other_mobile_systems_1 = el.data_value === 'Y' ? 'Yes' : 'No';
          break;
        case 59806:
          targetObject.other_mobile_systems_2 = el.data_value === 'Y' ? 'Yes' : 'No';
          break;
        case 59805:
          targetObject.other_mobile_systems_3 = el.data_value === 'Y' ? 'Yes' : 'No';
          break;
        case 44804:
          targetObject.stream_music_from_bluetooth_device = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 44803:
          targetObject.connect_to_mobile_phone = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 52902:
          targetObject.engine_mapping = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 52905:
          targetObject.stability_control = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 52903:
          targetObject.steering_advanced_mode = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 52904:
          targetObject.suspension = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 52906:
          targetObject.traction_control = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 18409:
          targetObject.steering_wheel = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 21605:
          targetObject.door_mirrors = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 17811:
          targetObject.front_seats = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 17909:
          targetObject.rear_seats = el.data_value === 'Y' ? 'Yes' : null;
          break;
        case 17402:
          targetObject.upholestreryMaterial = el.data_value || null;
          break;
        case 5602:
          if (el.data_value.includes('F')) {
            targetObject.parking_sensor_front = 'Yes';
          }
          if (el.data_value.includes('R')) {
            targetObject.parking_sensor_rear = 'Yes';
          }
          if (el.data_value.includes('S')) {
            targetObject.parking_sensor_side = 'Yes';
          }
          break;
        case 5603:
          targetObject.parking_sensor_camera_based = el.data_value === 'C' ? 'Yes' : null;
          break;
        case 49403:
          targetObject.parking_assistance = el.data_value === 'F' ? 'Yes' : null;
          break;
        case 4101:
          targetObject.trunk_electric_close = ['B', 'O', 'P', 'S'].includes(el.data_value) ? 'Yes' : null;
          break;

        // case 9003:
        //   targetObject.head_up_display = el.data_value === 'Y' ? 'Yes' : null;
        //   break;

        case 9003:
          targetObject.head_up_display = el.data_value === 'Y' || el.data_value === 'P' || el.data_value === 'W' ? 'Yes' : null;
          break;
        case 70201:
          if (['B', 'O', 'P', 'S'].includes(el.data_value)) {
            targetObject.Advanced_Distance_and_Object_Sensing_Technology = 'Yes';
          } else {
            targetObject.Advanced_Distance_and_Object_Sensing_Technology = null;
          }
          break;
        default:
          return null;
        // Default if schema_id doesn't match known cases
      }

      // Set combined result for other_mobile_systems
      if (targetObject.other_mobile_systems_1 === 'Yes' && targetObject.other_mobile_systems_2 === 'Yes' && targetObject.other_mobile_systems_3 === 'Yes') {
        targetObject.other_mobile_systems = 'Yes';
      } else {
        targetObject.other_mobile_systems = 'No';
      }
    };

    // Add powerTrain_name to the Overview_of_Car category
    const powerTrainName = powerTrainResult[0]?.powerTrain_name || null;
    console.log('powerTrain_name:', powerTrainName);
    structuredData.Overview_of_Car[0].powerTrain_name = powerTrainName;

    // Add cargo_space to Dimension
    const cargoSpace = cargoSpaceResult[0]?.data_value || null;
    structuredData.Dimension[0].cargo_space = cargoSpace;
    queryResult.filter(item => schemaIds.Performance.includes(item.schema_id)).map(el => {
      updatePerformanceFields(el, structuredData.Performance[0]);
    });
    queryResult.filter(item => schemaIds.Dimension.includes(item.schema_id)).map(el => {
      updateDimensionFields(el, structuredData.Dimension[0]);
    });
    queryResult.filter(item => schemaIds.SafetyAndSecurity.includes(item.schema_id)).map(el => {
      updateSafetyField(el, structuredData.SafetyAndSecurity[0]);
    });
    queryResult.filter(item => schemaIds.Overview_of_Car.includes(item.schema_id)).map(el => {
      updateOverviewOfCar(el, structuredData.Overview_of_Car[0]);
    });
    queryResult.filter(item => schemaIds.Comfort.includes(item.schema_id)).map(el => {
      updateComfortField(el, structuredData.Comfort[0]);
    });
    res.json({
      status: true,
      message: _message.default[language].OPTIONS_RETRIEVED_SUCCESS,
      data: structuredData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};
exports.getPresentPageData = getPresentPageData;
const getOptionBuildRules = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      vehicle_id,
      option_id
    } = req.query;
    if (!vehicle_id) {
      return res.status(400).json({
        status: false,
        message: _message.default[language].VEHICLE_ID_AND_Language_ID_ERROR,
        data: null
      });
    }
    let resultSets;
    if (language === '19') {
      resultSets = await _database.sequelize.query(`
      SELECT 
      e.option_id,
      e.vehicle_id,
      ol.id_902 AS price,
      on_manuf.manuf_name,
      CASE 
          WHEN ol.option_type = 'C' THEN 
              CASE 
                  WHEN e.schema_id = 31101 THEN 'ExtColor'
                  WHEN e.schema_id = 33901 THEN 'IntColor'
              END
      END AS category,
      ob.rule_type AS 'rule',
      ob.condition AS 'condition',
      ob.option_rule AS 'optionRulesId',
      ob.id_902 AS newPrice
      FROM 
          equipment AS e
      LEFT JOIN 
          option_list AS ol ON e.option_id = ol.option_id AND e.vehicle_id = ol.vehicle_id
      LEFT JOIN 
          option_name AS on_manuf ON e.option_id = on_manuf.option_id AND e.vehicle_id = on_manuf.vehicle_id AND on_manuf.language_id = 19
      LEFT JOIN 
          option_build AS ob ON ol.option_id = ob.option_id AND ol.vehicle_id = ob.vehicle_id
      WHERE 
          e.vehicle_id = ${vehicle_id}
          AND e.schema_id IN (31101, 33901)
          AND (ol.option_type = 'C')
      UNION ALL
      SELECT 
      ol.option_id,
      ol.vehicle_id,
      ol.id_902 AS price,
      on_manuf.manuf_name,
      CASE 
          WHEN ol.option_type = 'P' THEN 'Pack'
          WHEN ol.option_type = 'O' THEN 'Options'
      END AS category,
      ob.rule_type AS 'rule',
      ob.condition AS 'condition',
      ob.option_rule AS 'optionRulesId',
      ob.id_902 AS newPrice
      FROM 
         option_list AS ol
      JOIN 
         option_name AS on_manuf ON ol.option_id = on_manuf.option_id AND ol.vehicle_id = on_manuf.vehicle_id AND on_manuf.language_id = 19
      LEFT JOIN 
         option_build AS ob ON ol.option_id = ob.option_id AND ol.vehicle_id = ob.vehicle_id
      WHERE 
         ol.vehicle_id = ${vehicle_id}
         AND ol.option_type IN ('P', 'O')
      ORDER BY 
        option_id;
      `, {
        replacements: {
          option_id,
          vehicle_id
        },
        type: _database.sequelize.QueryTypes.SELECT
      });
    } else if (language === '24') {
      resultSets = await _database.sequelize.query(`
      SELECT 
      e.option_id,
      e.vehicle_id,
      ol.manuf_name,
      ol.id_902 AS price,
      CASE 
          WHEN ol.option_type = 'C' THEN 
      CASE 
              WHEN e.schema_id = 31101 THEN 'ExtColor'
              WHEN e.schema_id = 33901 THEN 'IntColor'
          END
      END AS category,
      ob.rule_type AS 'rule',
      ob.condition AS 'condition',
      ob.option_rule AS 'optionRulesId'
      FROM 
      equipment AS e
      LEFT JOIN 
      option_list AS ol ON e.option_id = ol.option_id AND e.vehicle_id = ol.vehicle_id
      LEFT JOIN 
      option_build AS ob ON ol.option_id = ob.option_id AND ol.vehicle_id = ob.vehicle_id
      WHERE 
      e.vehicle_id = ${vehicle_id}
      AND e.schema_id IN (31101, 33901)
      AND (ol.option_type = 'C')
      UNION ALL
      SELECT 
      ol.option_id,
      ol.vehicle_id,
      ol.manuf_name,
      ol.id_902 AS price,
      CASE 
         WHEN ol.option_type = 'P' THEN 'Pack'
         WHEN ol.option_type = 'O' THEN 'Options'
      END AS category,
      ob.rule_type AS 'rule',
      ob.condition AS 'condition',
      ob.option_rule AS 'optionRulesId'
      FROM 
      option_list AS ol
      LEFT JOIN 
      option_build AS ob ON ol.option_id = ob.option_id AND ol.vehicle_id = ob.vehicle_id
      WHERE 
      ol.vehicle_id = ${vehicle_id}
      AND ol.option_type IN ('P', 'O')
      ORDER BY 
      option_id;
   `, {
        replacements: {
          option_id,
          vehicle_id
        },
        type: _database.sequelize.QueryTypes.SELECT
      });
    }
    console.log("resultSets: ", resultSets);
    const totalCount = resultSets.length;
    res.json({
      status: true,
      message: _message.default[language].OPTIONS_RETRIEVED_SUCCESS,
      totalCount: totalCount,
      data: resultSets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR,
      data: null
    });
  }
};
exports.getOptionBuildRules = getOptionBuildRules;