class myService {
  /**
   * 获取对应年月日
   * @param dateValue 日期字符串
   */
  getYMD(dateValue) {
    let now = new Date(dateValue);
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate()
    }
  }

  /**
   * 获取日期字符串(格式如: 2019/11/06)
   * @param year年
   * @param month月
   * @param day日
   */
  getDateValue(year, month, day) {
    day = parseInt(day) > 9 ? day : '0' + day;
    month = parseInt(month) + 1;
    month = month > 9 ? month : '0' + month;
    return year + '/' + month + '/' + day;
  }

  /**
   * 获取当前,不带时间
   */
  getToday() {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
  }

  /**
   * 字符串转正为日期
   * DateUtil.toDate(value)
   * @param value -  需要转换的字符串
   * @returns 日期对象 不存在则返回空null
   */
  toDate(value) {
      if (!value) {
        return null;
      }
      if (value instanceof Date) {
        return value;
      }
      var newValue;
      if (/\d{8}/g.test(value)) {
        //纯数字 20161212
        newValue = value.substring(0, 4) + "/" + value.substring(4, 6) + "/" + value.substring(6);
      } else {
        newValue = value.replace(/-/g, "/");
      }
      return new Date(newValue);

    }

    /**
     * 日期对象(或者日期字符串)转为为指定格式的字符串
     * @param date -  需要转换的日期或字符串
     * @param fmt - 返回的日期字符串格式;默认: yyyy-MM-dd  
     * @returns 日期字符串  非法日期返回空串
     */
    toStr(dateStr, fmt) {
      if (!dateStr) {
        return "";
      }

      let date;
      if (typeof dateStr === "string") {
        date = this.toDate(dateStr);
      } else {
        date = dateStr;
      }

      fmt = fmt || "yyyy-MM-dd";
      var o = {
        "M+": date.getMonth() + 1, //月份           
        "d+": date.getDate(), //日           
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时           
        "H+": date.getHours(), //小时           
        "m+": date.getMinutes(), //分           
        "s+": date.getSeconds(), //秒           
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度           
        "S": date.getMilliseconds() //毫秒           
      };
      var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }
}
module.exports = new myService();