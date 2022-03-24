const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null, path.join(__dirname, "../my_uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// For Single File upload
var multerSigleUpload = multer({ storage: storage });

module.exports = multerSigleUpload;
