<!-- AppHeader.vue -->
<template>
  <!-- Header section with logo and menu button -->
  <header class="sticky-header">
    <img class="header-logo" src="@/assets/dun-logo.svg" alt="Logo">
    <div class="menu-container">
      <!-- Button to toggle the dropdown menu -->
      <button class="header-menu-btn" @click="toggleMenu">
        <img class="menu-icon" src="@/assets/dun-menu-icon.svg" alt="Menu">
      </button>
      <!-- Dropdown menu for task filters -->
      <DropdownMenu v-if="showMenu" 
                    @showActiveTasks="showActiveTasks" 
                    @showCompletedTasks="showCompletedTasks" />
    </div>
  </header>
  
  <!-- Section to display filter status and option to clear the filter -->
  <div v-if="isFilterOn" class="wrapper-filtered-by">
    <div class="wrapper-filter-text-btn">
      <p>Filtered by: Completed</p>
      <button @click="clearFilter"><img src="@/assets/dun-x-icon.svg" alt="x"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useTaskFilter } from '@/composables/useTaskFilter';
import { activeMenu } from '@/eventBus';

// State management for menu visibility and task filter
const showMenu = ref(false);
const filter = useTaskFilter();
const isFilterOn = ref(filter.value === 'completed');

/**
 * Toggles the visibility of the dropdown menu.
 * Ensures only one active menu at a time using a global event bus.
 */
const toggleMenu = () => {
  if (showMenu.value) {
    showMenu.value = false;
    activeMenu.value = null;
  } else {
    if (activeMenu.value && activeMenu.value !== showMenu) {
      activeMenu.value.value = false;
    }
    showMenu.value = true;
    activeMenu.value = showMenu;
  }
};

/**
 * Sets the filter to show active tasks and closes the menu.
 */
const showActiveTasks = () => {
  filter.value = 'active';
  isFilterOn.value = false;
  showMenu.value = false;
  activeMenu.value = null;
};

/**
 * Sets the filter to show completed tasks and closes the menu.
 */
const showCompletedTasks = () => {
  filter.value = 'completed';
  isFilterOn.value = true;
  showMenu.value = false;
  activeMenu.value = null;
};

/**
 * Clears the task filter by resetting to show active tasks.
 */
const clearFilter = () => {
  showActiveTasks();
};

/**
 * Closes the menu when clicking outside the menu container.
 */
const handleClickOutside = (event) => {
  if (!event.target.closest('.menu-container')) {
    showMenu.value = false;
    if (activeMenu.value === showMenu) {
      activeMenu.value = null;
    }
  }
};

// Add event listeners for handling clicks outside the menu
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.header-logo {
  height: 2.4rem;
  width: 2.4rem;
}

.header-menu-btn {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
}

.menu-icon {
  height: 1rem;
}

.sticky-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: var(--clr-background);
  z-index: 1000;
  padding: 0rem 0rem 1rem 0rem;
}

.menu-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wrapper-filtered-by {
  display: flex;
  flex-direction: row;
}

.wrapper-filter-text-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .8rem;
  background-color: var(--clr-accent-200);
  padding: .1rem .5rem;
  border-radius: 5px;
}

.wrapper-filter-text-btn p {
  font-size: 1rem;
  color: var(--clr-accent-100);
  text-align: left;
  letter-spacing: 0.05rem;
}

.wrapper-filter-text-btn button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: var(--clr-accent-100);
  padding: .1rem;
  cursor: pointer;
}

.wrapper-filter-text-btn button img {
  height: .7rem;
  display: block;
}
</style>
