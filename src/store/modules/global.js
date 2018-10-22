const global = {
  state: {
    test: ""
  },
  mutations: {
    SET_TEST(state, val) {
      state.test = val;
    }
  },
  actions: {
    setTest({ commit }, val) {
      commit("SET_TEST", val);
    }
  }
};

export default global;
