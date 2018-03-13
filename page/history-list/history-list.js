// page/history-list/history-list.js
Page({
  data: {
    movies: [],
    loading: true,
    page: 1,
    size: 6
  },

  onShow (options) {
    this.setData({
      page: 1,
      movies: []
    })
    this.loadMovies()
  },

  loadMovies() {
    let { page, size } = this.data
    let history = wx.getStorageSync('history');
    
    let data = []

    if (history) {
      for (let i=(page-1)*size; i<page*size; i++) {
        if (history[i]) {
          data.push(history[i])
        }
      }

      this.getHistoryMovies(data)
    }
  },

  getHistoryMovies(data) {
    this.setData( {loading: true} )
    const movies = this.data.movies

    for (let i = 0; i < data.length; i += 2) {
      movies.push([data[i], data[i + 1] ? data[i + 1] : null])
    }

    this.setData({ movies, loading: false })
  },

  scrollHandler () {
    const { page } = this.data
    this.setData({
      page: page + 1
    })
    this.loadMovies()
  },

  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData

    wx.navigateTo({
      url: '../movie-detail/detail?id=' + _id
    })
  }
})