"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserInfoAndImage = exports.updateNews = exports.updateLanguageSettings = exports.updateFavorite = exports.updateFAQ = exports.updateContactById = exports.updateChartCategoryName = exports.updateChart = exports.resetPassword = exports.getNewsByType = exports.getNewsById = exports.getLanguageSettings = exports.getFavoriteById = exports.getFAQDetailsById = exports.getFAQByType = exports.getContactById = exports.getChartsByType = exports.getChartById = exports.getBrandLogoById = exports.getAllNews = exports.getAllFavorites = exports.getAllFAQ = exports.getAllContacts = exports.getAllCharts = exports.getAllChartCategoryNames = exports.getAllBrandLogo = exports.getAdminUserInfo = exports.forgotPasswordLink = exports.deleteNews = exports.deleteLanguageSettings = exports.deleteFavorite = exports.deleteFAQ = exports.deleteContactById = exports.deleteChart = exports.createNews = exports.createFavorite = exports.createFAQ = exports.createContact = exports.createChartCategoryName = exports.bulkUpdateFavoritePositions = exports.bulkUpdateChartPositions = exports.adminSignIn = exports.addBrandLogo = void 0;
var _news = _interopRequireDefault(require("../../models/news"));
var _adminUser = _interopRequireDefault(require("../../models/adminUser"));
var _contact = _interopRequireDefault(require("../../models/contact"));
var _brandLogo = _interopRequireDefault(require("../../models/brandLogo"));
var _faq = _interopRequireDefault(require("../../models/faq"));
var _favourites = _interopRequireDefault(require("../../models/favourites"));
var _chart = _interopRequireDefault(require("../../models/chart"));
var _chartCategoryName = _interopRequireDefault(require("../../models/chartCategoryName"));
var _languageSetting = _interopRequireDefault(require("../../models/languageSetting"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _genreateToken = require("../../utils/genreateToken");
var _config = _interopRequireDefault(require("config"));
var _common = require("../../utils/common");
var _statusCode = _interopRequireDefault(require("../../utils/statusCode.utils"));
var _message = _interopRequireDefault(require("../../utils/message.utils"));
var _sequelize = require("sequelize");
var _database = require("../../db/database");
var _multer = _interopRequireDefault(require("../../utils/multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const {
  frontendUrl
} = _config.default.get("app");

// import statusCode from '../../utils/statusCode.utils';

const {
  JWT_SECRET,
  JWT_REFRESH_EXPIRATION_SHORT,
  JWT_REFRESH_EXPIRATION_LONG,
  COOKIE_EXPIRATION_SHORT,
  COOKIE_EXPIRATION_LONG
} = _config.default.get("JwtCredentials");

// const setLanguage=(query)=>
// {
// let { language } = query;
// if(!language) {
//   return '24'
// }
// return language
// }

const adminSignIn = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      email,
      password,
      rememberMe
    } = req.body;
    const user = await _adminUser.default.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(_statusCode.default.NOT_FOUND).json(_message.default[language].EMAIL_NOT_FOUND);
    }
    const passwordValid = await _bcrypt.default.compare(password, user.password);
    if (!passwordValid) {
      return res.status(_statusCode.default.NOT_FOUND).json(_message.default[language].WRONG_CREDENTIALS_ENTERED);
    }

    // Generate JWT token
    const token = _jsonwebtoken.default.sign({
      id: user.id
    }, JWT_SECRET, {
      expiresIn: rememberMe ? JWT_REFRESH_EXPIRATION_LONG : JWT_REFRESH_EXPIRATION_SHORT
    });

    // Set a cookie with the JWT token
    res.cookie('rememberMe', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // Set to true in production for secure cookies
      maxAge: rememberMe ? COOKIE_EXPIRATION_LONG : COOKIE_EXPIRATION_SHORT
    });
    res.status(_statusCode.default.SUCCESS_CODE).send({
      status: _statusCode.default.SUCCESS_CODE,
      isSuccess: true,
      message: _message.default[language].LOGIN_SUCCESS,
      id: user.id,
      email: user.email,
      accessToken: token
    });
  } catch (error) {
    console.error(error);
    return res.status(_statusCode.default.INTERNAL_SERVER_ERROR).send(_message.default[language].INTERNAL_SERVER_ERROR);
  }
};
exports.adminSignIn = adminSignIn;
const forgotPasswordLink = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    email
  } = req.body;
  try {
    // Use Sequelize findOne with 'where' option to find a user by email
    const user = await _adminUser.default.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(_statusCode.default.NOT_FOUND).json(_message.default[language].USER_NOT_FOUND);
    }

    // Generate reset token and expiration date
    const resetToken = (0, _genreateToken.generateResetToken)();
    const resetTokenExpiration = new Date(Date.now() + 3600000);

    // Update user model with the new reset token and expiration date
    await _adminUser.default.update({
      resetToken,
      resetTokenExpiresAt: resetTokenExpiration
    }, {
      where: {
        email
      }
    });
    const subject = "Password Reset";
    const url = `${frontendUrl}/reset-password/${resetToken}`;

    // Create the entire HTML content
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif;">
  
      <p>Dear User,</p>
  
      <p>Click the following link to reset your password:</p>
      <a href="${url}" style="color: blue; text-decoration: none;">Click Me to Reset Password</a>
  
      <p>If you did not request a password reset, please ignore this email.</p>
  
      <p>Thanks and regards,<br/>Team Drivo</p>
  
    </body>
    </html>
  `;
    // Use the updated 'adminUser' model to send the mail
    await (0, _common.sendMail)(subject, null, user.email, htmlContent);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      isSuccess: true,
      message: _message.default[language].PASSWORD_RESET_LINK_SENT_SUCCESSFULLY
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.forgotPasswordLink = forgotPasswordLink;
const resetPassword = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    token
  } = req.query;
  const {
    password,
    confirmPassword
  } = req.body;
  try {
    // Find the user by the reset token
    const user = await _adminUser.default.findOne({
      where: {
        resetToken: token,
        resetTokenExpiresAt: {
          [_sequelize.Op.gt]: new Date()
        } // Check if the reset token is still valid
      }
    });
    if (!user) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].INVALID_EXPIRED_LINK
      });
    }
    if (password !== confirmPassword) {
      return res.status(_statusCode.default.ERROR_CODE).json({
        message: _message.default[language].PASSWORD_CONFIRM_PASSWORD_NOT_MATCH
      });
    }
    const changedPassword = await _bcrypt.default.hash(password, 10);

    // Update the user's password and reset token details
    await _adminUser.default.update({
      password: changedPassword,
      resetToken: null,
      resetTokenExpiresAt: null
    }, {
      where: {
        email: user.email
      }
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      isSuccess: true,
      message: _message.default[language].PASSWORD_RESET_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.resetPassword = resetPassword;
const createNews = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      brand,
      model,
      bodyType,
      version,
      colorName,
      image,
      title,
      shortDescription,
      description,
      type,
      newsSource,
      trimLevel
    } = req.body;
    await _news.default.create({
      brand,
      model,
      bodyType,
      version,
      color: colorName,
      image,
      title,
      shortDescription,
      description,
      trim: trimLevel,
      type,
      newsSource
    });
    res.status(_statusCode.default.CREATE_SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].NEWS_CREATED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.createNews = createNews;
const getNewsByType = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const ITEMS_PER_PAGE = 6;
  const requestedType = req.query.type;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const {
      count,
      rows
    } = await _news.default.findAndCountAll({
      where: {
        type: requestedType,
        is_deleted: false
      },
      offset,
      limit: ITEMS_PER_PAGE
    });
    if (count === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_NEWS_FOUND} ${requestedType}`
      });
    }
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      newsList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getNewsByType = getNewsByType;
const getAllNews = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const ITEMS_PER_PAGE = parseInt(req.query?.limit, 6) || 6;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const searchTerm = req.query.searchTerm || '';
  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const {
      count,
      rows
    } = await _news.default.findAndCountAll({
      where: {
        is_deleted: false,
        [_sequelize.Op.or]: [{
          type: {
            [_sequelize.Op.like]: `%${searchTerm}%`
          }
        }]
      },
      offset,
      limit: ITEMS_PER_PAGE,
      order: [['createdAt', 'DESC']]
    });
    if (count === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_NEWS_FOUND}`
      });
    }
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      newsList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getAllNews = getAllNews;
const getNewsById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    // Find the news by ID
    const newsRecord = await _news.default.findByPk(id);
    if (!newsRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_NEWS_FOUND_WITH_ID} ${id}`
      });
    }

    // You can customize the response format based on your needs
    const newsDetails = {
      id,
      brand: newsRecord.brand,
      model: newsRecord.model,
      bodyType: newsRecord.bodyType,
      version: newsRecord.version,
      image: newsRecord.image,
      title: newsRecord.title,
      shortDescription: newsRecord.shortDescription,
      description: newsRecord.description,
      type: newsRecord.type,
      newsSource: newsRecord.newsSource,
      colorName: newsRecord.color
      // Add more fields as needed
    };
    res.status(_statusCode.default.SUCCESS_CODE).json(newsDetails);
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getNewsById = getNewsById;
const updateNews = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    brand,
    model,
    bodyType,
    version,
    colorName,
    id,
    image,
    title,
    shortDescription,
    trimLevel,
    description,
    type,
    newsSource
  } = req.body;
  try {
    const newsRecord = await _news.default.findByPk(id);
    if (!newsRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_NEWS_FOUND_WITH_ID} ${id}`
      });
    }
    await newsRecord.update({
      brand,
      model,
      bodyType,
      version,
      color: colorName,
      image,
      title,
      trim: trimLevel,
      shortDescription,
      description,
      type,
      newsSource
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].NEWS_UPDATED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.updateNews = updateNews;
const deleteNews = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    const newsRecord = await _news.default.findByPk(id);
    if (!newsRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_NEWS_FOUND_WITH_ID} ${id}`
      });
    }
    await newsRecord.update({
      is_deleted: true
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].NEWS_DELETED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.deleteNews = deleteNews;
const createFAQ = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      typeName,
      question,
      answer
    } = req.body;
    await _faq.default.create({
      typeName,
      question,
      answer
    });
    res.status(_statusCode.default.CREATE_SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].FAQ_CREATED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.createFAQ = createFAQ;
