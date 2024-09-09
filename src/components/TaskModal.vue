<!-- TaskModal.vue -->
<template>
  <!-- Backdrop for the modal with a fade transition effect -->
  <transition name="fade">
    <div v-if="visible" class="backdrop-main" @click="handleClose"></div>
  </transition>
  
  <!-- Main modal content with custom animations -->
  <ModalAnimation>
    <div v-if="visible" class="modal" @click.self="handleClose">
      <div class="modal-form" :style="{ paddingBottom: modalPaddingBottom }">
        <!-- Modal header with close and save options -->
        <ModalHeader :hasChanges="hasChanges" :isTitleFilled="isTitleFilled" @close="handleClose" @save="handleSave" />
        
        <!-- Form input for task name -->
        <FormInput 
          label="Task" 
          placeholder="Enter task" 
          v-model="task.name" 
          maxlength="30" 
          :focused="nameFocused" 
          ref="titleInput"
          @focus="nameFocused = true" 
          @blur="nameFocused = false"
          @input="markAsChanged"
        />
        
        <!-- Form input for task notes -->
        <FormInput 
          label="Notes" 
          placeholder="Add note" 
          v-model="task.details" 
          maxlength="30" 
          textarea
          :focused="detailsFocused" 
          @focus="detailsFocused = true" 
          @blur="detailsFocused = false"
          @input="markAsChanged"
        />

        <!-- Delete button for existing tasks, hidden for new tasks -->
        <div v-if="task.id" class="delete-modal-container">
          <button class="open-delete-modal" @click="openDeleteModal">
            <img src="@/assets/trash-icon.svg" alt="Delete task">
          </button>
        </div>
      </div>
      <!-- Delete confirmation modal -->
      <DeleteModal v-if="showDeleteModal" @confirmDelete="confirmDelete" @close="closeDeleteModal" />
    </div>
  </ModalAnimation>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted, computed, nextTick } from 'vue';
import ModalAnimation from './ModalAnimation.vue';
import ModalHeader from './ModalHeader.vue';
import FormInput from './FormInput.vue';
import DeleteModal from './DeleteModal.vue';

// Props and emits for the modal
const props = defineProps(['task']);
const emit = defineEmits(['close', 'save', 'delete']);

// Store the original task state to track changes
const originalTask = ref({
  name: props.task?.name || '',
  details: props.task?.details || '',
  marked: props.task?.marked || false // Track marked status as well
});

// Reactive state for the task being edited or created
const task = reactive({
  id: props.task?.id || null,
  name: props.task?.name || '',
  details: props.task?.details || '',
  completed: props.task?.completed || false,
  marked: props.task?.marked || false // Track marked status as well
});

// Visibility states for the modal and delete modal
const visible = ref(false);
const showDeleteModal = ref(false);
const hasChanges = ref(false);  // Tracks if there are unsaved changes

// States for managing input focus
const nameFocused = ref(false);
const detailsFocused = ref(false);
const titleInput = ref(null);  // Ref to focus the task name input

// Expose a method to focus the input, useful when opening the modal
const focusInput = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      titleInput.value?.focusInput();
    });
  });
};
defineExpose({
  focusInput
});

// Marks the form as having unsaved changes
const markAsChanged = () => {
  hasChanges.value = true;
};

// Handles saving the task and emits the save event to the parent
const handleSave = () => {
  emit('save', { ...task });
  hasChanges.value = false;
  closeWithAnimation();
};

// Handles closing the modal with an animation
const handleClose = () => {
  closeWithAnimation();
};

// Opens the delete confirmation modal
const openDeleteModal = () => {
  showDeleteModal.value = true;
};

// Closes the delete confirmation modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Confirms deletion and emits the delete event to the parent
const confirmDelete = () => {
  emit('delete', task.id);
  closeDeleteModal();
  closeWithAnimation();
};

// Disables scrolling when the modal is open
const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

// Enables scrolling when the modal is closed
const enableScroll = () => {
  document.body.style.overflow = '';
};

// Watches for changes in the task prop and updates the modal state accordingly
watch(() => props.task, (newTask) => {
  Object.assign(task, newTask || { name: '', details: '', completed: false, marked: false });
  Object.assign(originalTask.value, newTask || { name: '', details: '', marked: false });
  visible.value = true;  // Show modal when task is set
  disableScroll();  // Disable scroll when modal is open
  hasChanges.value = false;  // Reset change state

  // Focus the task input for new tasks
  if (!task.id) {
    nextTick(() => {
      requestAnimationFrame(() => {
        titleInput.value?.focusInput();
      });
    });
  }
});

// Handle component mounting and unmounting events
onMounted(() => {
  visible.value = true;
  disableScroll();
});

onUnmounted(() => {
  enableScroll();
});

// Watch for visibility changes to manage scroll state
watch(visible, (newVal) => {
  if (!newVal) {
    enableScroll();
  }
});

// Computed property to check if the task title is filled
const isTitleFilled = computed(() => task.name.trim().length > 0);

// Dynamically adjust modal padding based on whether the task is new or existing
const modalPaddingBottom = computed(() => {
  return task.id ? '1rem' : '2.5rem'; // Adjust padding for different use cases
});

// Handles closing the modal with a fade-out animation
const closeWithAnimation = () => {
  visible.value = false;
  setTimeout(() => {
    emit('close');
  }, 300);
};
</script>

<style scoped>
.backdrop-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  transition: opacity 0.3s ease;
}

/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

/* Modal container styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1001;
}

/* Modal form styles */
.modal-form {
  background: var(--clr-secondary-background);
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.delete-modal-container {
  display: flex;
  justify-content: right;
  margin-top: 1rem;
}

/* Button for opening the delete confirmation modal */
.open-delete-modal {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.open-delete-modal img {
  height: 1.2rem;
}
</style>
