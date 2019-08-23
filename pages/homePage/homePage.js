const app = getApp()
Page({
  data: {
    getData: {},
    homePage:{
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // var that = this;
    // var id = options.id;
    // console.log(options);
    this.getData("1")
  },
  onShow: function () {

  },
  getData: function (storeId) {
    const that = this;
    app.Ajax(
      'HomePage',
      'POST',
      'GetHomePage',
      {},
      function (json) {
        //console.log('json',json);
        if (json.success) {
          that.setData({
            getData: json.data
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
          if (json.msg.code == 4000) {
            setTimeout(function () {
              that.getData(storeId);
            }, 1000)
          }
        }
      }
    )
  },
  previewImage: function (e) {
    // console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src]
    })
  },
  gotoIndex: function () {
    wx.switchTab({
      url: '../homePage/homePage',
    })
  },
  gotoBannerUrl: function (e) {
    // console.log('w', e.currentTarget.dataset)
    if (e.currentTarget.dataset.urltype=='1'){
      wx.navigateTo({
        url: e.currentTarget.dataset.bannerurl,
      })
    }else{  
      wx.navigateTo({
        url: '../publicArticle/publicArticle?url='+e.currentTarget.dataset.bannerurl,
      })
    }
    
  },
  gotoGoodsDetails: function (e) {
    // console.log('w', e.currentTarget.dataset.goodsid)
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + e.currentTarget.dataset.goodsid,
    })
  },
  gotoMenuUrl: function (e) {
    // console.log('w', e.currentTarget.dataset)
    wx.navigateTo({
      url: e.currentTarget.dataset.menuurl,
    })
  },
  gotoTabUrl: function (e) {
    // console.log('w', e.currentTarget.dataset)
    wx.switchTab({
      url: e.currentTarget.dataset.menuurl,
    })
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.getData.storeName,
      imageUrl: this.data.getData.storeCardImg,

      success: function (res) {
        console.log('res', res)

      },
      fail: function (res) {
        // 转发失败
        app.Toast(res, 'none', 3000);
      }
    }
  }
})

