<!-- App.vue -->
<template>
  <div id="app-wrapper">
    <LoadingScreen v-if="isLoading" @loading-complete="handleLoadingScreenComplete" />
    <AppHeader v-if="!isLoading" />
    <div v-if="!isLoading">
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
  background-color: #232323;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
</style>