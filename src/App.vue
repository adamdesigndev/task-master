<!-- App.vue -->
<template>
  <div id="app-wrapper">
    <LoadingScreen v-if="isLoading" @loading-complete="handleLoadingScreenComplete" />
    <div :class="{'app-content-visible': !isLoading, 'app-content-hidden': isLoading}">
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

const handleDeleteTask = (taskId) => {
  // Logic to delete the task from your task list
  console.log(`Delete task with id: ${taskId}`);
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
}

.app-content-visible {
  opacity: 1;
  transition: opacity 0.5s ease; /* Matches the loading screen fade-out duration */
}

.app-content-hidden {
  opacity: 0;
}
</style>
