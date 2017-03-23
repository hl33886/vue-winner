<template>
	<div id="rating" class="clearfix" >
    <svg style="position:absolute;width:0;height:0">
      <symbol viewBox="0 0 22 22" id="rating-star">
        <path fill-rule="evenodd" d="M10.986 17.325l-5.438 3.323c-1.175.718-1.868.208-1.55-1.126l1.48-6.202-4.84-4.15c-1.046-.895-.775-1.71.59-1.82l6.353-.51L10.03.95c.53-1.272 1.39-1.266 1.915 0l2.445 5.89 6.353.51c1.372.11 1.632.93.592 1.82l-4.84 4.15 1.478 6.202c.32 1.34-.38 1.84-1.55 1.126l-5.437-3.323z"></path>
      </symbol>
    </svg>
    <section class="rating-cont">
      <div class="left">
        <strong>{{shopData.score}}</strong>
        <p>综合评价</p>
        <p>高于周边商家{{shopData.rankRate}}%</p>
      </div>
      <ul class="right">
        <li>
          <span class="title">服务态度</span>
          <div class="rating-star">
            <span class="star"  :style="{width: (shopData.serviceScore / 4.8) * 100 + '%'}">

              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
            </span> 
            <span class="star-gray">
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
              <svg><use xlink:href="#rating-star" width="25" height="25"></use></svg>
            </span>            
          </div>
          <span class="score">{{shopData.serviceScore}}</span>
        </li>
        <li><span class="title">菜品评价</span><span class="score">{{shopData.foodScore}}</span></li>
        <li><span class="title">送达时间</span><span class="score">{{shopData.deliveryTime}}分钟</span></li>
      </ul>
    </section>
    <section class="rating-list" id="ratingList">
      <ul>
        <li class="clearfix" v-for="(item, index) in ratingsData">
          <span class="date">{{item.rateTime | changeDate}}</span>
          <img :src="item.avatar" class="userimg">
          <div class="rating-user-info">
            <h4>{{item.username}}</h4>
            <div class="rating-star">
              <span class="star" :style="{width: (item.score / 5) * 100 + '%'}">
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
              </span> 
              <span class="star-gray">
                <svg><use xlink:href="#rating-star" ></use></svg>
                <svg><use xlink:href="#rating-star" ></use></svg>
                <svg><use xlink:href="#rating-star" ></use></svg>
                <svg><use xlink:href="#rating-star" ></use></svg>
                <svg><use xlink:href="#rating-star" ></use></svg>
              </span>            
            </div>
            <p>{{item.text}}</p>
            <div class="foods">
              <span v-for="(pitem, index) in item.recommend">{{pitem}}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>

	</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      shopData: [],
      ratingsData: [],
      size: 20
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getratingsList()
      setTimeout(() => {
        this._initScroll()
      }, 100)
    })
  },
  filters: {
    changeDate: function (value) {
      let myDate = new Date(value)
      return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
    }
  },
  methods: {
    getratingsList () {
      let sellerUrl = 'http://localhost:8080/seller'
      this.$http.get(sellerUrl).then(res => {
        this.shopData = res.body.data
      })
      let ratingsUrl = 'http://localhost:8080/ratings'
      this.$http.get(ratingsUrl).then(res => {
        this.ratingsData = res.body.data
      })
    },
    _initScroll () {
      this.scroll = new BScroll(document.getElementById('ratingList'))
    }
  }
}
</script>
<style>
  .rating-cont{ padding: 30px; display: flex; margin-bottom: 20px; background-color: #fff; position: relative; z-index: 2;}
  .rating-cont .left{padding-right: 3rem;border-right: 1px solid #ddd; text-align: center; line-height: 1.5;}
  .rating-cont .left strong{ font-size: 6.2rem; color: #f60; line-height: 6.8rem;}
  .rating-cont .left p{ font-size: 3rem; }
  .rating-cont .right{ flex:1;}
  .rating-cont .right li{ line-height: 5rem; font-size: 3rem;}
  .rating-cont .right .title{ margin-left: 3rem; }
  .rating-cont .right .score{color: #f60; margin-left: 3rem;}
  .rating-cont .right .star-five{ margin-right: 5px;}
  .rating-list{ background-color: #fff; padding: 0px 30px; height: 1120px;}
  .rating-list > ul > li{ padding: 30px 0px; border-bottom: 1px solid #ddd; position: relative;}
  .rating-list ul li .userimg{ width: 8rem; height: 8rem; border-radius: 50%; float: left;}
  .rating-list .rating-user-info{ margin-left: 10rem;font-size: 1rem;}
  .rating-list .rating-user-info h4{ font-size: 4.2rem; line-height: 6rem; }
  .rating-list .rating-user-info p{ font-size: 3rem; margin-bottom: 10px; }
  .rating-list .rating-user-info .foods span{ display: inline-block; font-size: 2.8rem; color: #999; border:1px solid #ddd; padding: 1rem; border-radius: 1rem; margin-right: 10px; margin-bottom: 10px; float: left;}
  .rating-list .date{ position: absolute; top: 30px; right: 0; font-size: 3rem;}

  #rating .rating-star{ display: inline-block; position: relative; height: 25px; line-height: 25px;}
  #rating .rating-star span{ display: inline-block; height: 25px;}.rating-star svg{ height: 25px; width:25px; float: left; margin: 0px 3px;}
  #rating .rating-star svg{ height: 25px; width:25px; float: left; margin: 0px 3px;}

</style>
