Page({
  data: {
    actions: [
      {
        name: '删除',
        color: '#fff',
        fontsize: '20',
        width: 100,
        icon: 'trash',
        background: '#ed3f14'
      }
    ],

    cartForm: {
      cartTotal: 0,
      cartNums: 2,
      cartList: [
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
    // 生命周期函数--监听页面加载
    var that = this;
    this.computed();
  },
  // 计算总积分
  computed() {
    var cartTotal = 0;
    for (var i = 0; i < this.data.cartForm.cartList.length; i++) {
      cartTotal += this.data.cartForm.cartList[i].goodsTotal
    }
    this.setData({
      'cartForm.cartTotal': cartTotal
    })
  },
  // 编辑单条
  handelIt(e) {
    var index = e.currentTarget.dataset.index;
    var item = 'cartForm.cartList[' + index + '].change';
    this.setData({
      [item]: true
    })
  },
  // 完成编辑单条
  finishIt(e) {
    var index = e.currentTarget.dataset.index;
    var item = 'cartForm.cartList[' + index + '].change';
    var totalAll = 0;
    this.setData({
      [item]: false
    });
    this.computed();
  },
  // 修改数量
  addNum(e) {
    var index = e.currentTarget.dataset.index;
    var itemNum = 'cartForm.cartList[' + index + '].goodsNum';
    var itemTotal = 'cartForm.cartList[' + index + '].goodsTotal';
    this.setData({
      [itemNum]: e.detail.value,
    });
    this.setData({
      [itemTotal]: Number(this.data.cartForm.cartList[index].goodsNum) * Number(this.data.cartForm.cartList[index].goodsPrice)
    })
  },
  // 去结算
  toSettlement() {
    var options = JSON.stringify(this.data.cartForm)
    wx.navigateTo({
      url: '../orderConfirmation/orderConfirmation?options=' + options
    })
  }
})
