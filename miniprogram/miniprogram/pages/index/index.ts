// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    topicList: []
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    wx.request({
      url: "http://127.0.0.1:8000/topic",
      success: ({ data, statusCode }) => {
        console.log(data);
        if (statusCode !== 200) {
          return wx.showToast({
            title: "获取数据失败",
            duration: 1000,
            icon: 'error'
          })
        }
        this.setData({
          topicList: data as any
        })
      }
    })
  },
  /**
   * 跳转到详情页
   * @param e 
   */
  gotoTopic(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../topic/topic?id=${id}`
    })
  },
  /**
   * 跳转到创建经验分享帖子页面
   */
  gotoCreateTopic() {
    const token = wx.getStorageSync('token')
    const url = token ? "../topic/create" : "../login/login"
    wx.navigateTo({
      url
    })
  },
  onLoad() {

  }
})
