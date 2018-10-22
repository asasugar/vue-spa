import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";

Vue.use(Vuex);
// 持久化vuex
const handleStore = store => {
  if (window.localStorage.store)
    store.replaceState(JSON.parse(window.localStorage.store)); // 初始化store
  store.subscribe((mutation, state) => {
    window.localStorage.setItem("store", JSON.stringify(state));
  });
};
export default new Vuex.Store({
  modules: {
    global
  },
  plugins: [handleStore]
});
