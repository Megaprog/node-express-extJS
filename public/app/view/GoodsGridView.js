Ext.define('Goods.view.GoodsGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodsGridView',
    width: 400,
    height: 300,
    frame: true,
    store: 'GoodsStore',
    iconCls: 'icon-user',
    viewConfig:{
        markDirty:false
    },
    columns: [
        {
            text: 'Товар',
            flex: 1,
            sortable: true,
            dataIndex: 'name',
            editor: {
                xtype:'textfield',
                allowBlank: false,
                blankText: 'Это поле должно быть заполнено'
            }
        },
        {
            flex: 2,
            text: 'Цена',
            sortable: true,
            dataIndex: 'price',
            editor: {
                xtype:'textfield',
                regex: /^([0-9]{1,10})*$/,
                regexText: 'Цена должна состоять из цифр',
                allowBlank: false,
                blankText: 'Это поле должно быть заполнено'
            }
        }
    ],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            saveBtnText: 'Сохранить',
            cancelBtnText: 'Отменить'
        })
    ],
    selType: 'rowmodel',
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    text: 'Добавить',
                    action: 'add',
                    iconCls: 'icon-add'
                },
                '-',
                {
                    action: 'delete',
                    text: 'Удалить',
                    iconCls: 'icon-delete',
                    disabled: true
                }
            ]
        }
    ]
});