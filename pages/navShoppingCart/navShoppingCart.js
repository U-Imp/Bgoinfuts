Page({
  data: {
    cartForm: {
      title: '',
      brief: '暂时不知道写点啥',
      price: '',
      imgUrl: '',
      num: 0,
      total: 0
    }
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    that.setData({
      'cartForm.title': options.title,
      'cartForm.price': options.price,
      'cartForm.imgUrl': options.imgUrl,
      'cartForm.num': Number(options.num),
      'cartForm.total': Number(options.num) * Number(options.price),
    })
    console.log(this.data.cartForm);
  },
  addNum(e){
    console.log(e)
    this.setData({
      'cartForm.num': e.detail.value,
    });
    this.setData({
      'cartForm.total': Number(this.data.cartForm.num) * Number(this.data.cartForm.price)
    })
  },
  toSettlement(){
    var options = JSON.stringify({
      title: this.data.cartForm.title,
      price: this.data.cartForm.price,
      num: this.data.cartForm.num,
      imgUrl: this.data.cartForm.imgUrl,
      total: this.data.cartForm.total
    })  
  //   wx.navigateTo({
  //     url: '../orderConfirmation/orderConfirmation?imgUrl=' + this.data.cartForm.imgUrl + '&price=' + this.data.cartForm.price + '&title=' + this.data.cartForm.title + '&num=' + this.data.cartForm.num
  //   })
  // }
    wx.navigateTo({
      url: '../orderConfirmation/orderConfirmation?options='+options
    })
  }
})
