const app =getApp()
Page({
  data: {
    getData:{},
    storesDetails: {
      logo:'http://img.ui.cn/data/file/3/6/4/1053463.gif?imageMogr2/auto-orient/strip',
      name: 'XXXX店铺',
      content: '拜拜甜甜圈,珍珠奶茶方便面,火锅米饭大盘鸡,拿走拿走别客气,来来深呼吸,高温瑜伽游几米,动感单车普拉提,保温杯里泡枸杞',
      address: '桃花坞里桃花庵',
      tel: '010-123456',

      imgList:[
        {
          imgUrl: 'http://img.ui.cn/data/file/5/2/0/620025.jpg'
        },
        {
          imgUrl: 'http://img.ui.cn/data/file/9/2/9/601929.jpg'
        },
        {
          imgUrl: 'http://img.ui.cn/data/file/8/0/1/607108.jpg'
        }
      ],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,

      newShopList: [
        {
          title: '新品1',
          imgUrl: 'http://img.ui.cn/data/file/6/3/5/1669536.jpg',
          content: '我长得贼丑'
        },
        {
          title: '新品2',
          imgUrl: 'http://img.ui.cn/data/file/1/5/1/1448151.jpg',
          content: '我长得贼丑, 抓住我都得扔了'
        },
        {
          title: '新品3',
          imgUrl: 'http://img.ui.cn/data/file/2/0/6/1262602.jpg',
          content: '我长得贼丑,抓住我都得烧了'
        },
        {
          title: '新品4',
          imgUrl: 'http://img.ui.cn/data/file/7/8/6/1366687.png',
          content: '我长得贼丑,抓住我都得剪碎了,真丑太丑贼丑'
        },
        {
          title: '新品5',
          imgUrl: 'http://img.ui.cn/data/file/3/0/6/1625603.jpg',
          content: '你们是挺丑的'
        },

      ],
    },
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // var that = this;
    // var id = options.id;
    // console.log(options);
    this.getData(options.storeId)
  },
  onShow:function(){
    
  },
  getData: function (storeId){
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetStoreInfo',
      { storeId},
      function (json) {
        // console.log('json',json);
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
  previewImage:function(e){
    // console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] 
    })
  },
  gotoIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
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

