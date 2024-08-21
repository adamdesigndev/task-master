<!-- DropdownMenu.vue -->
<template>
  <div class="dropdown-menu">
    <button 
      @click="showActiveTasks" 
      :class="{ active: !isFilterOn }"
    >
      Active
    </button>
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
  position: relative;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-menu button.active {
  background-color: var(--clr-secondary-background); /* Change this color to whatever suits your theme */
  color: white;
}
</style>
