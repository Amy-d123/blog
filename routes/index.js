var express = require('express');
var router = express.Router();
var blogModel =require('../model/blogModel')
/* GET home page. */
router.get('/', function(req, res, next) {
  // 利用模型查询数据库
  blogModel.find({}).then(result=>{
    // console.log(result)
    res.render('index', { title: '首页',list:result});

  })


});

module.exports = router;
