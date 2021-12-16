const global = {
	state: {
		count: 0
	},
	mutations: {
		INCREMENT(state) {
			state.count++;
		},
		DECREMENT(state) {
			state.count--
		}
	},
	actions: {
		asyncIncrement({ commit }) {
			commit('INCREMENT');
		},
		asyncDecrement({ commit }) {
			commit('DECREMENT');
		}
	}
};

export default global;
