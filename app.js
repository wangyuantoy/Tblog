const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); //会话中间件
const MongoStore=require('connect-mongo')(session);// session存储到数据库的中间件
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
mongoose.connect('mongodb://127.0.0.1:27017/2017blog');
//使用会话中间件后，req增加属性；req.session
app.use(session({
    secret: '2017blog',
    key: 'user',//key 的值为 cookie 的名字
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({//设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免重启服务器时会话丢失
        mongooseConnection: mongoose.connection //使用已有的数据库连接
    })
}));
app.use(flash());
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置模板的中间件
app.use(function (req, res, next) {
    //res.locals 是真正的渲染模板的
    res.locals.user = req.session.user;
    res.locals.keyword=req.session.keyword;
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
    res.render(path.join(__dirname, 'views/404.html'));
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
