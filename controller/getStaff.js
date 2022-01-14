let dbConfig = require("../utils/dbconfig")
let fs = require("fs");
getStaffs=function (req,res) {
    let sql = "select * from staff"
    let sqlArr = []
    let callBack = function (err,data) {
        if(err){

        }else{
            res.send({
                "list":data
            })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

selectStaffByid = function(req,res){
    let {id} = req.query
    let sql = `select * from staff where id = ?`;
    let sqlArr = [id]
    let callBack = function (err,data) {
        if(err){
            console.log(err)
            res.send("请求出错了")
            return
        }else{
            res.send({
                "list":data
            })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

selectStaffByPostId = function(req,res){
    let {dep_id} = req.body
    let sql = `select * from staff where dep_id = ?`;
    let sqlArr = [dep_id]
    let callBack = function (err,data) {
        if(err){
            console.log(err)
            res.send("请求出错了")
            return
        }else{
            res.send({
                "list":data
            })
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

uploadsImage = function(req,res){
    console.log(req)
    if (req.file.length == 0) {
        res.render("error", {message: "上传文件不能为空"})
        return;
    }
    fs.renameSync('./public/uploads/' + req.file.filename, "./public/uploads/" + req.file.originalname, function (err) {
        if (err) {
            console.log(err)
            throw err;
        }
    })
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    let imageUrl = "http://localhost:3000/uploads/"+req.file.originalname
    res.send(JSON.stringify({message:"上传成功！",code:200,imageUrl}));
}

addPets = function(req,res){
    let {openId,name,age,sex,image,adoptionRequirements,breed,hairColor,description,longitude,latitude,type,repellent,vaccine,sterilize,size,hairType,source} = req.body;
    if(type!=0&&type!=1){
        res.send(JSON.stringify({message:"宠物类型有误!",code:400}))
        return
    }
    let sql  = `insert into petslist(openId,name,age,sex,image,adoptionRequirements,breed,hairColor,description,longitude,latitude,type,repellent,vaccine,sterilize,size,hairType,source) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    let sqlArr = [openId,name,age,sex,image,adoptionRequirements,breed,hairColor,description,longitude,latitude,type,repellent,vaccine,sterilize,size,hairType,source]
    let callBack = function (err,data) {
        if(err){
            console.log(err)
            throw err;
        }
        res.send(JSON.stringify({
            "message":'新增成功',
            "code":200
        }))
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

updatePets = function(req,res){
    let {id,openId,name,age,sex,image,adoptionRequirements,breed,hairColor,description,longitude,latitude,type,repellent,vaccine,sterilize,size,hairType,source} = req.body;
    let sql = `update petslist set openId = ${openId},name = ${name},age = ${age},sex = ${sex},image = ${image},adoptionRequirements = ${adoptionRequirements},breed = ${breed},hairColor = ${hairColor}  where id = ${id}`
    let sqlArr = [openId,name,age,sex,image,adoptionRequirements,breed,hairColor,description,longitude,latitude,type,repellent,vaccine,sterilize,size,hairType,source]
    let callBack = function (err,data) {
        if(err){
            console.log(err)
            throw err;
        }
        res.send(JSON.stringify({
            "message":'修改成功',
            "code":200
        }))
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}

module.exports = {
    getStaffs,
    selectStaffByid,
    selectStaffByPostId,
    uploadsImage,
    addPets
}