import { Page, slutil, suiLocalConfig } from '../../@op-wechat/index'
import myService from './welcome.service';

Page({
  date: {
    // 基础库版本号过低弹框
    sdkVersionTipShow: false,
  },
  onSlLoad() {
    console.log("全局参数=====>suiLocalConfig", suiLocalConfig);
    // 微信s版本验证
    this.doVersionValid();
    if (this.data.sdkVersionTipShow) return;
    // 获取缓存中的登录信息
    let loginInfo = slutil.getStorageSync('loginInfo');
    if (loginInfo.isLogin && loginInfo.code) {  //自动登录
      suiLocalConfig.loginInfo = loginInfo;
      slutil.reLaunch('/pages/home/home');
    } else {
      slutil.reLaunch('/pages/login/login');
    }
  },

  /* 验证基础库版本号 */
  doVersionValid() {
    let systemInfo = slutil.getSystemInfoSync();
    let versionValid = myService.compareVersion(systemInfo.SDKVersion, '2.2.4');
    if (versionValid == -1) 
      this.setData({ sdkVersionTipShow: true });
  }
})