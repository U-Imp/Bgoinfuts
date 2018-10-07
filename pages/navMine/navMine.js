var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData:{},
    applyRecordData:{},
    disabled: false,
  },
  
  onLoad: function () {
  },
  iphone: function(){
    wx.navigateTo({
      url: '../modifyPhone/modifyPhone',
    })
  },
  card: function () {
    wx.navigateTo({
      url: '../modifyBankcard/modifyBankcard',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    this.getMainInfo();
  },
  getMainInfo:function(){
    const that = this;
  //   app.Ajax(
  //     'User',
  //     'POST',
  //     'GetMainInfo',
  //     {  },
  //     function (json) {
  //       // console.log('ajson',json);
  //       if (json.success) {
  //         that.setData({
  //           getData: json.data
  //         })
  //       }else{
  //         app.Toast('', 'none', 3000, json.msg.code);
  //         // wx.showToast({
  //         //   title: json.msg.msg,
  //         //   icon: 'none',
  //         //   duration: 2500
  //         // });
  //       }
  //     }
  //   )
  },
});


