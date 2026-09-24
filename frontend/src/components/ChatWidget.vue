<template>
  <Transition name="chat-slide">
    <div v-if="open" class="chat-widget" role="dialog" aria-label="Chat tư vấn AI">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-left">
          <div class="chat-avatar">
            <i class="fa-solid fa-fish"></i>
          </div>
          <div>
            <p class="chat-title">Trợ lý Minh Aquarium</p>
            <span class="chat-status"><span class="status-dot"></span> Đang hoạt động</span>
          </div>
        </div>
        <button class="chat-close" @click="$emit('close')" aria-label="Đóng chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Messages -->
      <div class="chat-body" ref="bodyRef">
        <!-- Welcome bubble -->
        <div class="msg bot">
          <div class="msg-avatar"><i class="fa-solid fa-fish"></i></div>
          <div class="msg-content">
            <div class="bubble">
              Xin chào! 👋 Tôi là trợ lý AI của <strong>Minh Aquarium</strong>.<br/>
              Bạn cần tư vấn về cá, tép, cây thủy sinh hay thiết bị? Cứ hỏi tôi nhé!
            </div>
            <span class="msg-time">Bây giờ</span>
          </div>
        </div>

        <!-- Quick suggestions -->
        <div v-if="messages.length === 0" class="quick-chips">
          <button
            v-for="chip in quickChips"
            :key="chip"
            class="chip"
            @click="sendChip(chip)"
          >{{ chip }}</button>
        </div>

        <!-- Dynamic messages -->
        <TransitionGroup name="msg-pop" tag="div">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['msg', msg.role]"
          >
            <div v-if="msg.role === 'bot'" class="msg-avatar">
              <i class="fa-solid fa-fish"></i>
            </div>
            <div class="msg-content">
              <div class="bubble" v-html="renderText(msg.text)"></div>
              <span class="msg-time">{{ msg.time }}</span>
            </div>
          </div>
        </TransitionGroup>

        <!-- Typing indicator -->
        <Transition name="msg-pop">
          <div v-if="isTyping" class="msg bot typing-row">
            <div class="msg-avatar"><i class="fa-solid fa-fish"></i></div>
            <div class="msg-content">
              <div class="bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Input -->
      <div class="chat-footer">
        <div class="chat-input-wrap" :class="{ focused: inputFocused }">
          <textarea
            ref="inputRef"
            v-model="inputText"
            placeholder="Nhập câu hỏi..."
            rows="1"
            @keydown.enter.exact.prevent="send"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            @input="autoResize"
          ></textarea>
          <button
            class="send-btn"
            :disabled="!inputText.trim() || isTyping"
            @click="send"
            aria-label="Gửi"
          >
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <p class="chat-hint">Nhấn <kbd>Enter</kbd> để gửi</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const props = defineProps({ open: Boolean })
defineEmits(['close'])

const messages   = ref([])
const inputText  = ref('')
const isTyping   = ref(false)
const inputFocused = ref(false)
const bodyRef    = ref(null)
const inputRef   = ref(null)

const quickChips = [
  'Cá betta nuôi cần lưu ý gì?',
  'Tép bee shrimp cần pH bao nhiêu?',
  'Cây thủy sinh nào dễ trồng nhất?',
  'Đặt lịch tư vấn setup bể',
]

function now() {
  return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

function renderText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}

async function send() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return

  messages.value.push({ role: 'user', text, time: now() })
  inputText.value = ''
  autoResize()
  scrollBottom()

  isTyping.value = true
  scrollBottom()

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })

    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const reply = data.reply || data.message || 'Xin lỗi, tôi chưa hiểu. Bạn thử hỏi lại nhé!'
    messages.value.push({ role: 'bot', text: reply, time: now() })
  } catch {
    messages.value.push({
      role: 'bot',
      text: 'Hiện tại tôi đang bận, bạn có thể gọi hotline **0123 456 789** hoặc chat Zalo để được hỗ trợ nhanh nhất nhé! 🐟',
      time: now(),
    })
  } finally {
    isTyping.value = false
    await nextTick()
    scrollBottom()
  }
}

function sendChip(chip) {
  inputText.value = chip
  send()
}

function scrollBottom() {
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    }
  })
}

function autoResize() {
  const el = inputRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 100) + 'px'
}

