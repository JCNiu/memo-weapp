import { slutil } from '../../@op-wechat/index.js'

class myService {
  /**
   * 查询登录code
   */
  getLoginCode(param) {
    let params = slutil.obj.clone(param);
    let option = {
      cloudname: 'login',
      params,
      isOnlySuccessData: true,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }


  // 验证
  validate(userInfo) {
    if (!userInfo.username) {
      wx.showToast({
        title: '用户名不允许为空',
        icon: 'none',
      })
      return false
    }
    if (!userInfo.password) {
      wx.showToast({
        title: '密码不允许为空',
        icon: 'none',
      })
      return false
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,15}$/.test(userInfo.username)) {
      wx.showToast({
        title: '用户名输入错误',
        icon: 'none',
      })
      return false
    }
    if (!/^[a-zA-Z0-9]{6,18}$/.test(userInfo.password)) {
      wx.showToast({
        title: '密码输入错误',
        icon: 'none',
      })
      return false
    }
    return true
  }
}

module.exports = new myService();