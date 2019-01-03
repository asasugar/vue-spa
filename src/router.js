import Vue from "vue";
import Router from "vue-router";
import store from "./store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      meta: {
        title: "首页"
      },
      component: () =>
        import( /* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      meta: {
        title: "关于"
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "*",
      component: () =>
        import( /* webpackChunkName: "notFoundComponent" */ "./components/NotFoundComponent.vue"),
      meta: {
        title: "找不到页面"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `xxx系统-${to.meta.title}`;
  }
  if (to.path === '/login') {
    store.dispatch('reset'); //重置store
    return next();
  } else {
    // 用于后台系统，当未获取到用户信息时，返回登录页面
    // if (!getLocalStorage('userInfo') || Object.keys(getLocalStorage('userInfo')).length === 0) next('/login')
    // else next()
    next()
  }
});

router.afterEach(route => {});

export default router