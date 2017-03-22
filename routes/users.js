const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const validate = require('../middle/index.js');
const crypto = require('crypto');

//注册 用户通过get请求/users/reg时执行此
//登录前访问
router.get('/reg', validate.checkNotLogin, function (req, res) {
    res.render('user/reg')
});
//提交用户注册的表单
router.post('/reg', validate.checkNotLogin, function (req, res) {
    var user = req.body;
    user.password=md5(user.password);
    user.avatar = 'http://secure.gravatar.com/avatar' + md5(user.email);
    userModel.create(user, function (err, doc) {
        if (err) {
            req.flash('error', err);
            res.redirect('back'); //返回到上个页面
        } else {
            //把保存之后当用户保存到此用户会话的user属性上
            req.session.user = doc;
            //增加成功提示
            req.flash('success', '注册成功');
            res.redirect('/')
        }
    });
    //清除数据
    // userModel.remove({password:"123456"},function (err) {
    //   if(err) {
    //     console.log(err);
    //   } else {
    //     console.log('Delete success!');
    //   }
    // });
    //查询所有数据
    // userModel.find({},function (err,docs) {
    //   if(err){
    //     console.log(err)
    //   }else{
    //     console.log(docs)
    //   }
    // })

});

//登录 用户通过get请求/users/login时执行此
router.get('/login', validate.checkNotLogin, function (req, res) {
    res.render('user/login')
});
//提交用户注册的表单
router.post('/login', validate.checkNotLogin, function (req, res) {
    var user = req.body;
    userModel.findOne(user,function (err, user) {
        if (err) {
            req.flash('error', err);
            res.redirect('back'); //返回到上个页面
        } else {
            req.session.user = user;
            req.flash('success', '登录成功');
            res.redirect('/')
        }
    })

});

//退出登录 用户通过get请求/users/logout时执行此
router.get('/logout', validate.checkLogin, function (req, res) {
    req.session.user = null;
    res.redirect('/')
});


module.exports = router;

//md5加密
function md5(str) {
    return crypto.createHash('md5')
        .update(str).digest('hex')
}