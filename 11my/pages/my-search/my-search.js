// pages/my-search/my-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMore:0,
    bottomMore:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      topMore:Math.random()
    })
  },
  onReachBottom(){
    this.setData({
      bottomMore:Math.random()
    })
  }
})