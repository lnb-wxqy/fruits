// pages/find/find.js
import common from "../../utils/public"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruits: "",
    currentFruitName: "",
    currentImgUrl: "",
    imgUrlList: "",
    currentIndex: 0,
    hiddenModel: true
  },

  // 点击事件
  findHandler: function (res) {
    if (res.currentTarget.dataset.url === this.data.currentImgUrl) {
      var index = Number(this.data.currentIndex) + 1
      this.setData({
        currentIndex: index
      })
      if (this.data.currentIndex >= app.globalData.fruits.length) {
        wx.showModal({
          title: '学完啦',
          content: '小朋友你真棒！快去从头复习一遍吧',
          success(res) {
            if (res.confirm) {
              // 调回到首页
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
        return
      }
      // 数组的最后一个元素不跳转
      wx.redirectTo({
        url: '/pages/detail/detail?index=' + this.data.currentIndex,
      })
    } else {
      // 错误：手机震动提示
      wx.vibrateLong({
        success: (res) => {
          console.log(res)
        },
      })
    }
  },

  random: function () {
    var globalFruits = app.globalData.fruits;
    //输出数组
    var tmpImgUrlList = [];
    tmpImgUrlList.push(this.data.currentImgUrl);

    //输出个数
    var num = 4;
    while (tmpImgUrlList.length < num) {
      var temp = (Math.random() * globalFruits.length >> 0);
      var url = globalFruits[temp].imgUrl
      // 去重 包含
      if (tmpImgUrlList.includes(url)) {
        continue
      }
      tmpImgUrlList.push(globalFruits[temp].imgUrl);
    }

    //打乱数据顺序
    tmpImgUrlList = common.shuffle(tmpImgUrlList)
    this.setData({
      imgUrlList: tmpImgUrlList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //构造要展示的数据，从fruits中随机取出四张图片，包含detail展示的图片
    this.setData({
      currentFruitName: options.name,
      currentImgUrl: options.imgUrl,
      currentIndex: options.index
    })
    this.random()


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
    return {
      title: "知道这是什么水果吗？",
      path: "pages/index/index"
    }
  },

  // button分享
  onShareTimeline: function (res) {
    return {
      title: "知道这是什么水果吗？",
      path: "pages/index/index"
    }
  }
})