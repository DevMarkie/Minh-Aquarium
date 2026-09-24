<template>
  <div id="layout">
    <AppHeader />
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <!-- Floating buttons -->
    <FloatingActions />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import FloatingActions from './components/FloatingActions.vue'
</script>

<style>
#layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content { flex: 1; }

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.28s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
