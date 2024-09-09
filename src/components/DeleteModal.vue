<!-- DeleteModal.vue -->
<template>
  <!-- Modal backdrop with a semi-transparent dark background -->
  <div class="delete-modal-backdrop">
    <div class="delete-modal">
      <!-- Cancel button: Closes the modal without action -->
      <button @click="close" class="cancel-delete">Cancel</button>
      <!-- Confirm button: Confirms the deletion action -->
      <button @click="confirmDelete" class="confirm-delete">Delete task</button>
    </div>
  </div>
</template>

<script setup>
/**
 * Emits:
 * - confirmDelete: Triggered to confirm task deletion.
 * - close: Triggered to cancel deletion and close the modal.
 */
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
  padding: 10px;
  border-radius: 5rem;
  cursor: pointer;
  width: 100%;
  border: 0px solid rgba(0, 0, 0, 0);
}

.confirm-delete {
  background: #D7023B;
  color: #fff;
}

.cancel-delete {
  background: var(--clr-secondary-background);
  color: #fff;
}
</style>
