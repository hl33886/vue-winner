<template>
  <div id="shop">
      <svg style="position:absolute;width:0;height:0">
        <symbol viewBox="0 0 22 22" id="rating-star">
          <path fill-rule="evenodd" d="M10.986 17.325l-5.438 3.323c-1.175.718-1.868.208-1.55-1.126l1.48-6.202-4.84-4.15c-1.046-.895-.775-1.71.59-1.82l6.353-.51L10.03.95c.53-1.272 1.39-1.266 1.915 0l2.445 5.89 6.353.51c1.372.11 1.632.93.592 1.82l-4.84 4.15 1.478 6.202c.32 1.34-.38 1.84-1.55 1.126l-5.437-3.323z"></path>
        </symbol>
        <symbol viewBox="0 0 1024 1024" id="res-x"><path fill-rule="evenodd" d="M480.518 512L8.377 984.141c-8.853 8.853-8.777 22.871-.083 31.565 8.754 8.754 22.825 8.656 31.565-.083L512 543.482l472.141 472.141c8.853 8.853 22.871 8.777 31.565.083 8.754-8.754 8.656-22.825-.083-31.565L543.482 512l472.141-472.141c8.853-8.853 8.777-22.871.083-31.565-8.754-8.754-22.825-8.656-31.565.083L512 480.518 39.859 8.377C31.006-.476 16.988-.4 8.294 8.294c-8.754 8.754-8.656 22.825.083 31.565L480.518 512z" class="path1 fill-color3"></path></symbol>
      </svg>
      <div class="shop-header">
          <div class="header-top">
              <img :src="shopData.avatar">
              <div class="header-top-cont">
                  <h2>{{shopData.name}}</h2>
                  <p>
                      {{shopData.description}}<em>/</em>
                      {{shopData.deliveryTime}}分钟送达
                  </p>
                  <p>{{supportsDesc}}<a href="javascript:;" class="more-supports" @click="modalShow = true">{{supportsLen}}个</a></p>
              </div>
          </div>
          <div class="bulletin">公告: {{bulletin}} <a href="javascript:;" class="more">></a></div>
      </div>
      <ul class="shop-bar clearfix">
        <li><router-link to="/product/product">商品</router-link></li>
        <li><router-link to="/rating/ratings">评价</router-link></li>
      </ul>
      <div class="modal-wrapper" v-if="modalShow">
        <div class="modal-cont">
          <h2>{{shopData.name}}</h2>
          <h2>
            <div class="rating-star">
              <span class="star" :style="{width: (shopData.score / 4.9) * 100 + '%'}">
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
              </span> 
              <span class="star-gray">
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
                <svg><use xlink:href="#rating-star"></use></svg>
              </span>            
            </div>
          </h2>
          <h3><span>优惠信息</span></h3>
          <ul>
            <li v-for="item in shopData.supports">{{item.description}}</li>
          </ul>
          <h3><span>商家公告</span></h3>
          <ul>
            <li v-for="item in shopData.infos">{{item}}</li>
          </ul>
        </div>
        <div class="modal-close" @click="modalShow = !modalShow"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-x"></use></svg></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'shop',
  data () {
    return {
      shopData: [],
      supportsDesc: '',
      supportsLen: 0,
      bulletin: '',
      modalShow: false
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.shopSeller()
    })
  },
  methods: {
    shopSeller: function () {
      let sellerUrl = 'http://localhost:8080/seller'
      this.$http.get(sellerUrl).then(res => {
        this.shopData = res.body.data

        this.supportsLen = this.shopData.supports.length
        this.supportsDesc = this.shopData.supports[0].description
        this.bulletin = this.shopData.bulletin.substring(0, 23) + '...'
      })
    }
  }
}
</script>

<style>
.router-link-active{ color: #f40;}
.shop-header{ background-color: #b9aebf;}
.header-top{ height: auto; clear: both; overflow: hidden; padding: 20px;color: #fff;}
.header-top img{ width: 13rem; height: 13rem; float: left; border-radius: 20px;}
.header-top-cont{ margin-left: 15rem;}
.header-top-cont h2{ font-size: 4.6rem; line-height: 4rem;}
.header-top-cont p{ font-size: 2.8rem; margin-top: 15px;}

.more-supports{ float: right; display: inline-block; padding:0px 30px; border-radius: 25px; background-color: rgba(0,0,0,0.2); line-height: 3.6rem; color: #fff;}

.bulletin{ font-size:3rem; color: #fff; padding: 20px; background-color: rgba(0,0,0,0.2);}
.bulletin .more{ float: right; color: #fff;}
.shop-bar{ background-color: #fff; position: relative; z-index: 2; display: flex;}
.shop-bar li{ background-color: #fff; text-align: center; height: 8rem; line-height: 8rem; font-size: 3.6rem; border-bottom: 1px solid #666; flex:1;}
.shop-bar li.active a{ color: #f40;}

.modal-wrapper{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; height: 100%; width: 100%; background-color: #262626; color: #fff; z-index: 3}
.modal-cont{ padding: 0 8rem; padding-top: 10rem; }
.modal-cont h2{ font-size: 6rem; text-align: center;}
.modal-cont h3{ margin-top: 7.4rem; margin-bottom: 4rem; text-align: center;}
.modal-cont h3 span{font-size: 3rem; padding: 1.2rem 2rem; border-radius: 1.6rem; border: 1px solid #555; background-color: #262626;}
.modal-cont ul li{ line-height: 3.8rem; font-size: 3.5rem;}
.modal-close{position: fixed; bottom: 4rem; left: 50%; margin-left: -3.5rem; width:7rem;}
.modal-close svg{ fill:#fff; width:7rem; height: 7rem;}
.modal-cont .rating-star{ display: inline-block; position: relative; height: 4rem; line-height: 4rem;}
.modal-cont .rating-star span{height: 4rem;}
.modal-cont .rating-star svg{ height: 4rem; width:4rem; float: left; margin: 0px 3px;}

</style>
