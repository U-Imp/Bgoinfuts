Page({
  data: {
    goodsForm: {
      title: '老狐狸玩偶',
      brief: '贼丑',
      price: '20',
      sold: '100',
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
      // 中部图片列表
      goodsList: [
        {
          imgUrl: 'http://img.ui.cn/data/file/1/7/2/1896271.jpg',
          price: '20'
        },
        {
          imgUrl: 'http://img.ui.cn/data/file/3/6/4/1830463.jpg',
          price: '10'
        },
        {
          imgUrl: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
          price: '10'
        }
      ],
      // 图文详情
      detailsList: [
        {
          detailStatus: 0,
          imgUrl: 'http://img.ui.cn/data/file/6/3/5/1669536.jpg',
        },
        {
          detailStatus: 0,
          imgUrl: 'http://img.ui.cn/data/file/1/5/1/1448151.jpg',
        },
        {
          detailStatus: 1,
          textMes: '我们初始化一个小程序（本示例基础版本库为 1.7 ），删掉里面的示例代码，并新建一个 components 文件夹，用于存放我们以后开发中的所用组件'
        },
        {
          detailStatus: 0,
          imgUrl: 'http://img.ui.cn/data/file/2/0/6/1262602.jpg',
        },
        {
          detailStatus: 1,
          textMes: '今天我们的目的是实现一个 弹框 组件，因此，我们在 components 组件中新建一个 Dialog 文件夹来存放我们的弹窗组件'
        },
        {
          detailStatus: 0,
          imgUrl: 'http://img.ui.cn/data/file/7/8/6/1366687.png',
        },
        {
          detailStatus: 0,
          imgUrl: 'http://img.ui.cn/data/file/3/0/6/1625603.jpg',
        },
        {
          detailStatus: 0,
          imgUrl: 'http://img.ui.cn/data/file/0/1/8/1661810.jpg',
        },
        {
          detailStatus: 1,
          textMes: '在 Dialog 下右击新建 Component 并命名为 dialog 后，会生成对应的 json wxml wxss js 4个文件，也就是一个自定义组件的组成部分，此时你的项目结构应该如下图所示'
        },

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
      toPage: ''
    }
  },
  // 显示蒙板层
  showPopup(e) {
    var title = this.data.goodsForm.title;
    var price = this.data.goodsForm.price;
    var imgUrl = this.data.goodsForm.goodsList[0].imgUrl;
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
      wx.navigateTo({
        url: '../navShoppingCart/navShoppingCart?imgUrl=' + this.data.popupForm.imgUrl + '&price=' + this.data.popupForm.price + '&title=' + this.data.popupForm.title + '&num=' + this.data.popupForm.numCart
      })
    }
    else {
      var obj = {
        imgUrl: this.data.popupForm.imgUrl,
        price: this.data.popupForm.price,
        title: this.data.popupForm.title,
        num: this.data.popupForm.numConvert,
        total: Number(this.data.popupForm.price) * Number(this.data.popupForm.numConvert)
      }
      options = JSON.stringify(obj)
      wx.navigateTo({
        url: '../orderConfirmation/orderConfirmation?options=' + options
      })
    }
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

  // onChange(event) {
  //   console.log(event.detail, 'click right menu callback data')
  // },
  //页面滚动执行方式
  onPageScroll(event) {
    var that = this;
    this.setData({
      scrollTop: event.scrollTop
    })
  }

})
