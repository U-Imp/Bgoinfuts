Page({
  data: {
    getData:{
      status0OrderList:[
        {
          orderNum:'ADHJ154541215',
          stutus:'未支付',
          goods:[{
            src:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
            goodsId:'1'
          }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/tutu.gif',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/tutu.gif',
              goodsId: '2'
            }, {
              src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
              goodsId: '2'
            }],
          price:'258',
        }, {
          orderNum: 'ADHJ154541215',
          stutus: '未支付',
          goods: [{
            src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/tutu.gif',
            goodsId: '2'
          }, {
            src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
            goodsId: '2'
          }],
          price: '258',
        }
      ],
      status1OrderList: [
         {
          orderNum: 'ADHJ154541215',
          stutus: '商家备货中',
          goods: [{
            src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/tutu.gif',
            goodsId: '2'
          }, {
            src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/photo.png',
            goodsId: '2'
          }],
          price: '1258',
        }
      ],
      status3OrderList: [
        {
          orderNum: 'ADHJ154541215',
          stutus: '交易完成',
          goods: [{
            src: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/tutu.gif',
            goodsId: '2'
          }],
          price: '158',
        }
      ]
    },
    tabForm: {
      tabCurrent: '0',
      tabList: [
        {
          name: '待付款',
          value: 0
        },
        {
          name: '已付款',
          value: 1
        },
        {
          name: '待取货',
          value: 2
        },
        {
          name: '已完成',
          value: 3
        }
      ],
      orderList: [
        {
          status: 0,
          serialNumber: 'OD3242378898342',
          title: '大毛球玩偶',
          imgUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          integral: 1200
        },
        {
          status: 1,
          serialNumber: 'OD3242378898342',
          title: '大毛球玩偶',
          imgUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          integral: 1200
        },
        {
          status: 2,
          serialNumber: 'OD3242378898342',
          title: '大毛球玩偶',
          imgUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
          integral: 1200
        },
      ],
      
    },

  },

  onLoad: function (options) {
    var that = this;
    console.log(options);
  },

  tabHandel({ detail }) {
    console.log(detail)
    this.setData({
      'tabForm.tabCurrent': detail.key
    });
    console.log(detail)
  },
  gotoOrderDetails:function(){
    wx.navigateTo({
      url: '../orderDetails/orderDetails'
    })
  },
  examineIt(){
    console.log(1)
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  }
  

});