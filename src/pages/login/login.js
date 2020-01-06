import { slutil, Page, suiLocalConfig } from '../../@op-wechat/index.js'
import myService from './login.service.js';

Page({
  data: {
    enableToast: true,  // 是否使用轻提示组件
    userInfo: {},       // 登录信息
  },

  onSlShow: function (options) {
    let userInfo = slutil.getStorageSync('userInfo') || {};
    this.setData({ userInfo });
  },

  // 输入框失去焦点
  inputBlur(event) {
    let { type } = event.currentTarget.dataset;
    let { value } = event.detail;
    if (!value) return;
    let { userInfo } = this.data
    userInfo[type] = value;
    this.setData({ userInfo });
  },

  // 登录
  onLogin(event) {
    let { userInfo } = this.data;
    let params = slutil.obj.clone(userInfo);
    if (myService.validate(userInfo)) {
      myService.getLoginCode(userInfo).then(res => {
        let { code } = res.result;
        delete userInfo.password;
        slutil.setStorageSync('userInfo', userInfo);
        slutil.setStorageSync('loginInfo', { isLogin: true, code });
        suiLocalConfig.loginInfo = { isLogin: true, code };
        slutil.switchTab('/pages/home/home');
      });
    }
  },

  // 跳转注册页
  goToRegister(event) {
    slutil.navigateTo('/loginPage/pages/register/register');
  },

  // 忘记密码
  forgetPassword(event) {
    slutil.navigateTo('/loginPage/pages/password-forget/password-forget');
  },
})