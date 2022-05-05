<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link :to="{name: 'SurveyCreate'}" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>

    <div v-if="surveys.loading" class="flex justify-center">Loading...</div>
    <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListItem
          v-for="(survey, i) in surveys.data"
          :key="survey.id"
          :survey="survey"
          class="opacity-0 animate-fade-in-down"
          :style="{animationDelay: `${i * 0.1}s`}"
          @delete="deleteSurvey(survey)"
        />
    </div>
  </PageComponent>
</template>

<script setup>
import store from '../store'
import { computed } from 'vue'
import PageComponent from '@/components/PageComponent.vue'
import SurveyListItem from '@/components/SurveyListItem.vue'

const surveys = computed(() => store.state.surveys)

store.dispatch('getSurveys')

function deleteSurvey (survey) {
  if (confirm('Are you sure you want to delete this survey? Operation can\'t be undone!!')) {
    store.dispatch('deleteSurvey', survey.id)
      .then(() => {
        store.dispatch('getSurveys').then(() => {
          store.commit('notify', {
            type: 'success',
            message: 'Survey was successfully deleted'
          })
        })
      })
  }
}
</script>
