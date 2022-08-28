//index.js

const {
  calculate,
  OPERATOR,
  REG_DECIMAL,
  isDecimal,
  DEVIDE_ZERO_ERROR,
} = require("../../utils/util")

const getInputHisStr = function (arr) {
  return (arr && arr.length) ? arr.join(' ') : ''
}

Page({
  data: {
    inputHistoryArr: [],
    inputHistoryStr: '',
    current: '0',
    appendFlag: false,
    stack: [],
    complete: false,
    errorFlag: false,
  },

  // 进入扫雷
  moveToGame: function () {
    wx.navigateTo({
      url: '../aiici_main/Level/Level'
    })
  },

  onLoad: function () {
  },


  onShareAppMessage: function() {
    return {
      title: 'AIICI',
      path: '/pages/index/index.js'
    }
  }
})
