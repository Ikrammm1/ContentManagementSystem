import axios from "../../http/axios/index.js"

const state = {
  datas: [],
  menus: []
};

const mutations = {
  ADD_ITEM(state, item) {
    state.iceCreamSettings.push(item);
  }
};

const actions = {
  store({ commit }, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      axios.post('/api/login', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          // commit('ADD_ITEM', Object.assign(item, { id: response.data[0] }));
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const getters = {
  allSettings: state => state.iceCreamSettings
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};