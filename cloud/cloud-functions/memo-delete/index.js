/**
 * 备忘-删除记录
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoColl = db.collection('memo');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { memocode } = event;
  let results = { result: null, retMsg: "操作失败！", retCode: 'FAIL' };
  let okResults = { result: null, retMsg: "操作成功！", retCode: 'SUCCESS' };
  let _id = await memoColl.where({
    'memocode': memocode,
  }).get().then(res => {
    let { _id } = res.data[0] || {};
    return _id;
  });
  if(_id) {
    await memoColl.doc(_id).remove().then(res => {
      let { removed } = res.stats;
      results = removed ? okResults : results;
    })
  }
  return results;
}