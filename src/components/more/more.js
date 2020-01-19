Component({
  behaviors: [],

  data: {},

  properties: {
    hidden: { // 组件是否隐藏
      type: Boolean,
      value: false,
    },
    show: { // 弹出层是否显示
      type: Boolean,
      value: false,
    },
    list: {
      type: Array,
      value: [],
    },
    width: {
      type: String,
      value: '200rpx',
    }
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

    doSelect(event) {
      let { index } = event.currentTarget.dataset;
      let { list } = this.data;
      this.triggerEvent('select', list[index]);
      this.doClose();
    }
  }
})