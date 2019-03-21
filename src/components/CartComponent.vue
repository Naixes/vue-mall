<template>
<div class="cartcomponent-container">
  <!-- 商品信息 -->
  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner" v-for="(item, i) in goodsList" :key="item.id">
        <mt-switch v-model="$store.getters.getSelected[item.id]" @change="changeSelected(item.id, $store.getters.getSelected[item.id])"></mt-switch>
        <img :src="item.thumb_path" alt="">
        <div class="info">
          <h3>{{ item.title }}</h3>
          <p>
            <span class="price">${{ item.sell_price }}</span>
            <!-- 将每件商品的数量传入计数组件 -->
            <numbox-comp :initcount="$store.getters.getCartCount[item.id]" :id ="item.id"></numbox-comp>
            <a @click.prevent='remove(item.id, i)'>删除</a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 结算信息 -->
  <div class="mui-card">
    <div class="mui-card-content">
      <div class="mui-card-content-inner">
        <div class="left">
          <p>总计（不含运费）</p>
          <p>已勾选商品<span class="red">{{ $store.getters.getAllCountAndSum.count }}</span>件,总价<span class="red">${{ $store.getters.getAllCountAndSum.sum }}</span></p>
        </div>
        <mt-button type="danger">去结算</mt-button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Numbox from './subcomponents/Cart_Numbox.vue'

export default {
  data() {
    return {
      goodsList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      var goodsIds = []
      this.$store.state.cart.forEach(item => goodsIds.push(item.id))
      if (goodsIds.length <= 0) {
        return
      }
      this.$http.get('http://route.showapi.com/1287-1/' + goodsIds.join(",")).then(result => {
        if (result.body.status === 0) {
          this.goodsList = result.body.message
        }else {
          this.goodsList = [
            // { id: "1", sell_price: '89', thumb_path: '//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg', title: '一加手机5T 8GB+128GB 全面屏双摄游戏手机' },
            { id: "2", sell_price: '89', thumb_path: '//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg', title: '一加手机5T 8GB+128GB 全面屏双摄游戏手机' },
            // { id: "3", sell_price: '89', thumb_path: '//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg', title: '一加手机5T 8GB+128GB 全面屏双摄游戏手机' },
          ]
          // Toast('请求购物车数据失败')
        }
      })
    },
    remove(id, index) {
      this.goodsList.splice(index, 1)
      this.$store.commit('removeCart', id)
    },
    changeSelected(id, selected) {
      this.$store.commit('updateSelected', {id, selected})
    }
  },
  components: {
    "numbox-comp": Numbox
  }
}
</script>

<style lang="scss" scoped>
.cartcomponent-container {
  .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
    }
    h3 {
      font-size: 13px;
    }
    img {
      width: 50px;
      height: 60px;
    }
    .info {
      p {
        margin: 0;
        .price {
          margin-right: 10px;
          color: red;
          font-weight: bold;
        }
        a {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>


