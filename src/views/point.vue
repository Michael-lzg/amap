<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
      <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index" :key="index"></el-amap-marker>
    </el-amap>
    <div class="toolbar">
      <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
      <button type="button" name="button" v-on:click="changePosition">change position</button>
      <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
      <button type="button" name="button" v-on:click="addMarker">add marker</button>
      <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '4e63f850bea102e65e026bfc3fc39755',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.AMapManager'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
// let amapManager = new VueAMap.AMapManager()
const exampleComponents = {
  props: ['text'],
  template: `<div>text from  parent: {{text}}</div>`
}
export default {
  name: 'amap-page',
  data () {
    return {
      count: 1,
      slotStyle: {
        padding: '2px 8px',
        background: 'red',
        color: '#333',
        border: '1px solid red'
      },
      zoom: 14,
      center: [121.5273285, 31.21515044],
      markers: [
        {
          position: [121.5283285, 31.21515044],
          events: {
            click: () => {
              alert('click marker')
            },
            dragend: (e) => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>'
        }
      ],
      renderMarker: {
        position: [121.5273285, 31.21715058],
        contentRender: (h, instance) => {
          // if use jsx you can write in this
          // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
          return h(
            'div',
            {
              style: {background: 'red', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
              on: {
                click: () => {
                  const position = this.renderMarker.position
                  this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002]
                }
              }
            },
            ['marker inner text']
          )
        }
      },
      componentMarker: {
        position: [121.5273285, 31.21315058],
        contentRender: (h, instance) => h(exampleComponents, {style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
      },
      slotMarker: {
        position: [121.5073285, 31.21715058]
      }
    }
  },
  methods: {
    onClick () {
      this.count += 1
    },
    changePosition () {
      let position = this.markers[0].position
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002]
    },
    chnageDraggle () {
      let draggable = this.markers[0].draggable
      this.markers[0].draggable = !draggable
    },
    toggleVisible () {
      let visableVar = this.markers[0].visible
      this.markers[0].visible = !visableVar
    },
    addMarker () {
      let marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
      }
      this.markers.push(marker)
    },
    removeMarker () {
      if (!this.markers.length) return
      this.markers.splice(this.markers.length - 1, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
 .amap-demo {
   width: 800px;
    height: 500px;
}
</style>
