Ext.define('Goods.view.GoodsView', {
    extend: 'Ext.panel.Panel',
    width: 500,
    height: 360,
    padding: 10,
    alias: 'widget.goodsView',
    layout: 'border',
    items: [
        {
            xtype: 'goodsGridView',
            region: 'center'
        },
        {
            xtype: 'panel',
            html: '<div style="font: normal 48px cursive; text-align: center;">Каталог товаров</div>',
            region: 'north',
            height: 80
        },
        {
            xtype: 'searchGoodsView',
            title: 'Поиск',
            region: 'west',
            width: 300,
            collapsible: true,
            collapsed: false
        }
    ],
    renderTo: Ext.getBody()
});