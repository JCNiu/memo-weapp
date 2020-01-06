import { slutil, Page, Toast } from '../../../common/index';
let myService = require('./password-edit.service.js');

Page({
  data: {
    enableToast: true,    // 是否使用轻提示组件
    userInfo: {},         // 用户信息
    isEditPage: false,    // 是否从修改密码入口进入(忘记密码修改不需要原密码);
  },

  onSlLoad: function (pageParam) {
    let { code, isEditPage = false } = pageParam;
    this.setData({ code, isEditPage });
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
  doConfirm(event) {
    let { userInfo, code, isEditPage } = this.data;
    if (myService.validate(userInfo, isEditPage)) {
      let param = {
        code,
        password: userInfo.newpassword,
      }
      myService.editPassword(param).then(res => {
        Toast.success('修改成功！');
        setTimeout(item => {
          this.goToLogin();
        }, 1000);
      })
    }
  },

  // 跳转登录页
  goToLogin(event) {
    slutil.reLaunch('/pages/login/login');
  }
})