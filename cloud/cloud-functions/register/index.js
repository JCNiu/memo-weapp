/**
 * 注册
 */
const myService = require('./service.js');
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const userColl = db.collection('user');
const inviteColl = db.collection('invite');
const _ = db.command;


exports.main = async (event, context) => {
  const { username, email, password, invitecode } = event;
  const userinfo = { username, email, password, invitecode };
  let results = {
    retMsg: '未知错误',
    retCode: 'FAIL',
  }
  try {
    if (await myService.checkUserCollValue(userColl, "username", username)) {
      results.retMsg = "用户名已存在";
    } else if (await myService.checkUserCollValue(userColl, "email", email)) {
      results.retMsg = "邮箱已被注册";
    } else if (!(await myService.checkInviteCollValue(inviteColl, "invitecode", invitecode))) {
      results.retMsg = "邀请码不存在";
    } else {
      results = await myService.registerUser(userColl, userinfo);
    }
  } catch(e) {}
  return { result: null, ...results };
}


