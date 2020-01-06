import { slutil } from '../../../common/index'

class myService {
  /**
   * 修改密码
   */
  editPassword(param) {
    let option = {
      cloudname: 'password-edit',
      params: param,
      isOnlySuccessData: true,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }

  // 验证
  validate(userInfo, isEditPage) {
    if (!userInfo.oldpassword && isEditPage) {
      wx.showToast({
        title: '原密码不允许为空',
        icon: 'none',
      })
      return false
    }
    if (!userInfo.newpassword) {
      wx.showToast({
        title: '新密码不允许为空',
        icon: 'none',
      })
      return false
    }
    if (!/^[a-zA-Z0-9]{6,18}$/.test(userInfo.newpassword)) {
      wx.showToast({
        title: '密码格式错误',
        icon: 'none',
      })
      return false
    }
    if (userInfo.newpassword != userInfo.newpassword2) {
      wx.showToast({
        title: '两次密码输入不相同',
        icon: 'none',
      })
      return false
    }
    return true
  }
}

module.exports = new myService();