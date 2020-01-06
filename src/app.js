import { App } from './@op-wechat/common/app';
import { slutil, suiLocalConfig } from './common/index';
App({
  onSlLaunch: function () {
    console.log("初始化配置参数suiLocalConfig========================>", suiLocalConfig);
    
    // 云函数需要先初始化
    wx.cloud.init({ traceUser: true })
    
    if (['DEV', 'TEST'].indexOf(suiLocalConfig.ENV_MODE) != -1) {
      //开发、测试模式启动debug模式
      wx.setEnableDebug({
        enableDebug: true
      });
    }
  },
});
