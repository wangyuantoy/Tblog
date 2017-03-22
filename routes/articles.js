const express = require('express');
const articleModel=require('../model/article');
const router = express.Router();

//请求一个空白发表文章的页面
router.get('/add',function (req, res) {
    res.render('article/add')
});

//提交文章数据
router.post('/add',function (req, res) {
    var article=req.body;
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
