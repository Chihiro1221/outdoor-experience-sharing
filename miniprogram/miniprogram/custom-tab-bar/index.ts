Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "../icons/home.png",
      selectedIconPath: "../icons/home-active.png",
      text: "首页"
    }, {
      pagePath: "/pages/recommend/recommend",
      iconPath: "../icons/cart.png",
      selectedIconPath: "../icons/cart-active.png",
      text: "推荐"
    },
    {
      pagePath: "/pages/user/user",
      iconPath: "../icons/user.png",
      selectedIconPath: "../icons/user-active.png",
      text: "用户"
    }
  ]
  },

   switchTab(e) {
    const data = e.currentTarget.dataset
    const url = data.path
    console.log(url, data.index);
    this.setData({
      selected: data.index
    })
    wx.switchTab({url})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})