Component({
  behaviors: [],

  data: {},

  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    keyWord: {
      type: String,
      value: '',
    },
  },

  methods: {
    // 打开
    doOpen(){
      this.setData({ show: !this.data.show });
    },

    // 关闭
    doClose(event) {
      this.setData({ show: false });
    },

    // 取消
    doCancel(event) {
      this.setData({ keyWord: '' });
    },

    // keyword值改变
    onChange(event) {
      let { value } = event.detail
      this.data.keyWord = value;
    },

    // 搜索
    doSearch(event) {
      let { keyWord: value } = this.data;
      this.triggerEvent('search', { value });
      this.doClose();
    },
  }
})