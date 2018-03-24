import cfg from '../../common/config/index.js'

Page({
  data: {
    movies: [],
    page: 1,
    size: 6,
    loading: true,
    type: ''
  },

  onLoad(options) {
    const { type } = options
    this.setData({
      type
    })
    this.loadMovies()
  },

  saveData(data) {
    let history = wx.getStorageSync('history') || []

    history = history.filter((item) => {
      return item._id !== data._id
    })

    history.unshift(data)
    wx.setStorageSync('history', history)
  },

  loadMovies() {
    const { size, page, type } = this.data

    this.setData({
      loading: true
    })

    wx.showLoading({
      title: '',
      mask: true
    })

    wx.request({
      url: `${cfg.domain}/list?type=${type}&page=${page}&size=${size}`,
      success: (res) => {
        const { data } = res.data
        const movies = this.data.movies || []

        for (let i = 0; i < data.length; i += 2) {
          movies.push([data[i], data[i + 1] ? data[i + 1] : null])
        }

        this.setData({
          movies,
          loading: false
        })

        wx.hideLoading()
      }
    })
  },

  scrollHandler() {
    const { page } = this.data
    this.setData({
      page: page + 1
    })
    this.loadMovies()
  },

  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData

    this.saveData(movieData)

    wx.navigateTo({
      url: '../movie-detail/detail?id=' + _id
    })
  }
})