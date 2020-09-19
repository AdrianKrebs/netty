var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/classifier');


var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/classifier', usersRouter);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Example app listening at http://localhost:3000`)
})


module.exports = app;
