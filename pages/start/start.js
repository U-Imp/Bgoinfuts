// pages/start/start.js
import event from '../../utils/event'
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login: function (){
    // app.login()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  bindGetUserInfo: function (e) {
    // console.log('ee', e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    // console.log('glo', app.globalData.userInfo)
    app.Ajax(
      'Open',
      'POST',
      'MemberReg',
      { ...e.detail.userInfo },
      function (json) {
        // console.log('json',json);
        if (json.success) {
          wx.switchTab({
            url: '../index/index',
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
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
    // console.log('userType', wx.getStorageSync('userType'))
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