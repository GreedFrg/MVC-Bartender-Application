<template>
  <section class="panel">
    <h1 class="title">Order Queue</h1>
    <div class="actions">
      <button class="button-style" @click="load">Refresh</button>
    </div>
    <div v-if="loading" class="notice">Loading orders…</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else class="queue">
      <li v-for="o in orders" :key="o.id" class="row">
        <div class="info">
          <div class="main">
            <span class="id">#{{ o.id }}</span>
            <span class="name">{{ o.customer_name }}</span>
            <span class="drink">• {{ o.cocktail?.name }}</span>
          </div>
          <div class="meta">
            <span>Status:</span>
            <strong>{{ o.status }}</strong>
          </div>
        </div>
        <div class="controls">
          <button class="button-style" @click="setStatus(o.id, 'PREPARING')">Preparing</button>
          <button class="button-style" @click="setStatus(o.id, 'READY')">Ready</button>
          <button class="button-style" @click="setStatus(o.id, 'PICKED_UP')">Picked up</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const orders = ref([])
const loading = ref(false)
const error = ref(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await $fetch('/api/orders')
    orders.value = Array.isArray(res) ? res : []
  } catch (e) {
    error.value = (e && e.data && e.data.error) || 'Failed to load orders'
  } finally {
    loading.value = false
  }
}

async function setStatus(id, status) {
  try {
    await $fetch(`/api/orders/${id}`, { method: 'PATCH', body: { status } })
    await load()
  } catch (e) {
    error.value = (e && e.data && e.data.error) || 'Update failed'
  }
}

onMounted(load)
</script>

<style scoped>
.panel {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.25rem;
}
.title { margin: 0 0 0.5rem 0; font-size: 1.6rem; }
.actions { margin-bottom: 0.75rem; }
.notice { color: #b5b5b5; }
.error { color: #ff6b6b; }
.queue { list-style: none; margin: 0; padding: 0; }
.row {
  display: flex; gap: 1rem; justify-content: space-between; align-items: center;
  padding: 0.9rem 0; border-top: 1px solid #333;
}
.row:first-child { border-top: none; }
.info .main { display: flex; gap: 0.5rem; align-items: baseline; }
.id { color: #b5b5b5; }
.meta { color: #b5b5b5; margin-top: 0.25rem; }
.controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }
</style>