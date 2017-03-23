<template>
	<div id="product" class="clearfix" :style="{height: height + 'px'}" >
		<ul class="product-nav-list">
			<li v-for="(item, index) in productList" :class="{'cur': index==curIndex}"><a href="javascript:;" @click="changeItem(index)">{{item.name}}</a></li>
		</ul>
		<div class="productList" ref="productList">
			<div class="wrapper">
			<ul class="product-item-list" v-for="(item, index) in productList">
				<li v-for="(pitem, index) in item.foods" class="clearfix">
					<img :src="pitem.image" alt="商品图片">
					<div class="food-cont">
						<h4>{{pitem.name}}</h4>
						<p>{{pitem.description}}</p>
						<p>月销{{pitem.sellCount}}份 <span>好评率{{pitem.rating}}%</span></p>
						<p class="price"><strong>{{pitem.price}}</strong> <span>{{pitem.oldPrice}}</span></p>
					</div>
					<a href="javascript:;" class="add-num">+</a>
				</li>
			</ul>
			</div>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      listHeight: [],
      productList: [],
      shopData: [],
      scroll: {},
      activeId: 0,
      scrollY: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getproductList()
      setTimeout(() => {
        this._initScroll()
        this._calculateHeight()
      }, 100)
    })
  },
  computed: {
    curIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    height () {
      return document.body.scrollHeight - 375
    }
  },
  methods: {
    getproductList () {
      let goodsUrl = 'http://localhost:8080/goods'
      this.$http.get(goodsUrl).then(res => {
        this.productList = res.body.data
      })
    },
    changeItem (index) {
      let el = this.$refs.productList.getElementsByTagName('ul')
      this.scroll.scrollToElement(el[index], 1)
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.productList, {
        startX: 0,
        startY: 0,
        probeType: 3
      })
      this.scroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
      this.scroll.on('refresh')
    },
    _calculateHeight () { // 获取区间高度数组
      let list = this.$refs.productList.getElementsByTagName('ul')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>
<style>
</style>
