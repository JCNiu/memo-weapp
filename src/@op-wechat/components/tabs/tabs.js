
/**
 * tab组件
 */
Component({
  behaviors: [],
  data: {

  },

  properties: {
    tabsList: { // 标签列表
      type: Array,
      value: [{
        label: '标签1标签1标签1',
        value: '1',
      }, {
        label: '标签2',
        value: '2',
      }, {
        label: '标签3',
        value: '3',
      }, {
        label: '标签4',
        value: '4',
      }, {
        label: '标签5',
        value: '5',
      }, {
        label: '标签6',
        value: '6',
      }]
    },
    activeIndex: {  // 当前选中标签序号
      type: Number,
      value: 0,
    },
    tabAnimate: { // tab点击动画 follow(追随) open(中间展开)
      type: Number,
      value: 'open'
    },
  },

  observers: {
    
  },

  lifetimes: {
    
  },

  pageLifetimes: {

  },

  methods: {
    // 选中tab
    selectTab(event){
      let { index } = event.currentTarget.dataset;
      let { tabsList } = this.data;
      this.setData({ activeIndex: index });
      this.triggerEvent("selectTab", {...tabsList[index]});
    }
  }
})