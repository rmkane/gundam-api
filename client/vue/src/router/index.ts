import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MobileSuitsView from '../views/MobileSuitsView.vue'
import PilotsView from '../views/PilotsView.vue'
import SeriesView from '../views/SeriesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/series',
      name: 'series',
      component: SeriesView,
    },
    {
      path: '/pilots',
      name: 'pilots',
      component: PilotsView,
    },
    {
      path: '/mobile-suits',
      name: 'mobile-suits',
      component: MobileSuitsView,
    },
  ],
})

export default router
