import { slutil, Page, suiLocalConfig } from '../../common/index';
import myService from './memo.service';

Page({
  data: {
    // 下拉组件展示
    isDropDown: false,
    // 备忘列表
    memoList: [],
    // 查询参数
    searchParam: {
      selectTime: '',
    },
    footer: {
      pageSize: 10,       // 每页最大记录数
      pageNum: 1,         // 当前页码
      totalRecord: 0,     // 总记录数
    },
  },

  onSlShow() {
    // this.init();
  },

  // 初始化
  init() {
    this.setData({ ['searchParam.selectTime']: slutil.date.toStr(slutil.date.getToday()) });
    this.doReset();
  },

  // 列表初始化
  doSearch() {
    let { searchParam, memoList, footer } = this.data;
    let param = {
      usercode: suiLocalConfig.loginInfo.code,
      starttime: searchParam.selectTime,
      endtime: searchParam.selectTime,
      ...footer,
    }
    myService.getMemoList(param).then(res => {
      if(res.retCode == 0) {
        let { result } = res.data;
        if (footer.pageNum == 1) {
          memoList = myService.formatMemoList(result);
        } else {
          memoList = memoList.concat(myService.formatMemoList(result));
        }
        this.setData({ memoList });
        let { pageSize, pageNum, totalRecord } = res.data;
        this.data.footer = { pageSize, pageNum, totalRecord };
      }
    });
  },

  // 重置(footer)
  doReset() {
    this.data.footer = {
      pageSize: 10, 
      pageNum: 1,
      totalRecord: 0,
    },
    this.doSearch();
  },

  // 选择分类
  doSelectClassify(event) {
    let { value } = event.detail;
    console.log("选择分类====>", value);
  },

  // 添加分类
  doAddClassify(event) {
    console.log("添加分类===>", event);
  },

  // 切换日期
  dateOnChange(event) {
    this.data.searchParam.selectTime = event.detail.value;
    this.doReset();
  },

  // 跳转详情
  goToDetail(event) {
    let { index = 0, type } = event.currentTarget.dataset;
    let { memoList } = this.data;
    let memo = memoList[index];
    if (type == 'add') {
      memo = {};
    }
    slutil.navigateTo('/pages/memo/memo-detail/memo-detail', memo);
  },

  // 滚动底部
  onSlReachBottom() {
    this.doSearch();
  }
})