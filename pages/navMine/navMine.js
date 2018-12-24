
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData:{},
  },
  
  onLoad: function () {
    
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
   
    const that = this;
    wx.onUserCaptureScreen(function (res) { 
      that.setData({
        'getData.heart': 122
      },()=>{
        console.log('zhe122')
      })
      console.log('用户截屏了') 
      that.setData({
        'getData.heart': 1111111
      }, () => {
        console.log('zhe1111')
      })
      })
  },
  getData: function () {
    const that = this;
    app.Ajax(
      'Member',
      'POST',
      'GetMemberInfo',
      {},
      function (json) {
        // console.log('ajson',json);
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
  
  // 我的会员卡
  membershipCard: function (e) {
    wx.navigateTo({
      url: '../membershipCard/membershipCard',
    })
  },
  // 积分兑换
  giftCredits: function (e) {
    wx.navigateTo({
      url: '../coin/coin',
    })
  },
  gotoQrcode:function(){
    wx.navigateTo({
      url: '../qrcode/qrcode',
    })
  }
});


