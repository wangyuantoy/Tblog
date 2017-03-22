const express = require('express');
const articleModel = require('../model/article');
const markdown=require('markdown').markdown;
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //sessiong中获取用户信息，渲染首页
    //第二个参数对象会合并到res.locals,并渲染模板
    //查询出来的user是ID，需要通过populate转成对象
    articleModel.find().populate('user').exec(function (err, articles) {
        if (err) {
            req.flash('error', error);
            res.redirect('/')
        }
        //遍历发表的文章，把内容是markdown格式的转换为html格式
        articles.forEach(function (article) {
            article.content=markdown.toHTML(article.content);
        });
        res.render('index', {articles: articles})
    });
});

module.exports = router;