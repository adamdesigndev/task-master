<!-- DropdownMenu.vue -->
<template>
    <div class="dropdown-menu">
      <button 
      @click="showActiveTasks" 
      :class="{ active: !isFilterOn, 'with-arrow': !isFilterOn }"
      >Active</button>
      <button 
      @click="showCompletedTasks" 
      :class="{ active: isFilterOn, 'with-arrow': isFilterOn }">Completed</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTaskFilter } from '@/composables/useTaskFilter';
  
  const filter = useTaskFilter();
  const isFilterOn = ref(filter.value === 'completed');
  const emit = defineEmits(['showActiveTasks', 'showCompletedTasks']);
  
  const showActiveTasks = () => {
    filter.value = 'active';
    isFilterOn.value = false;
    emit('showActiveTasks');
  };
  
  const showCompletedTasks = () => {
    filter.value = 'completed';
    isFilterOn.value = true;
    emit('showCompletedTasks');
  };
  </script>
  
  <style scoped>
  .dropdown-menu {
    position: absolute;
    top: 2rem;
    right: 0;
    min-width: 12rem;
    background: #E8E8E8;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: .8rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    border-radius: 0.5rem;
  }
  
  .dropdown-menu button {
    font-size: 1rem;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0);
    letter-spacing: 0.06rem;
    color: #000;
    padding: 0;
    border-radius: 30px;
    cursor: pointer;
    border: none;
    position: relative;
    min-width: 6rem;
    text-align: left;
  }
  
  .dropdown-menu button.with-arrow::after {
    content: url('@/assets/back-icon.svg');
    height: .5rem;
    width: .5rem;
    position: absolute;
    right: -4.3rem;
    top: 5px;
    transform: translateY(-50%);
  }
  </style>
  