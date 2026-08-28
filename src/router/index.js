
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MuvaBrand from '../views/MuvaBrand.vue'
import CartPage from '../views/CartPage.vue'


 const routes = [
      {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/muva',
    name: 'muva',
    component: MuvaBrand
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  }
  ]
  const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
