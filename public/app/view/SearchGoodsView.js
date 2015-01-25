Ext.define('Goods.view.SearchGoodsView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchGoodsView',
    bodyPadding: 10,
    items: [
        {
            xtype: 'textfield',
            name: 'search',
            fieldLabel: 'Введите название товара',
            maxLength: 200
        }
    ]
});
