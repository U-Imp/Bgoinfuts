// pages/membershipCard/membershipCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getData:{
      cardsList:[{
        cardId:'1',
        cardNum:'D234345454',
        cardName:'和平店 大连市和平广场4F4-1208',
        src:'http://img.ui.cn/data/file/3/6/4/1830463.jpg',
      }, {
        cardId: '2',
          cardNum: '',
          cardName: '万达店 大连市和平广场4F4-1208',
        src: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
      }, {
        cardId: '3',
          cardNum: '',
          cardName: '中山店 大连市和平广场4F4-1208',
          src: 'http://img.ui.cn/data/file/1/7/2/1896271.jpg',
      }, {
        cardId: '4',
          cardNum: 'K234345454',
          cardName: '港湾店 大连市和平广场4F4-1208',
        src: 'http://img.ui.cn/data/file/7/8/6/1366687.png',
      }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  gotoCardBinding:function(){
    wx.navigateTo({
      url: '../cardBinding/cardBinding',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})