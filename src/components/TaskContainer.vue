<!-- TaskContainer.vue -->
<template>
  <div class="task-container" 
       :class="{'animate-task': animate, 'completed-task': isCompleted}"
       :style="{ backgroundColor: getPriorityColor(task.priority) }"
       @click="openModal">
    <label class="custom-checkbox" @click.stop>
      <input type="checkbox" v-model="isCompleted" @change="markCompleted" />
      <span class="checkmark"></span>
    </label>
    <div class="task-text-container">
      <h3>{{ task.name }}</h3>
      <p class="container-note-text">{{ task.details }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';

const props = defineProps({
  task: Object
});
const emit = defineEmits(['edit', 'complete']);

const { task } = toRefs(props);
const animate = ref(false);
const isCompleted = ref(task.value.completed);

watch(isCompleted, (newVal) => {
  if (newVal !== task.value.completed) {
    markCompleted();
  }
});

const openModal = () => {
  emit('edit', task.value);
};

const markCompleted = () => {
  animate.value = true;
  console.log('Animation started');
  setTimeout(() => {
    emit('complete', { ...task.value, completed: isCompleted.value }); // Emit complete event after animation
    animate.value = false;
    console.log('Animation ended');
  }, 500); // Adjust the duration to match your animation
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return '#FE6F5B';
    case 'Medium':
      return '#F8F85B';
    case 'Low':
      return '#98EF64';
    default:
      return 'white';
  }
};
</script>

<style scoped>
.task-container {
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
}

.task-text-container {
  width: 100%;
}

.task-container h3 {
  font-size: 1rem;
  margin-bottom: 0;
  line-height: 20px;
}

.container-note-text {
  line-height: 1.2rem;
}

.custom-checkbox {
  display: flex;
  cursor: pointer;
}

.custom-checkbox input {
  display: none;
}

.custom-checkbox .checkmark {
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #000;
  border-radius: 5px;
  position: relative;
  transition: background-color 0.3s ease;
}

.custom-checkbox input:checked + .checkmark {
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #000;
}

.custom-checkbox .checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 9px;
  top: 5px;
  width: 6px;
  height: 12px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-checkbox input:checked + .checkmark::after {
  display: block;
  opacity: 1;
}

/* Only apply animation to task-container when animate is true */
.animate-task {
  transform: translateY(-5px); /* Move the container up 5px */
  opacity: 0; /* Fade out */
}

.completed-task {
  opacity: 0.5; /* Example styling for completed tasks */
}
</style>