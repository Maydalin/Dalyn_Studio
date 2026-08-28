<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router'
import navbar from './components/navbar.vue'
const cartItems = ref([])

function addToCart(product) {
  const existingProduct = cartItems.value.find(
    (item) => item.id === product.id
  )

  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cartItems.value.push({
      ...product,
      quantity: 1,
    })
  }
}

function removeFromCart(productId) {
  cartItems.value = cartItems.value.filter(
    (item) => item.id !== productId
  )
}

function increaseQuantity(productId) {
  const product = cartItems.value.find(
    (item) => item.id === productId
  )

  if (product) {
    product.quantity++
  }
}

function decreaseQuantity(productId) {
  const product = cartItems.value.find(
    (item) => item.id === productId
  )

  if (product && product.quantity > 1) {
    product.quantity--
  }
}

const cartCount = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.quantity,
    0
  )
})
</script>
<template>
  <div class="page-shell">
    <navbar/>
    <main>
       <RouterView
    :cart-count="cartCount"
    :cart-items="cartItems"
    @add-to-cart="addToCart"
    @remove-from-cart="removeFromCart"
    @increase-quantity="increaseQuantity"
    @decrease-quantity="decreaseQuantity"
  />
    </main>
  </div>
</template>

