let urlTool = require('./url-tool');

/**
 * 微信工具类
 */
let publicApi = {
  /**
   * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
   * @param {*} url 
   * @param {*} param 
   * @return Promise
   */
  navigateTo: function(url, param) {
    url = urlTool.urlMergeParam(url, param);
    return new Promise(resolve => {
      let success = () => {
        resolve({
          retCode: 0
        });
      }
      let fail = () => {
        resolve({
          retCode: -1
        });
      }
      wx.navigateTo({
        url,
        success,
        fail
      })
    });
  },

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层
   * @param {string|number} delta 
   * @return Promise
   */
  navigateBack: function(delta) {
    delta = delta || 1
    return new Promise(resolve => {
      let success = () => {
        resolve({
          retCode: 0
        });
      }
      let fail = () => {
        resolve({
          retCode: -1
        });
      }
      wx.navigateBack({
        delta: delta,
        success,
        fail
      })
    });
  },

  /**
   * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
   * @param {*} url 
   * @param {*} param 
   * @return Promise
   */
  redirectTo: function(url, param) {
    url = urlTool.urlMergeParam(url, param);
    return new Promise(resolve => {
      let success = () => {
        resolve({
          retCode: 0
        });
      }
      let fail = () => {
        resolve({
          retCode: -1
        });
      }
      wx.redirectTo({
        url,
        success,
        fail
      })
    });
  },

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param {*} url 
   * @return Promise
   */
  switchTab: function(url) {
    return new Promise(resolve => {
      let success = () => {
        resolve({
          retCode: 0
        });
      }
      let fail = () => {
        resolve({
          retCode: -1
        });
      }
      wx.switchTab({
        url,
        success,
        fail
      })
    });
  },

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {*} url 
   * @param {*} param 
   * @return Promise
   */
  reLaunch: function(url, param) {
    url = urlTool.urlMergeParam(url, param);
    return new Promise(resolve => {
      let success = () => {
        resolve({
          retCode: 0
        });
      }
      let fail = () => {
        resolve({
          retCode: -1
        });
      }
      wx.reLaunch({
        url,
        success,
        fail
      })
    });
  },

  /**
   * 获取系统信息
   * @return SystemInfo
   */
  getSystemInfoSync: function() {
    try {
      var systemInfo = wx.getSystemInfoSync();
      //获取操作系统版本号
      systemInfo.systemVersion = systemInfo.system.split(" ")[1];
      return systemInfo;
    } catch (e) {
      return {};
    }
  },

  /**
   * 获取微信用户信息。
   * @return Promise
   */
  getWXUserInfo: function() {
    return new Promise(resolve => {
      let success = (resp) => {
        let retCode = 0;
        resolve({
          retCode,
          data: resp
        });
      }
      let fail = () => {
        resolve({
          retCode: -1,
          data: "获取微信信息失败"
        });
      }
      wx.getUserInfo({
        success,
        fail
      })
    });
  },

  /**
   * 获取缓存
   * @param {*} key 
   * @param {*} type 返回类型 ,boolean,number,其它默认
   * @return object
   */
  getStorageSync: function(key, type) {
    let value = wx.getStorageSync(key);
    if (type == 'boolean') {
      return obj.toBoolean(value);

    } else if (type == 'numnber') {
      return obj.toNum(value);
    }
    return value;
  },

  /**
   * 获取当前页面
   */
  getCurrentPageUrl: function() {
    let pages = getCurrentPages() //获取加载的页面
    let currentPage = pages[pages.length - 1] //获取当前页面的对象
    let url = currentPage.route //当前页面url
    return url;
  },

  /**
   * 设置缓存
   * @param {*} key 
   * @param {*} value 
   * @return key
   */
  setStorageSync: function(key, value) {
    wx.setStorageSync(key, value);
  },

  /**
   * 移除缓存
   * @param {*} key 
   * @return object
   */
  removeStorageSync: function(key) {
    wx.removeStorageSync(key);
  },

  /** 
   * 清理缓存
   * @param {*} key 
   * @return object
   */
  clearStorageSync: function() {
    wx.clearStorageSync();
  },

  /**
   * 将页面滚动到目标位置
   * @return object
   */
  setNavigationBarTitle: function(title) {
    return new Promise(resolve => {
      let success = (resp) => {
        let retCode = 0;
        resolve({
          retCode
        });
      }
      let fail = () => {
        resolve({
          retCode: -1
        });
      }
      wx.setNavigationBarTitle({
        title,
        success,
        fail
      })
    });
  },
}

module.exports = publicApi;