var goods = require('./goods');

module.exports = function (app) {

  app.route('/goods')
      .get(goods.read)
      .post(goods.create);

  app.route('/goods/:id')
      .delete(goods.del)
      .put(goods.update);

};
