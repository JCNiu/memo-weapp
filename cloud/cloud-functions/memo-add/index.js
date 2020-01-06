/**
 * 备忘-添加记录
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoColl = db.collection('memo');
const memoClassifyColl = db.collection('memo-classify');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { title, content, usercode, classify = '' } = event;
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
      classify,   // 分类
      top: 0,     // 是否置顶
    },
    done: false,
  }).then(res => {
    let { _id } = res;
    if (_id) {
      results = { ...okResults };
      addClassify(usercode, classify);
    }
    return results;
  });
  return results;
}

/**
 * memo-classify表添加分类
 */
async function addClassify(usercode, value) {
  // 验证是否存在相同分类
  let id = await memoClassifyColl.where({ usercode, value }).get().then(res => {
    if (res.data.length == 0) return 0;
    return res.data[0]._id;
  });
  if (id) { // 存在 刷新该分类记录数量
    let { total: num } = await memoColl.where({ usercode, classify: value }).count();
    memoClassifyColl.doc(id).update({
      data: { num }
    }).then();
  } else { // 不存在 添加
    memoClassifyColl.add({
      data: {
        usercode,
        value,
        num: 1,
      }
    }).then();
  }
}