var express = require('express');
var router = express.Router();
const {Op} = require("sequelize");
let models = require("../models")

router.post('/add',function (request,response) {
    let openId = request.headers.openid;
    let data = {...request.body,...{openId}}
    data.adoptionRequirements = data.adoptionRequirements.join(",")
    data.city = data.city.join(",")
    data.images = data.images.join(",")
    data.sex = data.sex?'女':'男';
    models.PetsList.create(data).then(res=>{
        response.json({message:'新增成功',code:200})
    }).catch(err=>{
        console.log(err)
        response.send({message:'新增失败',code:500})
    })
})

router.get('/getAll',function (request,response) {
    let openId = request.headers.openid
    console.log(request.query.selectedIds)
    let selectedIds = request.query.selectedIds.split(",")
    console.log(selectedIds)
    models.PetsList.findAll({
        where:{
            id:{
                [Op.notIn]:selectedIds
            }
        }
    }).then(res=>{
        if(res){
            response.json(res)
        }else{
            response.send({message:'无数据',code:200})
        }
    }).catch(err=>{
        console.log(err)
        response.send('失败')
    })
})

module.exports = router