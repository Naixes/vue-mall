<template>
  <div class="goodsinfo-container">
    <!-- 加入购物车小球动画 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swipe-comp :swipeList="swipeList" :isfull="false"></swipe-comp>
      </div>
    </div>
      
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>${{ goodsInfo.market_price }}</del>
            销售价：<span class="new">${{ goodsInfo.sell_price }}</span>
          </p>
          <p class="count">
            <!-- 计数框子组件 -->
            购买数量：<numbox-comp @getCount="getGoodsCount" :max="goodsInfo.stock_quantity"></numbox-comp>
          </p>
          <p class="btn">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsInfo.goods_no }}</p>
          <p>库存情况:{{ goodsInfo.stock_quantity }}</p>
          <p>上架时间:{{ goodsInfo.add_time }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from '../subcomponents/Swipe.vue'
import Numbox from '../subcomponents/GoodsInfo_Numbox.vue'

export default {
  data() {
    return {
      swipeList: [],
      goodsInfo: {},
      id: this.$route.params.id,
      ballFlag: false,
      goodsCount: 1
    }
  },
  created() {
    this.getSwipeList()
    this.getGoodsInfo()
  },
  methods: {
    getGoodsCount(count) {
      this.goodsCount = count
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)" 
    },
    enter(el, done) {
      el.offsetWidth

      // 获取小球的位置getBoundingClientRect()
      const ballPosation = this.$refs.ball.getBoundingClientRect()
      const cartBadgePosation = document.getElementById('cart-badge').getBoundingClientRect()
      const xDist = cartBadgePosation.left - ballPosation.left
      const yDist = cartBadgePosation.top - ballPosation.top

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all 0.8s cubic-bezier(.51,-0.08,.81,.49)"
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    addToCart() {
      this.ballFlag = !this.ballFlag
      // 组织要加入购物车的商品信息，对象
      const goodsObj = {
        id:this.id, 
        count:this.goodsCount, 
        price:this.goodsInfo.sell_price, 
        selected:true 
      }
      this.$store.commit('addCart', goodsObj)
    },
    goDesc(id) {
      this.$router.push({ name: "GoodsDesc", params: { id } })
    },
    goComment(id) {
      this.$router.push({ name: "GoodsComment", params: { id } })
    },
    getGoodsInfo() {
      this.$http.get('http://route.showapi.com/1287-1/'+ this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0]
        }else {
          this.goodsInfo = {
            add_time: Date.now(), goods_no: '0001', market_price: '99', sell_price: '89', stock_quantity: '20', title: '一加手机5T 8GB+128GB 全面屏双摄游戏手机' 
          }
          // Toast('请求商品数据失败')
        }
      })
    },
    getSwipeList() {
      this.$http.get('http://route.showapi.com/1287-1').then(result => {
        if (result.body.status === 0) {
          this.swipeList = result.body.message
        }else{
            this.swipeList = [
              { img: "//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg", url: '0001' }, 
              { img: "//img11.360buyimg.com/n1//s360x360_jfs/t12229/166/733692010/231246/f7c16db0/5a1235e0Ne250b221.jpg", url: '0002' }, 
              { img: "//img11.360buyimg.com/n1//s360x360_jfs/t11254/36/2154037224/180619/e6ad790e/5a1235feN79f634ab.jpg", url: '0003' }
            ]
            // Toast('请求轮播图失败')
          }
      })
    }
  },
  components:{
    "swipe-comp": Swipe,
    "numbox-comp": Numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
.ball {
  height: 15px;
  width: 15px;
  background-color: red;
  border-radius: 50%;
  z-index: 99;
  position: absolute;
  top: 378px;
  left: 148px;
}

.mui-card {
  .mui-card-content-inner {
    .new {
      color: red;
      font-weight: bold;
    }
  }
  .mui-card-footer {
    display: block;
    // 不能用mt-button
    button {
      margin: 10px 0;
    }
  }
}
}

</style>


