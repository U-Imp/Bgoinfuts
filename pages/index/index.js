const app = getApp();
Page({
  data: {
    getData:{},
    getDataOld:{
      h1:'HOt！最热上新！',
      desc:'近期最热商品上新啦！速速来选~',
      cardList: [
        {
          imgUrl: 'http://img.ui.cn/data/file/1/7/2/1896271.jpg',
          title: '外星人',
          price: '20'
        },
        {
          imgUrl: 'http://img.ui.cn/data/file/3/6/4/1830463.jpg',
          title: '小鸟',
          price: '10'
        },
        {
          imgUrl: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
          title: '老狐狸',
          price: '50'
        }
      ],
    },
    // 是否显示面板指示点
    indicatorDots: false,
    // 滑动方向是否为纵向
    vertical: false,
    autoplay: true,
    // 是否采用衔接滑动
    circular: true,
    duration: 500,
    interval: 5000
  },
  onLoad:function(){
    this.getData();
  },
  onShow:function(){

  },
  getData:function(){
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetHome',
      {  },
      function (json) {
        // console.log('json',json);
        if (json.success) {
          that.setData({
            getData: json.data
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
          if (json.msg.code==4000){
            setTimeout(function(){
              that.getData();
            },2000)
          }
        }
      }
    )
  },
  gotoGoodsDetails:function(e){
    // console.log('w', e.currentTarget.dataset.goodsid)
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + e.currentTarget.dataset.goodsid,
    })
  },
  addtoCart:function(e){
    const that = this;
    app.Ajax(
      'Order',
      'POST',
      'InputCart',
      {
        goodsId: e.currentTarget.dataset.goodsid,
        goodsNum: 1
      },
      function (json) {
        // console.log('json', json);
        if (json.success) {
          wx.showToast({
            title: '成功添加至购物车',
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
    
  },
  gotoStoresList:function(){
    wx.navigateTo({
      url: '../storesList/storesList',
    })
  }
})
