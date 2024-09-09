<!-- FormInput.vue -->
<template>
  <div class="form-inner-single-container">
    <!-- Label for the input field -->
    <label class="modal-label">
      {{ label }}
    </label>

    <!-- Dynamic component to render either a textarea or input based on props -->
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
      ref="inputElement"
    />

    <!-- Character count indicator, shown only when the input is focused -->
    <div class="char-limit-indicator" v-if="focused">
      {{ modelValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * Props:
 * - label: The label text displayed above the input/textarea.
 * - placeholder: Placeholder text inside the input/textarea.
 * - maxlength: Maximum allowed characters.
 * - textarea: Boolean to determine if the input is a textarea.
 * - modelValue: The v-model value passed from the parent component.
 */
const props = defineProps(['label', 'placeholder', 'maxlength', 'textarea', 'modelValue']);

/**
 * Emits:
 * - update:modelValue: Emitted when the input value changes.
 * - focus: Emitted when the input gains focus.
 * - blur: Emitted when the input loses focus.
 * - input: Emitted on each input event, useful for additional event handling.
 */
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input']);

// State to track if the input is focused
const focused = ref(false);

// Reference to the input or textarea element
const inputElement = ref(null);

/**
 * Method to handle input focus.
 * Sets the focused state to true and emits a focus event.
 */
const focus = () => {
  focused.value = true;
  emit('focus');
};

/**
 * Method to handle input blur (unfocus).
 * Sets the focused state to false and emits a blur event.
 */
const blur = () => {
  focused.value = false;
  emit('blur');
};

/**
 * Method to update the input value.
 * Emits the updated value and an input event to the parent component.
 */
const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
  emit('input', event);
};

/**
 * Method to programmatically focus the input/textarea.
 * This is exposed to allow the parent component to trigger focus.
 */
const focusInput = () => {
  inputElement.value?.focus();
};

// Expose the focusInput method to the parent component
defineExpose({
  focusInput
});
</script>

<style scoped>
/* Container for the input and label */
.form-inner-single-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0rem;
}

/* Styling for the input label */
.modal-label {
  font-size: .9rem;
  font-weight: 400;
  letter-spacing: 0.08rem;
  color: var(--clr-main-200);
}

/* Common styles for both input and textarea elements */
.title-input, .note-input {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none; /* Remove the outline that appears on focus */
  padding: 0px;
  border-radius: 5px;
  font-size: 1.4rem;
  font-family: Arial, sans-serif;
  color: var(--clr-main-100);
  caret-color: var(--clr-accent-100); /* Customize the caret (cursor) color */
}

/* Specific styles for the textarea */
.note-input {
  height: 3.1rem; /* Fixed height for 2 lines of text */
  resize: none; /* Prevent resizing */
}

/* Character limit indicator styling */
.char-limit-indicator {
  position: absolute;
  bottom: -1.5rem;
  right: 0;
  font-size: 0.8rem;
  color: var(--clr-main-100);
}

.updated-label {
  font-size: 0.8rem;
  color: rgb(6, 187, 6);
  margin-left: 10px;
}
</style>
