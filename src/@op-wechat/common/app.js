
import upgradecheck from './upgradecheck';

/**
 * 自定义注册小程序
 */
function myApp(options = {}) {
  return App({
    /**
     * 生命周期回调——监听小程序初始化
     */
    onLaunch(param) {
      if (this.onSlLaunch) this.onSlLaunch(param);
    },

    onShow() {
      upgradecheck.checkVersion();
      if (this.onSlShow) this.onSlShow();
    },

    onHide() {
      if (this.onSlHide) this.onSlHide();
    },
    ...options
  });
}

export { myApp as App };
