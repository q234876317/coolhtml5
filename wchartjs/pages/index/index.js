//index.js
//获取应用实例
const request = require('../../utils/request.js');
const api = require('../../url.js');

Page({
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { console.log(arguments) },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/index/index'
    }
  },
  onPageScroll: function () { },
  data: {
    list: []
  },
  //事件处理函数
  goToNews: function (event) {
    wx.navigateTo({
      url: '../news/news?id=' + event.currentTarget.dataset.id
    })
  },
  onLoad: function () {
    var list = wx.getStorageSync("list")
    if (list) { // 本地如果有缓存列表，提前渲染
      that.setData({
        list: list
      })
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 10000
    })
    this.getList().then((res) => {
      wx.hideToast()
      this.setData({ list: res })
      wx.setStorageSync("list", list)
      // wx.navigateTo({
      //   url: '../news/news?id=bd2cb-frex-owyt-d2ib-mut5-',
      // })
    })
  },
  getList() {
    let promise = request({
      method: 'GET',
      url: api.getUrl('/category/all'),
    });
    return promise;
  },
})
