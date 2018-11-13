const app = getApp()
Page({
  data: {
    bottomLine:'我是有底线的o(￣ヘ￣o#)',
    noRecord:'还没有记录呢，快去兑换吧~',
    orderStatus: ['未支付', '商家备货中', '待取货','交易完成'],
    getData:{},
    getDataOld:{
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
    },

  },

  onLoad: function (options) {
    // var that = this;
    // console.log(options);
    this.setData({
      'tabForm.tabCurrent': options.status
    })
    this.getData();
  },
getData:function(){
  const that = this;
  app.Ajax(
    'Order',
    'POST',
    'GetOrderList',
    {},
    function (json) {
      // console.log('ajson', json);
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
  PayForOrder:function(e){
    const that = this;
    wx.showModal({
      title: '您的消费',
      showCancel: false,
      content: '需支付：❤' + e.currentTarget.dataset.total,
      confirmText: '确认支付',
      success: function (res) {
        if (res.confirm) {
          app.Ajax(
            'Order',
            'POST',
            'PayForOrder',
            { orderId: e.currentTarget.dataset.orderid },
            function (json) {
              // console.log('json', json);
              if (json.success) {
                app.Toast('支付成功', 'none', 3000);
                setTimeout(function () {
                  wx.switchTab({
                    url: '../orderList/orderList?status=1'
                  })
                }, 2600)
              } else {
                app.Toast('', 'none', 3000, json.msg.code);
              }
            }
          )



         
        }
      },
      fail: function () {
        app.Toast('', 'none', 3000, json.msg.code);
      }
    })


    
      
  },
  tabHandel({ detail }) {
    // console.log(detail)
    this.setData({
      'tabForm.tabCurrent': detail.key
    });
    // console.log(detail)
  },
  gotoOrderDetails:function(e){
    // console.log('~~', e.currentTarget.dataset.orderid)
    wx.navigateTo({
      url: '../orderDetails/orderDetails?orderId=' + e.currentTarget.dataset.orderid
    })
  },

  

});