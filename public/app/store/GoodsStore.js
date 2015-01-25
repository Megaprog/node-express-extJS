Ext.define('Goods.store.GoodsStore', {
    extend: 'Ext.data.Store',
    requires : [
        'Goods.model.GoodsModel'
    ],
    model: 'Goods.model.GoodsModel',
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'goods',
            read: 'goods',
            destroy: 'goods',
            update: 'goods'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }
});