// pages/coin/coin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '您当前可以参与',
    dec: '请在期限内换购对应商品，过期资格自动消失~',
    getData: {},
    // 弹出框
    popupForm: {
      visible: false, 
      bdisabled: true,
      qbuyData: { },
      position: 'bottom',
      overlay: true, //蒙版
      qbuyId: null,
      qbuyCode: null,
      storeId: null,
      qbuyGoodsId: null,
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  getData: function () {
    const that = this;
    app.Ajax(
      'Active',
      'POST',
      'GetQbuyList',
      {},
      function (json) {
        if (json.success) {
          // console.log('json', json.data);
          that.setData({
            getData: json.data
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  select: function (e) {
    console.log('radioId', e.detail.value);
    var Id =e.detail.value
    this.setData({
      'popupForm.qbuyGoodsId': Id,
      'popupForm.bdisabled': false
    })
    // console.log('radioId', radioId);
  },

  // 打开弹出框
  exchange(e) {
    console.log("qbuyCode", e.currentTarget.dataset);
    console.log("qbuyCode", e.currentTarget.dataset.qbuycode);
    const that = this;
    var index = e.currentTarget.dataset.index;
    this.setData({
      'popupForm.qbuyCode': that.data.getData[index].qbuyCode,
      'popupForm.storeId': that.data.getData[index].storeId
    })
    // console.log('json', e.currentTarget.dataset.qbuyid);
    app.Ajax(
      'Active',
      'POST',
      'GetQbuyGoodsList',
      { qbuyCode: e.currentTarget.dataset.qbuycode },
      function (json) {
        console.log('json', json);
        if (json.success) {
          
          that.setData({
            'popupForm.qbuyData': json.data,
            'popupForm.visible': true
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )


  },

  // 关闭弹出框
  closePopup() {
    this.setData({
      'popupForm.visible': false,
      'popupForm.bdisabled': true
    })
  },

  // 计数 
  numChange(e) {
    this.setData({
      'popupForm.numVal': e.detail.value
    })
  },

  // 立即兑换
  addPopup() {
     console.log(this.data.popupForm);
    const that = this;
    const params = {
      qBuyCode: this.data.popupForm.qbuyCode,
      qBuyGoodsId: this.data.popupForm.qbuyGoodsId
    }
    console.log(params);
    // console.log('params',params)
    app.Ajax(
      'Active',
      'POST',
      'StartQBuyGoods',
      params,
      function (json) {
        // console.log('json', json);
        if (json.success) {
          that.setData({
            'popupForm.visible': false
          })
          that.getData();
          app.Toast('兑换成功', 'success', 1500);
          // setTimeout(function(){


          // },2000)
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },

  gotoQrcode() {
    wx.navigateTo({
      url: '../qrcodeExchange/qrcodeExchange',
    })
  }
})