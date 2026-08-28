<script setup>
import { computed } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => [],
  },

  cartCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['remove-from-cart', 'increase-quantity', 'decrease-quantity'])

function removeItem(id) {
  emit('remove-from-cart', id)
}

function increase(id) {
  emit('increase-quantity', id)
}

function decrease(id) {
  emit('decrease-quantity', id)
}

function getPrice(price) {
  return Number(price.replace(/[^0-9]/g, ''))
}

const total = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    return sum + getPrice(item.price) * item.quantity
  }, 0)
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US').format(price)
}
</script>

<template>
  <section class="cart-page">
    <!-- Header -->

    <div class="cart-header">
      <button type="button" class="back-button" @click="$router.back()">
        <i class="fa-solid fa-arrow-left"></i>
        Back
      </button>

      <h1>Cart</h1>

      <span class="cart-count"> {{ cartCount }} items </span>
    </div>

    <!-- Empty cart -->

    <div v-if="cartItems.length === 0" class="empty-cart">
      <i class="fa-solid fa-bag-shopping"></i>

      <h2>Your cart is empty</h2>

      <p>Add some products to your cart.</p>

      <router-link to="/muva" class="continue-button"> Continue Shopping </router-link>
    </div>

    <!-- Cart -->

    <div v-else class="cart-content">
      <!-- Products -->

      <div class="cart-products">
        <article v-for="item in cartItems" :key="item.id" class="cart-item">
          <!-- Image -->

          <div class="cart-image">
            <img :src="item.image" :alt="item.name" />
          </div>

          <!-- Information -->

          <div class="cart-info">
            <h2>
              {{ item.name }}
            </h2>

            <p class="price">
              {{ item.price }}
            </p>

            <!-- Quantity -->

            
              <button class="quantity-decrease" type="button" @click="decrease(item.id)">−</button>
              <span>
                {{ item.quantity }}
              </span>
              <button class="quantity-add" type="button" @click="increase(item.id)">+</button>
          
          </div>
          <!-- Remove -->
          <button type="button" class="remove-button" @click="removeItem(item.id)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </article>
      </div>
      <!-- Summary -->

      <aside class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span> Items </span>
          <span>
            {{ cartCount }}
          </span>
        </div>
        <div class="summary-row total-row">
          <span> Total </span>

          <strong> {{ formatPrice(total) }} LAK </strong>
        </div>

        <button type="button" class="checkout-button">Checkout</button>
      </aside>
    </div>
    
  </section>
</template>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 24px 80px;
}

/* Header */

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cart-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.cart-count {
  font-size: 14px;

  color: #666;
}

/* Back */

.back-button {
  display: flex;

  align-items: center;

  gap: 8px;

  border: none;

  background: transparent;

  font-size: 15px;

  cursor: pointer;
}

/* Empty */

.empty-cart {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 400px;

  text-align: center;
}

.empty-cart > i {
  font-size: 40px;

  color: #87576b;

  margin-bottom: 20px;
}

.empty-cart h2 {
  margin: 0;

  font-size: 24px;
}

.empty-cart p {
  color: #777;
}

/* Continue */

.continue-button {
  margin-top: 20px;

  padding: 12px 24px;

  border-radius: 999px;

  background: #87576b;

  color: white;

  text-decoration: none;

  font-size: 13px;
  font-weight: 700;
}

/* Content */

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
}

/* Product */

.cart-products {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
  background: #f7f7f7;
}

/* Image */

.cart-image {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

/* Info */

.cart-info {
  flex: 1;
}

.cart-info h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.price {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 700;
}

/* Quantity */

.quantity {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 15px;
}

.quantity-add{
  margin-left: 10px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #87576b;
  color: white;
  cursor: pointer;
}
.quantity-decrease{
  margin-right: 10px;
  width: 28px;
  height: 28px;
  border: 1px solid #87576b;
  border-radius: 50%;
  background: white;
  color: #87576b;
  cursor: pointer;
}

.quantity span {
  font-size: 14px;
  font-weight: 700;
}

/* Remove */

.remove-button {
  border: none;
  background: transparent;
  color: #87576b;
  cursor: pointer;
  font-size: 16px;
}

/* Summary */

.cart-summary {
  height: fit-content;
  padding: 24px;
  border-radius: 15px;
  background: #f7f7f7;
}

.cart-summary h2 {
  margin-top: 0;
  font-size: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  font-size: 14px;
}

.total-row {
  padding-top: 18px;
  border-top: 1px solid #ddd;
  font-size: 17px;
}

/* Checkout */

.checkout-button {
  width: 100%;
  height: 42px;
  margin-top: 24px;
  border: none;
  border-radius: 999px;
  background: #87576b;
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

/* Mobile */

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  .cart-header h1 {
    font-size: 32px;
  }
  .cart-item {
    padding: 14px;
    gap: 12px;
  }
  .cart-image {
    width: 90px;
    height: 90px;
  }
}
</style>
