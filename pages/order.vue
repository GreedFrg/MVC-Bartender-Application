<template>
  <section class="panel">
    <h1 class="title">Place an Order</h1>
    <p class="subtitle">Use the menu page to choose a cocktail and submit your order.</p>
    <NuxtLink to="/menu" class="button-style">Go to Menu</NuxtLink>
  </section>
</template>

<style scoped>
.panel {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.25rem;
}
.title { margin: 0 0 0.5rem 0; font-size: 1.6rem; }
.subtitle { color: #b5b5b5; margin-bottom: 1rem; }
</style>