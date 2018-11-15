import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";

Vue.use(Vuex);
// 持久化vuex
const handleStore = store => {
  window.localStorage.setItem("VuexDefaults", JSON.stringify(store.state)); // 保存初始store
  if (window.localStorage.store && window.localStorage.store !== undefined && window.localStorage.store !== 'undefined') {
    store.replaceState(JSON.parse(window.localStorage.store)); // 初始化store
  }
  store.subscribe((mutation, state) => {
    if (mutation.type === 'RESET') { // 重置时，删除旧的store,重新初始化store
      window.localStorage.setItem("store", window.localStorage.VuexDefaults);
      store.replaceState(JSON.parse(window.localStorage.store))
    } else {
      window.localStorage.setItem("store", JSON.stringify(state));
    }
  });

};
export default new Vuex.Store({
  mutations: {
    RESET(state) {}
  },
  actions: {
    reset({
      commit
    }) {
      commit('RESET')
    }
  },
  modules: {
    global
  },
  plugins: [handleStore]
});