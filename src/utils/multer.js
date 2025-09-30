import multer from 'multer';


// const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = "public/assets/img/"
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()
    );
  },
});

// Create the multer instance with the configured storage
const upload = multer({ storage: storage });


export default upload;