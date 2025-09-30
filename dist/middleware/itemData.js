"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemsData = exports.dateTime = void 0;
var _items = _interopRequireDefault(require("../services/items"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const dateTime = async (req, res, next) => {
  console.log("I am here");
  next();
};
exports.dateTime = dateTime;
const itemsData = async (req, res) => {
  res.json({
    status: true,
    message: "Fetched all items",
    data: _items.default
  });
};
exports.itemsData = itemsData;