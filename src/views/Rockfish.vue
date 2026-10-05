<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-to-cart'])

const products = [
  {
    id: 1,
    name: 'Bella Shoes',
    price: '2,050,000 LAK',
    colors: [
      {
        name: 'Green',
        value: '#9FAC8D',
        size: '36,37,38,39,40',
        image: 'public/bella green.jpg',
      },
      {
        name: 'Navy',
        value: '#34465a',
        size: '36,37,38,39,40',
        image: 'public/bella navy.jpg',
      },
      {
        name: 'Black',
        value: '#000',
        size: '36,37,38,39,40',
        image: 'public/bella black.jpg',
      },
       {
        name: 'Red',
        value: '#892C2B',
        size: '36,37,38,39,40',
        image: 'public/bella red.jpg',
      },
    ],
    active: 0,
  },
  {
    id: 2,
    name: 'Garden Bag',
    price: '1,850,000 LAK',
    colors: [
      {
        name: 'Blue',
        value: '#b9d1df',
        image: 'public/garden blue.png',
      },
      {
        name: 'Yellow',
        value: '#ead48d',
        image: 'public/garden yellow.png',
      },
      {
        name: 'Pink',
        value: '#d6b9bf',
        image: 'public/garden pink.png',
      },
    ],
    active: 0,
  },
  {
    id: 3,
    name: 'Puff Bag',
    price: '1,850,000 LAK',
    colors: [
      {
        name: 'pink',
        value: '#D0A6A4',
        image: 'public/puff pink.jpeg',
      },
      {
        name: 'Brown',
        value: '#341A13',
        image: 'public/puff brown.jpeg',
      },
    ],
    active: 0,
  },
  {
    id: 4,
    name: 'Candy Bag',
    price: '2,550,000 LAK',
    colors: [
      {
        name: 'Red',
        value: '#892C2B',
        image: 'public/candy red.jpeg',
      },
      {
        name: 'Brown',
        value: '#543D35',
        image: 'public/candy brown.jpeg',
      },
      {
        name: 'Black',
        value: '#000',
        image: 'public/candy black.jpeg',
      },
    ],
    active: 0,
  },
]

const selectedColors = ref(Object.fromEntries(products.map((p) => [p.id, p.active])))

function selectColor(productId, index) {
  selectedColors.value[productId] = index
}

function add(product) {
  const selectedIndex = selectedColors.value[product.id]
  const selectedColor = product.colors[selectedIndex]

  const productToAdd = {
    ...product,

    // Selected variant
    selectedColor: selectedColor,
    selectedColorIndex: selectedIndex,

    // Save selected image directly for Cart
    image: selectedColor.image,
  }

  emit('add-to-cart', productToAdd)

  notificationProduct.value = `${product.name} - ${selectedColor.name}`
  showNotification.value = true

  clearTimeout(notificationTimer)

  notificationTimer = setTimeout(() => {
    showNotification.value = false
  }, 2500)
}

const showNotification = ref(false)
const notificationProduct = ref('')

let notificationTimer = null
function buyNow(product) {
  const selectedIndex = selectedColors.value[product.id]

  const selectedColor = product.colors[selectedIndex]

  // Your WhatsApp number
  // Use international format WITHOUT +
  const phoneNumber = '8562095962779'

  const message = `
ສະບາຍດີ! ຂ້ອຍຕ້ອງການສັ່ງຊື້ສິນຄ້ານີ້:

ສິນຄ້າ: ${product.name}
ລາຄາ: ${product.price}
ສີ: ${selectedColor.name}
size: ${selectedColor.size}

ຂໍລາຍລະອຽດການສັ່ງຊື້ສິນຄ້າ,ຂໍຂອບໃຈ!
  `.trim()

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, '_blank')
}
</script>

