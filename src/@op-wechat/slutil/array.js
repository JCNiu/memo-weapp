/**
 * 数组工具类
 */
let publicApi = {
  /**
   * 判断非空数组[]
   * @param {*} object
   */
  isNotEmptyArr: function (arr) {
    if (!publicApi.isArray(arr)) {
      return false;
    }
    return arr.length != 0;
  },

  /**
   * 判断空数组[];非数组或者数组为空,返回ture
   * @param {*} array 
   */
  isEmptyArr: function (arr) {
    //非数组
    if (!publicApi.isArray(arr)) return true;
    return arr.length == 0;
  },
}

module.exports = publicApi;