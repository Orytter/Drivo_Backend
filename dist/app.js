"use strict";

var _express = _interopRequireWildcard(require("express"));
var _itemData = require("./middleware/itemData");
require("./db/database");
require("./models/tableSync");
var _items = _interopRequireDefault(require("./routes/items.routes"));
var _admin = _interopRequireDefault(require("./routes/admin.routes"));
var _drivo = _interopRequireDefault(require("./routes/drivo.routes"));
var _ftpScheduler = _interopRequireDefault(require("./routes/ftpScheduler"));
var _zohoAuthModules = _interopRequireDefault(require("./controller/zoho_CRM/zohoAuthModules"));
var _jato = _interopRequireDefault(require("./routes/jato.routes"));
require("./controller/JatoFtp/jatoftp");
var _config = _interopRequireDefault(require("config"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const cors = require("cors");
const {
  port
} = _config.default.get("env");
const app = (0, _express.default)();
app.use((0, _express.json)());
console.log(_path.default.join(__dirname, "..", "public"));
app.use("/public", _express.default.static(_path.default.join(__dirname, "..", "public")));
const PORT = port || 3000;
app.get("/", async (req, res) => {
  res.json({
    status: true,
    message: "Our node.js app works fine"
  });
});
var corsOptions = {
  origin: ["https://www.drivo.dk", "https://drivo.dk", "http://drivo.dk", "https://admin.drivo.dk", "http://admin.drivo.dk", "http://18.184.209.15:3534", "http://18.184.209.15:3536", "http://18.184.209.15:3535", "http://18.184.209.15:3537", "http://localhost:4200", "http://localhost:4300", "http://127.0.0.1:3000", "http://54.190.192.105:3536", "http://54.190.192.105:3534"]
};
app.use(cors(corsOptions));
app.get('/items', _itemData.dateTime, _itemData.itemsData);
app.use('/birds', _items.default);
app.use('/api/v1', _admin.default);
app.use('/api/v1', _drivo.default);
app.use('/api/v1', _ftpScheduler.default);
app.use('/api/v1', _jato.default);
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));