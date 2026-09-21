import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Muva from '../views/Muva.vue'
import Songmont from '../views/Songmont.vue'
import Milooey from '../views/Milooey.vue'
import Rockfish from '../views/Rockfish.vue'
import CartPage from '../views/CartPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
  },
  {
    path: '/muva',
    name: 'muva',
    component: Muva,
  },
  {
    path: '/songmont',
    name: 'songmont',
    component: Songmont,
  },
 
  {
    path: '/milooey',
    name: 'milooey',
    component: Milooey,
  },
  {
    path: '/rockfish',
    name: 'rockfish',
    component: Rockfish,
  },
 
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
   {
    path: '/checkoutpage',
    name: 'checkout',
    component: CheckoutPage,
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
