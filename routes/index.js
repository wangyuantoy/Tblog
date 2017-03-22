const express = require('express');
const articleModel = require('../model/article');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //sessiong中获取用户信息，渲染首页
    //第二个参数对象会合并到res.locals,并渲染模板
    //查询出来的user是ID，需要通过populate转成对象
    articleModel.find({}, function (err, articles) {
        if (err) {
            req.flash('error', error);
            res.redirect('/')
        }
        res.render('index', {articles: articles})
    });
});

module.exports = router;