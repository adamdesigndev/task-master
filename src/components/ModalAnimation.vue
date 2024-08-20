<!-- ModalAnimation.vue -->
<template>
    <transition
      name="fade-slide-up"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <slot></slot>
    </transition>
  </template>
  
  <script setup>
  const beforeEnter = (el) => {
    el.style.transform = 'translateY(100%)';
    el.style.opacity = 0;
  };
  
  const enter = (el, done) => {
    const delay = 300;
    setTimeout(() => {
      el.style.transition = `all ${delay}ms ease`;
      el.style.transform = 'translateY(0)';
      el.style.opacity = 1;
      done();
    });
  };
  
  const leave = (el, done) => {
    const delay = 300;
    el.style.transition = `all ${delay}ms ease`;
    el.style.transform = 'translateY(100%)';
    el.style.opacity = 0;
    setTimeout(() => {
      done();
    }, delay);
  };
  </script>
  