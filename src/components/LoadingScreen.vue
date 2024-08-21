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
  }, 1500); // Adjust this time to match the duration you want the logo to be visible
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
  align-items: center;
  z-index: 9999;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease; /* Adjust the duration for fading */
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-logo {
  
  width: 100px;
  height: 100px;
}
</style>
