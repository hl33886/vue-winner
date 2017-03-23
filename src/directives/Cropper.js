import $ from 'jquery'
import 'cropper'

export default {
  deep: true,
  bind (el, binding) {},
  update (el, binding) {
    binding.value.crop = (event) => {
      // this.vm.$emit('crop', event)
    }
    console.log(this)
    $(el).cropper('destroy')
    setTimeout(() => {
      $(el).cropper(binding.value)
    }, 0)
  },
  unbind (el) {
    $(el).cropper('destroy')
  }
}
