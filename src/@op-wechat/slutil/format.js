/**
 * 格式化方法
 */

let publicApi = {
  //格式化手机号
  formatPhone: function(phone) {
    if (phone.length != 11) {
      return phone;
    }
    let a = phone.substr(0, 3);
    let b = phone.substr(3, 4);
    let c = phone.substr(7, 4);
    return `${a} ${b} ${c}`;
  },


  formatPhones: function(phone) {
    if (phone.length != 11) {
      return phone;
    }
    let a = phone.substr(0, 3);
    let b = `****`;
    let c = phone.substr(7, 4);
    return `${a} ${b} ${c}`;
  },
}

module.exports = publicApi;