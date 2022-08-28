//Level.js

//获取应用实例
const app = getApp()

Page({
  data: {
  },

  //事件处理函数
  // 翻开
  Level: function (e) {
    wx.navigateTo({
      url: `../main/main?level=${e.target.dataset.level}`,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  // 页面启动
  onLoad: function () {
  },
  onShareAppMessage: function() {
    return {
      title: '扫雷游戏',
      path: '/pages/aiici_main/Level/Level.js'
    }
  }
})