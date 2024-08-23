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
      <transition-group 
        name="list" 
        tag="div"
        @before-leave="beforeLeave"
        @leave="leave"
        :css="!isFiltering"
      >
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
import { reactive, ref, computed, onMounted, nextTick, watch } from 'vue';
import TaskModal from './TaskModal.vue';
import TaskContainer from './TaskContainer.vue';
import { useTaskFilter } from '@/composables/useTaskFilter';

const tasks = reactive([]);
const showTaskModal = ref(false);
const currentTask = ref(null);
const taskFilter = useTaskFilter();
const isFiltering = ref(false);

// Add a ref for the TaskModal component
const taskModalRef = ref(null);

const openTaskModal = (task = null) => {
  currentTask.value = task || { id: null, name: '', details: '', completed: false, marked: false };
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
    // Assign a unique ID using Date.now()
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

    // Remove the task from its current position
    const [movedTask] = tasks.splice(index, 1);

    if (task.completed) {
      // If the task is completed, push it to the end of the list
      tasks.push(movedTask);
    } else {
      // If the task is reactivated and marked, move it to the top
      if (task.marked) {
        tasks.unshift(movedTask);
      } else {
        // Move task to the end if unmarked
        tasks.push(movedTask);
      }
    }
  }
  saveTasksToLocalStorage();
};

// Toggle mark status and reorder the task list
const toggleMark = (task) => {
  const index = tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    // Remove the task from its current position
    const [movedTask] = tasks.splice(index, 1);

    if (task.marked) {
      // Move task to the top if marked
      tasks.unshift(movedTask);
    } else {
      // Move task to the end if unmarked
      tasks.push(movedTask);
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
  // First, filter tasks based on the current filter (active/completed)
  const filtered = taskFilter.value === 'active' ? tasks.filter(t => !t.completed) : tasks.filter(t => t.completed);

  // Then, sort by marked status and ID (newest to oldest)
  return filtered.sort((a, b) => {
    if (a.marked && !b.marked) return -1; // Marked tasks come first
    if (!a.marked && b.marked) return 1;  // Unmarked tasks come later
    return b.id - a.id; // Within marked or unmarked, sort by ID (newest first)
  });
});

const beforeLeave = (el) => {
  const height = el.offsetHeight;
  el.style.height = `${height}px`;
  el.style.transition = 'height 0.5s ease';
};

const leave = (el) => {
  setTimeout(() => {
    el.style.height = '0';
    el.style.marginBottom = '0';
    el.style.padding = '0';
  }, 0);
};

// Watch the filter and toggle the isFiltering flag
watch(taskFilter, () => {
  isFiltering.value = true;
  nextTick(() => {
    isFiltering.value = false;
  });
});

onMounted(loadTasksFromLocalStorage);
</script>

<style scoped>
.task-list {
  flex: 1;
  overflow-y: hidden; /* Prevent any overflow during transition */
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
  transition: height 0.5s ease, margin-bottom 0.5s ease, padding 0.5s ease;
}

.list-enter-active, .list-leave-active {
  transition: opacity 0.3s ease, height 0.5s ease, margin-bottom 0.5s ease, padding 0.5s ease;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
}
</style>
