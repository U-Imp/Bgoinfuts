// pages/others/lefttab/lefttab.js
Page({
  data: {
    activeIndex: 10,
    getData:{
      monthList: [10,9,8],
      dayList:{
        "10": [
          {
            showId: "1",
            showImg: "101",
            showTitle: "Oct.2018"
          }, {
            showId: "1",
            showImg: "102",
            showTitle: "Oct.2018"
          }
        ],
        "8": [
          {
            "showId": "1",
            "showImg": "81",
            "showTitle": "Aug.2018"
          }, {
            "showId": "1",
            "showImg": "82",
            "showTitle": "Aug.2018"
          }
        ],
        "9": [
          {
            showId: "1",
            showImg: "91",
            showTitle: "Sep.2018"
          }, {
            showId: "1",
            showImg: "92",
            showTitle: "Sep.2018"
          }
        ],
      }
    },
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var vm = this;
    wx.getSystemInfo({
      success: (res) => {
        vm.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  gotoDoodsList:function(){
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  changeTab: function (e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
    })
  },
  // 	滚动到底部/右边，会触发 scrolltolower 事件
  getMore: function () {
    // this.setData({
    //   contentList: this.data.contentList.concat([
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' }
    //   ])
    // });
  }
})