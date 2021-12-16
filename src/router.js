/*
 * @Description: 路由管理
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-09 17:24:44
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2021-06-09 18:04:53
 */
import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('./views/Home.vue');
const About = () => import('./views/About.vue');
const NotFoundComponent = () => import('./components/NotFoundComponent.vue');

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			meta: {
				title: '首页'
			},
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			meta: {
				title: '关于'
			},
			component: About
		},
		{
			path: '/:pathMatch(.*)*',
			component: NotFoundComponent,
			meta: {
				title: '找不到页面'
			}
		}
	]
});
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = `xxx系统-${to.meta.title}`;
	}
	next();
});

router.afterEach((route) => {});
export default router;
