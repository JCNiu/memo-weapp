import { slutil, Page, Toast } from '../../../common/index';
import myService from './register.service';

Page({
  data: {
    enableToast: true,  // 是否使用轻提示组件
    userInfo: {},       // 登录信息
  },

  // 输入框失去焦点
  inputBlur(event) {
    let { type } = event.currentTarget.dataset;
    let { value } = event.detail;
    let { userInfo } = this.data
    userInfo[type] = value;
    this.setData({ userInfo });
  },

  // 注册
  onRegister(event) {
    let { userInfo } = this.data;
    if (myService.validate(userInfo)) {
      let param = {
        ...userInfo,
      }
      myService.register(param).then(res => {
        Toast.success('注册成功！');
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