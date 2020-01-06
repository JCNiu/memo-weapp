class myService {
  /**
   * 查询字段是否存在
   */
  checkUserCollValue(userColl, label, value) {
    return userColl.where({ [label]: value }).get().then(res => {
      if (res.data && res.data.length > 0) { return true; }
      return false;
    });
  }


  /**
   * 查询字段是否存在
   */
  checkInviteCollValue(inviteColl, label, value) {
    return inviteColl.where({ [label]: value }).get().then(res => {
      if (res.data && res.data.length > 0) { return true; }
      return false;
    });
  }


  /**
   * 注册用户
   */
  registerUser(userColl, userinfo) {
    let { username, email, password, invitecode } = userinfo;
    let registerdate = new Date();  // 注册时间
    let code = registerdate.getTime() + username; // 登录code(唯一)
    let results = { retMsg: "注册失败！", retCode: 'FAIL' }
    return userColl.add({
      data: { 
        username, 
        email, 
        password, 
        invitecode, 
        registerdate,
        code,
      }
    }).then(res => {
      if (res._id) { 
        results.retMsg = '注册成功！'
        results.retCode = 'SUCCESS'
        return results;
      }
    }, rej => { // 失败原因
      results.retMsg = rej.errMsg;
      return results;
    })
  }
}

module.exports = new myService();