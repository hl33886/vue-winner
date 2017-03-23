import Vue from 'vue'
import Router from 'vue-router'
import Ratings from '@/components/ratings'
import Product from '@/components/product'
import Cropper from '@/components/cropper/cropper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/rating/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/product/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/cropper/cropper',
      name: 'Cropper',
      component: Cropper
    }
  ]
})
