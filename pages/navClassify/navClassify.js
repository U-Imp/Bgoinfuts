// pages/others/lefttab/lefttab.js
const app = getApp();
Page({
  data: {
    activeIndex: 10,
    //getData:{},
    getData:{
      monthList: ["Toy", "Home", "Other"],
      dayList:{
        "Toy": [
          {
            showId: "1",
            showMonth: "101",
            showDay: "Oct.2018"
          }, {
            showId: "1",
            showMonth: "102",
            showDay: "Oct.2018"
          }
        ],
        "Home": [
          {
            "showId": "1",
            "showMonth": "81",
            "showDay": "Aug.2018"
          }, {
            "showId": "1",
            "showMonth": "82",
            "showDay": "Aug.2018"
          }
        ],
        "Other": [
          {
            showId: "1",
            showMonth: "91",
            showDay: "Sep.2018"
          }, {
            showId: "1",
            showMonth: "92",
            showDay: "Sep.2018"
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
    //this.getData();
    // console.log('onshow', wx.getStorageSync('lastActiveIndex') || 0)
    this.setData({
      activeIndex: wx.getStorageSync('lastActiveIndex') || 0
    })
  },
  getData:function(){
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetShowDay',
      {},
      function (json) {
        // console.log('json', json);
        if (json.success) {
          that.setData({
            getData: json.data,
            activeIndex: wx.getStorageSync('lastActiveIndex') || json.data.monthList[0]
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  gotoGoodsList:function(e){
    
    wx.navigateTo({
      url: '../goodsList/goodsList?showId=' + e.currentTarget.dataset.showid,
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
    console.log('分类')
  },
  changeTab: function (e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
    })
    wx.setStorageSync('lastActiveIndex', this.data.activeIndex)
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