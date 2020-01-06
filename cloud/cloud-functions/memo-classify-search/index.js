/**
 * 备忘-分类查询
 */
const myService = require('./service');
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoColl = db.collection('memo');
const memoClassifyColl = db.collection('memo-classify');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { usercode } = event;
  let results = { result: null, retMsg: "操作失败！", retCode: 'FAIL' };
  let okResults = { retMsg: "操作成功！", retCode: 'SUCCESS' };
  // 查询数据库
  let param = {
    usercode,
  };
  let { total } = await memoColl.where(param).count();  
  await memoClassifyColl.where(param).get().then(res => {
    let { data } = res;
    if (data) {
      results = { ...okResults };
      data.unshift({ num: total, value: '所有' });
      results.result = myService.formatData(data);
    }
  });

  return results;
}


