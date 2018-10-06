Page({
  data: {
    tabForm: {
      tabList: [
        {
          name: '待兑换',
          value: 0
        },
        {
          name: '待取货',
          value: 1
        },
        {
          name: '待评价',
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
      tabCurrent: '0'
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

  examineIt(){
    console.log(1)
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  }
  

});