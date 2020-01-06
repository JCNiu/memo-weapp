import obj from './obj.js';
import Toast from '../wec-vant/toast/toast';

/**
 * 请求工具类
 */

/**
 * 云函数请求
 * @param cloudname 云函数名称 
 * @param params 提交参数 
 * @param isOnlySuccessData 是否只返回成功数据(直接提示错误信息)
 * @param isSupportTourist 是否使用全局加载层
 */
function callFunction (option) {
  let { cloudname: name, params: data, isOnlySuccessData = false, isSupportTourist = true, } = option;
  if (isSupportTourist) {
    wx.showLoading({  // 加载层 防止连续触发
      title: '加载中',
      mask: true,
    })
  }
  return new Promise(resolve => {
    wx.cloud.callFunction({
      name,
      data,
      complete: res => {
        if (isSupportTourist) wx.hideLoading();
        let results = formatResults(res);
        if (isOnlySuccessData) {
          if (results.retCode == 0) {
            resolve(results.data);
          } else{
            // wx.showToast({ title: results.message, icon: "none" });
            Toast.fail(results.message);
          }
        } else {
          resolve(results);
        }
      }
    })
  })
}

/**
 * 格式化返回数据
 */
function formatResults(results) {
  let result = obj.clone(results.result) || {};
  let res = { retCode: -1, message: '' };
  if (result) {
    res = {
      retCode: result.retCode == 'SUCCESS' ? 0 : -1,
      message: result.retMsg,
    }
  }
  delete result.retCode;
  delete result.retMsg;
  res.data = { ...result };
  return res;
}

module.exports = { callFunction };