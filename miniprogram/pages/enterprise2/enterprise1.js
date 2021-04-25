// miniprogram/pages/enterprise1/enterprise1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ep11:[],
    ep12:[],
    ep13:[],
    ep14:[],
    ep15:[],
    ep16:[],
    ep17:[],
    ep18:[],
    ep19:[],
    ep110:[]
  },
   // 全局变量赋值不用setData
   company1: function(){
    app.globalData.company = "1"
  },
company2: function(){
    app.globalData.company= "2"
  },
company3: function(){
  app.globalData.company= "3"
},
company4: function(){
  app.globalData.company= "4"
},
company5: function(){
  app.globalData.company= "5"
},
company6: function(){
  app.globalData.company= "6"
},
company7: function(){
  app.globalData.company= "7"
},
company8: function(){
  app.globalData.company= "8"
},
company9: function(){
  app.globalData.company= "9"
},
company10: function(){
  app.globalData.company= "10"
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("occupation1")
    .where({              //查询的条件指令where
      jobid: _.lte(11)     //查询筛选条件，gt表示字段需大于指定值。
    })
    .field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      jobid:true,
      jobname:true
    })
    .orderBy('jobid', 'asc')  //排序方式，降序排列
    .skip(0)                 //跳过多少个记录（常用于分页），0表示这里不跳过
    //.limit(10)               //限制显示多少条记录，这里为10
    .get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
     this.setData({
          ep11: res.data[0].jobid + res.data[0].jobname,
          ep12: res.data[1].jobid + res.data[1].jobname,
          ep13: res.data[2].jobid + res.data[2].jobname,
          ep14: res.data[3].jobid + res.data[3].jobname,
          ep15: res.data[4].jobid + res.data[4].jobname,
          ep16: res.data[5].jobid + res.data[5].jobname,
          ep17: res.data[6].jobid + res.data[6].jobname,
          ep18: res.data[7].jobid + res.data[7].jobname,
          ep19: res.data[8].jobid + res.data[8].jobname,
          ep110: res.data[9].jobid + res.data[9].jobname
        })
        console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })
    
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