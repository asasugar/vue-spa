const mixin = {
  install(Vue, option) {
    Vue.mixin({
      data() {
        return {
          myPageNumber: 1,
          myPageSize: 30
        }
      }
    })
  }
}

export default mixin;