watch(() => props.open, (val) => {
  if (val) nextTick(() => inputRef.value?.focus())
})
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 84px;
  right: 20px;
  width: 360px;
  max-height: 520px;
  background: white;
  border-radius: var(--r-xl);
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 8900;
  border: 1px solid var(--border-light);
}

/* Header */
.chat-header {
  background: linear-gradient(135deg, #0a1f14, #1a6b45);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.chat-header-left { display: flex; align-items: center; gap: 10px; }
.chat-avatar {
  width: 38px; height: 38px;
  background: rgba(255,255,255,0.15);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; color: white;
  flex-shrink: 0;
}
.chat-title { font-size: 14px; font-weight: 700; color: white; margin-bottom: 2px; }
.chat-status {
  font-size: 11px;
  color: rgba(255,255,255,0.75);
  display: flex; align-items: center; gap: 5px;
}
.status-dot {
  width: 7px; height: 7px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
.chat-close {
  background: rgba(255,255,255,0.15);
  border: none;
  width: 30px; height: 30px;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  transition: background var(--t-fast);
}
.chat-close:hover { background: rgba(255,255,255,0.28); }

/* Body */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f9fdfb;
  scroll-behavior: smooth;
}
.chat-body::-webkit-scrollbar { width: 4px; }
.chat-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

/* Quick chips */
.quick-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}
.chip {
  padding: 5px 12px;
  background: var(--primary-light);
  border: 1px solid var(--primary);
  border-radius: var(--r-full);
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
  transition: all var(--t-fast);
  text-align: left;
}
.chip:hover { background: var(--primary); color: white; }

/* Messages */
.msg {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}
.msg.user { flex-direction: row-reverse; }

.msg-avatar {
  width: 30px; height: 30px;
  background: var(--primary);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; color: white;
  flex-shrink: 0;
}

.msg-content { display: flex; flex-direction: column; max-width: 78%; }
.msg.user .msg-content { align-items: flex-end; }

.bubble {
  padding: 9px 13px;
  border-radius: 16px;
  font-size: 13.5px;
  line-height: 1.55;
}
.msg.bot .bubble {
  background: white;
  color: var(--text-heading);
  border: 1px solid var(--border-light);
  border-radius: 4px 16px 16px 16px;
  box-shadow: var(--shadow-xs);
}
.msg.user .bubble {
  background: var(--primary);
  color: white;
  border-radius: 16px 4px 16px 16px;
}

.msg-time {
  font-size: 10px;
  color: var(--text-light);
  margin-top: 4px;
  padding: 0 4px;
}

/* Typing dots */
.typing { display: flex; gap: 4px; align-items: center; padding: 12px 16px; }
.typing span {
  width: 7px; height: 7px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1.1); opacity: 1; }
}

/* Footer */
.chat-footer {
  padding: 10px 12px 8px;
  border-top: 1px solid var(--border-light);
  background: white;
  flex-shrink: 0;
}
.chat-input-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  background: var(--bg);
  border: 1.5px solid var(--border);
  border-radius: var(--r-lg);
  padding: 7px 10px;
  transition: border-color var(--t-fast), box-shadow var(--t-fast);
}
.chat-input-wrap.focused {
  border-color: var(--primary);
  box-shadow: var(--shadow-glow);
  background: white;
}
.chat-input-wrap textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: var(--text-heading);
  resize: none;
  max-height: 100px;
  line-height: 1.5;
}
.chat-input-wrap textarea::placeholder { color: var(--text-light); }
.send-btn {
  width: 32px; height: 32px;
  background: var(--primary);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  flex-shrink: 0;
  transition: all var(--t-fast);
  display: flex; align-items: center; justify-content: center;
}
.send-btn:hover:not(:disabled) { background: var(--primary-dark); transform: scale(1.05); }
.send-btn:disabled { opacity: 0.45; cursor: not-allowed; }

.chat-hint {
  font-size: 10.5px;
  color: var(--text-light);
  text-align: center;
  margin-top: 5px;
}
.chat-hint kbd {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0 4px;
  font-size: 10px;
}

/* Transitions */
.chat-slide-enter-active,
.chat-slide-leave-active { transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); }
.chat-slide-enter-from,
.chat-slide-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }

.msg-pop-enter-active { animation: msgIn 0.25s ease; }
@keyframes msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .chat-widget { width: calc(100vw - 24px); right: 12px; bottom: 80px; }
}
</style>
