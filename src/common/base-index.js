
/**
 * 基础引入
 * 1.小程序配置信息
 */
import commonApis from '../@op-wechat/index';
import envi from './environment';

let suiLocalConfig = commonApis.suiLocalConfig;
//应用版本号,用于取资源刷新缓存(图片等)
suiLocalConfig.appVersion = "1.0.0.0";
suiLocalConfig.homePage = "/pages/home/home"
// 应用名
suiLocalConfig.appName = "newWeApp";
// 忽略登录,改参数仅仅在开发模式下使用有效
// suiLocalConfig.ingoreLogin = true;
// 增加环境参数
for (let field in envi) {
  suiLocalConfig[field] = envi[field];
}
/**
 * 服务端路径
 */
module.exports = {
  ...commonApis,
};

