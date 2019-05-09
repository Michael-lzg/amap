<template>
  <div>
    <el-amap class="amap-demo" vid="map" :zoom="zoom" :center="center" :plugin="plugin">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap-marker vid="marker" :position="center" :label="label">
      </el-amap-marker>
      <!-- <el-amap-marker v-for="(item,index) in markers" :key="index" :vid="index" :position="item.position" :label="item.label" :events="item.events">
      </el-amap-marker> -->
      <el-amap-circle vid="circle" :center="center" radius="500" fill-opacity="0.2" strokeColor="#38f" strokeOpacity="0.8" strokeWeight="1" fillColor="#38f">
      </el-amap-circle>
    </el-amap>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zoom: 14,
      center: [121.406051, 31.179695],
      markers: [
        {
          position: [121.406151, 31.179795],
          label: {
            content: '钦汇园',
            offset: [15, 20]
          },
          events: {
            click (e) {
              console.log(e)
            }
          }
        },
        {
          position: [121.405151, 31.178785],
          label: {
            content: '哈汇园',
            offset: [15, 20]
          },
          events: {
            click () {
              alert(919)
            }
          }
        }
      ],
      label: {
        content: '钦汇园',
        offset: [15, 20]
      },
      plugin: [
        {
          pName: 'ToolBar', // 工具条插件
          position: 'LB'
        },
        {
          pName: 'MapType', // 卫星与地图切换
          defaultType: 0,
          showTraffic: true // 实时交通图层
        },
        {
          pName: 'OverView'
          // isOpen:true//鹰眼是否打开
        },
        {
          pName: 'Scale'
        },
        {
          pName: 'Geolocation', // 定位插件
          showMarker: false,
          events: {
            init (o) {
              // 定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                console.log(result)
                // this.center = [result.position.lng, result.position.lat]
              })
            }
          }
        }
      ],
      searchOption: {
        city: '广州',
        citylimit: true
      }
    }
  },
  methods: {
    onSearchResult (pois) {
      console.log(pois)
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi
          lngSum += lng
          latSum += lat
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.center = [center.lng, center.lat]
      }
    }
  }
  // mounted () {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
}
</script>

<style lang="scss" scoped>
.amap-demo {
  width: 800px;
  height: 500px;
}
</style>
