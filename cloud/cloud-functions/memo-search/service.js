class myService {
  /**
   * 时间转换(字符串转时间戳)
   */
  strToTime (str) {
    let timeStr = str.substring(0, 19).replace(/-/g, '/');
    return new Date(timeStr).getTime();
  }

  /**
   * 返回数据data格式化
   */
  formatData(data) {
    data.map(item => {
      delete item._id;
    });
    return data;
  }

  /**
   * 对象属性为空则删除对象
   */
  filterParams(obj) {
    let _newPar = {};
    for (let key in obj) {
      // 如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。）
      if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
        // 记录属性
        _newPar[key] = obj[key];
      }
    }
    //返回对象
    return _newPar;
  }
}

module.exports = new myService();