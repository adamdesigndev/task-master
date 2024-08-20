<template>
    <div class="delete-modal-backdrop">
      <div class="delete-modal">
        <button @click="confirmDelete" class="confirm-delete">Delete</button>
        <button @click="close" class="cancel-delete">Cancel</button>
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
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1001;
  }
  
  .delete-modal {
    width: 100%;
    max-width: 800px;
    background-color: #232323;
    padding: 20px;
    display: flex;
    flex-direction: column;
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
  }
  
  .confirm-delete {
    border: 2px solid #dc3d3d;
    background: #dc3d3d;
    color: #fff;
  }
  
  .cancel-delete {
    border: 2px solid #E8E8E8;
    background: #E8E8E8;
    color: #2d67e4;
  }
  </style>
  