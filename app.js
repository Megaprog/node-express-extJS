var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var async = require('async');
var config = require('./config');
var db = require('./database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./controller')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err);

    res.status(err.status || 500);

    var error = {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    };

    if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
        res.json(error);
    }
    else {
        res.render('error', error);
    }

});

module.exports = app;

async.auto({
    read_sql: function(callback) {
        fs.readFile(path.join(__dirname, 'config/goods_create.sql'), {encoding: 'utf8'}, callback);
    },
    pg_connect: db.connect,
    execute_sql: ['read_sql', 'pg_connect', function(callback, results) {
        results.pg_connect[0].query(results.read_sql, callback);
    }],
    start_listening: ['execute_sql', function(callback) {
        var server = app.listen(config.get('port'), config.get('host'), config.get('backlog'), function () {
            callback(null, server);
        });
    }]
}, function(err, results) {
    results.pg_connect[1](); //release pg client back to the pool

    if (err) {
        console.error('error during server init', err);
        process.exit(1);
    }

    console.log('Listening at http://%s:%s', results.start_listening.address().address, results.start_listening.address().port);
});