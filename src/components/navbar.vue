'
<script setup></script>

<template>
  <header class="header">
    <!-- Logo -->
    <router-link to="/" aria-label="DALYNN home" class="flex shrink-0 items-center">
      <img src="/logo.png" alt="DALYNN" class="h-auto w-[140px] sm:w-[160px]" />
    </router-link>
    <!-- Social buttons -->
    <div class="social-buttons">
        <a
        class="social-pill shrink-0"
        href="https://www.instagram.com/dalyn_studio?igsh=aHdvbzZucHN3aHVp&utm_source=qr"
      >
        <i class="fa-brands fa-tiktok"></i>
        <span>TikTok</span>
      </a>
      <!-- Instagram -->
      <a
        class="social-pill shrink-0"
        href="https://www.instagram.com/dalyn_studio?igsh=aHdvbzZucHN3aHVp&utm_source=qr"
      >
        <i class="fa-brands fa-instagram"></i>
        <span>Instagram</span>
      </a>
      <!-- Facebook -->
      <a class="social-pill shrink-0" href="#">
        <i class="fa-brands fa-facebook"></i>
        <span>Facebook</span>
      </a>
      <!-- WhatsApp -->
      <a
        class="social-pill shrink-0"
        href="https://wa.me/8562095962779?text=Hello%20Dalyn!"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa-brands fa-whatsapp"></i>
        <span>Whatsapp</span>
      </a>
      <!-- Cart count -->
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
.social-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.social-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 110px;
  height: 39px;
  padding: 0 13px;
  border: 1.3px solid #87576b;
  border-radius: 999px;
  color: #87576b;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
}
.social-pill:hover {
  background: #87576b;
  color: white;
}
.social-pill svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}

@media (max-width: 700px) {
  .social-pill {
    min-width: 39px;
    width: 39px;
    padding: 0;
  }
  .social-pill span {
    display: none;
  }
}
</style>
