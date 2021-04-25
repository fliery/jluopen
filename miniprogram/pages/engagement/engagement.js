// miniprogram/pages/engagement/engagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    imgUrl1:[],
    imgUrl2:[],
    imgUrl3:[],
    imgUrl4:[],
    imgUrl5:[],
    imgUrl6:[],
    imgUrl7:[],
    imgUrl8:[],
    imgUrl9:[],
    imgUrl10:[],
    name1:[],
    name2:[],
    name3:[],
    name4:[],
    name5:[],
    name6:[],
    name7:[],
    name8:[],
    name9:[],
    name10:[],
    href1:[],
    href2:[],
    href3:[],
    href4:[],
    href5:[],
    href6:[],
    href7:[],
    href8:[],
    href9:[],
    href10:[]
  },
  oneStep: function () {
    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("engagement")
    .where({              //查询的条件指令where
      eid: _.lte(10)     //查询筛选条件，gt表示字段需大于指定值。
    })
    .field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      eid:true,
      epname:true,
      ephref:true,
      eppicsrc:true
    })
    .orderBy('eid', 'asc')  //排序方式，降序排列
    .skip(0)                 //跳过多少个记录（常用于分页），0表示这里不跳过
    //.limit(10)               //限制显示多少条记录，这里为10
    .get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
     this.setData({
          href1: res.data[0].ephref,
          href2: res.data[1].ephref,
          href3: res.data[2].ephref,
          href4: res.data[3].ephref,
          href5: res.data[4].ephref,
          href6: res.data[5].ephref,
          href7: res.data[6].ephref,
          href8: res.data[7].ephref,
          href9: res.data[8].ephref,
          href10: res.data[9].ephref,
          name1: res.data[0].eid +res.data[0].epname,
          name2: res.data[1].eid +res.data[1].epname,
          name3: res.data[2].eid +res.data[2].epname,
          name4: res.data[3].eid +res.data[3].epname,
          name5: res.data[4].eid +res.data[4].epname,
          name6: res.data[5].eid +res.data[5].epname,
          name7: res.data[6].eid +res.data[6].epname,
          name8: res.data[7].eid +res.data[7].epname,
          name9: res.data[8].eid +res.data[8].epname,
          name10: res.data[9].eid +res.data[9].epname,
          imgUrl1: res.data[0].eppicsrc,
          imgUrl2: res.data[1].eppicsrc,
          imgUrl3: res.data[2].eppicsrc,
          imgUrl4: res.data[3].eppicsrc,
          imgUrl5: res.data[4].eppicsrc,
          imgUrl6: res.data[5].eppicsrc,
          imgUrl7: res.data[6].eppicsrc,
          imgUrl8: res.data[7].eppicsrc,
          imgUrl9: res.data[8].eppicsrc,
          imgUrl10: res.data[9].eppicsrc,
          step: 1
      })
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })
  },
  twoStep: function () {
    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("engagement1")
    .where({              //查询的条件指令where
      eid: _.lte(10)     //查询筛选条件，gt表示字段需大于指定值。
    })
    .field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      eid:true,
      epname:true,
      ephref:true,
      eppicsrc:true
    })
    .orderBy('eid', 'asc')  //排序方式，降序排列
    .skip(0)                 //跳过多少个记录（常用于分页），0表示这里不跳过
    //.limit(10)               //限制显示多少条记录，这里为10
    .get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
     this.setData({
          href1: res.data[0].ephref,
          href2: res.data[1].ephref,
          href3: res.data[2].ephref,
          href4: res.data[3].ephref,
          href5: res.data[4].ephref,
          href6: res.data[5].ephref,
          href7: res.data[6].ephref,
          href8: res.data[7].ephref,
          href9: res.data[8].ephref,
          href10: res.data[9].ephref,
          name1: res.data[0].eid +res.data[0].epname,
          name2: res.data[1].eid +res.data[1].epname,
          name3: res.data[2].eid +res.data[2].epname,
          name4: res.data[3].eid +res.data[3].epname,
          name5: res.data[4].eid +res.data[4].epname,
          name6: res.data[5].eid +res.data[5].epname,
          name7: res.data[6].eid +res.data[6].epname,
          name8: res.data[7].eid +res.data[7].epname,
          name9: res.data[8].eid +res.data[8].epname,
          name10: res.data[9].eid +res.data[9].epname,
          imgUrl1: res.data[0].eppicsrc,
          imgUrl2: res.data[1].eppicsrc,
          imgUrl3: res.data[2].eppicsrc,
          imgUrl4: res.data[3].eppicsrc,
          imgUrl5: res.data[4].eppicsrc,
          imgUrl6: res.data[5].eppicsrc,
          imgUrl7: res.data[6].eppicsrc,
          imgUrl8: res.data[7].eppicsrc,
          imgUrl9: res.data[8].eppicsrc,
          imgUrl10: res.data[9].eppicsrc,
          step: 2
      })
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })
  },
  threeStep: function () {
    const db = wx.cloud.database()  //获取数据库的引用
    const _ = db.command     //获取数据库查询及更新指令
    db.collection("engagement2")
    .where({              //查询的条件指令where
      eid: _.lte(4)     //查询筛选条件，gt表示字段需大于指定值。
    })
    .field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      eid:true,
      epname:true,
      ephref:true,
      eppicsrc:true
    })
    .orderBy('eid', 'asc')  //排序方式，降序排列
    .skip(0)                 //跳过多少个记录（常用于分页），0表示这里不跳过
    //.limit(10)               //限制显示多少条记录，这里为10
    .get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
     this.setData({
          href1: res.data[0].ephref,
          href2: res.data[1].ephref,
          href3: res.data[2].ephref,
          href4: res.data[3].ephref,
          name1: res.data[0].eid +res.data[0].epname,
          name2: res.data[1].eid +res.data[1].epname,
          name3: res.data[2].eid +res.data[2].epname,
          name4: res.data[3].eid +res.data[3].epname,
          imgUrl1: res.data[0].eppicsrc,
          imgUrl2: res.data[1].eppicsrc,
          imgUrl3: res.data[2].eppicsrc,
          imgUrl4: res.data[3].eppicsrc,
          step: 3
      })
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '官网复制成功'
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
    this.oneStep()
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