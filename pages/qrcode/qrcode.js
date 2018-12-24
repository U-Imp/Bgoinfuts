// pages/qrcode/qrcode.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getQRcode()
  },

  
  getQRcode: function () {
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: wx.getStorageSync('scanCode'),
      width: 228,
      height: 228,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  onShow: function () {
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
      
    })
    const that = this;
    wx.connectSocket({
      url: 'wss://wxapp.a-cubic.com/api/gift/ws'
    })

    wx.onSocketOpen(function (res) {
      that.getQRcode();
    })

    wx.onSocketMessage(function (res) {
      const that = this;
      // console.log(res);

      wx.showToast({
        title: '扫描成功',
        duration: 3000,
        success: function () {
          // that.getScanCode();
          // 
          setTimeout(function () {
            that.getReloadScanCode();
          }, 1500)
          // 
        }
      });
    })


  },
  getReloadScanCode: function () {
    app.Ajax(
      'Member',
      'POST',
      'ReloadScanCode',
      {},
      function (json) {
        // console.log('GetScanCode',json);
        if (json.success) {
          wx.sendSocketMessage({
            data: 'getPayState:' + json.data.scanCode
          })
          qrcode.makeCode(json.data.scanCode)
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  onHide: function () {
    wx.closeSocket(function (rea) {
      console.log(rea)
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  }
})