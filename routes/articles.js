const express = require('express');
const articleModel = require('../model/article');
const multer = require('multer');
const router = express.Router();
//指定文件的存储方式
var storage = multer.diskStorage({
    //保存目录
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    //指定文件名
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.slice(file.mimetype.indexOf('/') + 1))
    }
});

var upload = multer({storage: storage});
//请求一个空白发表文章的页面
router.get('/add', function (req, res) {
    res.render('article/add',{article:{}})
});

//提交文章数据; 里边放文件域的名字
router.post('/add', upload.single('img'), function (req, res) {
    var article = req.body;
    var _id = article._id;
    if (article._id) { //_id有值代表修改，没值新增
        //要更新的字段
        var set={
            title:article.title,
            content:article.content
        };
        if (req.file) { //如果新上传了文件
            set.img = '/images/' + req.file.filename
        }
        articleModel.update({_id:_id},{$set:set},function (err,article) {
            if (err) {
                req.flash('error', '更新文章失败');
                return res.redirect('back')
            } else {
                req.flash('success', '更新文章成功');
                return res.redirect('/')
            }
        })
    } else {
        var user = req.session.user;
        if (req.file) {
            article.img = '/images/' + req.file.filename
        }
        article.user = user;
        delete article._id;
        articleModel.create(article, function (err, article) {
            if (err) {
                req.flash('error', '发表文章失败');
                return res.redirect('back')
            } else {
                req.flash('success', '发表文章成功');
                return res.redirect('/')
            }
        });
    }
});
//文章详情页渲染
router.get('/detail/:_id', function (req, res) {
    articleModel.findById(req.params._id, function (err, article) {
        if (err) {
            req.flash('error', '获取文章失败');
            return res.redirect('back')
        } else {
            res.render('article/detail', {article: article})
        }
    })
});
//删除文章
router.get('/delete/:_id', function (req, res) {
    articleModel.remove({_id: req.params._id}, function (err, result) {
        if (err) {
            req.flash('error', '删除失败');
            return res.redirect('back')
        } else {
            req.flash('success', '删除成功');
            return res.redirect('/')
        }
    })
});
//跳转到修改页面
router.get('/update/:_id', function (req, res) {
    articleModel.findById(req.params._id, function (err, article) {
        if (err) {
            req.flash('error', '获取文章失败');
            return res.redirect('back')
        } else {
            res.render('article/add', {article: article})
        }
    })
});
module.exports = router;
