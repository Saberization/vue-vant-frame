<template>
  <canvas :width="width" :height="height" :style="`border: 1px solid ${bgColor}`" ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'VerifyCode',
  props: {
    len: {
      type: Number,
      default: 4
    },
    minfontsize: {
      type: Number,
      default: 20
    },
    maxfontsize: {
      type: Number,
      default: 35
    },
    radius: {
      type: Number,
      default: 1
    },
    bgColor: {
      type: String,
      default: '#444'
    },
    colors: Array,
    width: {
      type: Number,
      default: 130
    },
    height: {
      type: Number,
      default: 60
    },
    enableCaseValidation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      verifyStr: ''
    };
  },
  methods: {
    update () {
      this._drawVerify();
    },
    validate (value) {
      const { verifyStr } = this;

      if (this.enableCaseValidation) {
        return verifyStr === value;
      }

      return verifyStr.toLowerCase() === value.toLowerCase();
    },
    /**
     * 生成随机数
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {Number} 随机数
     * @private
     */
    _randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**
     * 生成一个随机色
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @returns {String} 颜色值
     * @private
     */
    _randomColor (min, max) {
      const r = this._randomNum(min, max);
      const g = this._randomNum(min, max);
      const b = this._randomNum(min, max);

      return `rgb(${r},${g},${b})`;
    },
    /**
     * 绘制验证码
     */
    _drawVerify () {
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');
      const { _randomNum } = this;
      const { _randomColor } = this;
      const { width } = this;
      const { height } = this;
      const strLen = this.len;
      const { colors } = this;

      ctx.textBaseline = 'middle';
      this.verifyStr = '';

      // 绘制背景色
      ctx.fillStyle = this._randomColor(180, 240);
      ctx.fillRect(0, 0, width, height);

      // 绘制文字
      const str = 'ABCEFGHJKLMNPQRSTWXY123456789';

      for (let i = 0; i < strLen; i++) {
        const txt = str[_randomNum(0, str.length)];

        if (colors && colors[i]) {
          ctx.fillStyle = colors[i];
        } else {
          ctx.fillStyle = _randomColor(50, 160); // 随机生成字体颜色
        }
        ctx.font = `${_randomNum(this.minfontsize, this.maxfontsize)}px SimHei`; // 随机生成字体大小

        const x = width / strLen + i * 25;
        const y = _randomNum(25, 45);
        const deg = _randomNum(-45, 45);

        this.verifyStr += txt;
        // 修改坐标原点和旋转角度
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);

        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }

      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = _randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(_randomNum(0, width), _randomNum(0, height));
        ctx.lineTo(_randomNum(0, width), _randomNum(0, height));
        ctx.stroke();
      }

      // 绘制干扰点
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = _randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(_randomNum(0, width), _randomNum(0, height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  },
  mounted () {
    this._drawVerify();
  }
};
</script>
