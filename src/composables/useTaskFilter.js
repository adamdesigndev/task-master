// useTaskFilter.js
import { ref } from 'vue';

const filter = ref('active');

export function useTaskFilter() {
  return filter;
}
