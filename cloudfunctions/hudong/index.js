//关于客服bug：两个数据库都不可以为空，否则无法添加。项目招募中没有对填写内容进行判断。删除记录该序号会浪费即序号只增不减。逗号是数组分界.不可到达10


// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event.Content)

  if (event.Content== '删除问题') {
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '删除问题方法：\n1.回复“我的问题”\n2.找到要删除的问题序号，回复“sxwt:问题序号”,例如删除第一个问题则回复“sxwt:1”',
      },
    })
  }else if(event.Content[0] == 's' && event.Content[1] == 'x'&&event.Content[2] == 'w' && event.Content[3] == 't'){
    let id=event.Content[5]
     
    try{
    await db.collection('problem').where({
      pid: parseInt(id),
      openid:_.eq(wxContext.OPENID)
    }).remove()
    } catch(e) {
      console.error(e)
    }
    
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '问题是否删除成功，可回复“我的问题”查看，若删除失败则删除的不是自己提出的问题，请重新选择删除的问题',
      },
    })
  }else if (event.Content== '解答问题') {//问题提出后不可删除，永远保留给后人参考或者解答，但项目可以取消
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '请按如下方法参与解答(同一个问题可以多次解答):\n1.回复“查看问题”\n2.回复“(该问题序号)回答:输入回答内容”,例如解答第一个问题则回复“(1)回答:巴拉巴拉”',
      },
    })
  }else if(event.Content[3] == '回' && event.Content[4] == '答'){
    let an,open,even
    await db.collection('problem').where({//查answer
      pid:_.eq(parseInt(event.Content[1]))//需要类型转换，否则查不出来
    }).field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      answer:true,
      openid:true,
      event:true,
    }).get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      an=res.data[0].answer+'\n'+event.Content
      open=res.data[0].openid
      even=res.data[0].event
      console.log('[数据库] answer 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] answer 失败：', err)
    })
    try {
      await db.collection('problem').where({//更新
        pid: parseInt(event.Content[1])
      })
      .update({
        data: {
          answer: an
        },
      })
    } catch(e) {
      console.error(e)
    }
    await cloud.openapi.customerServiceMessage.send({//给回复人看的
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '回答问题填写成功\n可回复“查看问题”查看',
      },
    })
    await cloud.openapi.customerServiceMessage.send({//给提出问题的人看的
      touser: open,
      msgtype: 'text',
      text: {
        content: '您曾提出的问题有了新的回答，全部回答如下：\n\n'+even+'\n'+an,
      },
    })
  }else if (event.Content == '提出问题') {
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '请按如下格式提出问题：\ntcwt:（问题）\n例如提出一个问题则回复“tcwt:该小程序有什么功能？”',
      },
    })
  }else if(event.Content[0] == 't' && event.Content[1] == 'c'&&event.Content[2] == 'w' && event.Content[3] == 't'){
    let countResult 
    const $= db.command.aggregate//找出最大的pid序号，新的项目pid加1，不考虑删除浪费掉的序号，但是如果数据库中没有数据则没有maxpid，报错，所以管理员必须有一个删不掉的问题发布，项目同理
    countResult=await db
      .collection('problem')
      .aggregate()
      .group({
        _id: null,
        maxpid: $.max('$pid')
      })
      .end()
     await db.collection('problem').add({
      data: {
        event:(countResult.list[0].maxpid+1)+'. '+event.Content,
        answer:"answer:",
        openid:wxContext.OPENID,
        pid:(countResult.list[0].maxpid+1)//pid永远不可以为1
      },
      success(res) { //成功打印消息
        console.log('新问题存入数据库操作成功', res)
      },
      fail(res) { //存入数据库失败
        console.log('新问题存入数据库操作失败');
        //云函数更新
      }
    })
      await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
          content: '新问题填写成功\n可回复“我的问题”查看',
        },
      })
  }else if (event.Content == '我的问题') {
    var p=new Array()
    let countResult
    await db.collection('problem').count().then(res =>{
      countResult=res.total
      console.log('[数据库] 总数 成功: ', res)
    }).catch(err => {
      console.error('[数据库] 总数 失败：', err)
    })
    await db.collection('problem').where({
      openid:_.eq(wxContext.OPENID)
    }).field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      event:true,
      answer:true,
      pid:true,
    }).get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      for(let i=0;res.data[i].pid!=undefined;i++){
        p[i]=res.data[i].event+'\n'+res.data[i].answer+'\n\n'
      }
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })

    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '我的问题如下：\n'+p
      },
    })
  }else if (event.Content == '查看问题') {
    var p=new Array()
    let countResult
    await db.collection('problem').count().then(res =>{
      countResult=res.total
      console.log('[数据库] 总数 成功: ', res)
    }).catch(err => {
      console.error('[数据库] 总数 失败：', err)
    })
    await db.collection('problem').where({
    }).field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      event:true,
      answer:true,
      pid:true,
    }).get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      for(let i=0;res.data[i].pid!=undefined;i++){
        p[i]=res.data[i].event+'\n'+res.data[i].answer+'\n\n'
      }
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })

    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '目前所有问题如下：\n'+p
      },
    })
  }else if (event.Content == '目前项目') {//搞定
    var p=new Array()
    let countResult
    await db.collection('project').count().then(res =>{
      countResult=res.total
      console.log('[数据库] 总数 成功: ', res)
    }).catch(err => {
      console.error('[数据库] 总数 失败：', err)
    })
    await db.collection('project').where({
    }).field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      event:true,
      pid:true,
    }).get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      for(let i=0;res.data[i].pid!=undefined;i++){
        p[i]=res.data[i].event.Content+'\n\n'
      }
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })

    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '目前项目如下：\n'+p
      },
    })

  }else if (event.Content == '项目招募') {
    let countResult 
    const $= db.command.aggregate//找出最大的pid序号，新的项目pid加1，不考虑删除浪费掉的序号
    countResult=await db
      .collection('project')
      .aggregate()
      .group({
        _id: null,
        maxpid: $.max('$pid')
      })
      .end()
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '提示，项目招募格式如下填写（项目序号不要改动）：\nfbxm:\n项目序号:'+(countResult.list[0].maxpid+1)+'\n项目名称:\n项目负责人:\n项目简介:\n联系方式:\n招募要求:\n',
      },
    })
  }else if(event.Content[0] == 'f' && event.Content[1] == 'b'&&event.Content[2] == 'x' && event.Content[3] == 'm'){
    let countResult
    const $= db.command.aggregate//找出最大的pid序号，新的项目pid加1，不考虑删除浪费掉的序号
    countResult=await db
      .collection('project')
      .aggregate()
      .group({
        _id: null,
        maxpid: $.max('$pid')
      })
      .end()
    await db.collection('project').add({
      data: {
        event,
        openid:wxContext.OPENID,
        pid:countResult.list[0].maxpid+1
      },
      success(res) { //成功打印消息
        flag=1
        console.log('3', res)
      },
      fail(res) { //存入数据库失败
        flag=2
        console.log('订单存入数据库操作失败');
        //云函数更新
      }
    })
      await cloud.openapi.customerServiceMessage.send({
        touser: wxContext.OPENID,
        msgtype: 'text',
        text: {
          content: '项目招募填写成功\n可回复“我的项目”查看',
        },
      })
  
  }else if (event.Content == '撤销项目') {
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '撤销项目方法：\n1.回复“我的项目”\n2.找到要撤销项目的项目序号，回复“cxxm:项目序号”',
      },
    })
  }else if (event.Content == '我的项目') {
    var p=new Array()
    let countResult
    await db.collection('project').count().then(res =>{//找出记录总数
      countResult=res.total
      console.log('[数据库] 总数 成功: ', res)
    }).catch(err => {
      console.error('[数据库] 总数 失败：', err)
    })
    await db.collection('project').where({
      openid:_.eq(wxContext.OPENID)
    }).field({             //显示哪些字段
      _id:false,         //默认显示_id，这个隐藏
      event:true,
      pid:true,
    }).get()                   //获取根据查询条件筛选后的集合数据
    .then(res => {
      for(let i=0;res.data[i].pid!=undefined;i++){
        p[i]=res.data[i].event.Content+'\n\n'
      }
      console.log('[数据库] [查询记录] 成功: ', res)
    })
    .catch(err => {
      console.error('[数据库] [查询记录] 失败：', err)
    })

    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '我的项目如下：\n'+p
      },
    })
  }else if(event.Content[0] == 'c' && event.Content[1] == 'x'&&event.Content[2] == 'x' && event.Content[3] == 'm'){
    let id=event.Content[5]
    try{
    await db.collection('project').where({
      pid: parseInt(id),
      openid:_.eq(wxContext.OPENID)
    }).remove()
    } catch(e) {
      console.error(e)
    }
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '该项目是否撤销成功，可回复“我的项目”查看，若撤销失败则撤销的不是自己发布的项目，请重新选择撤销的项目'
      },
    })
  }else{
    await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgtype: 'text',
      text: {
        content: '会话指导：\n1.如果想为别人解答问题，请回复：解答问题\n2.如果想提问题，请回复：提出问题\n3.如果想查看所有问题，请回复：查看问题\n4.如果想查看自己提出的问题，请回复：我的问题\n5.如果想删除自己提出的问题，请回复：删除问题\n6.如果想知道目前所有在招人的项目，请回复：目前项目\n7.如果想知道自己发布的项目，请回复：我的项目\n8.如果想发布招人项目，请回复：项目招募\n9.如果想撤销已发布的项目，请回复：撤销项目\n(提示:回复内容不属于要求格式会收到“会话指导”)',
      },
    })
  }

  return 'success'
}