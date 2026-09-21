<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => [],
  },
})

const showReceiptForm = ref(false)

const customerName = ref('')
const customerPhone = ref('')
const paymentAmount = ref('')
const paymentDate = ref('')
const paymentMethod = ref('QR Payment')
const receiptFile = ref(null)

const total = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    const price = Number(String(item.price).replace(/[^0-9]/g, ''))

    return sum + price * item.quantity
  }, 0)
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US').format(price) + ' LAK'
}

function askForDetails() {
  const items = props.cartItems
    .map((item) => {
      const color = item.selectedColor?.name || 'N/A'

      return `• ${item.name} - ${color} × ${item.quantity} - ${item.price}`
    })
    .join('\n')

  const message = `
ສະບາຍດີ! ຂ້ອຍສົນໃຈສິນຄ້ານີ້:

${items}

ລວມທັງໝົດ: ${formatPrice(total.value)}

ຂ້ອຍຕ້ອງການສອບຖາມລາຍລະອຽດເພີ່ມ.
  `.trim()

  const phoneNumber = '8562095962779'

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, '_blank')
}

function handleReceiptFile(event) {
  receiptFile.value = event.target.files[0] || null
}

function sendReceipt() {
  if (!customerName.value.trim()) {
    alert('Please enter your name.')
    return
  }

  if (!customerPhone.value.trim()) {
    alert('Please enter your WhatsApp number.')
    return
  }

  if (!paymentAmount.value.trim()) {
    alert('Please enter the payment amount.')
    return
  }

  if (!paymentDate.value) {
    alert('Please select the payment date.')
    return
  }

  if (!receiptFile.value) {
    alert('Please select your payment receipt.')
    return
  }

  const items = props.cartItems
    .map((item) => {
      const color = item.selectedColor?.name || 'N/A'

      return `• ${item.name} - ${color} × ${item.quantity}`
    })
    .join('\n')

  const message = `
PAYMENT RECEIPT

Customer Name: ${customerName.value}
WhatsApp: ${customerPhone.value}

Order:
${items}

Order Total: ${formatPrice(total.value)}
Payment Amount: ${paymentAmount.value}
Payment Date: ${paymentDate.value}
Payment Method: ${paymentMethod.value}

Receipt: I will attach the payment receipt image in this chat.

Thank you!
  `.trim()

  const phoneNumber = '8562095962779'

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, '_blank')
}
</script>

<template>
  <section class="checkout-page">
    <!-- Header -->
    <div class="checkout-header">
      <button type="button" class="back-button" @click="$router.back()">
        <i class="fa-solid fa-arrow-left"></i>
        Back
      </button>

      <h2>Payment</h2>
    </div>

    <div class="checkout-layout">
      <!-- LEFT -->
      <div class="checkout-main">
        <!-- ORDER SUMMARY -->
        <div class="checkout-card">
          <h2>Your Order</h2>

          <div
            v-for="item in cartItems"
            :key="`${item.id}-${item.selectedColor?.name}`"
            class="order-item"
          >
            <img :src="item.image" :alt="item.name" class="order-image" />

            <div class="order-info">
              <h3>{{ item.name }}</h3>

              <p v-if="item.selectedColor">Color: {{ item.selectedColor.name }}</p>

              <p>Qty: {{ item.quantity }}</p>
            </div>

            <div class="order-price">
              {{ item.price }}
            </div>
          </div>

          <div class="total-row">
            <span>Total</span>
            <strong>{{ formatPrice(total) }}</strong>
          </div>
        </div>

        <!-- PAYMENT -->
        <div class="checkout-card payment-card">
          <h2>Payment</h2>

          <p class="payment-description">Scan the QR code below to complete your payment.</p>

          <div class="qr-container">
            <img src="/qr-payment.jpg" alt="Shop payment QR code" class="qr-image" />
          </div>

          <p class="qr-note">Please make sure the payment amount matches your order total.</p>
        </div>
        <!-- RECEIPT -->
        <div class="checkout-card receipt-card">
          <div class="receipt-header">
            <div>
              <h2>Already paid?</h2>

              <p class="section-description">Send us your payment receipt to confirm your order.</p>
            </div>
          </div>

          <button
            v-if="!showReceiptForm"
            type="button"
            class="receipt-button"
            @click="showReceiptForm = true"
          >
            <i class="fa-solid fa-receipt"></i>
            Send Payment Receipt
          </button>

          <!-- RECEIPT FORM -->
          <form v-else class="receipt-form" @submit.prevent="sendReceipt">
            <div class="form-group">
              <label> Full Name <span>*</span> </label>

              <input v-model="customerName" type="text" placeholder="Enter your full name" />
            </div>

            <div class="form-group">
              <label> WhatsApp Number <span>*</span> </label>

              <input v-model="customerPhone" type="tel" placeholder="20xxxxxxxx" />
            </div>

            <div class="form-group">
              <label> Payment Amount <span>*</span> </label>

              <input v-model="paymentAmount" type="text" :placeholder="formatPrice(total)" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label> Payment Date <span>*</span> </label>

                <input v-model="paymentDate" type="date" />
              </div>

              <div class="form-group">
                <label>Payment Method</label>

                <select v-model="paymentMethod">
                  <option>QR Payment</option>
                  <option>Bank Transfer</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label> Payment Receipt <span>*</span> </label>

              <label class="file-upload">
                <i class="fa-solid fa-cloud-arrow-up"></i>

                <span>
                  {{ receiptFile ? receiptFile.name : 'Choose receipt image' }}
                </span>

                <input type="file" accept="image/*" @change="handleReceiptFile" />
              </label>
            </div>

            <div class="form-actions">
              <button type="button" class="cancel-button" @click="showReceiptForm = false">
                Cancel
              </button>

              <button type="submit" class="send-button">
                <i class="fa-brands fa-whatsapp"></i>
                Save & Send Receipt
              </button>
            </div>
          </form>
        </div>
        <!-- QUESTIONS -->
        <div class="checkout-card">
          <h2>Need more details?</h2>

          <p class="section-description">
            If you have questions about the product, color, stock, delivery, or payment, contact us
            on WhatsApp.
          </p>

          <button type="button" class="whatsapp-button" @click="askForDetails">
            <i class="fa-brands fa-whatsapp"></i>
            Ask for more details
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.checkout-page {
  width: min(100%, 1300px);
  margin: 0 auto;
  padding: 20px 24px 80px;
}

