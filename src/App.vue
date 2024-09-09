<!-- App.vue -->
<template>
  <div id="app-wrapper">
    <LoadingScreen v-if="isLoading" @loading-complete="handleLoadingScreenComplete" />
    <div class="app-content">
      <AppHeader />
      <TaskList @delete-task="handleDeleteTask" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoadingScreen from './components/LoadingScreen.vue';
import AppHeader from './components/AppHeader.vue';
import TaskList from './components/TaskList.vue';

const isLoading = ref(true);

const handleLoadingScreenComplete = () => {
  isLoading.value = false;
};
</script>

<style scoped>
#app-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--clr-background);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.app-content {
  opacity: 1;
  transition: opacity 0.5s ease;
}
</style>
