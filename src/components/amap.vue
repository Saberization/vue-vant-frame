<template>
  <div class="amap" id="amap" ref="map" :style="{width: width, height: `${parseInt(height)}px`}"></div>
</template>

<script>
import Util from '@utils';

export default {
  name: 'AMap',
  props: {
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '270px'
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    complete: Function,
    error: Function,
    poicallback: Function
  },
  data() {
    return {
      setting: {
        map: {
          resizeEnable: true
        },
        geolocation: {
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: 0,
          zoomToAccuracy: true,
          buttonPosition: 'RB'
        },
        radius: 1000
      },
      position: null
    };
  },
  methods: {
    /**
     * 初始化定位
     * @private
     */
    _initializationGeo() {
      let geolocation;
      const { AMap } = window;
      const { setting } = this;

      // 加载地图，调用浏览器定位服务
      const map = new AMap.Map(document.getElementById('amap'), setting.map);
      map.plugin('AMap.Geolocation', () => {
        geolocation = new AMap.Geolocation(setting.geolocation);

        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', this._onComplete);
        AMap.event.addListener(geolocation, 'error', this._onError);
      });
    },

    /**
     * 定位成功后触发
     * @param {Object} data 高德地图返回的坐标内容
     * @private
     */
    _onComplete(data) {
      this.position = data.position;
      this._coordConvert(this.position);
      data.position = this.position;
      if (this.complete && typeof this.complete === 'function') {
        this.complete(data);
      }
    },

    /**
     * 定位失败后触发
     * @param {Object} err 报错信息
     */
    _onError(err) {
      if (this.error && typeof this.error === 'function') {
        this.error(err);
      }
    },

    /**
     * 高德坐标转换成百度坐标
     * @param {Object} position 坐标位置
     */
    _coordConvert(position) {
      const x = position.lng;
      const y = position.lat;
      const { BMap } = window;
      const ggPoint = new BMap.Point(x, y);
      const convertor = new BMap.Convertor();
      const pointArr = [];

      pointArr.push(ggPoint);
      convertor.translate(pointArr, 3, 5, (data) => {
        const points = data.points[0];

        position.lng = points.lng;
        position.lat = points.lat;
        // 周边检索
        this.searchQuery(position.lng, position.lat);
      });
    },

    /**
     * 周边检索
     * @param {Object} lng 百度地图的纬度
     * @param {Object} lat 百度地图的精度
     */
    searchQuery(lng, lat) {
      Util.loaderLibrary({
        src: `//api.map.baidu.com/geocoder/v2/?callback=_addrFrameCallback&location=${lat},${lng}&output=json&pois=1&ak=K5LXDCfHLnGvLDQsZx0AKyXNV5kLObYF&radius=${this.setting.radius}`,
        type: 'js',
        inject: 'body'
      });
    }
  },
  created() {
    this.setting = Object.assign(this.setting, this.options);

    Util.loaderLibrary({
      src: '//webapi.amap.com/maps?v=1.4.6&key=f2cb2852df505ce99f414bff0b93915b',
      type: 'js',
      inject: 'head'
    }, {
      src: '//api.map.baidu.com/getscript?v=2.0&ak=K5LXDCfHLnGvLDQsZx0AKyXNV5kLObYF&services=&t=20190123111209',
      type: 'js',
      inject: 'head'
    }).then(() => {
      this.setting.geolocation.buttonOffset = new window.AMap.Pixel(10, 20);
      this._initializationGeo();
    });

    window._addrFrameCallback = (data) => {
      if (this.poicallback && typeof this.poicallback === 'function') {
        this.poicallback(data);
      }
    };
  }
};
</script>

<style scoped>

</style>
