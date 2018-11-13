// pages/cardBinding/cardBinding.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 60, //倒计时
    disabled: false, //倒计时按钮是否禁用
    // vip:'',  //会员卡号
    phone: '', //手机号
    seccode: '', //验证码
    index: 0, //店
    shops: [],
    storeIdList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.getStoreList();
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.Ajax(
      // 方法组名称为：User（代购用户），不是系统通用用户Users
      'Member',
      'POST',
      'BindMemberStore',
      { 
        checkCode: this.data.seccode, 
        phone: this.data.phone,
        storeId: this.data.storeIdList[this.data.index],
        // cardCode:''
      },
      function (json) {
        console.log('json',json);
        if (json.success) {
          wx.navigateBack({
            url: '../membershipCard/membershipCard'
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  // 店铺列表
  getStoreList:function(){
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetStoreList',
      {},
      function (json) {
        console.log('json',json);
        that.setData({
          shops: json.data.storeList.map(i => i.storeName),
          storeIdList: json.data.storeList.map(i => i.storeId)
        })
      }, function (res) {
        app.Toast(res, 'none', 3000);
      }
    )
  },
  // 选择店
  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  vipInput:function(e){
    this.setData({
      vip: e.detail.value
    })
  },
  //获取手机栏input中的值
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  seccodeInput: function (e) {
    this.setData({
      seccode: e.detail.value
    })
  },
  phoneInputblur: function (e) {
    // console.log(e.detail)
    var phone = e.detail.value;
    var toastContent;
    if (e.detail.value == '') {
      app.Toast('号码不能为空', 'none', 2000);
      // wx.showToast({
      //   title: '号码不能为空',
      //   icon: 'none',
      //   duration: 2000,
      // });
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      app.Toast('手机号格式不正确', 'none', 2000);
      // wx.showToast({
      //   title: '手机号格式不正确',
      //   icon: 'none',
      //   duration: 2000,
      // });
    }
  },

  // 获取验证码
  bindButtonTap: function () {
    const that = this;
    if (this.data.phone == '') {
      app.Toast('请输入手机号', 'none', 2000);
      // wx.showToast({
      //   title: '请输入手机号',
      //   icon: 'none',
      //   duration: 2000
      // });
    } else if (this.data.phone.length==11){
      that.countDown();
      that.setData({
        disabled: true,
      })
      // 调方法
      app.Ajax(
        'Member',
        'POST',
        'CheckCode',
        { phone: this.data.phone },
        function (json) {
          // console.log('json',json);
          if (json.success) {
            app.Toast('短信验证码已发送', 'none', 2000);
          } else {
            app.Toast('', 'none', 3000, json.msg.code);
          }
        }, function (res) {
          app.Toast(res, 'none', 3000);
        }
      )


    } else if (this.data.phone.length<11){
      app.Toast('请输入正确的手机号', 'none', 2000);
    }

  },
  countDown: function () {
    const that = this;
    var currentTime = this.data.currentTime;
    var timer = setInterval(function () {
      if (currentTime > 0) {

        currentTime--;
        that.setData({
          text: currentTime + 's',
        })

      } else {
        clearTimeout(timer);
        that.setData({
          text: '重新发送',
          currentTime: 60,
          disabled: false,
        })
      }
    }, 1000)
  },
 

})