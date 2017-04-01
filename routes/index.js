const express = require('express');
const articleModel = require('../model/article');
const markdown = require('markdown').markdown;
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //sessiong中获取用户信息，渲染首页
    //第二个参数对象会合并到res.locals,并渲染模板
    //查询出来的user是ID，需要通过populate转成对象
    var keyword = req.query.keyword;
    var search = req.query.search;
    var pageNum = req.query.pageNum && req.query.pageNum > 0 ? parseInt(req.query.pageNum) : 1;
    var pageSize = req.query.pageSize && req.query.pageSize > 0 ? parseInt(req.query.pageSize) : 2;
    var queryObj = {};
    if (search) { // 如果search有值，是通过提交按钮搜索
        req.session.keyword = keyword;
    }
    var reg = new RegExp(keyword, "i");

    //内容或者标题只要一个里面包含查询关键字就可以
    queryObj = {$or: [{title: reg}, {content: reg}]};
    articleModel.find(queryObj).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user').exec(function (err, articles) {
        if (err) {
            console.log(err)
        }
        //遍历发表的文章，把内容是markdown格式的转换为html格式
        articles.forEach(function (article) {
            article.content = markdown.toHTML(article.content);
        });
        // 去的这个条件有多少条符合
        articleModel.count(queryObj, function (err, count) {
            if (err) {

                req.flash('error', err);
                res.redirect('/');
                return
            }
            res.render('index', {
                articles: articles,
                totalPage: Math.ceil(count / pageSize),
                keyword: keyword,
                pageNum: pageNum,
                pageSize: pageSize
            })
        });
    });
});

module.exports = router;