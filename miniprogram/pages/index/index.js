// pages/dati/dati.js
const app = getApp()
var currentIndex = 0 //默认0，显示集合第一个元素，当点击下一题时加1
// 猜图点击事件只执行一次，多次点击不生效，点击下一题时再生效
var flag = true
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruits: [],
    fruits_nums: 0, //水果集合的初始值，
    //每次从数据库中查询出的数据条数，因为小程序限制每次只能取20条，如果每次查询出的数据条数小于20，说明数据库中的数据已经全部查询完毕默认21
    tmpFruitsNums: 21
  },

  // 初始化数据
  initData: function () {

    // Promise 写法；缺点：每次只能查询20条
    db.collection("fruits").get().then(res => {
      this.setData({
        fruits: res.data,
      })

      // 全局变量赋值
      app.globalData.fruits = this.data.fruits
      // console.log(app.globalData.fruits)
      // 存入本地缓存
      wx.setStorageSync('fruits', {
        time: Date.now(),
        data: this.data.fruits
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //构造初始数据数据
    // 由于查库获取数据不能及时获取到，
    // 故页面开始加载时第一个
    // this.setData({
    //   sceneryObj: this.data.sceneryList[0]
    // })

    // 本地缓存思路
    // 1.先判断本地缓存中有没有旧数据
    // 存储的数据格式：{time:Date.now(),data[...]}
    // 2.没有，发送请求
    // 3.有且没有过期，就使用

    // 1. 获取本地存储的数据，小程序中也是本地存储
    const fruits = wx.getStorageSync('fruits')
    if (!fruits.data) {
      // 不存在
      this.initData()
    } else {
      //设置过期时间（检查是否已过期）,24h
      if (Date.now() - fruits.time > 24 * 60 * 60 * 1000) {
        // 重新初始化数据
        this.initData()
      } else {
        // 存在,构造数据
        this.setData({
          fruits: fruits.data
        })

        // 全局变量赋值
        app.globalData.fruits = fruits.data
      }
    }
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
    // 判断数据库中的数据是否已经查询完毕
    if (this.data.tmpFruitsNums < 20) {
      return
    }
    wx.showLoading({
      title: '数据加载中...',
      duration: 1000,
    })

    let x = this.data.fruits_nums + 20
    console.log(x)
    let old_fruits = this.data.fruits

    db.collection('fruits').orderBy('time', 'desc').skip(x) // 限制返回数量为 20 条
      .get()
      .then(res => {
        // 利用concat函数连接新数据与旧数据
        // 并更新fruits_numss  
        this.setData({
          // 获取每次从数据库中查询出的数据条数，如果小于20，说明数据库中的数据已经全部查询完毕
          tmpFruitsNums: res.data.length,
          fruits: old_fruits.concat(res.data),
          fruits_nums: x
        })

        // 更新全局变量
        app.globalData.fruits = this.data.fruits

      })
      .catch(err => {
        console.error(err)
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: "求答案，知道这是哪吗？",
      path: ""
    }
  },
  onShareTimeline: function (res) {
    return {
      title: "求答案，知道这是哪吗？",
      path: "pages/index/index",
      imageUrl: "/images/cc.png"
    }
  }
})