<template>
  <section class="container-wide pb-12 pt-8 sm:pb-20 sm:pt-10">
    <!-- <button type="button" class="back-button" @click="$router.back()">
      <i class="fa-solid fa-arrow-left"></i>Back
    </button> -->
    <div class="brand-header">
      <div class="brand-title">ROCKFISH</div>
    </div>

    <div class="product-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <div class="product-photo">
          <img :src="product.colors[selectedColors[product.id]].image" :alt="product.name" />
        </div>
        <div class="product-info">
          <div class="product-details">
            <div>
              <h2 class="product-name">{{ product.name }}</h2>
              <p class="product-price">{{ product.price }}</p>
            </div>
            <div class="color-list">
              <button
                v-for="(color, index) in product.colors"
                :key="`${product.id}-${index}`"
                type="button"
                class="color-dot"
                :class="{ selected: selectedColors[product.id] === index }"
                :style="{ backgroundColor: color.value }"
                :aria-label="`Select${color.name}`"
                @click="selectColor(product.id, index)"
              ></button>
            </div>
            
          </div>
            

          <div class="mt-3 flex gap-2">
            <button type="button" class="add-button" @click="add(product)">Add Cart</button>
            <button type="button" class="buy-button" @click="$router.push('/checkoutpage')">
              Buy now
            </button>
          </div>
        </div>
      </article>
    </div>
    <!-- Add to Cart Notification -->
    <Transition name="toast">
      <div v-if="showNotification" class="cart-notification">
        <div class="notification-icon">
          <i class="fa-solid fa-check"></i>
        </div>

        <div class="notification-content">
          <strong>Added to cart</strong>

          <span> {{ notificationProduct }} has been added to your cart. </span>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.brand-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
  margin-top: 10px;
}
.brand-title {
  margin-top: 0;
  font-size: 36px;
  padding: 10px 20px;
  border-radius: 999px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: #feefb8;
  color: #a2c2dd;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  column-gap: 24px;
  row-gap: 24px;
  width: 100%;
}
.product-card {
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
  background: #f7f7f7;
}
.product-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
  padding: 24px;
}
.product-photo img {
  display: block;

  width: 70%;
  height: 100%;

  object-fit: contain;

  mix-blend-mode: multiply;

  transition: transform 0.3s ease;
}
.product-card:hover .product-photo img {
  transform: scale(1.03);
}
.color-dot {
  width: 12px;
  height: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  cursor: pointer;
  margin: 2px;
}
.product-info {
  padding: 10px 24px 20px;
}

.product-details {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 12px;
}

.product-name {
  margin: 0;

  font-size: 13px;
  line-height: 20px;

  font-weight: 500;
}

.product-price {
  margin: 4px 0 0;

  font-size: 18px;

  font-weight: 700;
}
.color-list {
  display: flex;

  align-items: center;

  gap: 6px;

  padding-bottom: 3px;
}

.color-dot {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  cursor: pointer;
}

.color-dot.selected {
  outline: 1px solid #432f2e;
  outline-offset: 2px;
}

.add-button,
.buy-button {
  margin-top: 8px;
  height: 32px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  justify-content: space-between;
}
.add-button {
  width: 94px;
  border: 1px solid #a2c2dd;
  color: #a2c2dd;
  background: transparent;
  margin-right: 8px;
}
.buy-button {
  width: 70%;
  flex: 1;
  border: 1px solid #a2c2dd;
  color: white;
  background: #a2c2dd;
}
.add-button:hover {
  background: #d9d9d9;
  color: #a2c2dd;
  border: none;
}
.buy-button:hover {
  background: #feefb8;
  border: none;
  color: #a2c2dd;
}

@media (max-width: 639px) {
  .product-photo {
    height: 240px;
  }
}
/* =========================================
   ADD TO CART NOTIFICATION
   ========================================= */

.cart-notification {
  position: fixed;

  right: 24px;
  bottom: 24px;

  z-index: 9999;

  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 340px;

  max-width: 420px;

  padding: 14px 16px;

  border: 1px solid rgba(255, 255, 255, 0.5);

  border-radius: 16px;

  /* Glass / Blur background */
  background: rgba(255, 255, 255, 0.72);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Check icon */

.notification-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #87576b;

  color: white;

  font-size: 13px;
}

/* Text */

.notification-content {
  display: flex;

  flex-direction: column;

  gap: 2px;

  flex: 1;
}

.notification-content strong {
  font-size: 13px;
  font-weight: 700;
  color: #222;
}

.notification-content span {
  font-size: 11px;
  line-height: 16px;
  color: #777;
}

/* View Cart */

/* =========================================
   TOAST ANIMATION
   ========================================= */

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 639px) {
  .cart-notification {
    left: 16px;
    right: 16px;
    bottom: 16px;
    min-width: 0;
    width: auto;
    max-width: none;
    padding: 12px;
  }

  .notification-content span {
    font-size: 10px;
  }
}
</style>
