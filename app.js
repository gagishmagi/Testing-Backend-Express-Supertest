var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var cors = require("cors");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();


app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
    res.setHeader('Content-Range', 'bytes : 0-9/*')
    next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


module.exports = app;












// app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
//     res.setHeader('Content-Range', 'bytes : 0-9/*')
//     next()
// })
