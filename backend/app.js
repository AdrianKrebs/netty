var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/classifier');


var app = express();
app.use(cors())

app.use(fileUpload({
    debug: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/classifier', usersRouter);

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})


module.exports = app;
