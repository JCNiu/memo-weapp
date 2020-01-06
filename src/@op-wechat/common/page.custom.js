import slutil from '../slutil/index';

/**
 * 自定义页面(方法实现)
 */
class customPage {
  onLoad() {
    
  }

  onShow() {
    // 隐藏返回首页按钮
    wx.hideHomeButton();
  }

  onReady() {

  }

  onHide() {

  }

  onPullDownRefresh() {

  }

  onUnload() {

  }
  
  onReachBottom() {

  }
  
  onShareAppMessage() {

  }
}

module.exports = new customPage();