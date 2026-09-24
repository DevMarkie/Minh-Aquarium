// Global cart store using localStorage
import { ref, computed } from 'vue'

const CART_KEY = 'minhaq_cart_v2'

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY)) || []
    return Array.isArray(raw) ? raw : []
  } catch { return [] }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

// Reactive shared state
const items = ref(loadCart())

const totalCount = computed(() =>
  items.value.reduce((s, i) => s + (i.qty || 0), 0)
)

const totalPrice = computed(() =>
  items.value.reduce((s, i) => s + (i.price * (i.qty || 0)), 0)
)

function addItem(product, qty = 1) {
  const existing = items.value.find(i => i.id === product.id)
  if (existing) {
    existing.qty += qty
  } else {
    items.value.push({ ...product, qty })
  }
  saveCart(items.value)
}

function removeItem(id) {
  items.value = items.value.filter(i => i.id !== id)
  saveCart(items.value)
}

function updateQty(id, qty) {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.qty = Math.max(1, qty)
    saveCart(items.value)
  }
}

function clearCart() {
  items.value = []
  saveCart([])
}

export function useCart() {
  return { items, totalCount, totalPrice, addItem, removeItem, updateQty, clearCart }
}
