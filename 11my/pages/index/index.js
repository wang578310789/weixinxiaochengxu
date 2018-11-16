//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: '',
    authorized: false
  },
  onLoad: function () {

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
})