/* HEADER */

.checkout-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}

.checkout-header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 13px;
}

/* CARDS */

.checkout-card {
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  background: white;
}

.checkout-card h2 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
}

.section-description,
.payment-description {
  margin: 0 0 20px;
  color: #777;
  font-size: 13px;
  line-height: 20px;
}

/* ORDER */

.order-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #eeeeee;
}

.order-image {
  width: 80px;
  height: 80px;
  padding: 8px;
  border-radius: 12px;
  object-fit: contain;
  background: #f7f7f7;
  mix-blend-mode: multiply;
}

.order-info {
  flex: 1;
}

.order-info h3 {
  margin: 0 0 5px;
  font-size: 14px;
  font-weight: 600;
}

.order-info p {
  margin: 2px 0;
  color: #777;
  font-size: 12px;
}

.order-price {
  font-size: 13px;
  font-weight: 600;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  font-size: 14px;
}

.total-row strong {
  font-size: 20px;
}

/* QR */

.payment-card {
  text-align: center;
}

.payment-card h2 {
  text-align: left;
}

.payment-description {
  text-align: left;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.qr-image {
  width: 260px;
  height: 260px;
  object-fit: contain;
}

.qr-note {
  margin: 0;
  color: #888;
  font-size: 11px;
}

/* BUTTONS */

.whatsapp-button,
.receipt-button,
.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.whatsapp-button,
.send-button {
  background: #f4f4f4;
  color: #87576b;
}

.receipt-button {
  background: #87576b;
  color: white;
}

/* FORM */

.receipt-form {
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
}

.form-group label span {
  color: #87576b;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 42px;
  padding: 0 13px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background: white;
  outline: none;
  font-size: 13px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #87576b;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* FILE */

.file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 14px;
  border: 1px dashed #cccccc;
  border-radius: 10px;
  color: #777;
  cursor: pointer;
  font-size: 12px;
}

.file-upload input {
  display: none;
}

/* ACTIONS */

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.cancel-button {
  width: 120px;
  height: 44px;
  border: none;
  border-radius: 999px;
  background: #f2f2f2;
  cursor: pointer;
}

.form-actions .send-button {
  flex: 1;
}

/* MOBILE */

@media (max-width: 639px) {
  .checkout-page {
    padding: 24px 16px 60px;
  }

  .checkout-header {
    gap: 12px;
  }

  .checkout-header h1 {
    font-size: 26px;
  }

  .checkout-card {
    padding: 18px;
  }

  .order-item {
    align-items: flex-start;
  }

  .order-image {
    width: 64px;
    height: 64px;
  }

  .order-price {
    font-size: 11px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .cancel-button {
    width: 100%;
  }
}
</style>
