// pages/others/waterfall/waterfall.js
Page({
  data: {
    list: [
      {
        url: '../../static/img/classify_selected.png',
        name: '《虫师》'
      },
      {
        url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-una/ff3.jpg',
        name: '《loading》'
      },
      {
        url: '../../static/img/classify_selected.png',
        name: '《冰与火之歌》'
      },
      {
        url: '../../static/img/classify_selected.png',
        name: '《鹿丸》'
      },
      {
        url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-una/shops.png',
        name: '《星空》'
      }
     
    ],
    leftHeight: 0,
    rightHeight: 0,
    length: 5,
    pageNo: 1,
    descHeight: 30, //图片文字描述的高度
    pageStatus: true
  },
  onShow: function () {
    this.setData({
      list2: this.data.list
    });
  },
  loadImage: function (e) {
    var vm = this;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var index = e.currentTarget.dataset.index;
    vm.data.list[index].height = windowWidth / 2 / e.detail.width * e.detail.height;
    var count = 0;
    for (var i = (vm.data.pageNo - 1) * vm.data.length; i < vm.data.list.length; i++) {
      if (vm.data.list[i].height) {
        count++;
      }
    }
    if (count == vm.data.length) {
      for (var i = (vm.data.pageNo - 1) * vm.data.length; i < vm.data.list.length; i++) {
        if (vm.data.leftHeight <= vm.data.rightHeight) {
          vm.data.list[i].top = vm.data.leftHeight;
          vm.data.list[i].left = windowWidth * 0.005;
          vm.setData({
            leftHeight: vm.data.leftHeight + vm.data.list[i].height + vm.data.descHeight
          });
        } else {
          vm.data.list[i].top = vm.data.rightHeight;
          vm.data.list[i].left = windowWidth / 2 - windowWidth * 0.005;
          vm.setData({
            rightHeight: vm.data.rightHeight + vm.data.list[i].height + vm.data.descHeight
          });
        }
      }
      vm.animateIn5();
      vm.setData({
        list: vm.data.list
      });
    }
  },
  onReachBottom: function () {
    var vm = this;
    vm.setData({
      pageStatus: true
    });
    setTimeout(function () {
      vm.setData({
        pageNo: vm.data.pageNo + 1,
        list: vm.data.list.concat(vm.data.list2),
        pageStatus: false
      });
    }, 2000);
  },
  animateIn5: function () {
    // 图片显示动画
    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.scale(2, 0.8).step()
    this.setData({
      animationData5: animation.export()
    })
    setTimeout(function () {
      animation.scale(0.8, 1).step()
      this.setData({
        animationData5: animation.export()
      })
    }.bind(this), 100)

    setTimeout(function () {
      animation.scale(1, 0.8).step()
      this.setData({
        animationData5: animation.export()
      })
    }.bind(this), 350)

    setTimeout(function () {
      animation.scale(1, 1).step()
      this.setData({
        animationData5: animation.export()
      })
    }.bind(this), 350)
  },
  animateOut5: function () {
    // 图片隐藏动画
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.scale(0, 0).step()
    this.setData({
      animationData5: animation.export()
    });
  },
})