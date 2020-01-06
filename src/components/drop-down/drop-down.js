Component({
  behaviors: [],

  data: {
    // show: false,
  },

  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    list: {
      type: Array,
      // value: [],
      value: [
        { label: '所有', value: 11 },
        { label: '添加1', value: 11 },
        { label: '添加2', value: 11 },
        { label: '添加3', value: 11 },
        { label: '添加4', value: 11 },
      ]
    },
    selectIndex: {
      type: Number,
      value: 0,
    },
    btnValue: {
      type: String,
      value: '添加',
    }
  },

  observers: {  // 监听
   
  },

  methods: {
    // 打开
    doOpen(){
      this.setData({ show: !this.data.show });
    },

    // 选择
    doSelect(event) {
      let { index } = event.currentTarget.dataset;
      let { list } = this.data;
      this.setData({ selectIndex: index, show: false });
      this.triggerEvent('select', list[index]);
    },
    
    // 关闭
    doClose(event) {
      this.setData({ show: false });
    },

    // btn
    doBtn(event) {
      this.triggerEvent('button', {});
    }
  }
})