/**
 * 备忘-修改记录
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoColl = db.collection('memo');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { title, content, memocode } = event;
  let mtime = (new Date()).getTime();
  let results = { result: null, retMsg: "操作失败！", retCode: 'FAIL' };
  let okResults = { result: null, retMsg: "操作成功！", retCode: 'SUCCESS' };
  await memoColl.where({
    'memocode': memocode,
  }).update({
    data: {
      'title': title,
      'content': content,
      'mtime': mtime,
    }
  }).then(res => {
    let { updated } = res.stats;
    results = updated ? okResults : results;
  });
  return results;
}