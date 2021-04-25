// miniprogram/pages/competition/competition.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    
    arr:[
      {
        image:'../../images/cpcc.png',
        title:'CCPC中国大学生程序设计竞赛',
        detail:'中国大学生程序设计竞赛（China Collegiate Programming Contest，简称CCPC）是由教育部高等学校计算机类专业教学指导委员会主办的面向全国高校大学生的年度学科竞赛',
        contents:'https://ccpc.io/',
        id:1
      },
      {
        image:'../../images/icpc.png',
        title:'ACM国际大学生程序设计竞赛',
        detail:'内容缩略aaaaaa内容缩略aaaaaaaaaaaaaaaasssss内容缩略aaaaaaaass',
        contents:'https://icpc.global/',
        id:2
      },
      {
        image:'../../images/lq.png',
        title:'蓝桥杯大赛',
        detail:'内容缩略aaaaaa内容缩略aaaaaaaaaaaaaaaasssss内容缩略aaaaaaaass',
        contents:'https://dasai.lanqiao.cn/',
        id:3
      },
      {
        image:'../../images/huawei.png',
        title:'华为软件精英挑战赛',
        detail:'内容缩略aaaaaa内容缩略aaaaaaaaaaaaaaaasssss内容缩略aaaaaaaass',
        contents:'https://competition.huaweicloud.com/codecraft2021',
        id:4
      },
      {
        image:'../../images/tt.png',
        title:'团体程序设计天梯赛',
        detail:'内容缩略aaaaaa内容缩略aaaaaaaaaaaaaaaasssss内容缩略aaaaaaaass',
        contents:'https://gplt.patest.cn/regulation',
        id:5
      },
      {
        image:'../../images/jm.png',
        title:'全国大学生数学建模竞赛',
        detail:'内容缩略aaaaaa内容缩略aaaaaaaaaaaaaaaasssss内容缩略aaaaaaaass',
        contents:'http://www.mcm.edu.cn/',
        id:6
      }
    ]
  
  },
  copyText: function (e) {
  console.log(e)
  wx.setClipboardData({
    data: e.currentTarget.dataset.text,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          wx.showToast({
            title: '复制成功'
          })
        }
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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