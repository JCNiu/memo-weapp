Component({
  behaviors: [],

  data: {

  },

  properties: {
    label: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      optionalTypes: [Number],
      value: '',
    },
    type: {
      type: String,
      value: 'text',
    },
    must: { // 必填
      type: Boolean,
      value: false,
    },
    rem: {  // 右侧按钮lable
      type: String,
      value: '',
    },
  },

  observers: {  // 监听
    // label(newValue, oldValue, changedPath) {
    // }
  },

  lifetimes: {  // 生命周期
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {  // 组件所在页面的生命周期函数 
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    inputBlur(event) {  // 输入中
      let { value } = event.detail;
      this.triggerEvent('inputBlur', { value });
    },

    clickRem(event) { // 点击右侧按钮
      let { rem } = this.data;
      this.triggerEvent('clickRem', { rem });
    },
  }
})