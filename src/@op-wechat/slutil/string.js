/**
 * 字符串工具类
 */
let publicApi = {

  /**
   * 判断字符串是否为日期格式
   * DateUtilisDate(value)
   * @param value - 需要判断的值
   * @returns 返回值 - true-是,false- 否 ;
   */
  isDate: function(dateStr) {
    if (!dateStr) {
      return false;
    }

    if (dateStr instanceof Date) {
      return true;
    }

    //纯数字
    if (/^\d{8}$/.test(dateStr)) {
      dateStr = dateStr.slice(0, 4) + "-" + dateStr.slice(4, 6) + "-" + dateStr.slice(6, 8);
    }
    //ios不支持2019-05-27格式 需要转换为2019/05/27
    dateStr = dateStr.replace(/-/g, '/');
    return new Date(dateStr).toString() != "Invalid Date";
  },

  /**
   * 随机生成一串字符串
   * len 默认16
   * @param len 
   * @returns 
   * @memberof ClassUtil
   */
  uuid: function(len) {
    if (publicApi.notExits(len) || len == 0) {
      len = 16;
    }
    let uuidStr = "";
    while (uuidStr.length < len) {
      uuidStr += Math.random().toString(36).slice(2);
    }
    return uuidStr.slice(0, len);
  },

}

module.exports = publicApi;