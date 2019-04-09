// pages/coin/coin.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '您当前拥有',
    dec:'来兑换积分的人最好看了~',
    getData:{},
    getDataOld: {
      heart: 13000,
      list: [
        {
          id: 'a1',
          storeMemberId:1,
          point:'53500',
          storeRate:25,
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          title: '店铺1',
          content: '我是一家神奇的店铺,一家神奇的店铺,神奇的店铺,的店铺,店铺,铺',
        },
        {
          id: 'a2',
          storeMemberId: 2,
          point: '5200',
          storeRate: 25,
          imgUrl: 'http://img.ui.cn/data/file/2/7/7/693772.jpg',
          title: '店铺2',
          content: '我比第一家还要神奇',
        },
        {
          id: 'a3',
          storeMemberId: 3,
          point: '53500',
          storeRate: 25,
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          title: '店铺3',
          content: '他们吹牛,我会动,我最神奇',
        },
        {
          id: 'a4',
          storeMemberId: 4,
          point: '53500',
          storeRate: 25,
          imgUrl: 'http://img.ui.cn/data/file/6/1/8/616816.png',
          title: '店铺4',
          content: '你们都是辣鸡',
        },
        {
          id: 'a5',
          storeMemberId: 5,
          point: '53500',
          storeRate: 25,
          imgUrl: 'http://img.ui.cn/data/file/1/3/1/674131.png',
          title: '店铺4',
          content: '呵呵',
        }
      ],
    },
    // 弹出框
    popupForm: {
      visible: false,
      position: 'bottom',
      overlay: true, //蒙版
      id: '',
      imgUrl: '',
      title: '',
      maxNum: 0,
      numCoin: 0,
      numVal:0,
      point:0,
      storeMemberId:null,
      storeRate:null,
      todayExchange:null,
      exchangeLimit:null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData();
  },
  getData:function(){
    const that = this;
    app.Ajax(
      'Member',
      'POST',
      'GetRemoteStore',
      {  },
      function (json) {
        // console.log('json', json);
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

  
  // 打开弹出框
  exchange(e){
    // console.log(e.currentTarget.dataset)
    const that = this;
    var index = e.currentTarget.dataset.index;
    this.setData({
      // 'popupForm.id': that.data.getData.list[index].id,
      'popupForm.imgUrl': that.data.getData.list[index].storeImg,
      'popupForm.title': that.data.getData.list[index].storeName,
      'popupForm.storeMemberId': e.currentTarget.dataset.storememberid,
     


      
      // 'popupForm.maxNum': 10,
      // 'popupForm.numCoin': 10,
      // 'popupForm.visible': true
    })
    app.Ajax(
      'Member',
      'POST',
      'GetRemoteStoreInfo',
      { storeMemberId: e.currentTarget.dataset.storememberid},
      function (json) {
        // console.log('json', json);
        if (json.success) {
          let hasMax = parseInt(json.data.point / json.data.storeRate)
          let limitMax = json.data.exchangeLimit
          let todayMax = json.data.todayExchange
          let leftMax = limitMax - todayMax
          let max;
          if (hasMax > limitMax){
            max = limitMax - todayMax
          } else{
            if (hasMax > leftMax){
              max = leftMax
            }else{
              max = hasMax
            }
          }
          that.setData({
            'popupForm.maxNum': max,
            'popupForm.point': json.data.point,
            'popupForm.numCoin': parseInt(json.data.point / json.data.storeRate),
            'popupForm.numVal': max,
            'popupForm.storeRate': json.data.storeRate,
            'popupForm.exchangeLimit': json.data.exchangeLimit,
            'popupForm.todayExchange': json.data.todayExchange,
            'popupForm.visible': true
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
    
    
  },

  // 关闭弹出框
  closePopup(){
    this.setData({
      'popupForm.visible': false
    })
  },

  // 计数 
  numChange(e) {
    this.setData({
      'popupForm.numVal': e.detail.value
    })
  },

  // 立即兑换
  addPopup(){
    // console.log(this.data.popupForm);
    const that = this;
    const params = {
      storeMemberId: this.data.popupForm.storeMemberId,
      point: this.data.popupForm.numVal * this.data.popupForm.storeRate 
    }
    // console.log('params',params)
    app.Ajax(
      'Member',
      'POST',
      'ExchangeHeart',
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

  gotoQrcode(){
    wx.navigateTo({
      url: '../qrcodeExchange/qrcodeExchange',
    })
  }
})