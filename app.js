//app.js

import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales)
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
wx.T = T

App({
  onLaunch: function () {
    var isDebug = false;//true调试状态使用本地服务器，非调试状态使用远程服务器
    if (!isDebug) {
      //远程域名
      wx.setStorageSync('domainName', "https://wxapp.a-cubic.com/api/gift/Wx/")
    }
    else {
      //本地测试域名
      wx.setStorageSync('domainName', "http://192.168.0.11:55734/api/PG/")
    }
    // 登录
    wx.login({
      success: res => {
        const that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.Ajax(
          'Open',
          'POST',
          'Login',
          { code: res.code },
          function (json) {
            console.log('~~~',json);
            if (json.success) {
              wx.setStorageSync('token', json.data.token);
              // console.log(json.data.token);


              if (!!json.data.isReg) {
                // 跳转到授权登录页
                console.log('跳转授权页')
                // wx.redirectTo({
                //   url: '../registeredSalesperson/registeredSalesperson',
                // })
              }
            } else {
              // that.Toast('','none',2000,json.msg.code)
              console.log('here')
            }
          }
        )
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }, Ajax: function (url, type, method, data, callback) {
    // wx.showLoading({
    //   title: 'loading',
    //   duration:1000,
    // });

    var send = {
      token: wx.getStorageSync('token'),
      method: method,
      param: data,
    };
    wx.request({
      url: wx.getStorageSync('domainName') + url,
      data: send,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
      },
      complete: function () {
        // wx.hideLoading();
      }
    })
  }
  ,
  Toast: function (title, icon, duration, code) {
    let content = title;
    switch (code) {
      case 10001:
        content = '您已经绑定过店铺'
        break;
      case 10002:
        content = '二维码无效哦'
        break;
      case 10003:
        content = '绑定店铺失败'
        break;
      case 10101:
        content = '无效的店铺用户'
        break;
      case 10102:
        content = '无效的店铺Id'
        break;
      case 10201:
        content = '请重新扫描二维码'
        break;
      case 10202:
        content = '上传失败'
        break;
      case 10301:
        content = '验证码错误'
        break;
      case 10302:
        content = '用户已存在'
        break;
      case 10303:
        content = '无效的二维码'
        break;
      case 10304:
        content = '手机号已存在'
        break;
      case 10305:
        content = '更新手机号失败'
        break;
      case 10306:
        content = '注册用户失败'
        break;
      case 10401:
        content = '无效的店铺'
        break;
      case 10402:
        content = '用户不存在'
        break;
      case 10403:
        content = '绑定银行卡错误'
        break;
      case 10404:
        content = '请先绑定银行卡'
        break;
      case 10405:
        content = '申请提现失败'
        break;
      case 10501:
        content = '操作员已存在'
        break;
      case 10502:
        content = '注册操作员失败'
        break;
      case 10503:
        content = '无效的操作员码'
        break;
      case 10601:
        content = '当前没有相关款项需要操作哦'
        break;
      case 10602:
        content = '收款失败'
        break;
      case 10603:
        content = '收款失败'
        break;
      default:
        console.log(1);
    }
    wx.showToast({
      title: content,
      icon: icon,
      duration: duration
    });
  }

})