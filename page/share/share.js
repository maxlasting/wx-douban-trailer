Page({
  data: {
    imgUrl: 'https://www.newfq.com/assets/wx/movie-trailer/QRcode.png'
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