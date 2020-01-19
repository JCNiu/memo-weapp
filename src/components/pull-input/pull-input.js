import { slutil } from '../../common/index.js';

Component({
  behaviors: [],

  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '',
    },
    value: {
      type: String,
      value: '',
    }
  },

  methods: {
    onChange(event) {
      let { value } = event.detail;
      this.data.value = value;
    },

    doClose() {
      this.setData({ show: false, value: '' });
    },

    doCancel(event) {
      this.triggerEvent('cancel', {});
      this.doClose();
    },

    doConfirm(event) {
      let { value } = this.data;
      this.triggerEvent('confirm', { value });
      this.doClose();      
    }
  }
})