Ext.define('Goods.controller.GoodsController', {
    extend: 'Ext.app.Controller',

    refs: [
        {selector: 'goodsGridView',
            ref: 'goodsGridView'},
        {selector: 'goodsGridView button[action="add"]',
            ref: 'goodsGridAdd'},
        {selector: 'goodsGridView button[action="delete"]',
            ref: 'goodsGridDelete'},
        {selector: 'searchGoodsView button[action="search"]',
            ref: 'searchGoods'},
        {selector: 'addGoodsFormView',
            ref: 'addGoodsFormView'},
        {selector: 'goodsView',
            ref: 'goodsView'},
        {selector: 'addGoodsFormView textfield[name=name] ',
            ref: 'addGoodsFormName'},
        {selector: 'addGoodsFormView textfield[name=price]',
            ref: 'addGoodsFormPrice'},
        {selector: 'addGoodsFormView button[action=save]',
            ref: 'addGoodsFormSave'}
    ],

    init: function () {
        this.control({
            'goodsGridView  button[action=add]': {
                click: this.onAddGoods
            },
            'goodsGridView  button[action=delete]': {
                click: this.onDelGoods
            },
            'searchGoodsView  textfield[name="search"]': {
                change: this.onChangeText
            },
            'goodsGridView': {
                cellclick: this.onLineGrid
            },
            'addGoodsFormView  button[action=save]': {
                click: this.onSaveGoods
            },
            'addGoodsFormView  textfield[name=name]': {
                change: this.onValidation
            },
            'addGoodsFormView  textfield[name=price]': {
                change: this.onValidation
            }
        });
    },

    onSaveGoods: function (button) {
        var me = this;
        var goodsModel = Ext.create('Goods.model.GoodsModel');
        goodsModel.set(this.getAddGoodsFormView().down('form').getValues());
        goodsModel.save({
            success: function (operation, response) {
                var objAjax = operation.data;
                Ext.getStore('GoodsStore').add(objAjax);
                me.getAddGoodsFormView().close();
            },
            failure: function (dummy, result) {
                Ext.MessageBox.show({
                    title: 'Дубликат!',
                    msg: 'Такой товар и цена уже существуют',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }

        });
    },

    onAddGoods: function () {
        Ext.widget('addGoodsFormView');
    },

    onDelGoods: function () {
        var sm = this.getGoodsGridView().getSelectionModel();
        var rs = sm.getSelection();
        this.getGoodsGridView().store.remove(rs[0]);
        this.getGoodsGridView().store.commitChanges();
        this.getGoodsGridView().disable();
    },

    onChangeText: function () {
        Ext.getStore('GoodsStore').load({
            params: {
                search: this.getGoodsView().down('searchGoodsView').getValues()
            }
        });
    },

    onLineGrid: function () {
        this.getGoodsGridDelete().enable();
    },

    onValidation: function () {
        if (this.getAddGoodsFormName().validate() && this.getAddGoodsFormPrice().validate()) {
            this.getAddGoodsFormSave().enable();
        }
        else {
            this.getAddGoodsFormSave().disable();
        }
    }

});