// pages/coin/coin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  getData: function () {
    const that = this;
    app.Ajax(
      'HomePage',
      'POST',
      'GetActiveCheck',
      { },
      function (json) {
         console.log('json', json);
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
})