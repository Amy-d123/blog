var mongoose =require("mongoose")
var schema = mongoose.Schema
var model = mongoose.model("blog",new schema({
    title:String,
    content:String
}))

// 第一个参数， 创建了一个blog模型， 对应创建了一个blogs 集合（表）
// 第二个参数， 创建schema

module.exports  =  model