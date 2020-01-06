import { slutil } from '../../../common/index'

/**
 * 忘记密码服务
 */
class myService {
  /**
   * 找回密码
   */
  retrievePassword(param) {
    let option = {
      cloudname: 'password-validate',
      params: param,
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
    if (!userInfo.email) {
      wx.showToast({
        title: 'EMAIL不允许为空',
        icon: 'none',
      })
      return false
    }
    if (!userInfo.invitecode) {
      wx.showToast({
        title: '邀请码不允许为空',
        icon: 'none',
      })
      return false
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,15}$/.test(userInfo.username)) {
      wx.showToast({
        title: '用户名必须为以字母开头的4-16位数字字母组合',
        icon: 'none',
      })
      return false
    }
    if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(userInfo.email)) {
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'none',
      })
      return false
    }
    // eg:abc.123
    if (!/^([a-zA-Z]{3})+\.([0-9]{3})$/.test(userInfo.invitecode)) {
      wx.showToast({
        title: '邀请码格式错误',
        icon: 'none',
      })
      return false
    }
    return true
  }
}

module.exports = new myService();