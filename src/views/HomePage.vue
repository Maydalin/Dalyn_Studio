<script setup>
const categories = [
  { name: 'MUVA', slug: 'muva', image: 'public/muva2.jpg' },
  { name: 'SONGMONT', slug: 'songmont', image: 'public/songmont.jpg' },
  { name: 'MILOOEY', slug: 'milooey', image: 'public/milooey1.jpg' },
  { name: 'ROCKFISH', slug: 'rockfish', image: 'public/rockfish2.jpg' },
]

</script>

<template>
  <section class="container-wide pb-12 pt-12 sm:pb-20 sm:pt-14">
    <div class="product-brand-grid">
      <router-link
        v-for="category in categories"
        :key="category.name"
        :to="`/${category.slug}`"
        class="category-card"
      >
        <img :src="category.image" :alt="category.name" />

        <div class="category-overlay"></div>

        <span>{{ category.name }}</span>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.product-brand-grid {
  display: grid;
  /* EXACTLY 3 columns */
  grid-template-columns: repeat(2, 1fr);
  /* EXACTLY 2 rows */
  grid-template-rows: repeat(2, auto);
  margin-top: 20px;
  column-gap: 20px;
  row-gap: 20px;
  width: 100%;
}
.category-card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 20px;
  text-decoration: none;
}
.category-card img,
.category-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.category-card img {
  object-fit: cover;
  transition: transform 0.45s ease;
}
.category-overlay {
  background: rgba(0, 0, 0, 0.27);
  transition: background 0.25s ease;
}
.category-card:hover img {
  transform: scale(1.04);
}
.category-card:hover .category-overlay {
  background: rgba(0, 0, 0, 0.18);
}
.category-card span {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: white;
  font-size: clamp(26px, 2.3vw, 34px);
  font-weight: 700;
  font-size: 32px;
  letter-spacing: -0.03em;
}
@media (min-width: 1024px) {
  .product-brand-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    column-gap: 32px;
    row-gap: 32px;
  }
}
@media (max-width: 639px) {
  .product-brand-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 24px;
  }
}
</style>
