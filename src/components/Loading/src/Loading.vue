<template>
  <div class="loading-tip full-loading" :class="{ absolute }" v-show="loading">Loading...</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    tip: {
      type: String,
      default: "",
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
    },
  },
});
</script>
<style lang="less" scoped>
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(240, 242, 245, 0.4);
  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }
}
html[data-theme="dark"] {
  .full-loading {
    background-color: @bg-color-mask;
  }
}
</style>
