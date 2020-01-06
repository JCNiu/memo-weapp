import { slutil, Page, Toast } from '../../../common/index';
let myService = require('./password-forget.service.js');

Page({
  data: {
    enableToast: true,  // 是否使用轻提示组件
    userInfo: {},       // 用户信息
  },

  // 输入框失去焦点
  inputBlur(event) {
    let { type } = event.currentTarget.dataset;
    let { value } = event.detail;
    let { userInfo } = this.data
    userInfo[type] = value;
    this.setData({ userInfo });
  },

  // 验证信息是否正确
  onValidate(event) {
    let { userInfo } = this.data;
    if (myService.validate(userInfo)) {
      let param = {
        ...userInfo,
      }
      myService.retrievePassword(param).then(res => {
        let { code } = res;
        setTimeout(item => {
          this.goToPasswordEdit(code);
        }, 1000);
      })
    }
  },

  // 跳转密码修改页
  goToPasswordEdit(code) {
    slutil.reLaunch('/loginPage/pages/password-edit/password-edit', { code });
  },
})