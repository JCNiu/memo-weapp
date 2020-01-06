
import customPage from './page.custom'

/**
 * 自定义页面
 */
function myPage(options = {}) {
  let _options = {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(param) {
      customPage.onLoad();
      if (this.onSlLoad) this.onSlLoad(param);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      customPage.onShow();
      if (this.onSlShow) this.onSlShow();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      customPage.onReady();
      if (this.onSlReady) this.onSlReady();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
      customPage.onHide();
      if (this.onSlHide) this.onSlHide();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      customPage.onPullDownRefresh();
      if (this.onSlPullDownRefresh) this.onSlPullDownRefresh();
    },
    
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      customPage.onUnload();
      if (this.onSlUnload) this.onSlUnload();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      customPage.onReachBottom();
      console.log("onSlReachBottom====>", this.onSlReachBottom);
      if (this.onSlReachBottom) this.onSlReachBottom();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      customPage.onShareAppMessage();
      console.log("onSlShareAppMessage====>", this.onSlShareAppMessage);
      if (this.onSlShareAppMessage) this.onSlShareAppMessage();
    }
  };
  return Page({ ..._options, ...options });
}

export { myPage as Page };
