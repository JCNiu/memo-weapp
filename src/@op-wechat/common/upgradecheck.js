import { slutil } from '../index.js';

/**
 * 升级检查
 */
function checkVersion() {
     const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
      })
     
      updateManager.onUpdateReady(function () {
          slutil.vantToast('检查到有新版本,正在自动升级中,请稍等',{duration: 10000});
          updateManager.applyUpdate()
      })
     
      updateManager.onUpdateFailed(function () {
          slutil.vantToast('检查到有新版本，但下载失败，请检查网络后重试',{duration: 10000});
      })
}

module.exports = {
     checkVersion: checkVersion
};
