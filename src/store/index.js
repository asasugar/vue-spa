/*
 * @Description: vuex状态管理
 * @Author: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @Date: 2021-06-09 18:09:42
 * @LastEditors: Xiongjie.Xue(xiongjie.xue@luckincoffee.com)
 * @LastEditTime: 2021-06-23 10:17:43
 */
import { createStore } from 'vuex';
import global from './modules/global';

const handleStore = (store) => {
	console.log(store)
	// 当 store 初始化后调用
	if (window.localStorage.StoreDefaults) store.replaceState(JSON.parse(window.localStorage.StoreDefaults));

	// 每次 mutation 之后调用
	store.subscribe((mutation, state) => {
		if (mutation.type === 'RESET') {
			// 重置时，重新初始化store
			window.localStorage.clear();
		}
	});
};

const store = createStore({
	// 开发环境开启严格模式，在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
	strict: import.meta.env.NODE_ENV !== 'production',
	mutations: {
		RESET(state) { }
	},
	actions: {
		reset({ commit }) {
			commit('RESET');
		}
	},
	modules: {
		global
	},
	plugins: [handleStore]
});

export default store;
