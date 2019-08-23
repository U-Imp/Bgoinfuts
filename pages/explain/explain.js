const app = getApp();
Page({
  data: {
    getData: {},
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    this.getData();
  },
  getData: function () {
    const that = this;
    app.Ajax(
      'HomePage',
      'POST',
      'GetExplainList',
      {},
      function (json) {
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
  gotoExplainUrl: function (e) {
    console.log('json', e);
    console.log('json', e.currentTarget.dataset.explainurl);
    wx.navigateTo({
      url: '../publicArticle/publicArticle?url=' + e.currentTarget.dataset.explainurl,
    })
  },

})