Page({
  data: {
    orderForm: {
      title: '待支付',
      goodsImg: 'http://img.ui.cn/data/file/7/7/6/992677.png',
      goodsName: '丑娃',
      goodsNum: 5,
      goodsPrice: 20,
      goodsTotal: 1000,

      
    }

  },

  onLoad: function (options) {
    var that = this;
    console.log(options);
  },


});