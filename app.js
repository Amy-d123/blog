var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog')
var detailRouter = require('./routes/detail')
//-----------连接数据库服务-------------------------------
var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/test1907") //连接数据库， 并创建test1907 数据库
//-----------连接数据库服务-------------------------------
var proxy = require('http-proxy-middleware');
var app = express();
app.use(
  '/ajax' ,  
  proxy({target : 'http://m.maoyan.com', changeOrigin: true })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//-------注册路由------------------------
app.use('/blog',blogRouter)
app.use('/detail',detailRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
