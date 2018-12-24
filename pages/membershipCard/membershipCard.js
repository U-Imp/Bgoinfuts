// pages/membershipCard/membershipCard.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actions: [
      {
        name: '删除',
        color: '#fff',
        fontsize: '20',
        width: 80,
        icon: 'trash',
        background: '#2d8ff5'
      }
    ],
    getData:[],
      getDataOld:[{
        cardId:'1',
        storeId:1,
        cardCode:'D234345454',
        cardName:'和平店 大连市和平广场4F4-1208',
        isDefault:false,
        storeCardImg:'http://img.ui.cn/data/file/3/6/4/1830463.jpg',
      }, {
        cardId: '2',
          storeId: 2,
          cardCode: '343',
          isDefault: false,
          cardName: '万达店 大连市和平广场4F4-1208',
          storeCardImg: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
      }, {
        cardId: '3',
          storeId: 3,
          cardCode: '343',
          isDefault: true,
          cardName: '中山店 大连市和平广场4F4-1208',
          storeCardImg: 'http://img.ui.cn/data/file/1/7/2/1896271.jpg',
      }, {
        cardId: '4',
          storeId: 4,
          cardCode: 'K234345454',
          isDefault: false,
          cardName: '港湾店 大连市和平广场4F4-1208',
          storeCardImg: 'http://img.ui.cn/data/file/7/8/6/1366687.png',
      }]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  getData: function () {
    const that = this;
    app.Ajax(
      'Member',
      'POST',
      'GetMemberStoreList',
      {},
      function (json) {
        // console.log('json',json);
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
  alreadyMainShop:function(){
    // console.log('alreadyMainShop')
    app.Toast('已经是主店铺啦', 'success', 1500);
  },
  setDefaultMemberStore:function(e){
    // console.log('setDefaultMemberStore')
    // console.log(e.currentTarget.dataset.storeid)
    const that = this;
    app.Ajax(
      'Member',
      'POST',
      'SetDefaultMemberStore',
      { storeId: e.currentTarget.dataset.storeid},
      function (json) {
        // console.log('json', json);
        if (json.success) {
          app.Toast('设置成功啦', 'success', 1500);
          this.getData();
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  gotoCardBinding:function(){
    wx.navigateTo({
      url: '../cardBinding/cardBinding',
    })
  },
  gotoStoresDetails:function(e){
    wx.navigateTo({
      url: '../storesDetails/storesDetails?storeId=' + e.currentTarget.dataset.storeid
    })
  }
})