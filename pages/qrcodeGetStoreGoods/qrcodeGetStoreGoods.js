// pages/qrcode/qrcode.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111,options)
    // this.getQRcode()
    this.setData({
      orderId: options.orderId
    })
    const that = this;
    // wx.onUserCaptureScreen(function (res) {
    //   console.log('用户截屏了')
    //   that.getReloadScanCode();
    // })
    
    wx.onSocketOpen(function (res) {
      console.log('WebSocket 已开启！')
      that.getQRcode();
      that.getReloadScanCode(options.orderId);
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
            that.getReloadScanCode(that.data.orderId);
          }, 1500)
          // 
        }
      });
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket onUnload已关闭！')
    })
  },

  
  getQRcode: function () {
    //console.log('here', wx.getStorageSync('scanCode'))
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: '',
      width: 228,
      height: 228,
      colorDark: "#f54281",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  onShow: function () {
    wx.connectSocket({
      url: 'wss://wxapp.a-cubic.com/api/gift/ws'
    })
  },
  getReloadScanCode: function (orderid) {
    app.Ajax(
      'Order',
      'POST',
      'GetStoreGoodsCode',
      {
        orderId: orderid
      },
      function (json) {
        // console.log('GetScanCode',json);
        if (json.success) {
          wx.sendSocketMessage({
            data: 'getPayState:' +json.data
          })
          qrcode.makeCode(json.data)

        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  onUnload:function(){
    wx.closeSocket(function (rea) {
      console.log(rea)
    })
  }
})