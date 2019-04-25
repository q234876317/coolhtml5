// pages/news.js

const request = require('../../utils/request.js');
const api = require('../../url.js');
const {fileServer}=require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    list:[],
    fileServer: fileServer
  },
  copyText:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
  }})}})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id}=options
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:10000
    })
    this.getList(id).then((res)=>{
      wx.hideToast()
      this.setData({isLoading:false,list:res})
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getList(id) {
    let promise = request({
      method: 'GET',
      url: api.getUrl(`/news/bycategory?category_id=${id}`),
    });
    return promise;
  },
})
