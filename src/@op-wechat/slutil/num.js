/**
 * 数字工具类
 */
let publicApi = {
  /**
   * 判断是否为数字型 
   * 1. value - 验证值
   * 2. intLen - 验证整形长度 默认16
   * 3. precision - 验证精度,默认 20
   * @param value 
   * @returns 数字型 返回true; 其它false
   */
  isNum: function(value, intLen, precision) {
    intLen = intLen ? intLen : 16;
    if (publicApi.notExits(precision)) {
      precision = 64;
    }
    let reg;
    if (precision == 0) {
      reg = new RegExp("^-?\\d{1," + intLen + "}$");
    } else {
      reg = new RegExp("^(-?\\d{1," + intLen + "}){1}(\\.\\d{1," + precision + "})?$");
    }
    return reg.test(value);
  },
  
  /**
   * 判断是否为整形 
   * @param value 
   * @returns 整形 返回true; 其它false
   */
  isInt: function(value, intLen, ) {
    intLen = intLen ? intLen : 9;
    let reg = new RegExp("^-?\\d{1," + intLen + "}?$");
    return /^-?\d{1,9}?$/.test(value);
  },

  /**
   * 转换整形 
   * @param value 
   * @returns 整形 返回true; 其它false
   */
  toInt: function(value) {
    if (publicApi.isNum(value)) {
      return parseInt(value);
    }
    return null;
  },

  /**
   * 数字格式
   * 
   * @param value 
   * @param precision  默认两位
   * 格式x或者x-x
   * x - 表示保留精度
   * x-x 表示最小精度与最大进度0-4 进度在0-4内
   *  
   * @returns 返回小数
   */
  numFormat(value, precision) {
    if (publicApi.notExits(precision)) {
      //默认8位小数
      precision = 2;
    }
    let _value = 0;
    if (publicApi.isNum(value)) {
      _value = value * 1;
    }

    let precisions, min, max;
    if (publicApi.isStr(precision)) {
      precisions = precision.split("-");
    }
    if (precisions && precisions.length == 2) {
      min = precisions[0];
      max = precisions[1];
    } else {
      min = precision;
      max = precision;
    }

    let maxPeriVal = parseFloat((_value).toFixed(max));
    let minPeriVal = _value.toFixed(min);
    return maxPeriVal == minPeriVal ? minPeriVal : maxPeriVal;

  },

  /**
   * 转化为浮点型; 默认8位小数 
   * 
   * @param value 
   * @returns 返回小数
   */
  toNum(value, precision) {

    if (publicApi.notExits(precision)) {
      //默认8位小数
      precision = 8;
    }
    if (publicApi.isNum(value)) {
      return parseFloat((value * 1).toFixed(precision));
    }
    return null;
  },

  /**
   * 格式化数字,再比较;,避免 0.1+0.2 == 0.3位false的情况
   * 1. x 不等于 y
   * @param x 
   * @param y 
   */
  ne(x, y) {
    return publicApi.toNum(x) != publicApi.toNum(y);
  },

  /**
   * 格式化数字,再比较;,避免 0.1+0.2 == 0.3位false的情况
   * 1. x 等于 y
   * @param x 
   * @param y 
   */
  eq(x, y) {
    return publicApi.toNum(x) == publicApi.toNum(y);
  },

  /**
   * 格式化数字,再比较;,避免 0.1+0.2 == 0.3位false的情况
   * 1. x 小于 y
   * @param x 
   * @param y 
   */
  lt(x, y) {
    return publicApi.toNum(x) < publicApi.toNum(y);
  },

  /**
   * 格式化数字,再比较;,避免 0.1+0.2 == 0.3位false的情况
   * 1. x 小于或等于 y
   * @param x 
   * @param y 
   */
  le(x, y) {
    return publicApi.toNum(x) <= publicApi.toNum(y);
  },

  /**
   * 格式化数字,再比较;,避免 0.1+0.2 == 0.3位false的情况
   * 1. x 大于 y
   * @param x 
   * @param y 
   */
  gt(x, y) {
    return publicApi.toNum(x) > publicApi.toNum(y);
  },

  /**
   * 格式化数字,再比较;,避免 0.1+0.2 == 0.3位false的情况
   * 1. x 大于或等于 y
   * @param x 
   * @param y 
   */
  ge(x, y) {
    return publicApi.toNum(x) >= publicApi.toNum(y);
  },

  /**
   * 数字切割;
   * 把小数点与整形切割
   * 1. x 大于或等于 y
   * @param value 切割值
   * @param precision -小数点切割位数 
   * @return {intVal,decimalVal }
   */
  numSplit(value, precision) {
    let result = {
      intVal: '',
      decimalVal: ''
    };
    let _value;
    if (precision > 0) _value = publicApi.numFormat(value, precision);
    else _value = value;
    if (_value == null) return result;
    let _values = _value.toString().split(".");
    //整形值
    result.intVal = _values[0];
    // 小数点值
    if (_values.length == 2) result.decimalVal = _values[1];
    return result;
  },

  /**
   * 整形取模计算
   * 1. divisor 除数
   * 2. dividend 被除数
   * 3. return : null 或者 { result: number, remainder: number }
   * @param bulkQty 
   * @param packUnitQty 
   */
  modInt(divisor, dividend) {
    let _divisor = publicApi.toInt(divisor);
    //除数非整形
    if (_divisor == null) {
      console.error("modInt err:除数不存在");
      return null;
    }
    let _dividend = publicApi.toInt(dividend);
    //被除数 非整形,或者为0
    if (_dividend == null || _dividend == 0) {
      console.error("modInt err: 被除数不存在或为0");
      return null;
    }
    return {
      result: Math.floor(_divisor / _dividend),
      remainder: _divisor % _dividend
    };
  },

  /**
   * 浮点型取模计算
   * 1. divisor 除数
   * 2. dividend 被除数
   * 3. return : null 或者 { result: number, remainder: number }
   * @param divisor 
   * @param dividend 
   */
  modFloat(_divisor, _dividend) {
    let divisor = publicApi.toNum(_divisor);
    //除数非浮点型
    if (_divisor == null) {
      console.error("modFloat err:除数不存在");
      return null;
    }
    let dividend = publicApi.toNum(_dividend);
    var diret = divisor > 0 ? 1 : -1;
    divisor = Math.abs(divisor);
    dividend = dividend * 1;
    //被除数 非浮点型,或者为0
    if (dividend == null || dividend == 0) {
      console.error("modFloat err: 被除数不存在或为0");
      return null;
    }
    var _results = {
      remainder: null,
      result: null
    };
    // 处理结果 1. 增加方向, 2. 保留精度
    let handleResult = (myresults) => {
      return {
        remainder: publicApi.toNum(myresults.remainder * diret),
        result: myresults.result * diret
      }
    }

    if (dividend == 1) {
      _results.result = Math.floor(divisor);
      _results.remainder = divisor - _results.result;
      return handleResult(_results);
    }
    if (divisor < dividend) {
      _results.result = 0;
      _results.remainder = divisor;
      return handleResult(_results);
    }
    //获取整除结果
    _results.result = Math.floor(divisor / dividend);
    //获取余数
    _results.remainder = divisor - _results.result * dividend;
    return handleResult(_results);
  }
}

module.exports = publicApi;