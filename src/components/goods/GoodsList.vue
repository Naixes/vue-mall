<template>
  <div class="goodslist-container">
    <div class="goodsitem" @click='getInfoById(1)'>
      <img src="//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg" alt="">
      <h1>一加手机5T 8GB+128GB 星辰黑 全面屏双摄游戏手机 全网通4G 双卡双待(星辰黑)</h1>
      <div class="info">
        <p class="price">
          <span class="new">$99</span>
          <span class="old">$199</span>
        </p>
        <p class="sell">
          <span class="tag">热卖中</span>
          <span class="last">剩余20件</span>
        </p>
      </div>
    </div>

    <div class="goodsitem" @click='getInfoById(2)'>
      <img src="//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg" alt="">
      <h1>一加手机5T 8GB+128GB 全面屏双摄游戏手机 双卡双待</h1>
      <div class="info">
        <p class="price">
          <span class="new">$99</span>
          <span class="old">$199</span>
        </p>
        <p class="sell">
          <span class="tag">热卖中</span>
          <span class="last">剩余20件</span>
        </p>
      </div>
    </div>

    <div class="goodsitem" @click='getInfoById(3)'>
      <img src="//img10.360buyimg.com/n7/s230x230_jfs/t12730/306/1517709913/155178/f5e7e927/5a22acfaNf7222715.jpg!cc_230x230.jpg" alt="">
      <h1>一加手机5T 8GB+128GB 星辰黑 全面屏双摄游戏手机 全网通4G 双卡双待(星辰黑)</h1>
      <div class="info">
        <p class="price">
          <span class="new">$99</span>
          <span class="old">$199</span>
        </p>
        <p class="sell">
          <span class="tag">热卖中</span>
          <span class="last">剩余20件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // 使用编程式导航代替route-link
    getInfoById(id) {
      this.$router.push('/home/goodsinfo/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
.goodslist-container {
  background-color: #fff;
  padding: 7px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goodsitem {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 49%;
    padding: 2px;
    margin-bottom: 7px;
    img {
      width: 100%;
      min-height: 170px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      background-color: #eee;
      p {     
         margin: 0;
      }
      .price {
        .new {
          font-size: 15px;
          font-weight: bold;
          color: red;
          margin-right: 10px;
        }
        .old {
          font-size: 14px;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>

