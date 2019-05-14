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
      var disWorld = new AMap.DistrictLayer.World({
        zIndex: 10,
        styles: {
          'nation-stroke': function (props) {
            if (props.type === 'Nation_Border_China') {
              return 'red'
            } else {
              return 'white'
            }
          },
          'coastline-stroke': [0.8, 0.63, 1, 1],
          'fill': function (props) {
            return this.getColorBySOC(props.SOC)
          }
        }
      })

      var map = new AMap.Map('container', {
        viewMode: '3D',
        center: [116.250766, 39.932931],
        layers: [
          disWorld
        ]
      })
      // AMap.plugin('AMap.DistrictLayer', function () { // 异步加载插件
      //   var toolbar = new AMap.DistrictLayer.World()
      //   map.addControl(toolbar)
      // })
    },
    getColorBySOC (SOC) {
      var colors = {}
      // 可按需改为其他实现
      if (SOC) {
        if (!colors[SOC]) {
          var R = SOC.charCodeAt(0) * 2
          var G = R// SOC.charCodeAt(1)*2
          var B = 255
          colors[SOC] = 'rgb(' + R + ',' + G + ',' + B + ')'
        }
        return colors[SOC]
      } else {
        return 'rgb(200,200,240)'
      }
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
