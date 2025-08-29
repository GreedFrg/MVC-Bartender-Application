<template>
  <section class="panel">
    <h1 class="title">Cocktail Menu</h1>

    <!-- Patron name -->
    <form class="form" @submit.prevent>
      <div class="field">
        <label for="name">Your name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="e.g., Alex"
          required
        />
      </div>
    </form>

    <!-- Loading / Error -->
    <div v-if="pending" class="notice">Loading menu…</div>
    <div v-else-if="menuError" class="error">Failed to load menu. Please try again.</div>

    <!-- Menu grid: each item is a clickable card to place the order -->
    <div v-else class="grid">
      <button
        v-for="c in menu"
        :key="c.id"
        class="card"
        :disabled="submitting || !name"
        @click="place(c)"
        :aria-label="`Order ${c.name} for ${name || 'your name'}`"
      >
        <div class="card-head">
          <h3 class="card-title">{{ c.name }}</h3>
          <span class="card-price">${{ Number(c.price).toFixed(2) }}</span>
        </div>
        <p class="card-desc">{{ c.description }}</p>
        <div class="card-cta">
          <span v-if="!name" class="hint">Enter your name to order</span>
          <span v-else-if="submittingId === c.id" class="hint">Placing…</span>
          <span v-else class="cta">Add to order</span>
        </div>
      </button>
    </div>

    <!-- Messages -->
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Order placed! Redirecting…</p>
  </section>
</template>

<script setup>
const { data: menu, pending, error: menuError } = await useFetch('/api/menu')

const name = ref('')
const error = ref(null)
const success = ref(false)
const submitting = ref(false)
const submittingId = ref(null) // which item is being submitted

async function place(cocktail) {
  if (!name.value) {
    error.value = 'Please enter your name first.'
    return
  }
  error.value = null
  success.value = false
  try {
    submitting.value = true
    submittingId.value = cocktail.id
    await $fetch('/api/orders', {
      method: 'POST',
      body: { customer_name: name.value, cocktail_id: Number(cocktail.id) }
    })
    success.value = true
    // brief confirmation then go to queue
    setTimeout(() => navigateTo('/orderQueue?justOrdered=1'), 500)
  } catch (e) {
    error.value = (e && e.data && e.data.error) || 'Failed to place order. Please try again.'
  } finally {
    submitting.value = false
    submittingId.value = null
  }
}
</script>

<style scoped>
.panel {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.03) inset;
}

.title { margin: 0 0 0.75rem 0; font-size: 1.6rem; }

.form { margin-bottom: 0.75rem; }
.field { display: grid; gap: 0.35rem; }
label { font-size: 0.95rem; color: #b5b5b5; }
input {
  background: #252525; color: #e5e5e5; border: 1px solid #444;
  border-radius: 8px; padding: 10px; font-size: 0.95rem; outline: none;
}
input:focus { border-color: #66ccff; }

.notice { color: #b5b5b5; }
.error { color: #ff6b6b; margin-top: 0.5rem; }
.success { color: #7bd88f; margin-top: 0.5rem; }

/* Grid of clickable cards */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 0.5rem;
}
@media (min-width: 560px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

.card {
  width: 100%;
  text-align: left;
  background: linear-gradient(145deg, #1f1f1f, #1a1a1a);
  border: 1px solid #333;
  color: #e5e5e5;
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.5);
  border-color: #444;
}
.card:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.card-head {
  display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem;
}
.card-title { font-size: 1.05rem; font-weight: 700; }
.card-price { color: #b5b5b5; }

.card-desc {
  margin: 0.35rem 0 0.5rem 0;
  color: #b5b5b5;
  line-height: 1.35;
  min-height: 2.6em; /* keep heights consistent across cards */
}

.card-cta {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 0.25rem;
}
.cta {
  background: #2c2c2c;
  border: 1px solid #444;
  color: #e5e5e5;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
}
.card:hover .cta {
  background: #66ccff; color: #000; border-color: #66ccff;
}
.hint { color: #b5b5b5; font-size: 0.9rem; }
</style>
