"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _config = _interopRequireDefault(require("config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  smtpUser,
  smtpPassword,
  smtpPort,
  smtpServer
} = _config.default.get("smtp");
async function sendMail(subject, text, to, html) {
  try {
    // Create a reusable transporter object using the default SMTP transport
    const transporter = _nodemailer.default.createTransport({
      host: smtpServer,
      port: smtpPort,
      secure: false,
      // true for 465, false for other ports (e.g., 587)
      auth: {
        user: smtpUser,
        pass: smtpPassword
      }
    });

    // Set up email data
    const mailOptions = {
      from: smtpUser,
      to,
      subject,
      text,
      html
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending mail:', error);
    return false;
  }
}

//Language Common 

const setLanguage = query => {
  let {
    language
  } = query;
  if (!language) {
    return '24'; // Default language code
  }
  return language;
};
module.exports = {
  sendMail,
  setLanguage
};