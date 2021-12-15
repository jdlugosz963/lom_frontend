import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const get_default_state = () => {
  return {
    token: "",
    user: {}
  }
}

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: get_default_state(),

  mutations: {
    set_token: (state, token) => state.token = token,
    set_user: (state, user) => state.user = user,
    reset_state: (state) => Object.assign(state, get_default_state())
  },

  getters: {
    is_logged_in: (state) => {
      return state.token !== ""
    },
     
    get_user: (state) => {
      return state.user
    },

    get_token: (state) => {
      return state.token
    }
  },

  actions: {
    login: ({commit}, {token, user}) => {
      commit('set_token', token)
      commit('set_user', user)

      Axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    },
    logout: ({commit}) => {
      commit('reset_state')
      Axios.defaults.headers.common['Authorization'] = null;
    }
  }
})

export default store
