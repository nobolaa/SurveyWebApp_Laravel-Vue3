import { createStore } from 'vuex'
import axiosClient from '@/axios'

export default createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    dashboard: {
      loading: false,
      data: {}
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      links: {},
      data: []
    },
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    notification: {
      show: false,
      type: null,
      message: null
    }
  },
  getters: {
  },
  mutations: {
    logout: state => {
      state.user.data = {}
      state.user.token = null
      sessionStorage.removeItem('TOKEN')
    },
    setUser: (state, userData) => {
      state.user.data = userData.user
      state.user.token = userData.token
      sessionStorage.setItem('TOKEN', userData.token)
    },
    setDashboardLoading: (state, value) => {
      state.dashboard.loading = value
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data
    },
    setCurrentSurveyLoading: (state, value) => {
      state.currentSurvey.loading = value
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data
    },
    setSurveysLoading: (state, value) => {
      state.surveys.loading = value
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data
      state.surveys.links = surveys.meta.links
    },
    notify: (state, { message, type }) => {
      state.notification.show = true
      state.notification.type = type
      state.notification.message = message
      setTimeout(() => {
        state.notification.show = false
      }, 3000)
    }
  },
  actions: {
    register ({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({ data }) => {
          commit('setUser', data)
          return data
        })
    },
    login ({ commit }, credentials) {
      return axiosClient.post('/login', credentials)
        .then(({ data }) => {
          commit('setUser', data)
          return data
        })
    },
    logout ({ commit }) {
      return axiosClient.get('/logout')
        .then(({ data }) => {
          commit('logout')
          return data
        })
    },
    getDashboardData ({ commit }) {
      commit('setDashboardLoading', true)
      return axiosClient.get('/dashboard')
        .then((res) => {
          commit('setDashboardData', res.data)
          commit('setDashboardLoading', false)
          return res
        })
        .catch((err) => {
          commit('setDashboardLoading', false)
          throw err
        })
    },
    getSurvey ({ commit }, id) {
      commit('setCurrentSurveyLoading', true)
      return axiosClient.get(`/survey/${id}`)
        .then((res) => {
          commit('setCurrentSurvey', res.data)
          commit('setCurrentSurveyLoading', false)
          return res
        })
        .catch((err) => {
          commit('setCurrentSurveyLoading', false)
          throw err
        })
    },
    getSurveyBySlug ({ commit }, slug) {
      commit('setCurrentSurveyLoading', true)
      return axiosClient.get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit('setCurrentSurvey', res.data)
          commit('setCurrentSurveyLoading', false)
          return res
        })
        .catch((err) => {
          commit('setCurrentSurveyLoading', false)
          throw err
        })
    },
    getSurveys ({ commit }, { url = null } = {}) {
      url = url || '/survey'
      commit('setSurveysLoading', true)
      return axiosClient.get(url)
        .then((res) => {
          commit('setSurveys', res.data)
          commit('setSurveysLoading', false)
          return res
        })
        .catch((err) => {
          commit('setSurveysLoading', false)
          throw err
        })
    },
    saveSurvey ({ commit }, survey) {
      delete survey.image_url
      let response

      if (survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`, survey)
          .then(({ data }) => {
            commit('setCurrentSurvey', data.data)
            return data
          })
      } else {
        response = axiosClient.post('/survey', survey)
          .then(({ data }) => {
            commit('setCurrentSurvey', data.data)
            return data
          })
      }

      return response
    },
    saveSurveyAnswer ({ commit }, { surveyId, answers }) {
      return axiosClient.post(`/survey/${surveyId}/answer`, { answers })
    },
    // eslint-disable-next-line no-empty-pattern
    deleteSurvey ({}, id) {
      return axiosClient.delete(`/survey/${id}`)
    }
  },
  modules: {
  }
})
