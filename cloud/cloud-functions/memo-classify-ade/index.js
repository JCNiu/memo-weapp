/**
 * 备忘-分类增删改查
 */
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoClassifyColl = db.collection('memo-classify');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { operate, usercode, value, newvalue } = event;
  let results = { result: null, retMsg: "操作失败！", retCode: 'FAIL' };
  let okResults = { retMsg: "操作成功！", retCode: 'SUCCESS' };
  if (operate == 'add') { // 添加
    let param = { value, usercode, num: 0 }; 
    if (addClassify(param)) results = { ...okResults };
  } else if (operate == 'del') { // 删除
    let param = { usercode, value };
    if (delClassify(param)) results = { ...okResults };
  } else if (operate == 'edit') { // 修改
    let param = { usercode, value, newvalue };
    if (editClassify(param)) results = { ...okResults };
  }
  return results;
}

// 添加分类
async function addClassify(param) {
  let { usercode, value } = param;
  let { total } = await memoClassifyColl.where({ usercode, value }).count();
  if (total) return true;
  return await memoClassifyColl.add({
    data: param
  }).then(res => {
    if (res.data && res.data.length > 0) return true;
    return false;
  })
}

// 删除分类
async function delClassify(param) {
  return await memoClassifyColl.where(param).remove().then(res => {
    if (res.stats.removed) return true;
    return false;
  })
}

// 修改分类
async function editClassify(param) {
  let { usercode, value, newvalue } = param;
  return await memoClassifyColl.where({ usercode, value }).update({
    data: { value: newvalue }
  }).then(res => {
    if (res.stats.updated) return true;
    return false;
  })
}


