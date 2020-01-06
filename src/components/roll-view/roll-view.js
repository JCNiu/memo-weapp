Component({
  behaviors: [],

  data: {
    animationData: {},            // 动画实例
    rollAnimationTemp: {          // 动画缓存参数
      num: 1,
      y: -14,
    }
  },

  properties: {
    infoList: {
      type: Array,
      value: [{ value: "XXXXX1", url: "" }, { value: "XXXXX2", url: "" }, { value: "XXXXX3", url: "" }]
    },
    duration: {
      type: Number,
      value: 4000
    },
    timingFunction: {
      type: String,
      value: 'ease',
    },
    translateY: {
      type: Number,
      value: -14,
    }
  },

  observers: {  // 监听
    translateY(newValue, oldValue, changedPath) {
      this.data.rollAnimationTemp.y = newValue;
    }
  },

  lifetimes: {
    ready: function () {
      let { infoList } = this.data;
      if (infoList.length > 0) {
        infoList.push(infoList[0]);
        this.setData({ infoList });
        this.onAnimationData();
      }
    },
  },

  methods: {
    // 滚动动画
    onAnimationData() {this.data
      let { infoList, rollAnimationTemp, duration, timingFunction, translateY } = this.data;
      let { num, y } = rollAnimationTemp;
      if (num == infoList.length) { // 回到原点
        num = 0;
        duration = 0;
        y = 0;
      }
      let animation = wx.createAnimation({
        duration,
        timingFunction,
      })
      animation.translateY(y).step();
      this.setData({
        animationData: animation.export()
      })
      num++;
      y = translateY * num;
      this.data.rollAnimationTemp = { num, y };
      setTimeout(function () {
        this.onAnimationData();
      }.bind(this), this.data.duration);
    },



    onclick(event) {
      let { index } = event.currentTarget.dataset;
      let { infoList } = this.data;
      this.triggerEvent('onclick', infoList[index]);
    }
  }
})