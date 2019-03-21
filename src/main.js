// 入口
import Vue from "vue"

// 引入路由
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 引入vue-resource，操作请求
import VueResource from 'vue-resource'
// 安装vueResource
Vue.use(VueResource)
// 设置api默认主域名，也可以在vm中设置http: {root: ''}
// Vue.http.options.root = 'http://vue.studyit.io'

// 引入安装状态管理工具vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建Store实例
const store = new Vuex.Store({
  state: {
    // 初始化时先从本地存储中获取购物车数据
    // id:
    // count:
    // price:
    // selected:
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    // 向购物车中添加商品
    addCart(state, goodsObj) {
      var flag = false

      state.cart.some(item => {
        if (item.id == goodsObj.id) {
          item.count += parseInt(goodsObj.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.cart.push(goodsObj)
      }
      // 将购物车数据存储到本地
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    // 修改商品数量
    updateCart(state, goodsObj) {
      state.cart.some(item => {
        if (item.id == goodsObj.id) {
          item.count = parseInt(goodsObj.count)
          return true
        }
      })
      
      // 将购物车数据存储到本地
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    // 删除购物车商品
    removeCart(state, id) {
      console.log(id)
      state.cart.some((item, i) => {
        if (item.id == id) {
          state.cart.splice(i, 1)
          return true
        }
      })
      
      // 将购物车数据存储到本地
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    // 修改购物车勾选状态
    updateSelected(state, goodsObj) {
      state.cart.some(item => {
        if (item.id == goodsObj.id) {
          item.selected = goodsObj.selected
          // console.log(goodsObj.selected)
          return true
        }
      })

      // 将购物车数据存储到本地
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  getters: {
    // 获取购物车总件数
    getAllCount(state) {
      var c = 0
      state.cart.forEach(item => {
        c += item.count
      })
      return c
    },
    // 将购物车里的商品id和数量封装到一个对象中
    getCartCount(state) {
      var o = {}
      state.cart.forEach(item => {
        o[item.id] = parseInt(item.count)
      })
      return o
    },
    // 获取购物车商品的勾选状态
    getSelected(state) {
      var o = {}
      state.cart.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getAllCountAndSum(state) {
      var o = {
        count: 0,
        sum: 0
      }
      state.cart.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.sum += item.count * item.price
        }
      })
      return o
    }
  }
})

// 引入vue-preview插件：图片缩略图显示插件
import VuePreview from 'vue-preview'
// 安装vue-preview插件
Vue.use(VuePreview)


// 导入时间格式化插件
import moment from 'moment'
// 创建全局的过滤器
Vue.filter('dateFormat',function (dateStr, pattern='YYYY-MM-DD hh:mm:ss') {
  return moment(dateStr).format(pattern)
})

// 导入mui css
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需引入Mint-ui中的组件
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
// 安装懒加载组件
Vue.use(Lazyload)

// 导入app根组件
import app from './App.vue'

// 导入自定义路由
import router from './router.js'

var vm = new Vue({
  el: '#app',
  // render: createElement => createElement(app),
  render: c=> c(app),
  // 挂载路由
  router,
  // 挂载状态管理工具
  store
})
