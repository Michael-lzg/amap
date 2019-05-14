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
        viewMode: '3D',
        center: [116.250766, 39.932931]
      })
      // map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.9)
      // map.DirectionLight = new AMap.Lights.DirectionLight([0, -1, 1], [1, 1, 1], 0.1)
      var object3Dlayer = new AMap.Object3DLayer()
      map.add(object3Dlayer)
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
