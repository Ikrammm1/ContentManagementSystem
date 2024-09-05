import { list } from "postcss";
import axios from "../../http/axios/index.js"

const state = {
  menus: null,
  datas : []
};

const mutations = {
  SET_MENUS(state, menu) {
    state.userMenus =menu;
  },
  SET_ITEMS(state, item){
    state.datas = item
  }
  
};

const actions = {
  authlist({ commit }, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/menu-management/list', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {       
          commit('SET_MENUS', response.data.menus)           
          resolve(response.data.menus);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  list({ commit }) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/menu-management/menuList', {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {       
          commit('SET_ITEMS', response.data)           
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

// const getters = {
//   user: state => state.userData,
//   menus: state => state.userMenus
// };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters
};