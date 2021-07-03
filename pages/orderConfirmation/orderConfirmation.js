const app =getApp();
Page({
  data: {
    getData:{},
    getDataOld:{
      preOrderId:'',
      addr:'港湾广场2338店',
      list: [
        {
          goodsId: 'ww123456',
          goodsName: '丑娃娃',
          goodsImg: 'http://img.ui.cn/data/file/7/7/6/992677.png',
          goodsPrice: 30,
          goodsNum: 2,
          goodsTotal: 60,
          change: false
        },
        {
          goodsId: 'ww567890',
          goodsName: '皮卡丘',
          goodsImg: 'http://img.ui.cn/data/file/5/7/3/725375.jpg',
          goodsPrice: 50,
          goodsNum: 5,
          goodsTotal: 250,
          change: false
        }
      ],
      orderRemark: '',
      total: 0,
      index: 0, //店
      shops: [],
      storeIdList: [],
      canExp: [],
      addrs: [],
      expFee: [],
      selCanExp: 0,
      selExpFee: 0,
      selBranch: '',
    },
  },
  onLoad: function (options) {
    // console.log('订单确认', JSON.parse(options.params))
    this.setData({
      getData: JSON.parse(options.params)
    })
    this.setData({
      'getData.addr': ''
    })
    // var that = this;
    // var objArr = [JSON.parse(options.params)];
    // // console.log(objArr)
    // this.PreOrder(objArr)
    // this.setData({
    //   'orderForm.orderTotal': obj.cartTotal,
    //   'orderForm.orderList': obj.cartList,
    // })
  },
  onShow: function () {
    this.getStoreList();
  },
  // 预生成订单
  // PreOrder:function(obj){
  //   const that = this;
  //   app.Ajax(
  //     'Order',
  //     'POST',
  //     'PreOrder',
  //      obj ,
  //     function (json) {
  //       // console.log('json', json);
  //       if (json.success) {
  //         that.setData({
  //           getData: json.data
  //         })
  //       } else {
  //         app.Toast('', 'none', 3000, json.msg.code);
  //       }
  //     }
  //   )
  // },
  // 添加备注
  bindKeyInput:function(e){
    this.setData({
      'getData.orderRemark': e.detail.value
    })
  },
  getAddr(){
    const that = this
    wx.chooseAddress({
      success(res) {
        let addrStr = res.provinceName + ' ' + res.cityName + ' ' + res.countyName + ' ' + res.detailInfo + ' ' + res.userName + ' ' + res.telNumber
        that.setData({ 'getData.addr' :  addrStr,})
      }
    })
  },
  // 店铺列表
  getStoreList: function () {
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetStoreListV2',
      {},
      function (json) {
        // console.log('json',json);
        that.setData({
          shops: json.data.storeList.map(i => i.storeName),
          storeIdList: json.data.storeList.map(i => i.storeId),
          canExp: json.data.storeList.map(i => i.canExp),
          addrs: json.data.storeList.map(i => i.storeAddr),
          expFee: json.data.storeList.map(i => i.expFee),
        })
      }, function (res) {
        app.Toast(res, 'none', 3000);
      }
    )
  },
  // 选择店
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      selBranch: this.data.storeIdList[e.detail.value]
    })
    if (this.data.canExp[e.detail.value] == 1){
      const that = this
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.address']) {
            wx.authorize({
              scope: 'scope.address',
              success() {
                that.getAddr()
              }
            })
          } else {
            that.getAddr()

          }
          that.setData(
            { 
              selCanExp: that.data.canExp[e.detail.value], 
              selExpFee: that.data.expFee[e.detail.value]}
            )
        },
        fail(res) {

        }
      })
    } else{
      this.setData({
        'getData.addr': this.data.addrs[e.detail.value],
        selCanExp: this.data.canExp[e.detail.value],
        selExpFee: this.data.expFee[e.detail.value]
      })
    }
  },
  // 订单提交
  submit(e){
    // 提交订单 成功后 支付心值 成功扣除心值  跳转到首页
    //                        支付失败 提示失败原因 跳转到列表待支付页
    // 提交订单 失败 保留当前页 重新提交 
    if (this.data.getData.addr == '' || this.data.selBranch == ''){
      app.Toast('请先选择领取礼品的店铺', 'none', 3000, '');
      return;
    }
    const send = {
      remark: this.data.getData.orderRemark,
      preOrderId: this.data.getData.preOrderId,
      storeBranchId: this.data.selBranch,
      expAddr: this.data.getData.addr,
    }
    // console.log(this.data.getData.orderRemark)
    const that = this;
    app.Ajax(
      'Order',
      'POST',
      'PayOrderV2',
      { ...send },
      function (json) {
        // console.log('json', json);
        if (json.success) {
          that.PayForOrder(json.data.orderId)
          
          // that.setData({
          //   getData: json.data,
          // })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
          
        }
      }
    )
    
    // var that = this;
    // var options = JSON.stringify(this.data.orderForm);
    // wx.navigateTo({
    //   url: '../orderDetails/orderDetails?options=' + options
    // })
    // wx.redirectTo({
    //   url: '../orderList/orderList'
    // })
  },
  // 订单支付
  PayForOrder: function (orderId) {
    const that = this;
    wx.showModal({
      title: '您的消费',
      content: '需支付：❤' + (that.data.getData.total + that.data.selExpFee),
      confirmText: '确认支付',
      success: function (res) {
        if (res.confirm) {
          that.PayForOrderAjax(orderId);
        } else if (res.cancel) {
          app.Toast('支付失败', 'none', 3000);
          setTimeout(function () {
            wx.redirectTo({
              url: '../orderList/orderList?status=0'
            })
          }, 2600)
        }
      },
      fail: function () {
        app.Toast('', 'none', 3000, json.msg.code);
      }
    })
  },
  PayForOrderAjax: function (orderId){
    const that = this;
    app.Ajax(
      'Order',
      'POST',
      'PayForOrder',
      { orderId: orderId },
      function (json) {
        // console.log('json', json);
        if (json.success) {
          app.Toast('支付成功', 'none', 3000);
          setTimeout(function () {
            wx.switchTab({
              url: '../homePage/homePage'
            })
          }, 2600)
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  }
});