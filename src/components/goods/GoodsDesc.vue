<template>
  <div class="goodscomment-container">
    <h3 class="title">{{ goodsDesc.title }}</h3>

    <hr>

    <div class="content" v-html="goodsDesc.content"></div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      goodsDesc: {},
      id: this.$route.params.id
    }
  },
  created() {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() {
      this.$http.get('http://route.showapi.com/1287-1/'+ this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsDesc = result.body.message
        }else {
          this.goodsDesc = {
            title: '一加手机5T 8GB+128GB 全面屏双摄游戏手机', 
            content: '<img src="//img20.360buyimg.com/vc/jfs/t19342/18/805964722/39857/ad10cfb5/5aa9d2fbN0eb84fa4.jpg" alt=""><img src="//img20.360buyimg.com/vc/jfs/t15091/149/133428094/289315/8e1f10e3/5a24df5bN9a495e1d.jpg" alt=""><img src="//img20.360buyimg.com/vc/jfs/t14416/127/1766210680/884298/ffb54d5d/5a56cae1N8a59a824.jpg" alt="">'
          }
          // Toast('请求商品数据详情失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.goodscomment-container{
  background-color: #fff;
  padding: 5px 3px;
  .title {
    text-align: center;
    font-size: 16px;
    color: #226aff;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>


