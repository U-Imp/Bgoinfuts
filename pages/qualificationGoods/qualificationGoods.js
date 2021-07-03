const app = getApp();
Page({
  data: {
    getData: {},
  },
  onLoad: function (options) {
    // console.log('options', options)
    var that = this;
    this.getData(options.qbuyId)
  },
  onUnload: function () {
    // 页面关闭
  },
  getData: function (showId) {
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetShowDayGoodsList',
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
  }
 
});