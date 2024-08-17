import { createStore } from 'vuex';
import moduleAuth from './auth/moduleAuth';

const store = createStore({
  modules: {
    auth: moduleAuth,
  },
  // Optionally, you can add global state, getters, mutations, and actions here
});

export default store;