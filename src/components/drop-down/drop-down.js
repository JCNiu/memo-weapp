import { slutil } from '../../common/index.js';

Component({
  behaviors: [],

  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    list: {
      type: Array,
      value: [],
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
      this.doClose();
    }
  }
})