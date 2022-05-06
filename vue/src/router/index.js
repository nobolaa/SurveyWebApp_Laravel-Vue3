import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SurveysView from '../views/SurveysView.vue'
import SurveyView from '../views/SurveyView.vue'
import SurveyPublicView from '../views/SurveyPublicView.vue'

import DefaultLayout from '../components/DefaultLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'

import store from '@/store'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '/dashboard', name: 'Dashboard', component: DashboardView },
      { path: '/surveys', name: 'Surveys', component: SurveysView },
      { path: '/survey', name: 'SurveyCreate', component: SurveyView },
      { path: '/survey/:id', name: 'SurveyView', component: SurveyView }
    ]
  },
  {
    path: '/view/survey/:slug',
    name: 'SurveyPublicView',
    component: SurveyPublicView
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    meta: { isGuest: true },
    component: AuthLayout,
    children: [
      { path: '/login', name: 'Login', component: LoginView },
      { path: '/register', name: 'Register', component: RegisterView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'Login' })
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
