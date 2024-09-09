<!-- ModalHeader.vue -->
<template>
  <!-- Container for the modal header with a back button and a save button -->
  <div class="form-header-outer-container">
    <div class="form-header">
      <!-- Back button to close the modal -->
      <button @click="close" class="back-button">
        <img src="@/assets/done-back.png" alt="">
      </button>
    </div>

    <!-- Save button, visible only if there are changes and the title is filled -->
    <button 
      v-if="hasChanges && isTitleFilled" 
      @click="save" 
      class="modal-save-btn modal-save-btn-js">
      Done
    </button>
  </div>
</template>

<script setup>
/**
 * Props to receive information about whether there are unsaved changes 
 * and if the task title input is filled.
 */
const props = defineProps(['hasChanges', 'isTitleFilled']);

/**
 * Emits events to the parent component for closing the modal and saving the task.
 */
const emit = defineEmits(['close', 'save']);

/**
 * Closes the modal by emitting a 'close' event.
 */
const close = () => emit('close');

/**
 * Saves the task by emitting a 'save' event.
 */
const save = () => emit('save');
</script>

<style scoped>
/* Container for the header, aligns the back button and save button */
.form-header-outer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 2rem;
}

/* Styles for the save button */
.modal-save-btn {
  color: var(--clr-accent-100);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  padding: .1rem;
  background: none;
  cursor: pointer;
}

/* Flexbox container for the back button */
.form-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

/* Styles for the back button, with no background or border for a clean look */
.back-button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Styles for the back button image */
.back-button img {
  height: 1rem;
}
</style>
