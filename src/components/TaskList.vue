<!-- TaskList.vue -->
<template>
  <div class="task-list">
    <!-- Add ref to TaskModal -->
    <TaskModal
      v-if="showTaskModal"
      @close="closeTaskModal"
      @save="saveTask"
      @delete="deleteTask"
      :task="currentTask"
      ref="taskModalRef"
    />
    <div>
      <transition-group name="list" tag="div">
        <div v-for="task in filteredTasks" :key="task.id" class="task-wrapper">
          <TaskContainer 
            :task="task" 
            @edit="editTask" 
            @complete="completeTask" 
            @toggle-mark="toggleMark" 
          />
        </div>
      </transition-group>
    </div>
    <button class="add-task-button" @click="openTaskModal"><img src="@/assets/add-button.svg" alt="add button"></button>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick } from 'vue';
import TaskModal from './TaskModal.vue';
import TaskContainer from './TaskContainer.vue';
import { useTaskFilter } from '@/composables/useTaskFilter';

const tasks = reactive([]);
const showTaskModal = ref(false);
const currentTask = ref(null);
const taskFilter = useTaskFilter();

// Add a ref for the TaskModal component
const taskModalRef = ref(null);

const openTaskModal = (task = null) => {
  currentTask.value = task || { name: '', details: '', completed: false, marked: false };
  showTaskModal.value = true;

  nextTick(() => {
    requestAnimationFrame(() => {
      // Use the correct ref
      if (taskModalRef.value && !currentTask.value.id) {
        taskModalRef.value.focusInput();
      }
    });
  });
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

// Toggle mark status and reorder the task list
const toggleMark = (task) => {
  const index = tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks.splice(index, 1); // Remove the task from its current position
    if (task.marked) {
      tasks.unshift(task); // Move task to the top if marked
    } else {
      tasks.push(task); // Move task to the end if unmarked
    }
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
  margin-bottom: .4rem;
  transition: all 0.3s ease;
}

.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
