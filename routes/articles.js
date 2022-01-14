var express = require('express');
const {Op} = require("sequelize");
var router = express.Router();
let models = require("../models")

/* GET users listing. */
router.get('/', function (req,res) {
    let where = {},title = req.query.title,currentPage = parseInt(req.query.currentPage) || 1,pageSize = parseInt(req.query.pageSize) ||2
    if(title){
        where.title = {
            [Op.like]:'%'+ title + '%'
        }
    }
    models.Article.findAndCountAll({
        where:where,
        order:[['id','ASC']],
        offset:(currentPage - 1) * pageSize,
        limit:pageSize
    }).then(result =>{
        res.json({articles: result.rows,pagination:{currentPage,pageSize,total:result.count}});
    })
});
router.post('/addArticle',function (req,res) {
    let data = req.body
    data.readNum = 0
    models.Article.create(data).then(article =>{
        res.json({article})
    })
    // res.json(req.body)
})
router.get('/:id',function (req,res) {
    models.Article.findOne({
        where:{id:req.params.id},
        include: [models.Comments],
    }).then(article=>{
        let readNum = article.readNum + 1;
        article.update({readNum})
        res.json({article})
    }).catch(err=>{
        console.log(err)
    })

    // models.Article.findByPk(req.params.id).then(article=>{
    //     let readNum = article.readNum + 1;
    //     article.update({readNum})
    //     res.json({article})
    // })
    // models.Article.findAll({where:{title:req.params.title}}).then(article=>{
    //     res.json({article})
    // })
    // models.Article.findAll({where:{
    //     [Op.and]:[
    //         {title:req.params.title},
    //     ]
    //     }}).then(article=>{
    //     res.json({article})
    // })
})

router.delete('/:id',function (req,res) {
    models.Article.findByPk(req.params.id).then(article=>{
        article.destroy();
        res.send({message:"删除成功"})
    }).catch(err=>{
        res.send({message:'未查询到指定文章，删除失败'})
    })
})
//恢复软删除的数据
router.get('/restore/:id',function (req,res) {
    models.Article.restore({where:{id:req.params.id}}).then(article=>{
        res.send({message:"恢复成功"})
    }).catch(err=>{
        res.send(err)
    })
})

router.put('/:id',function (req,res) {
    models.Article.findByPk(req.params.id).then(article=>{
        article.update(req.body);
        res.json({article})
    })

})

module.exports = router;
