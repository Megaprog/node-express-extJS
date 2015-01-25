module.exports = (function () {

    function Goods(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    return Goods;
})();