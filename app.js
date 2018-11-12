//app.js

import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales)
T.setLocaleByIndex(wx.getStorageSync('langIndex') || 0);
wx.T = T

App({
  globalData: {
    userInfo: null
  },
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
            // console.log('~~~',json);
            if (json.success) {
              wx.setStorageSync('token', json.data.token);
              // console.log(json.data.token);
              // console.log(!!json.data.isReg)


              if (!json.data.isReg) {
                // 跳转到授权登录页
                console.log('跳转授权页');
                wx.redirectTo({
                  url: '../start/start',
                })
              }
            } else {
              // that.Toast('','none',2000,json.msg.code)
              console.log('here');
            }
          }
        )
      }
    })
  },
  Ajax: function (url, type, method, data, callback) {
    wx.showLoading({
      title: 'loading',
      duration:1000,
    });

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
        wx.hideLoading();
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading();
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
      // 个人中心
      case 10001:
        content = '会员已存在'
        break;
      case 10002:
        content = '会员注册异常'
        break;
      case 10003:
        content = '设置默认会员店铺失败'
        break;
      case 10004:
        content = '获取验证码错误'
        break;
        // 商城
      case 10101:
        content = '首页加载失败'
        break;
      case 10102:
        content = '无效的商品'
        break;
      case 10202:
        content = '上传失败'
        break;
      case 10103:
        content = '没有足够库存'
        break;
      case 10302:
        content = '用户已存在'
        break;
      case 10303:
        content = '无效的二维码'
        break;
      case 10104:
        content = '更新购物车失败'
        break;
      case 10105:
        content = '删除购物车失败'
        break;
      case 10106:
        content = '请先绑定会员卡哦'
        break;
      case 10107:
        content = '无效的预订单号'
        break;
      case 10108:
        content = '	生成订单失败'
        break;
      case 10109:
        content = '无效的订单状态'
        break;
      case 10110:
        content = '没有足够的心值'
        break;
      case 10111:
        content = '支付订单失败'
        break;
      case 10112:
        content = '	无效的店铺'
        break;
      // case 10502:
      //   content = '注册操作员失败'
      //   break;
      // case 10503:
      //   content = '无效的操作员码'
      //   break;
      // case 10601:
      //   content = '当前没有相关款项需要操作哦'
      //   break;
      // case 10602:
      //   content = '收款失败'
      //   break;
      // case 10603:
      //   content = '收款失败'
        // break;
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