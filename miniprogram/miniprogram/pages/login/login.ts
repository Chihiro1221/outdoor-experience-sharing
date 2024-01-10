// pages/login/login.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  gotoRegister(){
    wx.navigateTo({
      url:"../register/register"
    })
  },

  formSubmit({ detail: { value } }) {
    if (!value.phone || !value.password) {
      return wx.showToast({
        title: "参数不能为空",
        duration: 1000,
        icon: 'error',
        // mask:true
      })
    }

    wx.request({
      url: "http://127.0.0.1:8000/user/login",
      method: "POST",
      data: value,
      success(res){
        console.log("res:", res);
        if(res.statusCode !== 200){
          return wx.showToast({
            title: res.data.msg,
            duration: 1000,
            icon: 'error',
          })
        }
        wx.showToast({
          title: "登录成功",
          duration: 2000,
          icon: 'success',
          success(){
            wx.setStorageSync('token', res.data.token);
            wx.switchTab({
              url:'../index/index',
            })
          }
        })
      },
      fail(err){
        wx.showToast({
          title: '发生错误，稍后重试',
          duration: 1000,
          icon: 'error',
        })
      }
    })
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