let express = require("express");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path")
var router = express.Router();
const multer = require("multer");
const multiparty = require("multiparty");


var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './public/uploads/'; // 保存的路径，需要自己创建
createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        let suffix=file.mimetype.split('/')[1];//获取文件格式
        cb(null, file.fieldname + '_' + Date.now()+'.'+suffix);
    }
});
;
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })


router.post('/',upload.single('file'), function (req, res) {
    console.log(req.file,'------',req.body,'-------',req.file.path);
    res.end("uploads/"+req.file.filename); //给前端返回文件名
})

module.exports = router;