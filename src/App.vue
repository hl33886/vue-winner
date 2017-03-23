<template>
  <div id="app">
    <!-- 商品头部 -->
    <shop></shop>
    <!-- 商品 -->
    
    <router-view transitiong="fade"></router-view>
  </div>
</template>

<script>
import shop from '@/components/shop'
import Product from '@/components/product'
export default {
  name: 'app',
  components: {shop, Product}
}
</script>
