import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: function (resolve) {
    //     require(['../views/index.vue'], resolve)
    //   }
    // },
    // {
    //   path: '/point',
    //   name: 'point',
    //   component: function (resolve) {
    //     require(['../views/point.vue'], resolve)
    //   }
    // },
    // {
    //   path: '/demo',
    //   name: 'demo',
    //   component: function (resolve) {
    //     require(['../views/demo.vue'], resolve)
    //   }
    // },
    {
      path: '/home',
      component: function (resolve) {
        require(['../views/home.vue'], resolve)
      }
    },
    {
      path: '/TileLayer',
      component: function (resolve) {
        require(['../views/TileLayer.vue'], resolve)
      }
    },
    // 设置小心点及覆盖物
    {
      path: '/setCenter',
      component: function (resolve) {
        require(['../views/setCenter.vue'], resolve)
      }
    }
  ]
})
