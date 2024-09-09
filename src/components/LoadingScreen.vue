<!-- LoadingScreen.vue -->
<template>
  <!-- Fade transition for loading screen with a logo -->
  <transition name="fade" @after-leave="onAfterLeave">
    <!-- Loading screen is visible until isVisible is set to false -->
    <div class="loading-screen" v-if="isVisible">
      <div class="logo-container">
        <img src="@/assets/dun-logo.svg" alt="Loading Logo" class="loading-logo">
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

// State to control the visibility of the loading screen
const isVisible = ref(true);

// Emit event to notify when loading is complete
const emit = defineEmits(['loading-complete']);

/**
 * Emits 'loading-complete' after the loading screen has faded out.
 */
const onAfterLeave = () => {
  emit('loading-complete');
};

/**
 * Hides the loading screen after a delay when the component is mounted.
 */
onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, 1250); // Duration for loading screen visibility; adjust as needed
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #182222;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 9999; /* Ensures the loading screen is above all content */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(30vh); /* Adjust this value as needed */
}

.loading-logo {
  width: 125px;
  height: 125px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease; /* Adjust fade-out duration as needed */
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
