<!-- DropdownMenu.vue -->
<template>
  <!-- Dropdown menu with buttons to filter tasks by status -->
  <div class="dropdown-menu">
    <!-- Button to show active tasks; highlights when active filter is not 'completed' -->
    <button 
      @click="showActiveTasks" 
      :class="{ active: !isFilterOn }"
    >
      Active
    </button>
    <!-- Button to show completed tasks; highlights when active filter is 'completed' -->
    <button 
      @click="showCompletedTasks" 
      :class="{ active: isFilterOn }"
    >
      Completed
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskFilter } from '@/composables/useTaskFilter';

// Use composable to manage task filter state
const filter = useTaskFilter();
const isFilterOn = ref(filter.value === 'completed'); // Determine if the 'completed' filter is active
const emit = defineEmits(['showActiveTasks', 'showCompletedTasks']);

/**
 * Sets the filter to show active tasks and emits an event to the parent component.
 */
const showActiveTasks = () => {
  filter.value = 'active';
  isFilterOn.value = false;
  emit('showActiveTasks');
};

/**
 * Sets the filter to show completed tasks and emits an event to the parent component.
 */
const showCompletedTasks = () => {
  filter.value = 'completed';
  isFilterOn.value = true;
  emit('showCompletedTasks');
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: -.3rem;
  left: -11rem;
  display: flex;
  flex-direction: row;
  gap: .3rem;
}

.dropdown-menu button {
  font-size: .8rem;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0);
  letter-spacing: 0.06rem;
  color: #dbdbdb;
  padding: .3rem .7rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-menu button.active {
  background-color: var(--clr-secondary-background);
  color: white;
}
</style>
