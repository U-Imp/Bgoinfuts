Page({
  data: {
    orderForm: {
      title: '',
      price: '',
      num: '',
      total: '',
      imgUrl: '',
      remark: '',
    }
  },
  onLoad: function (options) {
    var that = this;
    console.log(options)
    var obj = JSON.parse(options.options);
    this.setData({
      'orderForm.title': obj.title,
      'orderForm.price': obj.price,
      'orderForm.num': obj.num,
      'orderForm.total': obj.total,
      'orderForm.imgUrl': obj.imgUrl
    })
  },
  onChange({detail}){
    console.log(detail);
    this.setData({
      'orderForm.remark': detail
    })
  },
  submit(){
    var that = this;
    var str = JSON.stringify(this.data.orderForm);
    console.log(str);
    wx.navigateTo({
      url: '../orderDetails/orderDetails?options=' + str
    })
  }
});