/**
 * 验证
 */

let string = require('./string');
let publicApi = {
  /**
   * 是否为电话号码
   * @param str 
   */
  isPhone: function(str) {
    if (!str) {
      return false;
    }
    return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str);
  },

  /**
   * 是否为手机号码
   * @param str 
   */
  isMobile: function(str) {
    if (!str) {
      return false;
    }
    // return /^1[34578]\d{9}$/.test(str);
    return /^\d{11}$/.test(str);
  },

  /**
   * 是否为批次号
   * @param str 
   */
  isBatchid: function(str) {
    if (!str) {
      return false;
    }
    if (!/^\d{8}/.test(str)) return false;
    return string.isDate(str);
  },

  /**
   * 是否为电话号码 或 手机号码
   * @param str 
   */
  isPhoneMobile: function(str) {
    return this.isPhone(str) || this.isMobile(str);
  },

  /**
   * 是否为email
   * @param str 
   */
  isEmail: function(str) {
    if (!str) {
      return false;
    }

    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
  },

  /**
   * 非中文
   * @param str 
   */
  isUnChinese: function(str) {
    if (!str) {
      return false;
    }

    return /[^\u4e00-\u9fa5]/.test(str);
  },

  /**
   * 是否特殊字符
   * @param str 
   */
  isSpecialChar: function(str) {
    if (!str) {
      return false;
    }

    return str.indexOf('`') != -1;
  },
};

module.exports = publicApi;