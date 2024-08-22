// main.js
import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.css';

const app = createApp(App);
app.mount('#app');

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
  } else {
    document.body.classList.add('non-touch-device');
  }