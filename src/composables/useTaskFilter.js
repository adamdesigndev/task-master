// useTaskFilter.js

// Importing 'ref' from Vue to create a reactive reference for the filter state
import { ref } from 'vue';

// Creating a reactive reference 'filter' with a default value of 'active'.
// This will hold the current state of the task filter (e.g., 'active', 'completed', etc.).
const filter = ref('active');

// Exporting a function that provides access to the filter state.
// This function can be imported and used in any component that needs to track or modify the filter state.
export function useTaskFilter() {
  return filter;
}
