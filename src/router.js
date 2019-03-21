import VueRouter from 'vue-router'

// 引入对应组件文件
import HomeComponent from './components/HomeComponent.vue'
import MemberComponent from './components/MemberComponent.vue'
import CartComponent from './components/CartComponent.vue'
import SearchComponent from './components/SearchComponent.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 创建路由对象
var router = new VueRouter({
  // 设置路由规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeComponent },
    { path: '/member', component: MemberComponent },
    { path: '/cart', component: CartComponent },
    { path: '/search', component: SearchComponent },
    { path: '/home/newslist', component: NewsList },
    // 匹配时加上冒号表示参数
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: "GoodsDesc" },
    { path: '/home/goodscomment/:id', component: GoodsComment, name: "GoodsComment" }
  ],
  linkActiveClass: 'mui-active'
})

export default router