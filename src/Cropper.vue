<template>
	<div class="cropper">
		<button id="toggle" @click="toggleCropper">Toggle Cropper</button>
		<img v-cropper="cropOptions" :src="img" alt="Jquery Meme" height="300" width="500">
		<input id="zoomable" type="checkbox" v-model="cropOptions.zoomable">
		<label for="zoomable">Zoomable?</label>
	</div>
</template>
<script>
import cropper from 'directives/Cropper'
export default {
  directives: {
    cropper
  },
  data () {
    return {
      cropOptions: {
        aspectRatio: 16 / 9,
        zoomable: false // 是否允许放大缩小图片
      },
      img: require('./assets/logo.png'),
      showCropper: false
    }
  },
  methods: {
    toggleCropper () {
      this.showCropper = !this.showCropper
    }
  }
}
</script>
<style>
	
</style>
