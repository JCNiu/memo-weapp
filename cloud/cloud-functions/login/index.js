// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 数据库引用
const db = cloud.database();
const userColl = db.collection('user');
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  const { username, password } = event;
  return await checkUserPass(username, password);
}

/**
 * 验证用户及密码
 */
function checkUserPass(username, password) {
  return userColl.where({
    "username": username,
    "password": password
  }).get().then(res => {
    let result = {};
    if (res.data.length != 0) {
      result.code = res.data[0].code;
      return { result, retCode: 'SUCCESS', retMsg: '登录成功' };
    }
    return { result, retCode: 'FAIL', retMsg: '密码错误' };
  });
}