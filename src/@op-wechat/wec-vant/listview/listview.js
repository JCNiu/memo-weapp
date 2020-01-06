import { basic } from '../mixins/basic';
let { slutil } = getApp();

Component({
  data: {
    noRecordMsg: "记录为空",
    noMoreDataMsg: "已无更多记录",
    //查询类型 nextpage-下页
    searchType: null,
    loading: false,
    footer: {
      totalCount: 0
    },
    rows: []

  },
  behaviors: [basic],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
  },
  lifetimes: {
    created() {
      //当前查询参数
      this.currentSearchParam = {};
      //搜索参数
      // this.searchParam = {}
      //页码信息
      this.page = {
        pageNum: 1,
        pageSize: 10,
      }
    },
    attached() {
     
    },

    ready() {
    },
    moved() {
    },
    detached() {
    },
    error(err) {
      console.error("listview error", err.stack);
    },
  },
  pageLifetimes: {
    show() {
    },
    hide() {
    },
    resize(size) {
    }
  },


  methods: {
    initListView(option) {
      this.listOption = option;
      //每页记录修改修改
      if (this.listOption.pageSize) this.page.pageSize = this.listOption.pageSize;
    },
    /**
     * 1. 刷新当前页数据
     * 1. 加载数据: 不允许重置查询参数
     * 1. 查询参数修改
     * 
     */
    load(searchType) {
      if (this.data.loading) {
        console.warn("正加载数据中,请不要重复请求");
        return;
      }
      //无记录; 重新查询,不能翻页
      if(this.data.rows.length == 0) {
        searchType = "" ;
      } 
      searchType = searchType || "";
      if (searchType == "nextpage") {
        if (this.data.footer.totalCount <= this.data.rows.length) {
          slutil.info(this.data.noMoreDataMsg);
          return;
        }
        //下一页
        this.currentSearchParam.pageNum = this.page.pageNum + 1;
        this.currentSearchParam.totalCount = this.data.footer.totalCount;
        this.currentSearchParam.globalLoad = false;
      } else {
        //重新查询
        this.currentSearchParam = Object.assign({
          pageNum: 1,
          totalCount: 0,
          globalLoad: true,
          pageSize: this.page.pageSize,
        }, this.searchParam);
      }
      this.setData({ searchType });
      this.loadData();
    },

    loadData() {
      if (!slutil.obj.isFun(this.listOption.loadDataInterface)) {
        console.error(".....this.listOption.loadDataInterface must a function", this.listOption);
        return;
      }
      let loading;
      try {
        loading = true;
        //克隆查询对象; 预防被污染
        this.listOption.loadDataInterface(slutil.obj.clone(this.currentSearchParam)).then((data) => this.handleServerData(data));
      } catch (e) {
        loading = false;
        console.error(".....listview load error;e", e.stack);
      }
      this.setData({ loading });
    },

    handleServerData(gridData) {
      //修改当前页
      this.page.pageNum = this.currentSearchParam.pageNum;
      this.setData({ loading: false });
      if (slutil.obj.isFun(this.listOption.onAfterLoadData)) this.listOption.onAfterLoadData(gridData);

      if (!gridData || !gridData.footer || !slutil.obj.isArray(gridData.rows) || slutil.obj.notExits(gridData.footer.totalCount)) {
        console.info("listview: the received data invalid, miss some propertys; current receive data is:",
          gridData, slutil.obj.isArray(gridData.rows));
        return;
      }
      let footer;
      if (this.page.pageNum == 1) {
        footer = gridData.footer;
        this.data.footer = gridData.footer;
      }
      this.setListViewData(gridData.rows, footer);
    },

    setListViewData(rows, footer) {
      let data = {};
      //查询下页数据,添加
      if (this.data.searchType == "nextpage") {
        data.rows = this.data.rows.concat(rows);
      } else {
        data.rows = rows;
      }
      data.rows.forEach((item, index) => item.listview_id = index);
      if (footer) data.footer = footer;
      this.setData(data);
      // this.$emit('datachange', data);
      if (slutil.obj.isFun(this.listOption.datachange)) {
        this.listOption.datachange(data);
      } else {
        console.error(".....listview err; datachange undefined", );
      }
    },
  },
  externalClasses: []
});
