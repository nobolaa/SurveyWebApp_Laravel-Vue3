import { createStore } from 'vuex'
import axiosClient from '@/axios'

const tmpSurveys = [
  {
    id: 100,
    title: 'TheCodeholic YouTube channel content',
    slug: 'thecodeholic-youtube-channel-content',
    status: 'draft',
    image:
      'https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png',
    description:
      'My name is Nabil.<br>I am Web Developer, free educational content.',
    created_at: '2021-12-20 18:00:00',
    updated_at: '2021-12-20 18:00:00',
    expire_date: '2021-12-31 18:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'From wich country are you?',
        description: null,
        data: {
          options: [
            { uuid: 'a', text: 'USA' },
            { uuid: 'b', text: 'India' },
            { uuid: 'c', text: 'Spain' }
          ]
        }
      },
      {
        id: 2,
        type: 'checkbox',
        question: 'Wich language videos do you want to see on my channel?',
        description:
          'lorem ipsum dolor sit amet',
        data: {
          options: [
            { uuid: 'd', text: 'Javascript' },
            { uuid: 'e', text: 'PHP' },
            { uuid: 'f', text: 'HTML + CSS' }
          ]
        }
      },
      {
        id: 3,
        type: 'text',
        question: 'What\'s your favourite Youtube channel?',
        description: 'null',
        data: {}
      },
      {
        id: 4,
        type: 'textarea',
        question: 'What do you think about our channel?',
        description: 'Write your honest opinion. Everything is anonymous.',
        data: {}
      }
    ]
  },
  {
    id: 400,
    title: 'Tailwind 3',
    slug: 'tailwihd-3',
    status: 'active',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png',
    description:
      'A utility-first CSS framework packed with classes like <code>flex</code>',
    created_at: '2021-12-21 14:00:00',
    updated_at: '2021-12-21 14:00:00',
    expire_date: '2021-12-31 00:00:00',
    questions: []
  }
]

export default createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    surveys: [...tmpSurveys]
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
    }
  },
  modules: {
  }
})
