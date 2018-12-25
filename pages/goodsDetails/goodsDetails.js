const app = getApp()
Page({
  data: {
    getData:{},
    getDataOld:{
      goodsId:'1',
      goodsName: '老狐狸玩偶',
      goodsDesc: '贼丑',
      goodsPrice: '20',
      goodsStock:'200',
      sales: '100',
      // 中部图片列表
      mainImgs: [
        {
          img: 'http://img.ui.cn/data/file/1/7/2/1896271.jpg',
          price: '20'
        },
        {
          img: 'http://img.ui.cn/data/file/3/6/4/1830463.jpg',
          price: '10'
        },
        {
          img: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
          price: '10'
        }
      ],
      // 图文详情
      infoImgs: [
        {
          detailStatus: 0,
          img: 'http://img.ui.cn/data/file/6/3/5/1669536.jpg',
        },
        {
          detailStatus: 0,
          img: 'http://img.ui.cn/data/file/1/5/1/1448151.jpg',
        },
        {
          detailStatus: 0,
          img: 'http://img.ui.cn/data/file/2/0/6/1262602.jpg',
        },
        {
          detailStatus: 0,
          img: 'http://img.ui.cn/data/file/7/8/6/1366687.png',
        },
        {
          detailStatus: 0,
          img: 'http://img.ui.cn/data/file/3/0/6/1625603.jpg',
        },
        {
          detailStatus: 0,
          img: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
        },

      ],
    },
    goodsForm: { 
      // 图标
      iconList: [
        {
          name: 'like-o',
          title: '收藏'
        },
        {
          name: 'pending-evaluate',
          title: '客服'
        },
        {
          name: 'share',
          title: '分享'
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
    },
    scrollTop: 0,
    // 弹出框
    popupForm: {
      visible: false,
      position: 'bottom',
      //蒙版
      overlay: true,
      status: 1,
      title: '',
      price: '',
      imgUrl: '',
      numCart: 1,
      numConvert: 1,
    }
  },
  onLoad:function(option){
    // console.log('option',option)
    this.getData(option.goodsId)
  },
  getData: function (goodsId){
    const that = this;
    app.Ajax(
      'Mall',
      'POST',
      'GetGoods',
      { goodsId: goodsId },
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
  // 显示蒙板层
  showPopup(e) {
    var title = this.data.getData.goodsName;
    var price = this.data.getData.goodsPrice;
    var imgUrl = this.data.getData.mainImgs[0].img;
    this.setData({
      'popupForm.visible': true,
      'popupForm.title': title,
      'popupForm.price': price,
      'popupForm.imgUrl': imgUrl,
    });
    if (e.currentTarget.dataset.id == 'btn-item-1') {
      this.setData({
        'popupForm.status': 1,
      });
    }
    else {
      this.setData({
        'popupForm.status': 2,
      });
    }
  },
  closePopup() {
    this.setData({
      'popupForm.visible': false
    });
  },
  addPopup(e) {
    this.closePopup();
    var options;
    if (e.currentTarget.dataset.status == 1) {
      // 加入购物车
      const that = this;
      app.Ajax(
        'Order',
        'POST',
        'InputCart',
        { 
          goodsId: this.data.getData.goodsId,
          goodsNum: this.data.popupForm.numCart
          },
        function (json) {
          console.log('json', json);
          if (json.success) {
            wx.showToast({
              title: '已成功加入购物车'
            })
          } else {
            app.Toast('', 'none', 3000, json.msg.code);
          }
        }
      )


      
      // wx.navigateTo({
      //   url: '../navShoppingCart/navShoppingCart?imgUrl=' + this.data.popupForm.imgUrl + '&price=' + this.data.popupForm.price + '&title=' + this.data.popupForm.title + '&num=' + this.data.popupForm.numCart
      // })
      // wx.switchTab({
      //   url: '../navShoppingCart/navShoppingCart'
      // })
    }
    else {
      var objArr = [{
        goodsId: this.data.getData.goodsId,
        cartId:'',
        goodsNum: this.data.popupForm.numConvert,

        // imgUrl: this.data.popupForm.imgUrl,
        // price: this.data.popupForm.price,
        // title: this.data.popupForm.title,
        // total: Number(this.data.popupForm.price) * Number(this.data.popupForm.numConvert)
      }]
      // wx.navigateTo({
      //   url: '../orderConfirmation/orderConfirmation'
      // })

      this.PreOrder(objArr)
      
      
    }
  },
  PreOrder: function (obj) {
    const that = this;
    app.Ajax(
      'Order',
      'POST',
      'PreOrder',
      obj,
      function (json) {
        // console.log('json', json);
        if (json.success) {
          wx.navigateTo({
            url: '../orderConfirmation/orderConfirmation?params=' + JSON.stringify(json.data)
          })
          // that.setData({
          //   getData: json.data
          // })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
  numChange(e) {
    if (e.currentTarget.dataset.status == 1) {
      this.setData({
        'popupForm.numCart': e.detail.value
      })
    }
    else {
      this.setData({
        'popupForm.numConvert': e.detail.value
      })
    }
  },
  gotoIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // onChange(event) {
  //   console.log(event.detail, 'click right menu callback data')
  // },
  //页面滚动执行方式
  // onPageScroll(event) {
  //   var that = this;
  //   this.setData({
  //     scrollTop: event.scrollTop
  //   })
  // }
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    return {
      title: this.data.getData.goodsName,
      imageUrl: this.data.getData.goodsImg,

      success: function (res) {
        console.log('res', res)
        app.Toast('转发成功', 'success', 3000);
      },
      fail: function (res) {
        // 转发失败
        app.Toast(res, 'none', 3000);
      }
    }
  }
})
