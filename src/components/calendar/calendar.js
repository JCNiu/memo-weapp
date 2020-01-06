let myService = require('./calendar.service.js');

Component({
  behaviors: [],

  data: {
    dateArr: [],
    _selectDate: '',    // 选中的日期(内部)
    isContent: false,   // 是否显示日历栏
  },

  properties: {
    selectDate: { // 选中的日期
      type: String,
      value: '',
    },
    havacontDate: { // 存在内容的日期数组(格式必须为: 2019-11-06)
      type: String,
      value: []
    },
  },

  observers: {
    selectDate(newValue, oldValue, changedPath) {
      this.setData({ _selectDate: newValue.replace(/-/g, '/') });
      // this.triggerEvent('onChange', { value: newValue.replace(/\//g, '-') });
    }
  },

  lifetimes: {
    ready: function () {
      let { selectDate } = this.data;
      if (!selectDate) {
        this.setData({ selectDate: myService.toStr(myService.getToday()).replace(/-/g, '/') });
      }
      this.dateInit();
    }
  },

  methods: {
    // 日历初始化
    dateInit: function () {
      let { _selectDate: date } = this.data;
      let dateArr = [];						// 需要遍历的日历数组数据
      let { havacontDate } = this.data; // 存在内容的日期数组
      let arrLen = 0;							// dateArr的数组长度
      let now = date ? new Date(date) : new Date();
      let year = now.getFullYear();
      let month = now.getMonth();					// 没有+1方便后面计算当月总天数
      let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
      let startWeek = new Date('' + year + ',' + (month + 1) + ',1').getDay();							// 目标月1号对应的星期
      let dayNums = new Date(year, nextMonth, 0).getDate();				// 获取目标月有多少天
      if (month + 1 > 11) {
        let nextYear = year + 1;
        dayNums = new Date(nextYear, nextMonth, 0).getDate();
      }
      arrLen = startWeek + dayNums;
      for (let i = 0; i < arrLen; i++) {
        if (i >= startWeek) {
          let num = i - startWeek + 1;
          let date = myService.getDateValue(year, month, num);
          let havecont = havacontDate.includes(date.replace(/\//g, '-'));
          dateArr[i] = { num, date, havecont };
        } else {
          dateArr[i] = { num: '' };
        }
      }
      this.setData({
        dateArr: dateArr
      })
    },
    // 上一年
    prevYear(event) {
      let { _selectDate } = this.data;
      let { year, month, day } = myService.getYMD(_selectDate);
      year--;
      if (year < 2000) return;
      _selectDate = myService.getDateValue(year, month, day);
      this.onChange(_selectDate);
      this.dateInit();
    },

    // 下一年
    nextYear(event) {
      let { _selectDate } = this.data;
      let { year, month, day } = myService.getYMD(_selectDate);
      year++
      _selectDate = myService.getDateValue(year, month, day);
      this.onChange(_selectDate);
      this.dateInit();
    },
    
    // 上一个月
    prevMoth(event) {
      let { _selectDate } = this.data;
      let { year, month, day } = myService.getYMD(_selectDate);
      if (month == 0) {
        year--;
        month = 11;
        if (year < 2000) return;
      } else {
        month--;
      }
      _selectDate = myService.getDateValue(year, month, day);
      this.onChange(_selectDate);
      this.dateInit();
    },

    // 下一个月
    nextMoth(event) {
      let { _selectDate } = this.data;
      let { year, month, day } = myService.getYMD(_selectDate);
      if (month == 11) {
        year++
        month = 0;
      } else {
        month++;
      }
      _selectDate = myService.getDateValue(year, month, day);
      this.onChange(_selectDate);
      this.dateInit();
    },

    // 打开日期栏
    openDate(event) {
      this.setData({ isContent: true });
    },

    // 点击日期
    selectDate(event) {
      let { date } = event.currentTarget.dataset;
      if(!date) return;
      this.onChange(date);
    },

    // 选中时间切换
    onChange(date) {
      this.setData({ _selectDate: date });
      this.triggerEvent('onChange', { value: this.data._selectDate.replace(/\//g, '-') });
    }
  }
})


