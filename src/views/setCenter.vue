<template>
  <div class="hello">
    <div style="height:500px" id="container" tabindex="0"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        viewMode: '3D', // 使用3D视图
        pitch: 75,
        resizeEnable: true,
        zoom: 16,
        lang: 'ch-en'
      })
      // 传入经纬度，设置地图中心点
      var position = new AMap.LngLat(116, 39) // 标准写法
      // 简写 var position = [116, 39];
      map.setCenter(position)
      // 获取地图中心点
      var currentCenter = map.getCenter()
      console.log(currentCenter)

      // 创建一条折线覆盖物
      var path = [
        new AMap.LngLat('116.368904', '39.913423'),
        new AMap.LngLat('116.382122', '39.901176'),
        new AMap.LngLat('116.387271', '39.912501'),
        new AMap.LngLat('116.398258', '39.904600')
      ]
      var polyline = new AMap.Polyline({
        path: path,
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
        lineJoin: 'round' // 折线拐点连接处样式
      })
      map.add(polyline)

      // 创建两个点标记
      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(117.39, 39.9), // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      })
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(118.39, 39.9), // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      })
      map.add(marker1)
      map.add(marker2)

      // 自动适配到合适视野范围
      // 无参数，默认包括所有覆盖物的情况
      map.setFitView()
      // 传入覆盖物数组，仅包括polyline和marker1的情况
      map.setFitView([polyline, marker1])
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 800px;
  height: 500px;
}
</style>
