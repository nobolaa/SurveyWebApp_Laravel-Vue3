import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    }
  },
  getters: {
  },
  mutations: {
    logout: state => {
      state.user.data = {}
      state.user.token = null
    },
    setUser: (state, userData) => {
      state.user.data = userData.user
      state.user.token = userData.token
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  actions: {
    register ({ commit }, user) {
      return fetch('http://surveyapp_laravel-vue3.test/api/register', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          commit('setUser', res)
          return res
        })
    }
  },
  modules: {
  }
})
