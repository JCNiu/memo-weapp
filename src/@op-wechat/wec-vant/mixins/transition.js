export var transition = function transition(showDefaultValue,componetName) {
  return Behavior({
    properties: {
      customStyle: String,
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: 'observeShow'
      },
      duration: {
        type: Number,
        value: 300
      }
    },
    data: {
      type: '',
      inited: false,
      display: false,
      supportAnimation: true
    },
    attached: function attached() {
      if (this.data.show) {
        this.show();
      }

      this.detectSupport();
    },
    methods: {
      detectSupport: function detectSupport() {
        var _this = this;

        wx.getSystemInfo({
          success: function success(info) {
            if (info && info.system && info.system.indexOf('iOS 8') === 0) {
              _this.set({
                supportAnimation: false
              });
            }
          }
        });
      },
      observeShow: function observeShow(value) {
        //需要特殊处理的组件
        if(componetName == 'popup') {
          let currentPages = getCurrentPages();
          let currentPage = getCurrentPages()[currentPages.length -1 ];
          if(currentPage) {
            if(!currentPage.openModalCount) currentPage.openModalCount = 0;
            //主组件增加参数是否已经打开弹出框; 用来限制下拉操作
            if(value) currentPage.openModalCount++;
            else currentPage.openModalCount--;
          }
        }
        
        if (value) {
          this.show();
        } else {
          if (this.data.supportAnimation) {
            this.set({
              type: 'leave'
            });
          } else {
            this.set({
              display: false
            });
          }
        }
      },
      show: function show() {
        this.set({
          inited: true,
          display: true,
          type: 'enter'
        });
      },
      onAnimationEnd: function onAnimationEnd() {
        if (!this.data.show) {
          this.set({
            display: false
          });
        }
      }
    }
  });
};