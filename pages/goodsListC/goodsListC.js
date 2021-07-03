const app = getApp();
Page({
  data: {
    getData: {},
    cardsList: [
      {
        id: 0,
        title: '商品1',
        imgUrl: 'http://img.ui.cn/data/file/1/7/2/1896271.jpg',
      },
      {
        id: 1,
        title: '商品2',
        imgUrl: 'http://img.ui.cn/data/file/3/6/4/1830463.jpg',
      },
      {
        id: 2,
        title: '商品3',
        imgUrl: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
      },
      {
        id: 3,
        title: '商品4',
        imgUrl: 'http://img.ui.cn/data/file/3/0/6/1625603.jpg',
      },
      {
        id: 4,
        title: '商品5',
        imgUrl: 'http://img.ui.cn/data/file/6/3/5/1669536.jpg',
      },
      {
        id: 5,
        title: '商品6',
        imgUrl: 'http://img.ui.cn/data/file/1/5/1/1448151.jpg',
      },
      {
        id: 6,
        title: '商品7',
        imgUrl: 'http://img.ui.cn/data/file/9/1/3/1255319.png',
      },
      {
        id: 7,
        title: '商品8',
        imgUrl: 'http://img.ui.cn/data/file/2/0/6/1262602.jpg',
      },
      {
        id: 8,
        title: '商品9',
        imgUrl: 'http://img.ui.cn/data/file/0/7/4/1247470.jpg',
      },
      {
        id: 9,
        title: '商品10',
        imgUrl: 'http://img.ui.cn/data/file/7/8/6/1366687.png',
      },
      {
        id: 10,
        title: '商品101',
        imgUrl: 'http://img.ui.cn/data/file/7/1/6/1241617.jpg',
      },

    ]
  },
  onLoad: function (options) {
    // console.log('options', options)
    var that = this;
    this.getData(options.showId)
  },
  onUnload: function () {
    // 页面关闭
  },
  getData: function (showId) {
    const that = this;
    app.Ajax(
      'HomePage',
      'POST',
      'GetCategoryGoodsList',
      { showId: showId },
      function (json) {
        // console.log('json', json);
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
  addtoCart: function (e) {
    const that = this;
    app.Ajax(
      'Order',
      'POST',
      'InputCart',
      {
        goodsId: e.currentTarget.dataset.goodsid,
        goodsNum: 1
      },
      function (json) {
        // console.log('json', json);
        if (json.success) {
          wx.showToast({
            title: '成功添加至购物车',
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )

  },
  gotoGoodsDetails: function (e) {
    // console.log('e',e)
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + e.currentTarget.dataset.goodsid,
    })
  }
});