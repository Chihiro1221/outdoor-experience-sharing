// pages/recommend/recommend.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.request({
      url:"http://127.0.0.1:8000/goods",
      success:({data})=>{
        console.log(data);
        this.setData({
          goodsList:data
        })
      }
    })
  },
  /**
   * 跳转商品详情页
   */
  gotoDetail(e){
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url:`../recommend/detail?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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