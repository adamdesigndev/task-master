<template>
    <div class="delete-modal-backdrop">
      <div class="delete-modal">
        <button @click="close" class="cancel-delete">Cancel</button>
        <button @click="confirmDelete" class="confirm-delete">Delete task</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['confirmDelete', 'close']);
  
  const confirmDelete = () => emit('confirmDelete');
  const close = () => emit('close');
  </script>
  
  <style scoped>
  .delete-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1001;
  }
  
  .delete-modal {
    width: 100%;
    max-width: 800px;
    background-color: rgba(0, 0, 0, 0);
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: .5rem;
    border-radius: 2rem 2rem 0 0;
  }
  
  .confirm-delete,
  .cancel-delete {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.08rem;
    padding: 10px;
    border-radius: 5rem;
    cursor: pointer;
    width: 100%;
  }
  
  .confirm-delete {
    border: none;
    background: #F10C49;
    color: #fff;
  }
  
  .cancel-delete {
    border: none;
    background: var(--clr-secondary-background);
    color: #fff;
  }
  </style>
  