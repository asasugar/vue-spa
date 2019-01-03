import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";

Vue.use(Vuex);

const handleStore = store => {
  window.localStorage.setItem("VuexDefaults", JSON.stringify(store.state)); // 保存初始store
  store.subscribe((mutation, state) => {
    if (mutation.type === 'RESET') { // 重置时，重新初始化store
      if (window.localStorage.VuexDefaults)
        store.replaceState(JSON.parse(window.localStorage.VuexDefaults))
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