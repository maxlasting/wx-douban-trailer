Page({
  data: {
    imgUrl: 'https://www.newfq.com/api/douban/temp/code.png'
  },
  saveQRCode () {
    const { imgUrl } = this.data
    wx.downloadFile({
      url: imgUrl,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
      }
    })
  }
})