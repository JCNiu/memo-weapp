import { slutil, Page, suiLocalConfig, Dialog } from '../../common/index';
import myService from './memo.service';

Page({
  data: {
    // 是否使用轻提示组件
    enableToast: true,
    // 是否使用提示框组件
    enableDialog: true,
    // 下拉组件展示
    isDropDown: false,
    // 添加分类输入
    isAddClassify: false,
    // 分类列表
    classifyList: [],
    // 更多列表
    moreList: [],
    // 备忘列表
    memoList: [],
    // 查询参数
    searchParam: {
      // selectTime: '',
      keyword: '',        // 关键字
      classify: '所有',   // 分类

    },
    footer: {
      pageSize: 10,       // 每页最大记录数
      pageNum: 1,         // 当前页码
      totalRecord: 0,     // 总记录数
    },
  },

  onSlShow() {
    this.init();
  },

  // 初始化
  init() {
    // this.setData({ ['searchParam.selectTime']: slutil.date.toStr(slutil.date.getToday()) });
    this.setData({ moreList: myService.dictionary.moreList });
    this.classifyInit();
    this.doReset();
  },

  // 分类初始化 
  classifyInit() {
    myService.getClassifyList({}).then(res => {
      let { result } = res.data;
      let classifyList = [];
      result.map((item, index) => {
        classifyList.push({
          label: item.value,
          value: index,
          num: item.num,
        })
      });
      this.setData({ classifyList });
    });
  },

  // 列表初始化
  doSearch() {
    let { searchParam, memoList, footer } = this.data;
    let param = {
      // starttime: searchParam.selectTime,
      // endtime: searchParam.selectTime,
      keyword: searchParam.keyword,
      classify: searchParam.classify,
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
        let { pageSize, pageNum, totalRecord } = res.data;
        this.data.footer = { pageSize, pageNum, totalRecord };
        this.setData({ memoList });
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

  // 添加分类输入
  openAddClassify(event) {
    this.setData({ isAddClassify: true });
  },

  // 选择分类
  doSelectClassify(event) {
    let { label } = event.detail;
    this.setData({ [`searchParam.classify`]: label });
    this.doReset();
  },

  // 更多选择
  doSelectMore(event) {
    let { value } = event.detail;
    switch(value) {
      case 'edit': 
        this.setData({ isEditClassify: true }); 
        break;
      case 'del': 
        this.doDelClassify(); 
        break;
    }
  },

  // 添加分类
  doAddClassify(event) {
    let { value } = event.detail;
    let param = { operate: 'add', value };
    myService.operateClassify(param).then(res => {
      setTimeout(() => { this.classifyInit();}, 50);
    })
  },

  // 修改分类
  doEditClassify(event) {
    let { value } = event.detail;
    let { classify } = this.data.searchParam;
    let param = { operate: 'edit', value};
    myService.operateClassify(param).then(res => {
      setTimeout(() => { this.classifyInit(); }, 50);
    })
  },

  // 删除分类
  doDelClassify(event) {
    Dialog.confirm({
      message: '删除当前分类？'
    }).then(res => {
      debugger

      const { type } = resp.originEvent.detail;
      if (type === 'confirm') {
        let { classify } = this.data.searchParam;
        let param = { operate: 'del', value };
        myService.operateClassify(param).then(res => {
          setTimeout(() => { this.classifyInit(); }, 50);
        })
      }
    }).catch(res => {
      debugger
    })
    
  },

  // 组件搜索
  doComSearch(event) {
    let { value } = event.detail;
    this.data.searchParam.keyword = value;
    this.doReset();
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