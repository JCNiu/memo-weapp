import { slutil, suiLocalConfig } from '../../common/index';

class myService {
  /**
   * 查询备忘列表
   */
  getMemoList(param) {
    param.usercode = suiLocalConfig.loginInfo.code;
    let option = {
      cloudname: 'memo-search',
      params: param,
      isOnlySuccessData: false,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }

  /**
   * 查询分类列表
   */
  getClassifyList(param) {
    param.usercode = suiLocalConfig.loginInfo.code;
    let option = {
      cloudname: 'memo-classify-search',
      params: param,
      isOnlySuccessData: false,
      isSupportTourist: true,
    }
    return slutil.callFunction(option).then();
  }

  /**
   * 操作分类
   */
  operateClassify(param) {
    param.usercode = suiLocalConfig.loginInfo.code;
    let option = {
      cloudname: 'memo-classify-ade',
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

  /**
   * 字典
   */
  dictionary = {
    moreList: [
      { label: '编辑分类', value: 'edit' }, 
      { label: '删除分类', value: 'del' },
    ]
  }
}

module.exports = new myService();