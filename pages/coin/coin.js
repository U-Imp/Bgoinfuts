// pages/coin/coin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getData: {
      title: '当前可用❤值',
      integral: 13000,
      coinList: [
        {
          id: 'a1',
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          title: '店铺1',
          content: '我是一家神奇的店铺,一家神奇的店铺,神奇的店铺,的店铺,店铺,铺',
        },
        {
          id: 'a2',
          imgUrl: 'http://img.ui.cn/data/file/2/7/7/693772.jpg',
          title: '店铺2',
          content: '我比第一家还要神奇',
        },
        {
          id: 'a3',
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          title: '店铺3',
          content: '他们吹牛,我会动,我最神奇',
        },
        {
          id: 'a4',
          imgUrl: 'http://img.ui.cn/data/file/6/1/8/616816.png',
          title: '店铺4',
          content: '你们都是辣鸡',
        },
        {
          id: 'a5',
          imgUrl: 'http://img.ui.cn/data/file/1/3/1/674131.png',
          title: '店铺4',
          content: '呵呵',
        }
      ],
      coinForm:{},
      coinVisible: false,
    },
    // 弹出框
    popupForm: {
      visible: false,
      position: 'bottom',
      overlay: true, //蒙版
      id: '',
      imgUrl: '',
      title: '',
      maxNum: 10,
      numCoin: 10,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  
  // 打开弹出框
  exchange(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    this.setData({
      'popupForm.id': that.data.getData.coinList[index].id,
      'popupForm.imgUrl': that.data.getData.coinList[index].imgUrl,
      'popupForm.title': that.data.getData.coinList[index].title,
      'popupForm.maxNum': 10,
      'popupForm.numCoin': 10,
      'popupForm.visible': true
    })
  },

  // 关闭弹出框
  closePopup(){
    this.setData({
      'popupForm.visible': false
    })
  },

  // 计数 
  numChange(e) {
    this.setData({
      'popupForm.numCoin': e.detail.value
    })
  },

  // 立即兑换
  addPopup(){
    console.log(this.data.popupForm);
    this.setData({
      'popupForm.visible': false
    })
  }
})