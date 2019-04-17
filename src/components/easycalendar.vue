<template>
  <div class="ui-datapicker-wrapper" v-show="show">
    <div class="ui-datepicker-header">
      <a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-prev-btn" @click="onClickLeftBtn($event)">&lt;</a>
      <a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-next-btn" @click="onClickRightBtn($event)">&gt;</a>
      <span class="ui-datepicker-curr-month" ref="date"></span>
    </div>
    <div class="ui-datepicker-body">
      <table>
        <thead>
        <tr>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
          <th>日</th>
        </tr>
        </thead>
        <tbody ref="body" @click="onClickBody($event)"></tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Easycalendar',
  model: {
    prop: 'isShow',
    event: 'changeVisible'
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    cls: {
      type: String,
      default: 'cur'
    }
  },
  data () {
    return {
      year: null,
      month: null,
      day: null,
      show: this.isShow,
      result: {}
    };
  },
  watch: {
    isShow (value) {
      this.show = value;
    }
  },
  methods: {
    /**
     * 创建日期插件
     * @param {Number} year 年
     * @param {Number} month 月
     * @param {Number} day 日
     */
    createCalendar (year, month, day) {
      const today = this._getNowDay();

      if (!year) {
        year = today.getFullYear();
      }

      if (!day) {
        day = today.getDate();
      }

      if (month === undefined) {
        month = today.getMonth();
      } else {
        month -= 1;

        if (month < 0) {
          month = 11;
        } else if (month > 11) {
          month = 0;
        }
      }

      const todayDate = new Date(year, month, 1);
      const todayYear = todayDate.getFullYear();
      const todayMonth = todayDate.getMonth() + 1;
      let todayDateOfWeek = todayDate.getDay();

      const preDate = new Date(year, month, 0);
      const preYear = preDate.getFullYear();
      const preMonth = preDate.getMonth() + 1;
      const preDateOfMonth = preDate.getDate();

      const lastDate = new Date(year, month + 1, 0);
      const lastDateOfMonth = lastDate.getDate();

      const nextDate = new Date(year, month + 1, 1);
      const nextYear = nextDate.getFullYear();
      const nextMonth = nextDate.getMonth() + 1;

      if (day > lastDateOfMonth) {
        throw new Error(`当前传入天数，超出本月应有天数，本月只有：${lastDateOfMonth}天`);
      }

      // 0 - 6 0代表星期天，修改一下
      if (todayDateOfWeek === 0) {
        todayDateOfWeek = 7;
      }

      const preDayOfCount = todayDateOfWeek - 1;
      const result = [];
      let _year = 0;
      let _month = 0;
      let _day = 0;
      let cls = '';
      let dayCls = '';
      let index = 0;

      for (let i = 0, len = 42; i < len; i++) {
        index = i - preDayOfCount;

        if (index < 0) {
          _year = preYear;
          _month = preMonth;
          _day = preDateOfMonth + index + 1;
          cls = 'exceed';
        }

        if (index >= 0 && index < lastDateOfMonth) {
          _year = todayYear;
          _month = todayMonth;
          _day = index + 1;
          cls = '';
        }

        if (index >= lastDateOfMonth) {
          _year = nextYear;
          _month = nextMonth;
          _day = index - lastDateOfMonth + 1;
          cls = 'exceed';
        }

        if (_month === todayMonth && _year === todayYear && _day === day) {
          dayCls = this.cls;
        } else {
          dayCls = '';
        }

        result.push({
          year: _year,
          month: _month,
          day: _day,
          cls,
          dayCls
        });
      }

      this.$refs.date.innerHTML = `${todayYear}-${this.appendZero(todayMonth)}`;
      this.year = todayYear;
      this.month = todayMonth;
      this.day = day;
      this.result = {
        year: todayYear.toString(),
        month: todayMonth.toString(),
        day: day.toString()
      };
      this.$emit('change', this.result);
      this._renderCalendar(result);
    },

    /**
     * 渲染日期
     * @param {String} dateCollection 日期集合
     */
    _renderCalendar (dateCollection) {
      let result = '';

      for (let i = 1, len = dateCollection.length; i <= len; i++) {
        const item = dateCollection[i - 1];

        if (i === 1) {
          result += `<tr><td class="${item.cls} ${item.dayCls}" data-year="${item.year}" data-month="${item.month}">${item.day}</td>`;
        } else if (i % 7 === 0) {
          result += `<td class="${item.cls} ${item.dayCls}" data-year="${item.year}" data-month="${item.month}">${item.day}</td></tr><tr>`;
        } else {
          result += `<td class="${item.cls} ${item.dayCls}" data-year="${item.year}" data-month="${item.month}">${item.day}</td>`;
        }
      }

      this.$refs.body.innerHTML = result;
    },

    /**
     * 获取当前元素的兄弟元素并且除去样式
     * @param {HTMLElement} el 当前元素
     * @param {String} cls 高亮样式
     */
    removeSiblingsCls (el, cls) {
      const siblings = [].slice.call(this.$refs.body.querySelectorAll('td'));

      siblings.forEach((e, i) => {
        if (e !== el) {
          e.classList.remove(cls);
        }
      });
    },

    /**
     * 获取当前日期
     * @return {Date} 日期
     * @private
     */
    _getNowDay () {
      return new Date();
    },

    /**
     * 个位数不足补0
     * @param {Number} num 数字
     * @returns {String} 补0过后的数字
     */
    appendZero (num) {
      if (num < 10) {
        return `0${num}`;
      }

      return num;
    },

    /**
     * 处理监听日期
     * @param {HTMLElement} el 元素
     * @param {String} operator 运算符
     */
    _handleTriggerDate (el, operator) {
      let { month } = this;
      let { year } = this;
      const { style } = el;

      // 弹起样式
      style.paddingTop = '1px';

      setTimeout(() => {
        style.paddingTop = 0;
      }, 100);

      if (operator === '+') {
        month++;
      } else if (operator === '-') {
        month--;
      }

      if (month <= 0) {
        year--;
      } else if (month > 12) {
        year++;
      }

      this.createCalendar(year, month);
    },

    onClickLeftBtn (e) {
      this._handleTriggerDate(e.target, '-');
    },

    onClickRightBtn (e) {
      this._handleTriggerDate(e.target, '+');
    },

    onClickBody (e) {
      const { target } = e;
      const { cls } = this;
      const { year } = target.dataset;
      const { month } = target.dataset;
      const day = target.innerHTML;

      target.classList.add(cls);
      this.removeSiblingsCls(target, cls);

      if (month > this.month || month < this.month) {
        this.createCalendar(year, month, parseInt(day, 10));
      } else {
        this.result = {
          year: year.toString(),
          month: month.toString(),
          day: day.toString()
        };
        this.$emit('change', this.result);
      }
    },

    getCalendarData () {
      return this.result;
    }
  },
  mounted () {
    this.createCalendar();
  }
};
</script>

