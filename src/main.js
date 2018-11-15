import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "./utils/js/request";
import filter from '@/filter'; // 全局过滤器
import directive from '@/directive'; // 自定义指令
import mixin from '@/mixin'; // 全局mixin


Vue.use(filter);
Vue.use(directive);
Vue.use(mixin);
Vue.prototype.$http = request;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");