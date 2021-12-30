var express = require('express');
var router = express.Router();
let getSataff = require("../controller/getStaff")

/* GET users listing. */
router.get('/', getSataff.getStaffs);
router.get('/selectStaffByid', getSataff.selectStaffByid);
router.post('/selectStaffByid', getSataff.selectStaffByPostId);

module.exports = router;
