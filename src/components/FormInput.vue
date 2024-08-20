<!-- FormInput.vue -->
<template>
  <div class="form-inner-single-container">
    <label class="modal-label">
      {{ label }}
    </label>
    <component 
      :is="textarea ? 'textarea' : 'input'"
      :class="textarea ? 'note-input' : 'title-input'"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @focus="focus"
      @blur="blur"
      @input="updateValue"
      :rows="textarea ? 2 : undefined"
    />
    <div class="char-limit-indicator" v-if="focused">
      {{ modelValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps(['label', 'placeholder', 'maxlength', 'textarea', 'modelValue']);
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input']);

const focused = ref(false);

const focus = () => {
  focused.value = true;
  emit('focus');
};
const blur = () => {
  focused.value = false;
  emit('blur');
};
const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  emit('input', event);
};
</script>

<style scoped>
.form-inner-single-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.modal-label {
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: 0.07rem;
  color: #575757;
}

.title-input, .note-input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  padding: 0px;
  border-radius: 5px;
  font-size: 1.3rem;
  font-family: Arial, sans-serif;
}

.note-input {
  height: 3.1rem; /* Fixed height for 2 lines of text */
  resize: none; /* Prevent resizing */
}

.char-limit-indicator {
  position: absolute;
  bottom: -1.5rem;
  right: 0;
  font-size: 0.8rem;
  color: black;
}

.updated-label {
  font-size: 0.8rem;
  color: rgb(6, 187, 6);
  margin-left: 10px;
}
</style>
