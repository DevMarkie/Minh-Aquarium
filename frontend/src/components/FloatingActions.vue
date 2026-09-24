<template>
  <div class="floaters">
    <!-- Zalo -->
    <a href="https://zalo.me/0123456789" target="_blank" class="floater zalo" aria-label="Chat Zalo">
      <i class="fa-solid fa-comment-dots"></i>
    </a>

    <!-- Chat AI toggle -->
    <button
      class="floater chat-ai"
      :class="{ active: chatOpen }"
      @click="chatOpen = !chatOpen"
      aria-label="Chat tư vấn AI"
    >
      <i :class="chatOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-comments'"></i>
      <span v-if="!chatOpen" class="chat-pulse"></span>
    </button>

    <!-- Scroll top -->
    <Transition name="fade-up">
      <button v-if="showScrollTop" class="floater scroll-top" @click="scrollTop" aria-label="Lên đầu trang">
        <i class="fa-solid fa-chevron-up"></i>
      </button>
    </Transition>

    <!-- Chat Widget -->
    <ChatWidget :open="chatOpen" @close="chatOpen = false" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ChatWidget from './ChatWidget.vue'

const showScrollTop = ref(false)
const chatOpen = ref(false)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.floaters {
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.floater {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  border: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform var(--t-fast), box-shadow var(--t-fast), background var(--t-fast);
  position: relative;
}
.floater:hover { transform: scale(1.12) translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.28); }

.zalo { background: #0068ff; }
.chat-ai { background: var(--primary); font-size: 22px; }
.chat-ai.active { background: var(--primary-dark); }
.scroll-top { background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); font-size: 16px; width: 42px; height: 42px; }

/* Pulse ring */
.chat-pulse {
  position: absolute;
  top: -2px; right: -2px;
  width: 14px; height: 14px;
  background: var(--accent);
  border-radius: 50%;
  border: 2px solid white;
  animation: chatBounce 2s infinite;
}
@keyframes chatBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Transitions */
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.25s ease; }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(12px); }
</style>
