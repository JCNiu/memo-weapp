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
}

module.exports = new myService();