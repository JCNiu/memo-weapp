const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const userColl = db.collection('user');
const _ = db.command;

exports.main = async (event, context) => {
  const { code, password } = event;
  const userinfo = { code, password };
  return await passwordEdit(userinfo);
}

async function passwordEdit(userinfo) {
  const { code, password } = userinfo;
  let okResult = { result: null, retCode: 'SUCCESS', retMsg: '修改成功' };
  let results = { result: {}, retCode: 'FALL', retMsg: '修改失败' };
  try {
    let { password: oldpassword, _id } = await userColl.where({
      "code": code,
    }).get().then(res => {
      let result = {};
      if (res.data.length != 0) {
        result = res.data[0];
      }
      return result;
    })
    if (password == oldpassword) {  // update相同数据不会返回成功信息
      results = okResult;
    } else {
      await userColl.doc(_id).update({
        data: { "password": password },
      }).then(res => {
        let { updated } = res.stats;
        if (updated > 0) { 
          results = okResult;
        }
      })    
    }
    return results;
  } catch (e) {
    return results;
  }
}