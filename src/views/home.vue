<template>
  <div class="hello">
    <div style="height:500px" id="container" tabindex="0"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        viewMode: '3D', // 使用3D视图
        resizeEnable: true,
        zoom: 10,
        lang: 'ch-en'
      })
      map.setMapStyle('amap://styles/blue')
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
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
