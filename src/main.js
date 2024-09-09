// main.js

// Import necessary modules from Vue and the root App component
import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.css'; // Import global styles

// Create a Vue application instance with the root component
const app = createApp(App);

// Mount the Vue app to the DOM element with the ID 'app'
app.mount('#app');

// Detect if the device supports touch events and add a corresponding class to the body
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.classList.add('touch-device');
} else {
  document.body.classList.add('non-touch-device');
}
