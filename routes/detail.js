var express = require('express');
var router = express.Router();
var blogModel =require('../model/blogModel')
/* GET home page. */

//动态路由
// /detail/aaaa（匹配）   /detail/bbbbb（匹配）  /detail/aaa/dwadwa(不匹配)
router.get('/:myid', function(req, res, next) {
    //获取动态路由穿的参数
  console.log(req.params)
  blogModel.find({
      _id:req.params.myid
  }).then(result=>{
      //result [{}]
    res.render('detail', { title: '详情页面',info:result[0]});
  })

  // 利用模型查询数据库
  

});

// /detail/any/kerwin
router.get('/:id/:kerwin', function(req, res, next) {
    //   console.log(req.query)
      // 利用模型查询数据库
      res.render('detail', { title: '详情页面'});
    
});


module.exports = router;
