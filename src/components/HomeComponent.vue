<template>
  <div>
    <swipe-comp :swipeList="swipeList" :isfull="true"></swipe-comp>

    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../img/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
        </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../img/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../img/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../img/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../img/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../img/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul> 

  </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  import Swipe from './subcomponents/Swipe.vue'

  export default {
    data() {
      return {
        swipeList: []
      }
    },
    created() {
      this.getSwipeList()
    },
    methods: {
      getSwipeList() {
        this.$http.get('http://route.showapi.com/1287-1').then(result => {
          // console.log(result)
          if(result.body.status === 0) {
            this.swipeList = result.body.message
          }else{
            this.swipeList = [
              { img: "https://img.alicdn.com/simba/img/TB15mopcZbpK1RjSZFySut_qFXa.jpg", url: '0001' }, 
              { img: "//img.alicdn.com/tps/i4/TB10FkwehYaK1RjSZFnSuu80pXa.jpg_q90_.webp", url: '0002' }
            ]
            // Toast('请求轮播图失败')
          }
        })
      }
    },
    components: {
      "swipe-comp": Swipe
    }
  }
</script>

<style lang='scss' scoped>
.mui-grid-view.mui-grid-9 {
  background-color: white;
  .mui-table-view-cell {
    border: none;
    img {
      width: 60px;
    }
  }
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>

