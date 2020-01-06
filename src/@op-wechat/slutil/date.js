/**
 * 日期管理工具类
 */

let Obj = require('./obj');
let publicApi = {

  /**
   * 获取当前,不带时间
   */
  getToday: function() {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
  },

  /**
   * 字符串转正为日期
   * DateUtil.toDate(value)
   * @param value -  需要转换的字符串
   * @returns 日期对象 不存在则返回空null
   */
  toDate: function(value) {
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

  },
  /**
   * 秒格式化
   * @param {*} dateStr 
   * @param {*} fmt 
   */
  secondsFormat: function(seconds, fmt) {
    let _seconds = seconds * 1000;
    let toDate = new Date("2019/01/01");
    let _date = new Date(toDate.getTime() + _seconds);
    return this.toStr(_date, fmt);

  },

  /**
   * 日期对象(或者日期字符串)转为为指定格式的字符串
   * DateUtil.toStr(dateStr,fmt)
   * @param date -  需要转换的日期或字符串
   * @param fmt - 返回的日期字符串格式;默认: yyyy-MM-dd  
   * @returns 日期字符串  非法日期返回空串
   */
  toStr: function(dateStr, fmt) {
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
  },

  /**
   * 日期比较:date1 是否大于date2 ;如果date2为空;则默认跟当天比较
   * DateUtil.greater(date1,date2)
   * @param date1 -  需要比较的日期1
   * @param [date2=当天] - 需要比较的日期2
   * @returns true-date1大于date2
   */
  greater: function(date1, date2) {
    if (!date2) {
      //默认当天
      date2 = new Date();
      //不需要比较时间
      date2.setHours(0);
      date2.setSeconds(0);
      date2.setMinutes(0);
    }

    var extra = this.calculate(date1, date2, 'MILI-SECOND');
    return extra > 0;
  },

  /**
   * 
   * 日期比较:date1 是否大于等于date2 ;如果date2为空;则默认跟当天比较
   * DateUtil.greaterEqual(date1,date2)
   * @param date1 -  需要比较的日期1
   * @param [date2=当天] - 需要比较的日期2
   * @returns true-date1大于date2
   */
  greaterEqual: function(date1, date2) {
    if (!date1) return false;
    if (!date2) {
      //默认当天
      date2 = new Date();
      //不需要比较时间
      date2.setHours(0);
      date2.setSeconds(0);
      date2.setMinutes(0);
    }

    var extra = this.calculate(date1, date2, 'MILI-SECOND');
    return extra >= 0;
  },

  /**
   * 
   * DateUtil.calculate
   * 日期计算:date1,date2相差多少天(小时/分钟/秒/毫秒)
   * DateUtil.calculate(date1,date2)
   * @param date1 -  需要比较的日期1
   * @param [date2=当天] - 需要比较的日期2
   * @param [returnType=DAY] - 返回数据类型:DAY-天数;HOUR-小时;MINUTE-分;SECOND-秒;MILI-SECOND-毫秒;
   * @returns 相差的天数
   */
  calculate: function(date1, date2, returnType) {
    if (!returnType) {
      //默认当天
      returnType = "DAY";
    }

    if (typeof date1 === "string") {
      date1 = this.toDate(date1);
    }
    if (typeof date2 === "string") {
      date2 = this.toDate(date2);
    }

    var extra = date1.getTime() - date2.getTime();

    if (returnType == "MILI-SECOND") {

    } else if (returnType == "HOUR") {
      extra = extra / 3600000;
    } else if (returnType == "MINUTE") {
      extra = extra / 60000;
    } else if (returnType == "SECOND") {
      extra = extra / 1000;
    } else {
      //默认返回天数
      extra = Math.ceil(extra / 86400000);
    }

    return extra;

  },

  /**
   * 
   * DateUtil.calculateDate
   * 计算多少天或月或年后的日期
   * DateUtil.calculateDate(date1,value,calculateType)
   * @param [date1=当天] -  开始日期
   * @param value - 增加的值(天/月/年) 支持正负数 
   * @param [calculateType=DAY] - 计算类型:DAY-天,MONTH-月,YEAR-年;
   * @returns 返回计算后的日期(字符串形式);
   */
  calculateDate: function(date1, value, calculateType) {
    if (!date1) {
      //默认当天
      date1 = new Date();
    } else {
      date1 = this.toDate(date1)
      if (date1 == "") {
        console.error("计算多少天或周或月或年后的日期[DateUtil.calculateDate],错误;date1日期不合理", date1, value, calculateType)
        return "";
      }
    }

    var afterDate = Obj.clone(date1);
    if (calculateType == "MONTH") {
      afterDate.setMonth(date1.getMonth() + value * 1);
      afterDate.setDate(afterDate.getDate() - 1);
    } else if (calculateType == "YEAR") {
      afterDate.setFullYear(date1.getFullYear() + value * 1);
      afterDate.setDate(afterDate.getDate() - 1);
    } else {
      afterDate.setDate(date1.getDate() + value * 1);
    }
    return this.toStr(afterDate);

  },
  /**
   * 
   * DateUtil.getGetRangeDatesByType
   * 通过类型(本日,本周,上周,本月,上月,本年等)获取日期方法
   * DateUtil.getGetRangeDatesByType(date1,value,calculateType)
   * @param [date1=当天] -  开始日期
   * @param [dateType=DAY] - 类型:DAY-天,WEEK-周,MONTH-月,YEAR-年;
   * @param [value=0] - 值 0-表示(本日/本周/本月/本年),负数N表示(前N日/前N周/前N月/前N年),整数N  表示(后N日/下N周/下N月/下N年)
   * @returns dates 返回日期范围 dates.beginDate-开始日期(字符串),dates.endDate-结束日期(字符串)
   */
  getGetRangeDatesByType: function(date1, dateType, value) {
    var dates = {
      beginDate: undefined,
      endDate: undefined,
    };
    if (!date1) {
      //默认当天
      date1 = new Date();
    } else {
      date1 = this.toDate(date1)
      if (date1 == "") {
        console.error("通过类型获取日期方法[DateUtil.getGetRangeDatesByType],错误;date1日期不合理", date1, dateType, value)
        return dates;
      }
    }
    value = isNaN(value) ? 0 : value * 1;

    if (dateType === "WEEK") {
      dates.beginDate = Obj.clone(date1);
      if (value === 0) {
        // 本周
        // getDay() 从 Date 对象返回一周中的某一天 (0 ~ 6)
        // setDate() 设置 Date 对象中月的某一天 (1 ~ 31)
        let dayOfWeek = date1.getDay() === 0 ? 7 : date1.getDay();
        dates.beginDate.setDate(date1.getDate() - dayOfWeek + 1);
        dates.endDate = Obj.clone(dates.beginDate);
        dates.endDate.setDate(dates.beginDate.getDate() + 6);
      } else {
        // 按周为单位计算 注意间隔
        let dayOfWeek = date1.getDay() === 0 ? 7 : date1.getDay();
        if (value > 0) {
          dates.beginDate.setDate(date1.getDate() - dayOfWeek + 8);
          let rangeDay = dates.beginDate.getDate() + value * 7 - 1;
          dates.endDate = Obj.clone(dates.beginDate);
          dates.endDate.setDate(rangeDay);
        } else {
          dates.endDate = Obj.clone(date1);
          dates.endDate.setDate(date1.getDate() - dayOfWeek);
          let rangeDay = dates.endDate.getDate() + value * 7 + 1;
          dates.beginDate.setDate(rangeDay);
        }
      }

    } else if (dateType === "MONTH") {
      date1.setMonth(date1.getMonth() + value);
      //按月
      dates.beginDate = Obj.clone(date1);
      dates.beginDate.setDate(1);
      dates.endDate = new Date(dates.beginDate.getFullYear(), dates.beginDate.getMonth() + 1, 0);
    } else if (dateType === "YEAR") {
      //按年
      var currentYear = date1.getFullYear() + value;
      dates.beginDate = new Date(currentYear, 0, 1);
      dates.endDate = new Date(currentYear, 12, 0);
    } else if (dateType === "30Days") {
      date1.setMonth(date1.getMonth() + value);
      //最近30天
      dates.beginDate = Obj.clone(date1);
      var today = date1.getDate();
      dates.beginDate.setDate(today);

      var date2 = new Date();
      dates.endDate = Obj.clone(date2);
      dates.endDate.setDate(dates.endDate.getDate());
    } else if (dateType === "7Days") {
      var thisDate = new Date();
      dates.beginDate = Obj.clone(thisDate);
      date1.setMonth(date1.getMonth() + value);
      //最近7天
      let today = thisDate.getDate();
      if (today >= 8) {
        // 包括当天的，间隔6天
        dates.beginDate.setDate(today - 6);
      } else {
        // 包括当天，间隔6天
        var dayDiff = 6 - today;
        var lastMonth = date1.getMonth();
        var thisYear = date1.getFullYear();
        if (lastMonth < 0) {
          thisYear = thisYear - 1;
        }
        var date3 = new Date(thisYear, lastMonth, 0);
        dates.beginDate = Obj.clone(date3);
        dates.beginDate.setDate(date3.getDate() - dayDiff);
      }

      var date2 = new Date();
      dates.endDate = Obj.clone(date2);
      dates.endDate.setDate(dates.endDate.getDate());
    } else {
      //按天
      dates.beginDate = Obj.clone(date1);
      dates.endDate = Obj.clone(date1);
      dates.endDate.setDate(dates.endDate.getDate() + value);
    }
    dates.beginDate = this.toStr(dates.beginDate);
    dates.endDate = this.toStr(dates.endDate);
    return dates;

  }


}

module.exports = publicApi;