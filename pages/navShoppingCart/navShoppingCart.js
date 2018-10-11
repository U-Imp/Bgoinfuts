Page({
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
    getData:{
      ShoppingList:[{
        goodsId: '1',
        goodsName: '耳机',
        goodsImg: 'http://img.ui.cn/data/file/7/7/6/992677.png',
        goodsPrice: 30,
        goodsNum: 2,
        checked:false,
        edit: false
      }, {
          goodsId: '2',
          goodsName: '耳机',
          goodsImg: 'http://img.ui.cn/data/file/7/7/6/992677.png',
          goodsPrice: 30,
          goodsNum: 2,
          checked: false,
          edit: false
        }]
    },

    cartForm: {
      cartTotal: 0,
      cartNums: 2,
      cartList: [
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
      ]
    }
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    this.computed();
  },
  // 计算总积分
  computed() {
    var cartTotal = 0;
    for (var i = 0; i < this.data.cartForm.cartList.length; i++) {
      cartTotal += this.data.cartForm.cartList[i].goodsTotal
    }
    this.setData({
      'cartForm.cartTotal': cartTotal
    })
  },
  // 编辑单条
  handelIt(e) {
    var index = e.currentTarget.dataset.index;
    var item = 'cartForm.cartList[' + index + '].change';
    this.setData({
      [item]: true
    })
  },
  // 完成编辑单条
  finishIt(e) {
    var index = e.currentTarget.dataset.index;
    var item = 'cartForm.cartList[' + index + '].change';
    var totalAll = 0;
    this.setData({
      [item]: false
    });
    this.computed();
  },
  // 修改数量
  addNum(e) {
    var index = e.currentTarget.dataset.index;
    var itemNum = 'cartForm.cartList[' + index + '].goodsNum';
    var itemTotal = 'cartForm.cartList[' + index + '].goodsTotal';
    this.setData({
      [itemNum]: e.detail.value,
    });
    this.setData({
      [itemTotal]: Number(this.data.cartForm.cartList[index].goodsNum) * Number(this.data.cartForm.cartList[index].goodsPrice)
    })
  },
  // 去结算
  toSettlement() {
    var options = JSON.stringify(this.data.cartForm)
    wx.navigateTo({
      url: '../orderConfirmation/orderConfirmation?options=' + options
    })
  },
// =====================================================
// 购物车商品选择√
  changeRadio:function(e){
    let curChecked = 'getData.ShoppingList[' + e.currentTarget.dataset.index + '].checked';
    // console.log(curChecked)
    this.setData({
      [curChecked]: !e.currentTarget.dataset.checked
    })
    console.log(e.currentTarget.dataset.index)
  },
  // 编辑单条数量区显示
  editNum:function(e){
    console.log('e',e)
    let curIndex = 'getData.ShoppingList[' + e.currentTarget.dataset.index + '].edit';
    this.setData({
      [curIndex]: !e.currentTarget.dataset.edit
    })
    // console.log(curIndex)
  },
  // 完成编辑单条数量区隐藏
  editfinish:function(e){
    let curIndex = 'getData.ShoppingList[' + e.currentTarget.dataset.index + '].edit';
    console.log('wdas',curIndex)
    console.log('wdas', e)
    this.setData({
      [curIndex]: !e.currentTarget.dataset.edit
    })
  },
  // 修改数量
  addNumber(e) {
    console.log('ww',e);
    let curNum = 'getData.ShoppingList[' + e.currentTarget.dataset.index + '].goodsNum';
    this.setData({
      [curNum]: e.detail.value,
    })


    // var index = e.currentTarget.dataset.index;
    // var itemNum = 'cartForm.cartList[' + index + '].goodsNum';
    // var itemTotal = 'cartForm.cartList[' + index + '].goodsTotal';
    // this.setData({
    //   [itemNum]: e.detail.value,
    // });
    // this.setData({
    //   [itemTotal]: Number(this.data.cartForm.cartList[index].goodsNum) * Number(this.data.cartForm.cartList[index].goodsPrice)
    // })
  }
})
