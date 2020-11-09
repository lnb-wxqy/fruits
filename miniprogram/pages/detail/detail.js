// pages/detail/detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruit: {
      name: "",
      english: "",
      pinyin: "",
      music: "",
      imgUrl: "",
    }
  },

  // 音乐播放
  music: function (res) {
    var musicSrc=res.currentTarget.dataset.music
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = musicSrc
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      fruit: {
        name: options.name,
        english: options.english,
        pinyin: options.pinyin,
        music: options.music,
        imgUrl: options.imgUrl,
      }
    })

    console.log(this.data.fruit.name)
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

  }
})