<template>
    <div class="form-header-outer-container">
      <div class="form-header">
        <button @click="close" class="back-button"><img src="@/assets/back-icon.svg" alt=""></button>
      </div>
      <button 
        v-if="hasChanges && isTitleFilled" 
        @click="save" 
        class="modal-save-btn modal-save-btn-js">
        Done
      </button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['hasChanges', 'isTitleFilled']);
  const emit = defineEmits(['close', 'save']);
  
  const close = () => emit('close');
  const save = () => emit('save');
  </script>
  
  <style scoped>
  .form-header-outer-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 2rem;
  }
  
  .modal-save-btn {
    color: #4a9b1b;
    font-size: 1.2rem;
    letter-spacing: .05rem;
    font-weight: 600;
    border: none;
    padding: .1rem;
    background: none;
    cursor: pointer;
  }
  
  .form-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  
  .back-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .back-button img {
    height: 1.2rem;
  }
  </style>
  