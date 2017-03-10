var express = require('express');
var router = express.Router();
//请求一个空白发表文章的页面
router.get('/add',function (req, res) {
    res.render('article/add')
});

//提交文章数据
router.post('/add',function (req, res) {
    res.render('article/add')
});

module.exports = router;
