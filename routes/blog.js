var express = require('express');
var router = express.Router();
var blogModel = require('../model/blogModel')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog', { title: '创建博客' });
});

//创建的的post
router.post('/create', function(req, res, next) {
    console.log(req.body)
    // nodejs 存数据库
    
    /*
        1. 连接数据库，创建一个新数据库test1907
        2. 引入mongoose (mongo ose)模块， 操作数据库.
        3. 建立模型（schema 约束mongo自由 ）==> 数据库的集合(表)
        4. 通过模型 进行增删改查
        */
    blogModel.create({
        title:req.body.title,
        content:req.body.content
    }).then(result=>{
        res.redirect("/") //跳转到首页
    }).catch(err=>{

    })
});

// /blog/articles  type:delete
router.delete("/articles",(req,res)=>{
    // req.query
    console.log(req.body)
    blogModel.remove({
        _id:req.body.id
    }).then(result=>{
        res.send({
            delete:1
        })
    })
    
})

// /blog/articles
router.get("/articles",(req,res)=>{
    // req.query
    console.log(req.query)
    blogModel.find({
        _id:req.query.id
    }).then(result=>{
        // []
        res.send({
            find:1,
            info:result[0]
        })
    })

})

// /blog/articles
router.put("/articles",function(req,res){
    console.log(req.body)

    blogModel.update({
        _id:req.body.id
    },{
        $set:{
            title:req.body.title,
            content:req.body.content
        }
    }).then(result=>{
        res.send({
            update:1
        })
    })
})



module.exports = router;
