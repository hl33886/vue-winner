<template>
	<div class="cropper-wrapper">
    <input id="zoomable" type="checkbox" v-model="cropOptions.zoomable">
    <label for="zoomable">Zoomable?</label>
		<img v-cropper="cropOptions" :src="img" alt="Jquery Meme" height="300" width="500">
    <div class="prompt"><p>Cropper</p></div>
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
      img: require('./logo.png')
    }
  },
  methods: {
    toggleCropper () {
      this.showCropper = !this.showCropper
    }
  }
}
</script>
