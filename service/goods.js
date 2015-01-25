var async = require('async');
var db = require('../database');
var Goods = require('../model').Goods;

exports.create = function (goods, callback) {
    checkGoods(goods, function (client, done, callback) {
        async.waterfall([
            function(callback) {
                client.query('INSERT INTO goods(name, price) VALUES ($1, $2) RETURNING id', [goods.name, goods.price], function(err, result) {
                    done();
                    callback(err, result);
                })
            },
            function(result, callback) {
                goods.id = result.rows[0].id;
                callback(null, goods);
            }
        ], callback)
    }, function (callback) {
        callback(null);
    }, callback);
};

exports.read = function (name, callback) {
    function allGoodsQuery(client) {
        return client.query('SELECT g.id, g.name, g.price FROM goods g ORDER by g.name');
    }

    async.waterfall([
        db.connect,
        function(client, done, callback) {
            if (name) {
                var trimmedName = name.trim();
                if (trimmedName !== '') {
                    callback(null, client.query('SELECT g.id, g.name, g.price FROM goods g WHERE g.name like $1 ORDER by g.name', [trimmedName + '%']), done)
                }
                else {
                    callback(null, allGoodsQuery(client), done);
                }
            }
            else {
                callback(null, allGoodsQuery(client), done)
            }
        },
        function(query, done, callback) {
            query.on('row', function(row, result) {
                result.addRow(new Goods(row.id, row.name, row.price));
            });
            query.on('end', function(result) {
                done();
                callback(null, result.rows);
            });
            query.on('error', function(error) {
                done();
                callback(error)
            });
        }
    ], callback)
};

exports.update = function (goods, callback) {
    checkGoods(goods, function (client, done, callback) {
        async.waterfall([
            function(callback) {
                client.query('UPDATE goods SET name = $1, price = $2 WHERE id = $3', [goods.name, goods.price, goods.id], function(err, result) {
                    done();
                    callback(err, result);
                })
            },
            function(result, callback) {
                callback(null, result.rowCount > 0);
            }
        ], callback)
    }, function (callback) {
        callback(null, false);
    }, callback);
};

exports.del = function (goods, callback) {
    async.waterfall([
        db.connect,
        function(client, done, callback) {
            client.query('DELETE FROM goods WHERE id = $1', [goods.id], function(err, result) {
                done();
                callback(err, result);
            })
        },
        function(result, callback) {
            callback(null, result.rowCount > 0);
        }
    ], callback)
};

function isNewGoods(goods, callback) {
    async.waterfall([
        db.connect,
        function(client, done, callback) {
            client.query('SELECT count(*) FROM goods g WHERE g.name = $1 and g.price = $2', [goods.name, goods.price], function(err, result) {
                done();
                callback(err, result.rows[0][result.fields[0].name] == 0);
            });
        }
    ], callback);
}

function checkGoods(goods, ifNew, ifNotNew, callback) {
    async.waterfall([
        function(callback) {
            isNewGoods(goods, callback)
        },
        function(isNew, callback) {
            if (isNew) {
                db.connect(callback);
            }
            else {
                callback(1);
            }
        },
        function(client, done, callback) {
            ifNew(client, done, callback);
        }
    ], function (err) {
        if (err) {
            if (typeof err === 'number') {
                ifNotNew(callback);
            }
            else {
                callback(err);
            }
        }
        else {
            callback.apply(null, arguments);
        }
    })
}