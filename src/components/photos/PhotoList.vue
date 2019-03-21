<template>
  <!-- 使用mui的tab-top-webview-main代码段 -->
  <!-- 删除class mui-fullscreen -->
  <!-- 使用区域滚动组件，需手动初始化scroll控件 -->
  <!-- 初始化scroll控件： -->

  <!-- mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  }); -->
  <div class="photoslist-container">

    <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
          <!-- 使用tap代替click，只有在mui中可用 -->
          <a v-for="item in cates" :key="item.id" @tap='getPhotoListByCateId(item.id)' :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']">
            {{ item.title }}
          </a>
				</div>
			</div>
		</div>

    <ul class="photo-list">
      <router-link v-for="item in photosList" :key="item.id" :to="'/home/photoinfo/'+item.id" tag='li'>
        <!-- 给img添加懒加载 -->
        <img v-lazy="item.img_url">
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-body">{{ item.content }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      cates: [],
      photosList: []
    }
  },
  created() {
    this.getCates()
    this.getPhotoListByCateId(0)
  },
  mounted() {
  // 初始化scroll控件
  // 由于webpack默认启用严格模式，引入mui.js过后会报错，可以用插件babel-plugin-transform-remove-strict-mode移除严格模式
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    getCates() {
      this.$http.get('http://route.showapi.com/1287-1/').then(result => {
        if (result.body.status === 0) {
          this.cates = result.body.message.unshift({"title": "全部", "id": 0})
        }else {
          this.cates = [
            {"title": "全部", "id": 0},
            {"title": "户型装饰", "id": 1},
            {"title": "广告摄影", "id": 2},
            {"title": "摄影设计", "id": 3},
            {"title": "摄影学习", "id": 4},
            {"title": "摄影设计", "id": 5},
            {"title": "摄影器材", "id": 6}
          ]
          // Toast('获取图片目录失败')
        }
      })
    },
    getPhotoListByCateId(cateId) {
      this.$http.get('http://route.showapi.com/1287-1/' + cateId).then(result => {
        if (result.body.status === 0) {
          this.photosList = result.body.message
        }else {
          this.photosList = [
            {"title": "蔬菜沙拉", "id": 0, 
            "img_url":"http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg", "content": "蔬菜沙拉是一道 以圆白菜、番茄、黄瓜等作为主要食材制作而成的美食。蔬菜沙拉是一种非常营养健康的饮食方法。首先它大多不必加热，这样会最大限度的保持住蔬菜中的各种营养不至于被破坏或流失。" },
            {"title": "图片欣赏2", "id": 1, "img_url": "http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg", "content": "图片欣赏2" },
            {"title": "图片欣赏3", "id": 2, "img_url": "http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg", "content": "图片欣赏3" },
            {"title": "图片欣赏4", "id": 3, "img_url": "http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg", "content": "图片欣赏4" },
            {"title": "图片欣赏5", "id": 4, "img_url": "http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg", "content": "图片欣赏5" },
            {"title": "图片欣赏6", "id": 5, "img_url": "http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg", "content": "图片欣赏6" }
          ]
          // Toast('获取图片失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  // 可以用来消除滑动时的警告
  // touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 7px;
  padding: 0;
  li {
    text-align: center;
    box-shadow: 0 0 9px #999;
    position: relative;
    margin-bottom: 10px; 
    img {
      width: 100%;
      // 垂直对齐方式
      vertical-align: middle;
    }
    // 懒加载图标样式
    img[lazy='loading'] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      width: 100%;
      text-align: left;
      max-height: 85px;
      color: white;
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,0.4);
      padding: 3px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>

