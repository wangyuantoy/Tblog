var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
//var db=mongoose.connect('mongodb://127.0.0.1:27017/20170313log');
var articleSchema=new mongoose.Schema({
    title:String,
    content:String,
    img:String,
    pv: {type:Number,default:0},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},//类型是主键模型，引用user模型
    comments: [{user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},content:String,createAt:{type: Date, default: Date.now}}], //评论
    //发表日历类型是Date，默认是当前时间
    createAt:{type:Date,default:Date.now}
});
var articleModel=mongoose.model('article',articleSchema);

module.exports=articleModel;
