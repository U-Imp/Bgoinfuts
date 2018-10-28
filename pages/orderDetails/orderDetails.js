const app = getApp();
Page({
  data: {
    orderState: ['待支付', '已支付', '待取货', '已完成'],
    getData: {
      status:'待支付',
      orderNumber:'GSJ6734823623784',
      pickAddress: '港湾广场2338店',
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
      ],
      orderRemark: '',
      orderTotal: 0,
    },
  },
  onLoad: function (options) {
    // var that = this;
    // var obj = JSON.parse(options.params);
    console.log(options)
    this.getData(options.orderId)
    // this.setData({
    //   'orderForm.orderTotal': obj.cartTotal,
    //   'orderForm.orderList': obj.cartList,
    // })
  },
  getData: function (orderId){
    const that = this;
    app.Ajax(
      'Order',
      'POST',
      'GetOrderInfo',
      { orderId: orderId},
      function (json) {
        // console.log('ajson', json);
        if (json.success) {
          that.setData({
            getData: json.data
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  // 添加备注
  bindKeyInput: function (e) {
    this.setData({
      'getData.orderRemark': e.detail.value
    })
  },
  // 订单提交
  submit(e) {
    // 提交订单 成功后 支付心值 成功扣除心值  跳转到首页
    //                        支付失败 提示失败原因 跳转到列表待支付页
    // 提交订单 失败 保留当前页 重新提交 
    console.log(this.data)
    // var that = this;
    // var options = JSON.stringify(this.data.orderForm);
    // wx.navigateTo({
    //   url: '../orderDetails/orderDetails?options=' + options
    // })
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  }
});