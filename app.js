const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); //会话中间件
const index = require('./routes/index');
const users = require('./routes/users');
const articles = require('./routes/articles');
const flash = require('connect-flash');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/2017blog')
//使用会话中间件后，req增加属性；req.session
app.use(session({
    secret: '2017blog',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
//app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置模板的中间件
app.use(function (req, res, next) {
    //res.locals 是真正的渲染模板的
    res.locals.user = req.session.user;
    //flash取出来是数组
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;