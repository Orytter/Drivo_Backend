import express, { json } from "express";

import { dateTime, itemsData } from "./middleware/itemData.js";
import "./db/database.js";
import "./models/tableSync.js";
import birds from './routes/items.routes.js';
import admin from './routes/admin.routes.js';
import drivo from './routes/drivo.routes.js';
import ftpScheduler from './routes/ftpScheduler.js';
import zohoCRM_AUTH_APIS from "./controller/zoho_CRM/zohoAuthModules.js" ;
import zohoController from "./routes/drivo.routes.js";

import jatoRoutes from "./routes/jato.routes.js";
import "./controller/JatoFtp/jatoftp.js"

import  Config from "config";
import cors from "cors";
const { port } = Config.get("env");
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(json());

app.use("/public", express.static(path.join(__dirname, "..", "public")))


const PORT = port || 3000;

app.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works fine" });
});

var corsOptions = {
  origin: 
  [
    "https://www.drivo.dk",
    "https://drivo.dk",
    "http://drivo.dk",
    "https://admin.drivo.dk",
    "http://admin.drivo.dk",
    "http://18.184.209.15:3534",
    "http://18.184.209.15:3536",
    "http://18.184.209.15:3535",
    "http://18.184.209.15:3537",
    "http://localhost:4200",
    "http://localhost:4300",
    "http://127.0.0.1:3000",
    "http://54.190.192.105:3536",
    "http://54.190.192.105:3534",
  ],
};

app.use(cors(corsOptions));

app.get('/items', dateTime, itemsData);

app.use('/birds', birds);

app.use('/api/v1',admin);

app.use('/api/v1', drivo);

app.use('/api/v1',ftpScheduler);

app.use('/api/v1',jatoRoutes);


app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