<style scoped>
  .ui-datapicker-wrapper {
    display: block;
    font-size: 16px;
    color: #666;
    box-shadow: 2px 2px 8px 2px rgba(128, 128, 128, .3);
  }

  .ui-datapicker-wrapper .ui-datepicker-header {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    text-align: center;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
  }

  .ui-datapicker-wrapper .ui-datepicker-btn {
    font-family: serif;
    font-size: 20px;
    width: 20px;
    height: 50px;
    line-height: 50px;
    color: #1abc9c;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
  }

  .ui-datapicker-wrapper .ui-datepicker-prev-btn {
    float: left;
  }

  .ui-datapicker-wrapper .ui-datepicker-next-btn {
    float: right;
  }

  /* body */

  .ui-datapicker-wrapper .ui-datepicker-body table {
    width: 100%;
    border-collapse: collapse;
  }

  .ui-datapicker-wrapper .ui-datepicker-body th,
  .ui-datapicker-wrapper .ui-datepicker-body /deep/ td {
    height: 30px;
    text-align: center;
  }

  .ui-datapicker-wrapper .ui-datepicker-body th {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }

  .ui-datapicker-wrapper .ui-datepicker-body /deep/ td {
    border: 1px solid #f0f0f0;
    vertical-align: middle;
    font-size: 14px;
    cursor: pointer;
  }

  .ui-datapicker-wrapper .ui-datepicker-body /deep/ td:last-child {
    border-right: none;
  }

  .ui-datepicker-body /deep/ tr td.exceed {
    color: #999;
  }

  .ui-datepicker-body /deep/ tr td.cur {
    background-color: #00968830;
    color: #f00;
  }
</style>
