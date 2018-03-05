// page/user/user.js
Page({
  data: {
    avatarUrl: '',
    nickName: '未知'
  },

  onLoad (options) {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
  }
})