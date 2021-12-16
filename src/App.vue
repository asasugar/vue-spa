<template>
  <router-view></router-view>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    // 刷新时，持久化保存store
    window.addEventListener("beforeunload", () => {
      window.localStorage.setItem(
        "StoreDefaults",
        JSON.stringify(proxy.$store.state)
      );
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
