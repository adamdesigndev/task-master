<!-- LoadingScreen.vue -->
<template>
  <transition name="fade" @after-leave="onAfterLeave">
    <div class="loading-screen" v-if="isVisible">
      <div class="logo-container">
        <img src="@/assets/dun-logo.svg" alt="Loading Logo" class="loading-logo">
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const isVisible = ref(true);
const emit = defineEmits(['loading-complete']);

const onAfterLeave = () => {
  emit('loading-complete');
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, 1000); // This duration controls how long the loading screen is visible
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--clr-accent-200);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items at the top */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(30vh); /* Move the logo down by 25% of the viewport height */
}

.loading-logo {
  width: 100px;
  height: 100px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease; /* This duration matches the app content transition */
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
