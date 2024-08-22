<!-- AppHeader.vue -->
<template>
  <header class="sticky-header">
    <img class="header-logo" src="@/assets/dun-logo.svg" alt="Logo">
    <div class="menu-container">
      <button class="header-menu-btn" @click="toggleMenu">
        <img class="menu-icon" src="@/assets/dun-menu-icon.svg" alt="Menu">
      </button>
      <DropdownMenu v-if="showMenu" 
                    @showActiveTasks="showActiveTasks" 
                    @showCompletedTasks="showCompletedTasks" />
    </div>
  </header>
  
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

const clearFilter = () => {
  showActiveTasks();
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
  height: 1rem;
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
  align-content: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.wrapper-filter-text-btn button img{
  height: .7rem;
  display: block;
}
</style>