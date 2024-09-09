<!-- ModalAnimation.vue -->
<template>
  <!-- Transition for animating modal appearance and disappearance -->
  <transition
    name="fade-slide-up"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot> <!-- Slot to allow dynamic content -->
  </transition>
</template>

<script setup>
/**
 * Sets the initial state before the element enters.
 * Moves the element off-screen (100% down) and hides it (opacity 0).
 */
const beforeEnter = (el) => {
  el.style.transform = 'translateY(100%)';
  el.style.opacity = 0;
};

/**
 * Handles the element entering transition.
 * Slides the element up from the bottom to its original position while fading it in.
 */
const enter = (el, done) => {
  const delay = 300;
  setTimeout(() => {
    el.style.transition = `all ${delay}ms ease`;
    el.style.transform = 'translateY(0)';
    el.style.opacity = 1;
    done(); // Call done to signal the end of the transition
  });
};

/**
 * Handles the element leaving transition.
 * Slides the element down and fades it out.
 */
const leave = (el, done) => {
  const delay = 300;
  el.style.transition = `all ${delay}ms ease`;
  el.style.transform = 'translateY(100%)';
  el.style.opacity = 0;
  setTimeout(() => {
    done(); // Call done to signal the end of the transition
  }, delay);
};
</script>
