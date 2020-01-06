const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const userColl = db.collection('user');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { username, email, invitecode } = event;
  const userinfo = { username, email, invitecode };
  let results = { retMsg: '用户信息不正确!', retCode: 'FAIL', result: null }
  try {
    let code = await checkValidate(userinfo);
    if (code && username) {
      results = { retMsg: "验证成功!", retCode: 'SUCCESS', code };
    }
  } catch (e) { }
  return results;
}

/**
 * 查询字段是否存在
 */
function checkValidate(userinfo) {
  const { username, email, invitecode } = userinfo;
  return userColl.where({
    "username": username,
    "email": email,
    "invitecode": invitecode,
  }).get().then(res => {
    if (res.data && res.data.length > 0) { 
      return res.data[0].code; 
    }
    return '';
  });
}