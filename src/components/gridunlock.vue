<template>
  <canvas :width="cw" :height="ch" ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'GridUnlock',
  props: {
    r: {
      type: Number,
      default: 26
    },
    cw: {
      type: Number,
      default: window.screen.width
    },
    ch: {
      type: Number,
      default: 320
    },
    outRoundBorderColor: {
      type: String,
      default: '#666'
    },
    lineWidth: {
      type: Number,
      default: 3
    },
    lineColor: {
      type: String,
      default: '#f00'
    },
    outRoundColor: {
      type: String,
      default: '#fff'
    },
    innerRoundColor: {
      type: String,
      default: '#008080'
    },
    offsetX: {
      type: Number,
      default: 15
    },
    offsetY: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      pointArr: [],
      offsetTop: 0,
      ctx: null
    }
  },
  methods: {
    _initGridunlock () {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      this.ctx = ctx
      this.offsetTop = this._getOffsetTop(canvas) || 0
      this.pointArr = this._drawLocalPoint((this.cw - 2 * this.offsetX - this.r * 2 * 3) / 2, (this.ch - 2 * this.offsetY - this.r * 2 * 3) / 2)
      this._initListeners(canvas, ctx)
      this._draw(this.pointArr, [], null, ctx)
    },

    _getOffsetTop (canvas) {
      let offsetTop = 0
      let parentElement = canvas.parentElement

      while (parentElement && parentElement.nodeType === 1 && parentElement.tagName !== 'body') {
        offsetTop += parentElement.offsetTop
        parentElement = parentElement.parentElement
      }

      return offsetTop
    },

    /**
     * 计算画布9个点
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    _drawLocalPoint (x, y) {
      const result = []
      const offsetX = this.offsetX
      const offsetY = this.offsetY
      const r = this.r

      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          var ninePoint = {
            x: (offsetX + col * x + (col * 2 + 1) * r),
            y: (offsetY + row * y + (row * 2 + 1) * r)
          }

          result.push(ninePoint)
        }
      }

      return result
    },

    /**
     * @param {HTMLElement} canvas
     * @param {CanvasRenderingContext2D} ctx
     * @private
     */
    _initListeners (canvas, ctx) {
      let linePoint = []
      const cw = this.cw
      const ch = this.ch

      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault()
        this._selectPoint(e.touches[0], linePoint)
      }, {
        passive: false
      })

      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault()

        let touches = e.touches[0]

        this._selectPoint(touches, linePoint)

        ctx.clearRect(0, 0, cw, ch)

        this._draw(this.pointArr, linePoint, {
          x: touches.pageX,
          y: touches.pageY - this.offsetTop
        }, ctx)
      }, {
        passive: false
      })

      canvas.addEventListener('touchend', (e) => {
        ctx.clearRect(0, 0, cw, ch)
        this._draw(this.pointArr, linePoint, null, ctx)
        this.$emit('success', linePoint)
        linePoint = []
      })
    },

    /**
     * 选点
     * @param {event} event.touches
     * @param {Array} LinePoint 已选择的点
     * @private
     */
    _selectPoint (touches, LinePoint) {
      let pointArr = this.pointArr

      for (let i = 0, len = pointArr.length; i < len; i++) {
        let curPoint = pointArr[i]
        let xDiff = Math.abs(curPoint.x - touches.pageX)
        let yDiff = Math.abs(curPoint.y - (touches.pageY - this.offsetTop))
        let dir = Math.pow((xDiff * xDiff + yDiff * yDiff), 0.5)

        if (dir < this.r) {
          if (LinePoint.indexOf(i) < 0) {
            LinePoint.push(i)
          }
          break
        }
      }
    },

    /**
     * 绘制圆点
     * @param {Array} pointArr 画布9个点
     * @param {Array} linePointArr 存储已连点
     * @param {Object} touchPoint 触摸点
     * @param {Object} ctx canvas画笔
     * @private
     */
    _draw (pointArr, linePointArr, touchPoint, ctx) {
      const r = this.r
      const pI2 = Math.PI * 2

      if (linePointArr.length > 0) {
        ctx.beginPath()
        for (let i = 0, len = linePointArr.length; i < len; i++) {
          const index = linePointArr[i]

          ctx.lineTo(pointArr[index].x, pointArr[index].y)
        }

        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.lineColor
        ctx.stroke()
        ctx.closePath()

        if (touchPoint != null) {
          const lastIndex = linePointArr[linePointArr.length - 1]
          const lastPoint = pointArr[lastIndex]

          ctx.beginPath()
          ctx.moveTo(lastPoint.x, lastPoint.y)
          ctx.lineTo(touchPoint.x, touchPoint.y)
          ctx.stroke()
          ctx.closePath()
        }
      }

      for (let i = 0, len = pointArr.length; i < len; i++) {
        const point = pointArr[i]

        ctx.fillStyle = this.outRoundBorderColor
        ctx.beginPath()
        ctx.arc(point.x, point.y, r, 0, pI2, true)
        ctx.closePath()

        ctx.fill()
        ctx.fillStyle = this.outRoundColor

        ctx.beginPath()
        ctx.arc(point.x, point.y, r - 3, 0, pI2, true)
        ctx.closePath()
        ctx.fill()

        if (linePointArr.indexOf(i) >= 0) {
          ctx.fillStyle = this.innerRoundColor
          ctx.beginPath()
          ctx.arc(point.x, point.y, r - 16, 0, pI2, true)
          ctx.closePath()
          ctx.fill()
        }
      }
    },

    reset () {
      this.ctx.clearRect(0, 0, cw, ch)
    }
  },
  mounted () {
    this._initGridunlock()
  }
}
</script>

<style scoped>

</style>
