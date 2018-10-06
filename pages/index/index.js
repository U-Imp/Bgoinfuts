Page({
  data: {
    cardsForm:{
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
      // 是否显示面板指示点
      indicatorDots: false,
      // 滑动方向是否为纵向
      vertical: false,
      autoplay: false,
      // 是否采用衔接滑动
      circular: true,
      duration: 500,
      interval: 5000
    }
  },
  gotoGoodsDetails:function(){
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails',
    })
  },
  addtoCart:function(){
    wx.showToast({
      title: '成功添加至购物车',
    })
  }
})
