<!-- TaskContainer.vue -->
<template>
  <div
    class="task-container"
    :class="{'animate-task': animate, 'completed-task': isCompleted, 'completed-background': isCompleted}"
    @animationend="onAnimationEnd"
    @click="openModal"
  >
    <!-- Checkbox for marking task completion -->
    <label class="custom-checkbox" @click.stop>
      <input type="checkbox" v-model="isCompleted" @change="markCompleted" />
      <span :class="{'checkmark': true, 'completed-checkmark': isCompleted}"></span>
    </label>
    
    <!-- Display task name and truncated details -->
    <div class="task-text-container">
      <h3>{{ task.name }}</h3>
      <p class="container-note-text">{{ truncatedDetails }}</p>
    </div>
    
    <!-- Button to toggle task marker -->
    <div class="wrapper-task-marker">
      <button class="marker-btn" @click.stop="toggleMarker">
        <img :src="markerImage" alt="marker" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, computed } from 'vue';
import marker1 from '@/assets/done-marker-1.svg';
import marker2 from '@/assets/done-marker-2.svg';

// Define props and events for the component
const props = defineProps({
  task: Object
});
const emit = defineEmits(['edit', 'complete', 'toggle-mark']);

// Destructure the 'task' prop and initialize reactive states
const { task } = toRefs(props);
const animate = ref(false);  // Controls the animation state
const isCompleted = ref(task.value.completed);  // Tracks completion status of the task

// Determine the initial marker image based on the task's marked state
const markerImage = ref(task.value.marked ? marker2 : marker1);

/**
 * Toggles the marker status of the task and emits an event to update the parent component.
 */
const toggleMarker = () => {
  task.value.marked = !task.value.marked;
  markerImage.value = task.value.marked ? marker2 : marker1;
  emit('toggle-mark', task.value);  // Emit toggle event to parent
};

/**
 * Watcher to detect changes in the 'isCompleted' reactive reference and trigger task completion.
 */
watch(isCompleted, (newVal) => {
  if (newVal !== task.value.completed) {
    markCompleted();
  }
});

/**
 * Emits an 'edit' event to the parent component to open the modal for editing the task.
 */
const openModal = () => {
  emit('edit', task.value);
};

/**
 * Marks the task as completed and emits a 'complete' event after a short delay to allow for animations.
 */
const markCompleted = () => {
  animate.value = true;  // Start animation
  setTimeout(() => {
    emit('complete', { ...task.value, completed: isCompleted.value });  // Emit complete event after animation
  }, 500);  // Animation duration
};

/**
 * Handles the end of the animation by emitting a 'complete' event if the task is marked as completed.
 */
const onAnimationEnd = () => {
  if (isCompleted.value) {
    emit('complete', { ...task.value, completed: true });
  }
};

/**
 * Computed property to truncate task details if they exceed a certain length.
 */
const truncatedDetails = computed(() => {
  const maxLength = 30;  // Maximum number of characters to display
  return task.value.details.length > maxLength
    ? task.value.details.slice(0, maxLength) + '...'
    : task.value.details;
});
</script>

<style scoped>
.task-container {
  margin-bottom: 0rem;
  padding: 12px;
  display: flex;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  background-color: var(--clr-secondary-background);
  border: 1px solid transparent;
}

.task-container.completed-background {
  background-color: var(--clr-accent-200);
}

/* Hover effect only on non-touch devices */
.non-touch-device .task-container:hover {
  background-color: var(--clr-accent-200);
}

.task-text-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.task-container h3 {
  font-weight: 300;
  font-size: 1rem;
  margin-bottom: 0;
  line-height: 20px;
  color: var(--clr-main-100);
}

.container-note-text {
  font-size: .8rem;
  letter-spacing: .05rem;
  line-height: 1.2rem;
  color: var(--clr-main-100);
}

.custom-checkbox {
  display: flex;
  cursor: pointer;
}

.custom-checkbox input {
  display: none;
}

.custom-checkbox .checkmark {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid var(--clr-main-200);
  border-radius: 5px;
  position: relative;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.custom-checkbox .checkmark.completed-checkmark {
  border-color: var(--clr-accent-100);
}

.custom-checkbox .checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 11px;
  top: 5px;
  width: 8px;
  height: 16px;
  border: solid var(--clr-accent-100);
  border-width: 0 5px 5px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-checkbox input:checked + .checkmark::after {
  display: block;
  opacity: 1;
}

/* Animation for task-container when marked as completed */
.animate-task {
  animation: borderFade 1.5s forwards, fadeOut 0.5s 1.5s forwards;
}

/* Keyframes for the fade out */
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

/* Keyframes for the border fade in */
@keyframes borderFade {
  0% {
    border-color: transparent;
  }
  70% {
    border-color: var(--clr-accent-100);
  }
  100% {
    border-color: var(--clr-accent-200);
  }
}

.wrapper-task-marker {
  display: flex;
  justify-content: center;
  align-items: center;
}

.marker-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: .5rem;
}

.marker-btn img {
  width: 24px;  
  height: 24px; 
  display: block; 
}
</style>
