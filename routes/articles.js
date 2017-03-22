const express = require('express');
const articleModel=require('../model/article');
const multer=require('multer');
const router = express.Router();
//指定文件的存储方式
var  storage = multer.diskStorage({
    //保存目录
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    //指定文件名
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
});

var upload = multer({ storage: storage });
//请求一个空白发表文章的页面
router.get('/add',function (req, res) {
    res.render('article/add')
});

//提交文章数据; 里边放文件域的名字
router.post('/add',upload.single('img'),function (req, res) {
    var article=req.body;
    if(req.file){
        article.img='/images/'+req.file.filename
    }
    var user = req.session.user;
    article.user=user;
    articleModel.create(article,function (err, article) {
        if(err){
            req.flash('error','发表文章失败');
            return res.redirect('back')
        }else{
            req.flash('success','发表文章成功');
            return res.redirect('/')
        }
    });
});

module.exports = router;
