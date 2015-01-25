var pg = require('pg');
var config = require('../config');

exports.connect = function(callback) {
    pg.connect(config.get('database'), callback);
};