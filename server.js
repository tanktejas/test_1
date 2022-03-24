const path = require("path");
const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const bufferToDataUrl = require("buffer-to-data-url");
var dataUriToBuffer = require("data-uri-to-buffer");
const FileReader = require("filereader");
const File = require("File");
const cors = require("cors");
const app = express();

// db routes

const login = require("./DB/logindb");
const image = require("./DB/image_db");

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("my_uploads"));
// For Multer Storage

var multerSigleUpload = require("./multer/multe");
const { application } = require("express");
// For Multiple File upload

//************************  All Routers  *****************************

// Base index route

app.get("/", function (req, res) {
  image.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render("app", { items: items });
    }
  });
});

//route for single file upload
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/imagens", function (req, res) {
  // multerSigleUpload.single("image");
  const file = req;
  console.log(file);
  if (!file) {      
    return res.end("Please choose file to upload!");
  }
 
  // Define a JSONobject for the image attributes for saving to database.
  // var obj = new image({
  //   name: req.body.name,
  //   img: {
  //     data: req.body.img.data,
  //     contentType: "image/png",
  //   },
  //   title: req.body.name,
  //   desc: req.body.pesc,
  //   postdate: req.body.postdate,
  // });
  // obj.save();
  res.redirect("/");
});

// app.post("/imagens", multerSigleUpload.single("image"), function (req, res) {
//   const file = req.file;
//   if (!file) {
//     return res.end("Please choose file to upload!");
//   }
//   console.log(req.file);
//   // Define a JSONobject for the image attributes for saving to database
//   var obj = new image({
//     name: req.body.name,
//     title: req.body.title,
//     desc: req.body.description,
//     img: {
//       data: "z.png", //will get image from react.
//       contentType: "image/png",
//     },
//   });
//   res.redirect("/");
// });
//route for multiple file upload
app.post("/multipleFile", function (req, res) {
  multerMultipleUpload(req, res, function (err) {
    if (err) {
      return res.end("Files uploading unsucessfully!");
    }
    req.app.locals.uploadStatus = true;
    res.redirect("/");
  });
});

//router for getting information of image.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/getimageinformation", (req, res) => {
  image.find({}, (err, item) => {
    console.log(item);
    if (err) res.send(err);
    res.send(item);
  });
});

//router to get information of all login person
app.get("/getloginpersons", (req, res) => {
  login.find({}, (err, item) => {
    if (err) res.send(err);
    res.send(item);
  });
});

//router for user login.
app.post("/userlogin", (req, res) => {
  console.log(req.body);
  const newobj = new login(req.body);
  newobj.save();
  res.send("OK!!");
});

//************************  All Routers end *****************************

// Server Listening
app.listen(3006, () => {
  console.log("Server is running at port 3000");
});
