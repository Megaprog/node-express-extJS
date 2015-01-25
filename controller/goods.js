var goodsService = require('../service').goodsService;
var JRes = require('../protocol').JRes;

exports.create = function (req, res) {
    goodsService.create(req.body, function(err, goods) {
        if (err) throw err;

        res.json(JRes.of(goods));
    })
};

exports.read = function (req, res) {
    goodsService.read(req.query.search, function(err, goodsList) {
        if (err) throw err;

        res.json(JRes.success(goodsList));
    })
};

exports.update = function (req, res) {
    goodsService.update(req.body, function(err, success) {
        if (err) throw err;

        res.json(new JRes(success, req.body));
    })
};

exports.del = function (req, res) {
    goodsService.del(req.body, function(err, success) {
        if (err) throw err;

        if (success) {
            res.send('delete');
        }
        else {
            res.status(400).send();
        }
    })
};