const getFAQByType = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const ITEMS_PER_PAGE = 4;
  const requestedType = req.query.type;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const {
      count,
      rows
    } = await _faq.default.findAndCountAll({
      where: {
        typeName: requestedType,
        is_deleted: false
      },
      offset,
      limit: ITEMS_PER_PAGE
    });
    if (count === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_FAQ_FOUND_FOR_TYPE} ${requestedType}`
      });
    }
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    res.status(200).json({
      faqList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getFAQByType = getFAQByType;
const getAllFAQ = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const ITEMS_PER_PAGE = parseInt(req.query?.limit, 10) || 10;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const searchTerm = req.query.searchTerm || '';
  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const {
      count,
      rows
    } = await _faq.default.findAndCountAll({
      where: {
        is_deleted: false,
        [_sequelize.Op.or]: [{
          typeName: {
            [_sequelize.Op.like]: `%${searchTerm}%`
          }
        }]
      },
      offset,
      limit: ITEMS_PER_PAGE,
      order: [['createdAt', 'DESC']]
    });
    if (count === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_FAQ_FOUND_FOR_TYPE}`
      });
    }
    const totalPages = Math.floor(count / ITEMS_PER_PAGE) + (count % ITEMS_PER_PAGE !== 0 ? 1 : 0);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      faqList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getAllFAQ = getAllFAQ;
