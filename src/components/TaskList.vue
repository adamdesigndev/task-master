<!-- TaskList.vue -->
<template>
  <div class="task-list">
    <!-- Modal for adding/editing tasks; displayed conditionally based on showTaskModal -->
    <TaskModal
      v-if="showTaskModal"
      @close="closeTaskModal"
      @save="saveTask"
      @delete="deleteTask"
      :task="currentTask"
      ref="taskModalRef"
    />

    <!-- Transition group for animating task list changes -->
    <div>
      <transition-group 
        name="list" 
        tag="div"
        @before-leave="beforeLeave"
        @leave="leave"
        :css="!isFiltering"
      >
        <!-- Loop through filtered tasks and render each task using TaskContainer -->
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

    <!-- Button to open the task modal for adding a new task -->
    <button class="add-task-button" @click="openTaskModal">
      <img src="@/assets/add-button.svg" alt="add button">
    </button>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick, watch } from 'vue';
import TaskModal from './TaskModal.vue';
import TaskContainer from './TaskContainer.vue';
import { useTaskFilter } from '@/composables/useTaskFilter';

// Reactive state for tasks and modal visibility
const tasks = reactive([]);
const showTaskModal = ref(false);
const currentTask = ref(null);
const taskFilter = useTaskFilter();
const isFiltering = ref(false); // Used to control transition behavior during filtering

// Reference to the TaskModal component for direct DOM manipulation
const taskModalRef = ref(null);

/**
 * Opens the task modal. If a task is provided, it loads the task into the modal for editing.
 * Otherwise, it opens the modal for creating a new task.
 */
const openTaskModal = (task = null) => {
  currentTask.value = task || { id: null, name: '', details: '', completed: false, marked: false };
  showTaskModal.value = true;

  // Ensures the input field in the modal is focused when adding a new task
  nextTick(() => {
    requestAnimationFrame(() => {
      if (taskModalRef.value && !currentTask.value.id) {
        taskModalRef.value.focusInput();
      }
    });
  });
};

/**
 * Closes the task modal and resets the current task.
 */
const closeTaskModal = () => {
  showTaskModal.value = false;
  currentTask.value = null;
};

/**
 * Saves a task. If the task has an ID, it updates the existing task.
 * Otherwise, it adds a new task and assigns a unique ID.
 */
const saveTask = (task) => {
  if (task.id) {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
    }
  } else {
    task.id = Date.now(); // Generate a unique ID using timestamp
    tasks.push(task);
  }
  saveTasksToLocalStorage(); // Persist changes to local storage
};

/**
 * Opens the task modal for editing an existing task.
 */
const editTask = (task) => {
  openTaskModal(task);
};

/**
 * Deletes a task by ID and closes the modal if it's open.
 */
const deleteTask = (taskId) => {
  const index = tasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  saveTasksToLocalStorage();
  closeTaskModal(); // Ensure modal is closed after deletion
};

/**
 * Marks a task as completed or not completed, and adjusts the task order based on completion status.
 */
const completeTask = (task) => {
  const index = tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks[index].completed = task.completed;

    // Move task to the correct position based on its completed status
    const [movedTask] = tasks.splice(index, 1);
    if (task.completed) {
      tasks.push(movedTask); // Push to end if completed
    } else {
      task.marked ? tasks.unshift(movedTask) : tasks.push(movedTask); // Unshift to top if marked
    }
  }
  saveTasksToLocalStorage();
};

/**
 * Toggles the mark status of a task and adjusts the task order accordingly.
 */
const toggleMark = (task) => {
  const index = tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    const [movedTask] = tasks.splice(index, 1);
    task.marked ? tasks.unshift(movedTask) : tasks.push(movedTask); // Move to top if marked
  }
  saveTasksToLocalStorage();
};

/**
 * Saves tasks to local storage.
 */
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

/**
 * Loads tasks from local storage on component mount.
 */
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.push(...JSON.parse(savedTasks));
  }
};

/**
 * Computed property to get filtered tasks based on current filter.
 * Sorts tasks by marked status and creation time.
 */
const filteredTasks = computed(() => {
  const filtered = taskFilter.value === 'active' ? tasks.filter(t => !t.completed) : tasks.filter(t => t.completed);
  return filtered.sort((a, b) => {
    if (a.marked && !b.marked) return -1;
    if (!a.marked && b.marked) return 1;
    return b.id - a.id;
  });
});

/**
 * Animations for task list items when they are removed.
 */
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

// Watch the filter state and update the isFiltering flag for smoother transitions
watch(taskFilter, () => {
  isFiltering.value = true;
  nextTick(() => {
    isFiltering.value = false;
  });
});

// Load tasks from local storage when the component is mounted
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
