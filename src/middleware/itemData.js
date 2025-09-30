import items from '../services/items.js';


export const dateTime = async (req, res, next) => {
    console.log("I am here");
    next();
}

export const itemsData = async (req, res)=>{
     res.json({ status: true, message: "Fetched all items", data: items })
}