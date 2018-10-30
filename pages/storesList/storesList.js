const app = getApp();
Page({
  data: {
    getData:{},
    cardsForm: {
      cardsNum: 5,
      cardsList: [
        {
          id: 'a1',
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          title: '店铺1',
          content: '我是一家神奇的店铺',
        },
        {
          id: 'a2',
          imgUrl: 'http://img.ui.cn/data/file/2/7/7/693772.jpg',
          title: '店铺2',
          content: '我比第一家还要神奇',
        },
        {
          id: 'a3',
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          title: '店铺3',
          content: '他们吹牛,我会动,我最神奇',
        },
        {
          id: 'a4',
          imgUrl: 'http://img.ui.cn/data/file/6/1/8/616816.png',
          title: '店铺4',
          content: '你们都是辣鸡',
        },
        {
          id: 'a5',
          imgUrl: 'http://img.ui.cn/data/file/1/3/1/674131.png',
          title: '店铺4',
          content: '呵呵',
        }
      ]
    }
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
    this.getData();
  },
  getData:function(){
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetStoreList',
      {},
      function (json) {
        console.log('json',json);
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
  examineIt(e){
    // console.log(e)
    // var index = e.currentTarget.dataset.storeid;
    // var id = this.data.cardsForm.cardsList[index].id;
    wx.navigateTo({
      url: '../storesDetails/storesDetails?storeId=' + e.currentTarget.dataset.storeid
    })
  }
 
})