<template>
  <div>
    <div class="hello">
      <div style="height:500px" id="container" tabindex="0"></div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  methods: {
    init: function () {
      var map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        viewMode: '3D', // 使用3D视图
        pitch: 75,
        resizeEnable: true,
        zoom: 14,
        lang: 'ch-en'
      })
      // AMap.MouseTool 插件主要通过用户在地图图面的鼠标操作，绘制相应的点、线、面覆盖物；或者进行图面的距离测量、面积量测、拉框放大、拉框缩小等。
      map.plugin(['AMap.MouseTool'], function () {
        var mouseTool = new AMap.MouseTool(map)
        // 使用鼠标工具，在地图上画标记点
        mouseTool.marker()
        // 测量两点距离
        mouseTool.rule()
        // 添加事件
        AMap.event.addListener(mouseTool, 'draw', function (e) {
          console.log(e)
          // console.log(e.obj.getPath())// 获取路径/范围
        })
      })

      // 折线的节点坐标数组，每个元素为 AMap.LngLat 对象
      var path = [
        new AMap.LngLat(116.368904, 39.913423),
        new AMap.LngLat(116.382122, 39.901176),
        new AMap.LngLat(116.387271, 39.912501),
        new AMap.LngLat(116.398258, 39.904600)
      ]
      var polyline = new AMap.Polyline({
        path: path,
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
        lineJoin: 'round' // 折线拐点连接处样式
      })
      map.add(polyline)

      // 引入多边形编辑器插件
      map.plugin(['AMap.PolyEditor'], function () {
        // 实例化多边形编辑器，传入地图实例和要进行编辑的多边形实例
        var polylineEditor = new AMap.PolyEditor(map, polyline)

        // 开启编辑模式
        polylineEditor.open()
      })

      // 编辑圆
      var circle = new AMap.Circle({
        center: new AMap.LngLat('116.397428', '39.90923'),
        radius: 500,
        strokeColor: '#F33',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: 'ee2200',
        fillOpacity: 0.35
      })
      map.add(circle)
      map.plugin(['AMap.CircleEditor'], function () {
        var circleEditor = new AMap.CircleEditor(map, circle)
        circleEditor.open()
        AMap.event.addListener(circleEditor, 'adjust', function (target) {
          console.log(target)
          // console.log(e.obj.getPath())// 获取路径/范围
        })
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 800px;
  height: 500px;
}
</style>
