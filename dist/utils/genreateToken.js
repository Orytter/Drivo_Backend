"use strict";

const crypto = require('crypto');
const generateResetToken = () => {
  // Generate a random buffer for the token
  const buffer = crypto.randomBytes(32);

  // Convert the buffer to a hexadecimal string
  const token = buffer.toString('hex');
  return token;
};
module.exports = {
  generateResetToken
};