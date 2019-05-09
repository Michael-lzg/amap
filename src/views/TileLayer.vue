<template>
  <div class="hello">
    <div style="height:500px" id="container" tabindex="0"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      var map = new AMap.Map('container', {
        zoom: 13, // 级别
        center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D', // 使用3D视图
        layers: [// 使用多个图层
          new AMap.TileLayer.RoadNet(), // 路网图层类
          new AMap.TileLayer.Traffic() // 交通图层类
        ]
      })
      console.log(map)
      // 点标记
      var marker = new AMap.Marker({
        position: [116.39, 39.9], // 位置
        label: {
          content: '北京',
          offset: new AMap.Pixel(20, 20)
        }
      })
      map.add(marker)// 添加到地图
      // map.remove(marker) // 删除标记

      // 矢量图
      var lineArr = [
        [116.368904, 39.913423],
        [116.382122, 39.901176],
        [116.387271, 39.912501],
        [116.398258, 39.904600]
      ]
      var polyline = new AMap.Polyline({
        path: lineArr, // 设置线覆盖物路径
        strokeColor: '#3366FF', // 线颜色
        strokeWeight: 5, // 线宽
        strokeStyle: 'solid' // 线样式
      })
      map.add(polyline)

      var circle = new AMap.Circle({
        center: [116.39, 39.9],
        radius: 1000,
        strokeColor: '#1791fc',
        fillColor: '#1791fc',
        fillOpacity: 0.4
      })
      map.add(circle)

      // 信息窗体
      var infoWindow = new AMap.InfoWindow({ // 创建信息窗体
        isCustom: true, // 使用自定义窗体
        content: '<div>信息窗体</div>', // 信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(16, -45)
      })
      marker.on('click', (e) => {
        infoWindow.open(map, e.target.getPosition()) // 打开信息窗体
      })
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
