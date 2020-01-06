/**
 * 环境配置
 */
module.exports = {
  /**
   * 配置中心服务器
   */
  configCenterServer: 'http://192.168.20.176/op-public-resource/',
  // configCenterServer: 'http://192.168.20.172:8063/op-public-resource/',//测试环境
  // configCenterServer: 'https://fc1.myimpos.com/op-public-resource/',//正式环境
  /**
   * 环境参数
   * - DEV: 开发模式
   * - TEST: 测试环境
   * - PROD: 正式环境
   * 
   */
  ENV_MODE: "DEV",
  // ENV_MODE: "TEST",
  // ENV_MODE: "PROD",
}