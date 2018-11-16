import { ClassicModel } from "../../models/classic";
const classicModel = new ClassicModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    authorized: false
  },
  onLoad: function (options) {
    this._authorize();
  },
  onShow(){
    this._getFavor();
  },
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      });
    }
  },
  _authorize() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })
            }
          })
        }
      }
    })
  },
  _getFavor(){
    classicModel.getFavor(res => {
      this.setData({
        likes: res
      })
    })
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

  }
})