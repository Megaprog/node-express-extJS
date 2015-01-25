Ext.application({
    name: 'Goods',

    views: [
        'AddGoodsFormView',
        'GoodsView',
        'GoodsGridView',
        'SearchGoodsView'
    ],

    controllers : [
        'GoodsController'
    ],

    stores : [
        'GoodsStore'
    ],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype  : 'goodsView'
            }
        });
    }
});