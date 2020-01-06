import { slutil, Page, suiLocalConfig } from '../../../common/index';
import myService from './memo-detail.service';

Page({
  data: {
    // 是否新增
    isAdd: false,
    // 标题
    title: '',
    // 内容
    content: '',
    // 上次编辑时间(时间戳)
    mtime: 0,
    // 上次编辑时间(格式化字符串)
    mtimeValue: '',
    // 备忘code
    memocode: '',
  },

  onSlLoad(pageParam) {
    this.init(pageParam);
  },

  // 初始化
  init(pageParam) {
    let isAdd = slutil.obj.isEmptyObject(pageParam);
    if (isAdd) wx.setNavigationBarTitle({ title: '新增' });
    let { title, content, mtime, mtimeValue, memocode } = pageParam;
    mtime = parseInt(mtime);
    if (!mtimeValue) mtimeValue = slutil.date.toStr(new Date(mtime), "yyyy-MM-dd hh:mm:ss");
    this.setData({ isAdd, title, content, mtime, mtimeValue, memocode });
  },

  // 标题发生改变
  titleOnChange(event) {
    let { value: title } = event.detail;
    this.data.title = title;
  },

  // 内容发生改变
  contentOnChange(event) {
    let { value: content } = event.detail;
    this.data.content = content;
  },

  // 删除
  doDel() {
    let param = { memocode: this.data.memocode };
    myService.delMemo(param).then(res => {
      slutil.navigateBack();
    });
  },

  // 保存
  doSave() {
    let { isAdd, title, content, memocode } = this.data;
    let param = { 
      usercode: suiLocalConfig.loginInfo.code,
      title,
      content
     };
    if (isAdd) {
      myService.addMemo(param).then(res => {
        slutil.navigateBack();
      });
    } else {
      param.memocode = memocode;
      myService.editMemo(param).then(res => {
        slutil.navigateBack();
      });
    }
  }
})