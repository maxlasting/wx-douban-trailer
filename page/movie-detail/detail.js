// page/detail/detail.js
const baseUrl = 'http://douban.newfq.com/'

Page({
  data: {
    movie: {},
    time: ''
  },
  onLoad (options) {
    const id = options.id

    wx.showLoading({
      title: '',
    })

    wx.request({
      url: 'https://www.newfq.com/doubanapi/movies/' + id,
      success: (res) => {
        const movie = res.data.data
        this.setData({
          movie,
          time: movie.pubdate[0].date.split('T')[0],
          video: baseUrl + movie.videoKey,
          cover: baseUrl + movie.coverKey
        })
        wx.hideLoading()
      }
    })
  }
})