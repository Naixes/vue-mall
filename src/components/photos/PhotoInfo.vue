<template>
  <div class="photoinfo-container">
    <h3>{{ photoInfo.title }}</h3>
    <p class="photoinfo-subtitle">
      <span>发表时间：{{ photoInfo.add_time |dateFormat }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图 -->
    <div class="photoInfoSlide">
      <!-- @click="$preview.open(index, slide)" 点击放大事件会报错 -->
      <img class="preview-img" v-for="(item) in slide" :src="item.src" height="100" :key="item.src"> 
    </div>

    <!-- 内容区 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 评论子模块 -->
    <comment-comp :newsId="id"></comment-comp>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

import commentList from '../subcomponents/CommentList.vue'

export default {
  data() {
    return {
      // 获取地址栏的id信息
      id: this.$route.params.id,
      photoInfo: {},
      slide: []
    }
  },
  created() {
    // console.log(this.id)
    this.getPhotoInfo()
    this.getSlide()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get('http://route.showapi.com/1287-1/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoInfo = result.body.message[0]
        }else {
          this.photoInfo = {
             "title": "蔬菜沙拉", "add_time": Date.now(), "click": 10, 
             "content": "<p>'蔬菜沙拉是一道 以圆白菜、番茄、黄瓜等作为主要食材制作而成的美食。蔬菜沙拉是一种非常营养健康的饮食方法。首先它大多不必加热，这样会最大限度的保持住蔬菜中的各种营养不至于被破坏或流失。做水果沙拉时，可在普通的蛋黄沙拉酱内加入适量的甜味鲜奶油，其制出的沙拉奶香味浓郁，甜味加重。水果的种类数量可随个人口味随意增减，同时水果沙拉原料要选新鲜水果，水果切后装盘，摆放时间不宜过长，否则会影响其美观，也会使水果的营养降低。...'</p>" 
             }
          // Toast('获取图片详情失败')
        }
      })
    },
    getSlide() {
      this.$http.get('http://route.showapi.com/1287-1/' + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(element => {
            element.w = 600
            element.h = 400
          })
          this.slide = result.body.message
        }else {
          this.slide = [
            { "src": "http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg", w: 600, h: 400 },
            { "src": "http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg", w: 600, h: 400 },
            { "src": "http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg", w: 600, h: 400 },
            { "src": "http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg", w: 600, h: 400 }
          ]
          // Toast('获取图片缩略图失败')
        }
      })
    }
  },
  components: {
    'comment-comp': commentList
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26A2FF;
    font-size: 15px;
    text-align: center;
    margin: 10px 0;
  }
  .photoinfo-subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .photoInfoSlide {
    img {
      margin: 1px 4px;
      // box-shadow: 0 0 5px #555;
    }
  }
  .content {
    font-size: 12px;
  }
}
</style>


