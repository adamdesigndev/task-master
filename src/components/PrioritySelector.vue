<template>
    <div class="form-inner-single-container">
      <label class="modal-label">
        Priority
        <span v-if="updated" class="updated-label">Updated!</span>
      </label>
      <div class="priority-container">
        <button
          type="button"
          :class="{ active: priority === 'Low', 'low-priority': priority === 'Low' }"
          @click="setPriority('Low')"
        >Low</button>
        <button
          type="button"
          :class="{ active: priority === 'Medium', 'medium-priority': priority === 'Medium' }"
          @click="setPriority('Medium')"
        >Medium</button>
        <button
          type="button"
          :class="{ active: priority === 'High', 'high-priority': priority === 'High' }"
          @click="setPriority('High')"
        >High</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['priority', 'updated']);
  const emit = defineEmits(['setPriority']);
  
  const setPriority = (priority) => emit('setPriority', priority);
  </script>
  
  <style scoped>
  .priority-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  
  .priority-container button {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.08rem;
    color: #000;
    padding: 10px 20px;
    border-radius: 30px;
    border: 2px solid #000;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .priority-container button.high-priority {
    background-color: #FE6F5B; /* Red for High priority */
  }
  
  .priority-container button.medium-priority {
    background-color: #F8F85B; /* Yellow for Medium priority */
  }
  
  .priority-container button.low-priority {
    background-color: #98EF64; /* Green for Low priority */
  }
  
  .priority-container button:not(.active) {
    color: black;
  }
  </style>
  