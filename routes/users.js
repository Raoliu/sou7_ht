var express = require('express');
let request = require('request');
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

router.get('/user',function (req,res) {
    console.log(req.headers)
    models.User.findOne({
        where:{
            openId:req.headers.openid
        }
    }).then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
})

function getYear(){
    let date = new Date()
    return date.getFullYear()
}
function getsouqiId(){
    return `SOQI${new Date().getTime()}`
}

router.post('/register',function (req,res) {
    let body = req.body
    models.User.findOne({
        where:{
            openId:req.headers.openid
        }
    }).then(user=>{
        let data ={
            nickName:body.nickName,
            acavater:body.avatarUrl,
            sex: !body.gender?'男':'女',
            age: body.realName?getYear() - parseInt(body.idNumber.substr(6,4)):null,
            address: body.address,
            company: body.company,
            cardCode: body.idNumber,
            cardType: body.idType,
            job: body.job,
            souqiId: getsouqiId(),
            mobile: body.phone,
            realName: body.realName,
            isIdention: 0,
            identityImgs: body.realName?body.idImages.join(","):null,
        }
        if(user.souqiId!=null){
            delete data.souqiId
        }
        if(user.realName!=null||body.realName){
            data.isIdention = 1
        }
        console.log(data)
        user.update(data)
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/login',function (req,resp) {
    let data = req.body
    let app_Id = 'wx57f5dd7e4b42101b'
    let app_Secret = '5f95845b5cd46a50f58a342e3ab53ccb'
    let url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=${app_Id}&secret=${app_Secret}&js_code=${data.loginCode}`
    if(data.loginCode){
        request(url,(error, response, body)=>{
            console.log('statusCode:', response && response.statusCode)
            console.log(body)
            // request.post('/addUser',{openId:body.openid,sessionKey:body.session_key})
            models.User.findOne({
                where:{
                    openId:JSON.parse(body).openid
                }
            }).then(res=>{
                console.log('res',res)
                if(res==null){
                    console.log('未注册用户')
                    let data = {openId:JSON.parse(body).openid,sessionKey:JSON.parse(body).session_key}
                    models.User.create(data).then(res=>{
                        console.log('注册成功')
                    }).catch(err=>{
                        console.log('err',err)
                    })
                }else{
                    res.update({sessionKey:JSON.parse(body).session_key}).then(res=>{
                        console.log('token更新成功')
                    })
                }
                let resultData = {
                    openId:JSON.parse(body).openid,
                    sessionKey:JSON.parse(body).session_key,
                }
                resp.send(resultData)
            }).catch(err=>{
                console.log('err',err)
            })
        })
    }else{
        res.writeHead(404)
        res.end()
    }

})
// router.get('/', getSataff.getStaffs);
// router.get('/selectStaffByid', getSataff.selectStaffByid);
// router.post('/selectStaffByid', getSataff.selectStaffByPostId);

module.exports = router;
