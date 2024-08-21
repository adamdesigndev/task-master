<!-- TaskList.vue -->
<template>
  <div class="task-list">
    <TaskModal v-if="showTaskModal" @close="closeTaskModal" @save="saveTask" @delete="deleteTask" :task="currentTask" />
    <div>
      <div v-for="task in filteredTasks" :key="task.id" class="task-wrapper">
        <TaskContainer 
        :task="task" 
        @edit="editTask" 
        @complete="completeTask" 
        />
      </div>
    </div>
    <button class="add-task-button" @click="openTaskModal"><img src="@/assets/add-button.svg" alt="add button"></button>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import TaskModal from './TaskModal.vue';
import TaskContainer from './TaskContainer.vue';
import { useTaskFilter } from '@/composables/useTaskFilter';

const tasks = reactive([]);
const showTaskModal = ref(false);
const currentTask = ref(null);
const taskFilter = useTaskFilter();

const openTaskModal = (task = null) => {
  currentTask.value = task || { name: '', details: '', completed: false };
  showTaskModal.value = true;
};

const closeTaskModal = () => {
  showTaskModal.value = false;
  currentTask.value = null;
};

const saveTask = (task) => {
  if (task.id) {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
    }
  } else {
    task.id = Date.now();
    tasks.push(task);
  }
  saveTasksToLocalStorage();
};

const editTask = (task) => {
  openTaskModal(task);
};

const deleteTask = (taskId) => {
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  saveTasksToLocalStorage();
  closeTaskModal(); // Ensure modal is closed after deletion
};

const completeTask = (task) => {
  const index = tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks[index].completed = task.completed;
    tasks.push(tasks.splice(index, 1)[0]); // Move the task to the end of the list to ensure reactivity
  }
  saveTasksToLocalStorage();
};

const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.push(...JSON.parse(savedTasks));
  }
};

const filteredTasks = computed(() => {
  return taskFilter.value === 'active' ? tasks.filter(t => !t.completed) : tasks.filter(t => t.completed);
});

onMounted(loadTasksFromLocalStorage);
</script>

<style scoped>
.task-list {
  flex: 1;
  overflow-y: auto;
  padding: .3rem 0px 60px 0px;
}

.add-task-button {
  height: 60px;
  width: 60px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #232323;
  color: #fff;
  border: none;
  padding: 1px;
  border-radius: 3rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.task-wrapper {
  margin-bottom: 10px;
}
</style>