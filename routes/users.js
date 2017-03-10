var express = require('express');
var router = express.Router();

//注册 用户通过get请求/users/reg时执行此
router.get('/reg',function (req, res) {
  res.render('user/reg')
});
//提交用户注册的表单
router.post('/reg',function (req, res) {
  res.end('reg')
});

//登录 用户通过get请求/users/login时执行此
router.get('/login',function (req, res) {
  res.render('user/login')
});
//提交用户注册的表单
router.post('/login',function (req, res) {
  res.end('reg')
});

//退出登录 用户通过get请求/users/logout时执行此
router.get('/logout',function (req, res) {
  res.end('logout')
});


module.exports = router;
