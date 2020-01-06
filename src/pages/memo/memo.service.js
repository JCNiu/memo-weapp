import { slutil } from '../../common/index';

class myService {
  /**
   * 查询备忘列表
   */
  getMemoList(param) {
    let option = {
      cloudname: 'memo-search',
      params: param,
      isOnlySuccessData: false,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }

  /**
   * 格式化备忘列表
   */
  formatMemoList(list) {
    let memoList = slutil.obj.clone(list);
    memoList.map(item => {
      item.mtimeValue = slutil.date.toStr(new Date(item.mtime), "yyyy-MM-dd hh:mm:ss");
    })
    return memoList
  }
}

module.exports = new myService();