class myService {
  /**
   * 返回数据data格式化
   */
  formatData(data) {
    data.map(item => {
      delete item._id;
      delete item.usercode;
    });
    return data;
  }
}

module.exports = new myService();