/**
 * 备忘-查询记录
 */
const myService = require('./service');
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const memoColl = db.collection('memo');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const { usercode, memocode, starttime, endtime, classify, keyword = "" } = event;
  let { pageSize = 10, pageNum = 1, totalRecord = 0 } = event;
  let currentTime = (new Date()).getTime();
  let startTime = starttime ? myService.strToTime(starttime + ' 00:00:00') : myService.strToTime('2019-01-01 00:00:00');
  let endTime = endtime ? myService.strToTime(endtime + ' 23:59:59') : currentTime;
  let results = { result: null, retMsg: "操作失败！", retCode: 'FAIL' };
  let okResults = { retMsg: "操作成功！", retCode: 'SUCCESS' };
  // 查询数据量
  let param = myService.filterParams({
    usercode,
    memocode,
    createtime: _.gte(startTime).and(_.lte(endTime)),
    classify: classify === '所有' ? '' : classify,
    title: !keyword ? keyword : db.RegExp({
      regexp: keyword,
      options: 'i', 
    })
  });
  ({ total: totalRecord } = await memoColl.where(param).count());
  let totalPage = Math.ceil(totalRecord / pageSize);
  // 查询数据库
  await memoColl.where(param).skip(pageSize * (pageNum - 1)).limit(pageSize).get().then(res => {
    let { data } = res;
    if (data && data.length > 0) pageNum ++;
    results = { 
      pageSize,               // 每页最大记录数
      pageNum,                // 当前页码
      totalRecord,            // 总记录数
      totalPage,              // 总页数
      ...okResults,
    };
    results.result = myService.formatData(data);
  });

  return results;
}

