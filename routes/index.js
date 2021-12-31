var express = require('express');
let fs = require("fs");
let getStaff = require("../controller/getStaff")
var router = express.Router();
let multer = require("multer");
let upload = multer({
    dest: "./public/uploads/"
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post("/uploadImage", upload.single('file'), getStaff.uploadsImage)
router.post("/addPets", getStaff.addPets)

module.exports = router;
