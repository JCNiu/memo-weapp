import { slutil } from '../../../common/index';

class myService {
  /**
   * 添加
   */
  addMemo(param) {
    let option = {
      cloudname: 'memo-add',
      params: param,
      isOnlySuccessData: true,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }

  /**
   * 删除
   */
  delMemo(param) {
    let option = {
      cloudname: 'memo-delete',
      params: param,
      isOnlySuccessData: true,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }

  /**
   * 修改
   */
  editMemo(param) {
    let option = {
      cloudname: 'memo-edit',
      params: param,
      isOnlySuccessData: true,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }
}

module.exports = new myService();