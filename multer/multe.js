const multer = require("multer");
const path = require("path");
const express = require("express");

var multerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../my_uploads"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// For Single File upload
var multerSigleUpload = multer({ storage: multerStorage });

module.exports = multerSigleUpload;
