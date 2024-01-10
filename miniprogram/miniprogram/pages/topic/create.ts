import { getUserProfile } from "../../utils/util";

// pages/topic/create.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      title: '',
      content: '',
      cover_img: '',
    },
    isLoading: false
  },

  /**
   * 选择图片上传图片
   */
  chooseImgae() {
    wx.chooseMedia({
      count: 1, // 默认9
      mediaType: ['image'],
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFiles[0].tempFilePath;
        wx.uploadFile({
          url: 'http://127.0.0.1:8000/upload', // 你的接口地址
          filePath: tempFilePaths,
          header: {
            Authorization: `Bearer ${wx.getStorageSync('token')}`
          },
          name: 'avatar', // 文件字段名，默认为file
          success: ({data}) => {
            const res = JSON.parse(data)
            // 上传成功，处理服务器返回的响应信息
            this.setData({
              formData: {
                ...this.data.formData,
                cover_img: res.url,
              }
            })
            console.log(res);
          },
          fail: function (res) {
            // 上传失败，处理上传错误
            console.error(res);
            wx.showToast({
              title: "上传失败",
              duration: 1000,
              icon: 'error',
            })
          }
        })
      }
    });
  },

  onInput({detail:{value}}){
    this.setData({
      formData:{
        ...this.data.formData,
        title:value,
      }
    })    
  },
  onTextareaInput({detail:{value}}){
    this.setData({
      formData:{
        ...this.data.formData,
        content:value,
      }
    })
  },
  formSubmit(){
    this.setData({
      isLoading:true
    })
    wx.request({
      url:"http://127.0.0.1:8000/topic",
      method:"POST",
      data:{
        ...this.data.formData
      },
      header: {
        Authorization: `Bearer ${wx.getStorageSync('token')}`
      },
      success:({statusCode,data}) => {
        if(statusCode !== 200){
          return wx.showToast({
            title:"创建失败",
            icon:'error',
            duration:1000
          })
        }
        wx.showToast({
          title:"创建成功",
          icon:"success",
          duration:1000,
          success(){
            wx.switchTab({
              url:"../index/index"
            })
          }
        })
      },
      complete:() => {
        this.setData({
          isLoading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // wx.request({
    //   url: "http://127.0.0.1:8000/user/profile",
    //   header: {
    //     Authorization: `Bearer ${wx.getStorageSync('token')}`
    //   },
    //   success: ({ data }) => {
    //     this.setData({
    //       formData: {
    //         user_id: data.id
    //       }
    //     })
    //   }
    // })
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