const deleteFAQ = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    const faqRecord = await _faq.default.findByPk(id);
    if (!faqRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_FAQ_FOUND_WITH_ID} ${id}`
      });
    }
    await faqRecord.update({
      is_deleted: true
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].FAQ_DELETED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.deleteFAQ = deleteFAQ;
const updateFAQ = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id,
    typeName,
    question,
    answer
  } = req.body;
  try {
    const faqRecord = await _faq.default.findByPk(id);
    if (!faqRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_FAQ_FOUND_WITH_ID} ${id}`
      });
    }
    await faqRecord.update({
      typeName,
      question,
      answer
    });
    console.log(faqRecord);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].FAQ_DELETED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.updateFAQ = updateFAQ;
const getFAQDetailsById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    const faqRecord = await _faq.default.findByPk(id);
    if (!faqRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_FAQ_FOUND_WITH_ID} ${id}`
      });
    }

    // Extract relevant fields from the FAQ record
    const {
      typeName,
      question,
      answer
    } = faqRecord;

    // You can customize the response format based on your needs
    const faqDetails = {
      id,
      typeName,
      question,
      answer
      // Add more fields as needed
    };
    res.status(_statusCode.default.SUCCESS_CODE).json(faqDetails);
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getFAQDetailsById = getFAQDetailsById;
const createContact = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      type,
      email,
      phoneNo
    } = req.body;

    // Create the contact
    const contact = await _contact.default.create({
      type,
      email,
      phoneNo
    });
    res.status(_statusCode.default.CREATE_SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].CONTACT_CREATED_SUCCESS,
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.createContact = createContact;
const getAllContacts = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const contacts = await _contact.default.findAll({
      where: {
        is_deleted: false
      }
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getAllContacts = getAllContacts;
const deleteContactById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    // Find the contact by ID
    const contact = await _contact.default.findByPk(id);
    if (!contact) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].CONTACT_NOT_FOUND
      });
    }

    // Soft delete the contact by updating is_deleted to true
    await contact.update({
      is_deleted: true
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].CONTACT_DELETED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.deleteContactById = deleteContactById;
const getContactById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    // Find the contact by ID
    const contact = await _contact.default.findByPk(id);
    if (!contact) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].CONTACT_NOT_FOUND
      });
    }

    // You can customize the response format based on your needs
    const contactDetails = {
      id,
      type: contact.type,
      email: contact.email,
      phoneNo: contact.phoneNo
      // Add more fields as needed
    };
    res.status(_statusCode.default.SUCCESS_CODE).json(contactDetails);
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getContactById = getContactById;
const updateContactById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  const {
    type,
    email,
    phoneNo
  } = req.body;
  try {
    // Find the contact by ID
    const contact = await _contact.default.findByPk(id);
    if (!contact) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].CONTACT_NOT_FOUND
      });
    }

    // Update the contact fields
    await contact.update({
      type,
      email,
      phoneNo
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].CONTACT_UPDATED_SUCCESS,
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// Create Favorite
exports.updateContactById = updateContactById;
const createFavorite = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      carName,
      priceRange,
      imageUrl
    } = req.body;
    const newFavorite = await _favourites.default.create({
      carName,
      priceRange,
      imageUrl
    });
    res.status(_statusCode.default.CREATE_SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].FAVORITE_CREATED_SUCCESS,
      favorite: newFavorite
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// Get Favorite by ID
exports.createFavorite = createFavorite;
const getFavoriteById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      id
    } = req.params;
    const favorite = await _favourites.default.findByPk(id);
    if (!favorite) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        success: false,
        message: _message.default[language].FAVORITE_NOT_FOUND
      });
    }
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      favorite
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

//Get All favourite
exports.getFavoriteById = getFavoriteById;
const getAllFavorites = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const favorites = await _favourites.default.findAll({
      where: {
        is_deleted: false
      }
    });
    if (favorites.length === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        success: false,
        message: _message.default[language].NO_FAVORITES_FOUND
      });
    }
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      favorites
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

//Get All Chrts in Positions        //No Use

// export const getAllChartsForPositions = async (req, res) => {
//   let language = setLanguage(req.query);
//   try {
//     const ChartsPositions = await Charts.findAll({
//       where: {
//         is_deleted: false,
//       },
//     });

//     if (Charts.length === 0) {
//       return res.status(statusCode.NOT_FOUND).json({ success: false, message: messages[language].CHART_FETCHED_SUCCESS });
//     }

//     res.status(statusCode.SUCCESS_CODE).json({ success: true, ChartsPositions });
//   } catch (error) {
//     console.error(error);
//     res.status(statusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: messages[language].INTERNAL_SERVER_ERROR });
//   }
// };

// Update Favorite
exports.getAllFavorites = getAllFavorites;
const updateFavorite = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      id
    } = req.params; // Assuming the id is in the route parameters
    const {
      brand,
      model,
      colorName,
      bodyType,
      version,
      trim,
      price
    } = req.body;
    const existingFavorite = await _favourites.default.findByPk(id);
    if (!existingFavorite) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        success: false,
        message: _message.default[language].FAVORITE_NOT_FOUND
      });
    }

    // Update only the fields that are provided in the request body
    await existingFavorite.update({
      brand: brand,
      model: model,
      bodyType: bodyType,
      version: version,
      color: colorName,
      trim: trim,
      priceRange: price
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].FAVORITE_UPDATED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// Delete Favorite
exports.updateFavorite = updateFavorite;
const deleteFavorite = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      id
    } = req.params;
    const existingFavorite = await _favourites.default.findByPk(id);
    if (!existingFavorite) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        success: false,
        message: _message.default[language].FAVORITE_NOT_FOUND
      });
    }
    await existingFavorite.destroy();
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].FAVORITE_DELETED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.deleteFavorite = deleteFavorite;
const updateUserInfoAndImage = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      id
    } = req.query;
    const {
      firstName,
      lastName
    } = req.body;

    // Find the user by ID
    const user = await _adminUser.default.findOne({
      where: {
        id: id
      }
    });
    if (!user) {
      return res.status(404).json({
        message: _message.default[language].USER_NOT_FOUND
      });
    }

    // Build the update object with the provided fields
    const updateFields = {};
    if (firstName !== undefined) {
      updateFields.firstName = firstName;
    }
    if (lastName !== undefined) {
      updateFields.lastName = lastName;
    }

    // Handle image upload
    let updatedImageUrl = user.imageUrl; // Default to existing image URL
    if (req.file) {
      console.log("dsgdshgdshgdshjds", req.file);
      // If an image is uploaded, use its filename
      updatedImageUrl = req.file.path;
    }

    // Update user information if at least one field is provided
    if (Object.keys(updateFields).length > 0 || updatedImageUrl !== undefined) {
      const user = await _adminUser.default.update(_objectSpread(_objectSpread({}, updateFields), {}, {
        imageUrl: updatedImageUrl
      }), {
        where: {
          id: id
        }
      });
      return res.status(200).json({
        status: 200,
        isSuccess: true,
        message: _message.default[language].USER_UPDATED_SUCCESSFULLY,
        updatedUser: user // Access the first element of the updated records array
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.updateUserInfoAndImage = updateUserInfoAndImage;
const getAdminUserInfo = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const user = await _adminUser.default.findOne({
      where: {
        id: req.query.id
      }
    });
    if (!user) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        success: false,
        message: _message.default[language].USER_NOT_FOUND
      });
    }
    return res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].ADMINFOUND,
      user
    });
  } catch (error) {
    return res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// export const createChart = async (req, res) => {
//   try {
//     const { image, type, carModel, price } = req.body;

//     await Charts.create({ image, type, carModel, price });

//     res.status(statusCode.CREATE_SUCCESS_CODE).json({ success: true, message: messages.CHART_CREATED_SUCCESS });
//   } catch (error) {
//     console.error(error);
//     res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
//   }
// };
exports.getAdminUserInfo = getAdminUserInfo;
const getChartsByType = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const ITEMS_PER_PAGE = 10;
  const requestedType = req.query.type;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const {
      count,
      rows
    } = await _chart.default.findAndCountAll({
      where: {
        type: requestedType,
        is_deleted: false
      },
      offset,
      limit: ITEMS_PER_PAGE
    });
    if (count === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_CHARTS_FOUND} ${requestedType}`
      });
    }
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      chartsList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getChartsByType = getChartsByType;
const getAllCharts = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const ITEMS_PER_PAGE = parseInt(req.query?.limit, 10) || 10;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const searchTerm = req.query.searchTerm || '';
  try {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const {
      count,
      rows
    } = await _chart.default.findAndCountAll({
      where: {
        is_deleted: false,
        [_sequelize.Op.or]: [{
          type: {
            [_sequelize.Op.like]: `%${searchTerm}%`
          }
        }]
      },
      offset,
      limit: ITEMS_PER_PAGE
    });
    if (count === 0) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_CHARTS_FOUND}`
      });
    }
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      chartsList: rows,
      totalPages,
      currentPage: page,
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: count
    });
  } catch (error) {
    console.error(error.message);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getAllCharts = getAllCharts;
const bulkUpdateChartPositions = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const updates = req.body;

    // Validate that updates is an array
    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: _message.default[language].INVALID_FORMAT
      });
    }

    // Check for duplicate IDs and positions in the updates array
    const uniqueIds = new Set();
    const uniquePositions = new Set();
    for (const {
      id,
      position
    } of updates) {
      if (uniqueIds.has(id)) {
        return res.status(400).json({
          success: false,
          message: _message.default[language].DUPLICATE_ID_AND_FORMAT
        });
      }
      uniqueIds.add(id);
      if (uniquePositions.has(position)) {
        return res.status(400).json({
          success: false,
          message: _message.default[language].DUPLICATE_POSITION_FOUND
        });
      }
      uniquePositions.add(position);
    }
    const updatePromises = updates.map(({
      id,
      position
    }) => {
      // Validate that id and position are provided
      if (!id || !position) {
        return res.status(400).json({
          success: false,
          message: _message.default[language].ID_POSITION_REQUIRED
        });
      }
      return _chart.default.update({
        position
      }, {
        where: {
          id
        }
      });
    });
    await Promise.all(updatePromises);
    res.status(200).json({
      success: true,
      message: _message.default[language].BULK_UPDATE_CHART_POSITION
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.bulkUpdateChartPositions = bulkUpdateChartPositions;
const bulkUpdateFavoritePositions = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const updates = req.body;

    // Validate that updates is an array
    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        message: _message.default[language].INVALID_FORMAT
      });
    }

    // Check for duplicate IDs and positions in the updates array
    const uniqueIds = new Set();
    const uniquePositions = new Set();
    for (const {
      id,
      position
    } of updates) {
      if (uniqueIds.has(id)) {
        return res.status(400).json({
          success: false,
          message: _message.default[language].DUPLICATE_ID_AND_FORMAT
        });
      }
      uniqueIds.add(id);
      if (uniquePositions.has(position)) {
        return res.status(400).json({
          success: false,
          message: _message.default[language].DUPLICATE_POSITION_FOUND
        });
      }
      uniquePositions.add(position);
    }
    const updatePromises = updates.map(({
      id,
      position
    }) => {
      // Validate that id and position are provided
      if (!id || !position) {
        return res.status(400).json({
          success: false,
          message: _message.default[language].ID_POSITION_REQUIRED
        });
      }
      return _favourites.default.update({
        position
      }, {
        where: {
          id
        }
      });
    });
    await Promise.all(updatePromises);
    res.status(200).json({
      success: true,
      message: _message.default[language].BULK_UPDATE_CHART_POSITION
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.bulkUpdateFavoritePositions = bulkUpdateFavoritePositions;
const getChartById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    // Find the chart by ID
    const chartRecord = await _chart.default.findByPk(id);
    if (!chartRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_CHART_FOUND_WITH_ID} ${id}`
      });
    }

    // Customize the response format based on your needs
    const chartDetails = {
      id,
      brand: chartRecord.brand,
      model: chartRecord.model,
      bodyType: chartRecord.bodyType,
      version: chartRecord.version,
      type: chartRecord.type,
      price: chartRecord.price,
      color: chartRecord.color,
      is_deleted: chartRecord.is_deleted
    };
    res.status(_statusCode.default.SUCCESS_CODE).json(chartDetails);
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getChartById = getChartById;
const updateChart = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  const {
    brand,
    model,
    bodyType,
    version,
    price,
    colorName,
    type,
    trim
  } = req.body;
  try {
    const chartRecord = await _chart.default.findByPk(id);
    if (!chartRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        success: false,
        message: _message.default[language].NOT_FOUND
      });
    }
    await chartRecord.update({
      brand,
      model,
      bodyType,
      version,
      price,
      color: colorName,
      trim,
      type
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].CHART_UPDATED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.updateChart = updateChart;
const deleteChart = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  const {
    id
  } = req.params;
  try {
    const chartRecord = await _chart.default.findByPk(id);
    if (!chartRecord) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: `${_message.default[language].NO_CHART_FOUND_WITH_ID} ${id}`
      });
    }
    await chartRecord.update({
      is_deleted: true
    });
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].CHART_DELETED_SUCCESS
    });
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.deleteChart = deleteChart;
const addBrandLogo = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      brand
    } = req.query;
    const {
      schemaId
    } = req.query;
    console.log("file: ", req.file?.path);
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };

    // Find brand by its name and language_id
    if (!req.file) {
      return res.json({
        status: _statusCode.default.ERROR_CODE,
        isSuccess: false,
        message: _message.default[language].NO_IMAGE_FILE_FOR_BRAND_PROVIDED
      });
    }
    const brandExist = await _brandLogo.default.findOne({
      where: {
        brand: brand,
        schema_id: brandSchemaMap[language] || schemaId
      }
    });
    let updatedImageUrl;
    if (brandExist && req.file) {
      // Use existing image URL if brand exists
      brandExist.imageUrl = req.file?.path;
      // Update the existing brand with the new image URL
      await brandExist.save(); // Use save on the instance, not on the model
    } else if (!brandExist) {
      // If the brand doesn't exist, you may want to create a new entry
      // I assume that you have a model method like `brandLogo.create` for creating a new entry
      if (req.file) {
        console.log("Uploaded File: ", req.file);

        // Create a new entry with brand, language_id, and imageUrl
        await _brandLogo.default.create({
          brand: brand,
          schema_id: brandSchemaMap[language],
          imageUrl: req.file?.path
        });
      }
    }
    return res.json({
      status: _statusCode.default.SUCCESS_CODE,
      isSuccess: true,
      message: _message.default[language].BRAND_UPDATED_SUCCESSFULLY,
      // Adjust this based on your messages
      updatedImageUrl: updatedImageUrl
    });
  } catch (error) {
    console.error(error.message, "ffggggg");
    return res.status(500).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.addBrandLogo = addBrandLogo;
const getBrandLogoById = async (req, res) => {
  let language = (0, _common.setLanguage)(req.query);
  try {
    const {
      id
    } = req.query;
    const brandExist = await _brandLogo.default.findByPk(id);
    if (brandExist) {
      return res.json({
        status: _statusCode.default.SUCCESS_CODE,
        isSuccess: true,
        message: _message.default[language].BRANDS_WITH_LOGO,
        // Adjust this based on your messages
        brandExist: brandExist
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getBrandLogoById = getBrandLogoById;
const getAllBrandLogo = async (req, res) => {
  try {
    const limit = parseInt(req.query?.limit, 10) || 10;
    const page = req.query?.page || 1;
    const offset = (page - 1) * limit;
    let {
      language
    } = req.query;
    console.log("limit", limit, page);
    const brandSchemaMap = {
      "19": "111",
      // language_id : schema_id
      "24": "128"
    };
    const brandExist = await _brandLogo.default.findAndCountAll({
      where: {
        schema_id: brandSchemaMap[language]
      },
      limit: limit,
      offset: offset
    });
    const totalBrands = brandExist.rows;
    const totalPage = Math.floor(brandExist.count / limit) + (brandExist.count % limit !== 0 ? 1 : 0);
    // console.log("brandExist",brandExist)
    console.log("totalPage", totalPage);
    console.log("count", brandExist.count);
    if (brandExist) {
      return res.json({
        status: _statusCode.default.SUCCESS_CODE,
        isSuccess: true,
        message: _message.default[language].BRANDS_WITH_LOGO,
        // Adjust this based on your messages
        count: brandExist.count,
        totalPages: totalPage,
        pageSize: limit,
        currentPage: page,
        data: totalBrands
      });
    } else {
      return res.status(404).json({
        message: _message.default[language].NO_DATA
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// Admin Language Control Section
exports.getAllBrandLogo = getAllBrandLogo;
const getLanguageSettings = async (req, res) => {
  let {
    language
  } = req.query;
  try {
    const settings = await _languageSetting.default.findOne();
    if (settings) {
      res.status(_statusCode.default.SUCCESS_CODE).json({
        success: true,
        message: _message.default[language].LANGUAGE_SETTINGS_RETRIEVED_SUCCESS,
        settings: {
          id: settings.id,
          englishEnabled: settings.englishEnabled,
          danishEnabled: settings.danishEnabled,
          dropdownVisible: settings.dropdownVisible
        }
      });
    } else {
      res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].SETTINGS_NOT_FOUND
      });
    }
  } catch (error) {
    console.error(error);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// Create or Update LanguageSettings
exports.getLanguageSettings = getLanguageSettings;
const updateLanguageSettings = async (req, res) => {
  let {
    language
  } = req.query;
  try {
    const id = req.body.id || 0;
    let existingSettings = await _languageSetting.default.findOne({
      where: {
        id
      }
    });

    // If no record found, create new settings
    if (!existingSettings) {
      existingSettings = await _languageSetting.default.create(req.body);
      return res.status(_statusCode.default.SUCCESS_CODE).json({
        success: true,
        message: _message.default[language].LANGUAGE_SETTINGS_CREATED_SUCCESS,
        settings: existingSettings
      });
    }

    // If record found, update settings
    const [updatedRowsCount, updatedSettings] = await _languageSetting.default.update(req.body, {
      where: {
        id
      },
      returning: true
    });
    if (updatedRowsCount === 0) {
      // If no rows were updated, it means the update operation failed
      return res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
        message: _message.default[language].INTERNAL_SERVER_ERROR
      });
    }

    // If at least one row was updated, return success with the updated settings
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].LANGUAGE_SETTINGS_UPDATED_SUCCESS,
      settings: updatedSettings[0]
    });
  } catch (err) {
    console.error(err);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// Delete LanguageSettings
exports.updateLanguageSettings = updateLanguageSettings;
const deleteLanguageSettings = async (req, res) => {
  let {
    language
  } = req.query;
  try {
    const id = req.params.id;
    const existingSettings = await _languageSetting.default.findOne({
      where: {
        id
      }
    });
    if (!existingSettings) {
      // If no record is found with the given ID, return a "Not Found" response
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].NO_RECORD_SETTING_FOUND
      });
    }

    // If the record exists, proceed with deletion
    const deletedRowsCount = await _languageSetting.default.destroy({
      where: {
        id
      }
    });

    // Check if any rows were deleted
    if (deletedRowsCount === 0) {
      // If no rows were deleted, it means the deletion operation failed
      return res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
        message: _message.default[language].INTERNAL_SERVER_ERROR
      });
    }

    // If at least one row was deleted, return success message
    res.status(_statusCode.default.SUCCESS_CODE).json({
      success: true,
      message: _message.default[language].LANGUAGE_SETTING_DELETED_SUCCESS
    });
  } catch (err) {
    console.error(err);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// API to create a new chart category name
exports.deleteLanguageSettings = deleteLanguageSettings;
const createChartCategoryName = async (req, res) => {
  let {
    language
  } = req.query;
  try {
    const {
      charName
    } = req.body;
    const newChartCategoryName = await _chartCategoryName.default.create({
      charName
    });
    res.status(_statusCode.default.CREATE_SUCCESS_CODE).json(newChartCategoryName);
  } catch (err) {
    console.error(err);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// API to update a chart category name by ID
exports.createChartCategoryName = createChartCategoryName;
const updateChartCategoryName = async (req, res) => {
  let {
    language
  } = req.query;
  try {
    const id = req.body.id;
    const {
      charName
    } = req.body;
    const existingChartCategoryName = await _chartCategoryName.default.findByPk(id);
    if (!existingChartCategoryName) {
      return res.status(_statusCode.default.NOT_FOUND).json({
        message: _message.default[language].CHART_CATEGORY_NAME_NOT_FOUND
      });
    }
    existingChartCategoryName.charName = charName;
    await existingChartCategoryName.save();
    res.json(existingChartCategoryName);
  } catch (err) {
    console.error(err);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};

// API to get all chart category names
exports.updateChartCategoryName = updateChartCategoryName;
const getAllChartCategoryNames = async (req, res) => {
  let {
    language
  } = req.query;
  try {
    // Find all chart category names
    const allChartCategoryNames = await _chartCategoryName.default.findAll();
    res.status(_statusCode.default.SUCCESS_CODE).json(allChartCategoryNames);
  } catch (err) {
    console.error(err);
    res.status(_statusCode.default.INTERNAL_SERVER_ERROR).json({
      message: _message.default[language].INTERNAL_SERVER_ERROR
    });
  }
};
exports.getAllChartCategoryNames = getAllChartCategoryNames;