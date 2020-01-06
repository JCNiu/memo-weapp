/**
 * 备忘-添加记录
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoColl = db.collection('memo');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { title, content, usercode } = event;
  let createtime = (new Date()).getTime();
  let mtime = createtime;
  let memocode = 'memo'+ createtime + '|' + usercode;
  let results = { result: null, retMsg: "操作失败！", retCode: 'FAIL' };
  let okResults = { result: { memocode }, retMsg: "操作成功！", retCode: 'SUCCESS' };
  results = memoColl.add({
    data: {
      title,      // 标题
      content,    // 内容
      usercode,   // 用户code
      createtime, // 创建时间
      mtime,      // 修改时间
      memocode,   // 备忘code
    },
    done: false,
  }).then(res => {
    let { _id } = res;
    if (_id) {
      results = { ...okResults };
    }
    return results;
  });
  return results;
}