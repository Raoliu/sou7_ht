var express = require('express');
const {Op} = require("sequelize");
var router = express.Router();
let getSataff = require("../controller/getStaff")
let models = require("../models")

/* GET users listing. */
router.post('/addUser',function (req,res) {
    let data = req.body
    models.User.create(data).then(user=>{
        res.json({message:'添加成功',user})
    }).catch(err=>{
        console.log(err)
    })
})
// router.get('/', getSataff.getStaffs);
// router.get('/selectStaffByid', getSataff.selectStaffByid);
// router.post('/selectStaffByid', getSataff.selectStaffByPostId);

module.exports = router;
