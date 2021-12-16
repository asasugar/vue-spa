import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import request from "./utils/request";
import { setupGlobDirectives } from './directives';
import '@/style/common.less';

const app = createApp(App);
app.config.globalProperties.$http = request; // axios请求挂载
setupGlobDirectives(app); // 设置自定义指令

app.use(router).use(store).mount('#app');
