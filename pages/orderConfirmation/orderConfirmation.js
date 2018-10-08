Page({
  data: {
    orderForm: {
      orderRemark: '',
      orderTotal: 0,
      orderList: [

        {
          goodsId: 'ww123456',
          goodsName: '丑娃娃',
          goodsImg: 'http://img.ui.cn/data/file/7/7/6/992677.png',
          goodsPrice: 30,
          goodsNum: 2,
          goodsTotal: 60,
          change: false
        },
        {
          goodsId: 'ww567890',
          goodsName: '皮卡丘',
          goodsImg: 'http://img.ui.cn/data/file/5/7/3/725375.jpg',
          goodsPrice: 50,
          goodsNum: 5,
          goodsTotal: 250,
          change: false
        }
      ]
    }
  },
  onLoad: function (options) {
    // var that = this;
    // var obj = JSON.parse(options.params);
    // console.log(obj)
    // this.setData({
    //   'orderForm.orderTotal': obj.cartTotal,
    //   'orderForm.orderList': obj.cartList,
    // })
  },
  // 添加备注
  onChangeRemark({detail}){
    this.setData({
      'orderForm.orderRemark': detail
    })
  },
  // 订单提交
  submit(){
    var that = this;
    var options = JSON.stringify(this.data.orderForm);
    wx.navigateTo({
      url: '../orderDetails/orderDetails?options=' + options
    })
  }
});