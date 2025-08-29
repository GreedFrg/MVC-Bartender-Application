<template>
  <div class="page">
    <header class="header">
      <div>
        <strong><NuxtLink to="/" class="logo">Bartender Service</NuxtLink></strong>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Bartender Service</p>
    </footer>
  </div>
</template>

<style scoped>
:global(body), :global(html) {
  margin: 0;
  padding: 0;
  height: 100%;
}
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #121212;
  color: #e5e5e5;
  font-family: Arial, sans-serif;
}
.header {
  padding: 1rem;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  text-align: center;
}
.logo {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.25rem;
}
.logo:hover { color: #66ccff; }
.main {
  flex: 1;
  display: block;
  padding: 1.25rem;
}
.footer {
  padding: 1rem;
  background-color: #1e1e1e;
  border-top: 1px solid #333;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
}
/* shared button */
.button-style {
  background-color: #2c2c2c;
  border: 1px solid #444;
  color: #e5e5e5;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
  min-width: 180px;
}
.button-style:hover { background-color: #66ccff; color: #000; }
</style>