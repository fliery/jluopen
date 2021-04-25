// miniprogram/pages/enterprise11/enterprise11.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobid11:[],
    jobname11:[],
    jobduty11:[],
    jobask11:[]
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
      jobname:true,
      jobduty:true,
      jobask:true
    })
    .orderBy('jobid', 'asc')  //排序方式，降序排列
    .skip(0)                 //跳过多少个记录（常用于分页），0表示这里不跳过
    //.limit(10)               //限制显示多少条记录，这里为10
    .get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      if(app.globalData.company=="1"){
       this.setData({
          jobid11: res.data[0].jobid, 
          jobname11:res.data[0].jobname,
          jobduty11:res.data[0].jobduty,
          jobask11:res.data[0].jobask
        })
      }
      else if(app.globalData.company=="2"){
        this.setData({
           jobid11: res.data[1].jobid, 
           jobname11:res.data[1].jobname,
           jobduty11:res.data[1].jobduty,
           jobask11:res.data[1].jobask
         })
       }
       else if(app.globalData.company=="3"){
        this.setData({
           jobid11: res.data[2].jobid, 
           jobname11:res.data[2].jobname,
           jobduty11:res.data[2].jobduty,
           jobask11:res.data[2].jobask
         })
       }
       else if(app.globalData.company=="4"){
        this.setData({
           jobid11: res.data[3].jobid, 
           jobname11:res.data[3].jobname,
           jobduty11:res.data[3].jobduty,
           jobask11:res.data[3].jobask
         })
       }
       else if(app.globalData.company=="5"){
        this.setData({
           jobid11: res.data[4].jobid, 
           jobname11:res.data[4].jobname,
           jobduty11:res.data[4].jobduty,
           jobask11:res.data[4].jobask
         })
       }
       else if(app.globalData.company=="6"){
        this.setData({
           jobid11: res.data[5].jobid, 
           jobname11:res.data[5].jobname,
           jobduty11:res.data[5].jobduty,
           jobask11:res.data[5].jobask
         })
       }
       else if(app.globalData.company=="7"){
        this.setData({
          jobid11: res.data[6].jobid, 
          jobname11:res.data[6].jobname,
          jobduty11:res.data[6].jobduty,
          jobask11:res.data[6].jobask
         })
       }
       else if(app.globalData.company=="8"){
        this.setData({
           jobid11: res.data[7].jobid, 
           jobname11:res.data[7].jobname,
           jobduty11:res.data[7].jobduty,
           jobask11:res.data[7].jobask
         })
       }
       else if(app.globalData.company=="9"){
        this.setData({
           jobid11: res.data[8].jobid, 
           jobname11:res.data[8].jobname,
           jobduty11:res.data[8].jobduty,
           jobask11:res.data[8].jobask
         })
       }
       else if(app.globalData.company=="10"){
        this.setData({
           jobid11: res.data[9].jobid, 
           jobname11:res.data[9].jobname,
           jobduty11:res.data[9].jobduty,
           jobask11:res.data[9].jobask
         })
       }
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