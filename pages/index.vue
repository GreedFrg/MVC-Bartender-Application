<template>
  <section class="center">
    <nav class="nav">
      <NuxtLink to="/menu" class="nav-btn">🍹 Menu</NuxtLink>
      <NuxtLink to="/orderQueue" class="nav-btn">📋 Order Queue</NuxtLink>
    </nav>
  </section>
</template>

<style scoped>
.center {
  min-height: calc(100vh - 160px);
  display: grid;
  place-items: center;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
@media (min-width: 640px) {
  .nav {
    flex-direction: row;
  }
}
.nav-btn {
  background: linear-gradient(145deg, #2c2c2c, #1b1b1b);
  border: 1px solid #444;
  color: #e5e5e5;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  transition: all 0.2s ease;
}
.nav-btn:hover {
  background: #66ccff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.6);
}
</style>
