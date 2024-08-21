<!-- TaskModal.vue -->
<template>
  <transition name="fade">
    <div v-if="visible" class="backdrop-main" @click="handleClose"></div>
  </transition>
  <ModalAnimation>
    <div v-if="visible" class="modal" @click.self="handleClose">
      <div class="modal-form">
        <ModalHeader :hasChanges="hasChanges" :isTitleFilled="isTitleFilled" @close="handleClose" @save="handleSave" />
        
        <FormInput 
          label="" 
          placeholder="Enter task" 
          v-model="task.name" 
          maxlength="30" 
          :focused="nameFocused" 
          ref="titleInput"
          @focus="nameFocused = true" 
          @blur="nameFocused = false"
          @input="markAsChanged"
        />
        
        <FormInput 
          label="" 
          placeholder="Add note" 
          v-model="task.details" 
          maxlength="50" 
          textarea
          :focused="detailsFocused" 
          @focus="detailsFocused = true" 
          @blur="detailsFocused = false"
          @input="markAsChanged"
        />

        <!-- Conditionally render delete button only if the task has an id -->
        <div v-if="task.id" class="delete-modal-container">
          <button class="open-delete-modal" @click="openDeleteModal"><img src="@/assets/trash-icon.svg" alt="Delete task"></button>
        </div>
      </div>
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

const props = defineProps(['task']);
const emit = defineEmits(['close', 'save', 'delete']);

const originalTask = ref({
  name: props.task?.name || '',
  details: props.task?.details || ''
});

const task = reactive({
  id: props.task?.id || null,
  name: props.task?.name || '',
  details: props.task?.details || '',
  completed: props.task?.completed || false
});

const visible = ref(false);
const showDeleteModal = ref(false);
const hasChanges = ref(false);

const nameFocused = ref(false);
const detailsFocused = ref(false);

const titleInput = ref(null);

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

const markAsChanged = () => {
  hasChanges.value = true;
};

const handleSave = () => {
  emit('save', { ...task });
  hasChanges.value = false;
  closeWithAnimation();
};

const handleClose = () => {
  closeWithAnimation();
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

const confirmDelete = () => {
  emit('delete', task.id);
  closeDeleteModal();
  closeWithAnimation();
};

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = '';
};

watch(() => props.task, (newTask) => {
  Object.assign(task, newTask || { name: '', details: '', completed: false });
  Object.assign(originalTask.value, newTask || { name: '', details: '' });
  visible.value = true;
  disableScroll();
  hasChanges.value = false;

  if (!task.id) {
    nextTick(() => {
      requestAnimationFrame(() => {
        titleInput.value?.focusInput();
      });
    });
  }
});

onMounted(() => {
  visible.value = true;
  disableScroll();
});

onUnmounted(() => {
  enableScroll();
});

watch(visible, (newVal) => {
  if (!newVal) {
    enableScroll();
  }
});

const isTitleFilled = computed(() => task.name.trim().length > 0);

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

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
}

.open-delete-modal {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.open-delete-modal img {
  height: 1.2rem;
}
</style>
