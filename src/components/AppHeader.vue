<!-- AppHeader.vue -->
<template>
  <header class="sticky-header">
    <img class="header-logo" src="@/assets/done-logo.svg" alt="Logo">
    <div class="menu-container">
      <span v-if="isFilterOn" class="filter-label">Filtered by: Completed</span>
      <button class="header-menu-btn" @click="toggleMenu">
        <img class="menu-icon" src="@/assets/menu-icon.svg" alt="Menu">
      </button>
      <DropdownMenu v-if="showMenu" 
      @showActiveTasks="showActiveTasks" 
      @showCompletedTasks="showCompletedTasks" />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useTaskFilter } from '@/composables/useTaskFilter';
import { activeMenu } from '@/eventBus';

const showMenu = ref(false);
const filter = useTaskFilter();
const isFilterOn = ref(filter.value === 'completed');

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

const showActiveTasks = () => {
  filter.value = 'active';
  isFilterOn.value = false;
  showMenu.value = false;
  activeMenu.value = null;
};

const showCompletedTasks = () => {
  filter.value = 'completed';
  isFilterOn.value = true;
  showMenu.value = false;
  activeMenu.value = null;
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.menu-container')) {
    showMenu.value = false;
    if (activeMenu.value === showMenu) {
      activeMenu.value = null;
    }
  }
};

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
  height: 1.8rem;
  width: 1.8rem;
}

.sticky-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  background-color: var(--clr-background);
  z-index: 1000;
  padding: 1rem 0rem;
}

.menu-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-size: .8rem;
  letter-spacing: 0.08rem;
  font-weight: 500;
  color: #fff;
}
</style>
