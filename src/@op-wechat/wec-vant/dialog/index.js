import { VantComponent } from '../common/component';
import { openType } from '../mixins/open-type';
VantComponent({
  mixins: [openType],
  props: {
    show: Boolean,
    title: String,
    message: String,
    useSlot: Boolean,
    asyncClose: Boolean,
    messageAlign: String,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    zIndex: {
      type: Number,
      value: 100
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    overlay: {
      type: Boolean,
      value: true
    },
    transition: {
      type: String,
      value: 'scale'
    },
    // 增加宽度属性 --- zc 19.4.17
    width: {
      type: String,
      value: '85%'
    }
  },
  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },
  watch: {
    show: function show(_show) {
      !_show && this.stopLoading();
    }
  },
  methods: {
    onConfirm: function(e) {
      //liurong modify 授权确定,触发专用事件
      if(["getUserInfo"].indexOf(this.data.confirmButtonOpenType) ==-1) {
        this.originEvent= e;
        this.handleAction('confirm');
      }      
      
    },
    bindGetUserInfo: function(e) {
       this.originEvent= e;
       this.handleAction('confirm');
    },
    onCancel: function(e) {
      this.originEvent= e;
      this.handleAction('cancel');
    },
    onClickOverlay: function(e) {
      this.originEvent= e;
      this.onClose('overlay');
    },
    handleAction: function(action) {
      if(this.originEvent) {
        this.originEvent.detail = this.originEvent.detail || {};
        this.originEvent.detail.type = action;
      }
      if (this.data.asyncClose) {
        this.set({
          ["loading." + action]: true
        });
      }
      this.onClose(action);
    },
    close: function() {
      this.set({
        show: false
      });
    },
    stopLoading: function stopLoading() {
      this.set({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },
    onClose: function onClose(action) {
      if (!this.data.asyncClose) {
        this.close();
      }

      this.$emit('close', action); //把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

      this.$emit(action, {
        dialog: this
      });
      var callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];
      if (callback) {
        callback(this);
      }
    }
  }
});