<template>
  <div class="home" v-loading="isLoading">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1 class="f39 fw200">This is an home page</h1>
    <AsyncComponent></AsyncComponent>
    <div>
      计数器 count:
      <button @click="asyncIncrement">+</button>
      {{ count
      }}
      <button @click="asyncDecrement">-</button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import AsyncComponent from "../components/AsyncComponent.vue";

export default {
  components: {
    AsyncComponent,
  },
  setup(props, context) {
    const store = useStore();
    return {
      // 在 computed 函数中访问 state
      count: computed(() => store.state.global.count),
      isLoading: ref(false),
      asyncIncrement: () => store.dispatch("asyncIncrement"),
      asyncDecrement: () => store.dispatch("asyncDecrement"),
    };
  },
};
</script>