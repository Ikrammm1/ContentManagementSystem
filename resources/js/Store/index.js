import { createStore } from 'vuex';
import moduleAuth from './auth/moduleAuth';
import moduleMenuManagement from './menuManagement/moduleMenuManagement';

const store = createStore({
  modules: {
    auth: moduleAuth,
    menuManagement: moduleMenuManagement,
  },
  // Optionally, you can add global state, getters, mutations, and actions here
});

export default store;