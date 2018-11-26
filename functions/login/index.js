// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const userCollection = cloud.database().collection('user')
// 云函数入口函数
exports.main = async (event, context) => {
  var isStudent = event.isStudent
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  await userCollection.where({
    _openid:OPENID
  }).get().then(res => {
    console.log('login success' + res)
    await userCollection.update({

    })
  }).catch(rej => {
    console.log('register sucess' + rej)
    await userCollection.add({
      data: {
        _appid: APPID,
        _openid: OPENID,
        _unionid: UNIONID,
        role: isStudent ? 'student' : 'teacher',
        lastLoginDate:new Date(),
        class: null
      }
    })
  })

  return {OPENID, APPID, UNIONID}
  // return event
}