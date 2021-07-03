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
      'GetActiveList',
      {},
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
  gotoActiveUrl: function (e) {
    // console.log('w', e.currentTarget.dataset)
    if (e.currentTarget.dataset.pageurl=='1'){
      wx.showToast({
        title: '正在建设中',
        icon: 'none',
        duration: 2000,
      });
    }else{
      if (e.currentTarget.dataset.urltype == '1') {
        wx.navigateTo({
          url: e.currentTarget.dataset.pageurl,
        })
      } else {
        wx.navigateTo({
          url: '../publicArticle/publicArticle?url=' + e.currentTarget.dataset.pageurl,
        })
      }
    }
  },

})